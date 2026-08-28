#!/usr/bin/env python3
"""
Google Search Console Indexing API 提交脚本（零依赖，仅标准库）。

功能：使用 Service Account 凭据，将指定 URL 推送到 Google 索引队列。
支持：从 sitemap 读取全部 URL、从参数/文件指定单个或多个 URL、可限制数量。
认证：手动构造 RS256 JWT（用 Service Account 私钥），换取 OAuth2 access_token。

用法示例：
    # 从线上 sitemap 读取前 5 个 URL 并提交
    python3 gsc_indexing.py --credentials .seo/credentials.json --from-sitemap --limit 5

    # 提交单个 URL
    python3 gsc_indexing.py --credentials .seo/credentials.json --url https://aniimodex.com/dex/001

    # 从文件读取 URL 列表提交
    python3 gsc_indexing.py --credentials .seo/credentials.json --url-list urls.txt

    # 标记 URL 已删除
    python3 gsc_indexing.py --credentials .seo/credentials.json --url https://example.com/x --type URL_DELETED
"""

import argparse
import base64
import hashlib
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing"
TOKEN_URL = "https://oauth2.googleapis.com/token"
INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"


# ---------- 基础工具 ----------

def b64url(data):
    """base64url 编码（无填充）。data 为 bytes。"""
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def rsa_sha256_sign(private_key_pem, data_bytes):
    """用 RSA 私钥对 data_bytes 做 RS256 签名。需要 cryptography 库。"""
    try:
        from cryptography.hazmat.primitives import hashes, serialization
        from cryptography.hazmat.primitives.asymmetric import padding
    except ImportError:
        raise RuntimeError(
            "缺少 cryptography 库，无法进行 GSC 认证签名。\n"
            "请先运行依赖安装脚本：\n"
            "    bash scripts/install_deps.sh\n"
            "然后用虚拟环境中的 python 运行本脚本：\n"
            "    .codebuddy/skills/seo-indexing/.venv/bin/python scripts/gsc_indexing.py --help"
        )

    private_key = serialization.load_pem_private_key(private_key_pem.encode(), password=None)
    signature = private_key.sign(data_bytes, padding.PKCS1v15(), hashes.SHA256())
    return signature


def jwt_signed(private_key_pem, service_account_email, scope):
    """构造并签名一个 RS256 JWT，返回 base64url 字符串。"""
    now = int(time.time())
    header = b64url(json.dumps({"alg": "RS256", "typ": "JWT"}).encode())
    claims = b64url(
        json.dumps(
            {
                "iss": service_account_email,
                "scope": scope,
                "aud": TOKEN_URL,
                "iat": now,
                "exp": now + 3600,
            }
        ).encode()
    )
    signing_input = f"{header}.{claims}".encode()
    signature = rsa_sha256_sign(private_key_pem, signing_input)
    return f"{header}.{claims}.{b64url(signature)}"


def http_request_json(url, method="POST", headers=None, body=None, timeout=30):
    """通用 JSON HTTP 请求。返回 (status_code, parsed_json_or_text)。"""
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            text = resp.read().decode("utf-8", errors="replace")
            try:
                return resp.status, json.loads(text)
            except json.JSONDecodeError:
                return resp.status, text
    except urllib.error.HTTPError as e:
        text = e.read().decode("utf-8", errors="replace")
        try:
            return e.code, json.loads(text)
        except json.JSONDecodeError:
            return e.code, text
    except Exception as e:  # noqa: BLE001
        return 0, str(e)


# ---------- 认证与提交 ----------

def get_access_token(sa_json_path, sa_email):
    """用 Service Account JSON 换取 OAuth2 access_token。"""
    with open(sa_json_path, "r", encoding="utf-8") as f:
        sa = json.load(f)
    private_key_pem = sa["private_key"]
    jwt = jwt_signed(private_key_pem, sa_email, INDEXING_SCOPE)
    body = urllib.parse.urlencode(
        {
            "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
            "assertion": jwt,
        }
    ).encode()
    req = urllib.request.Request(
        TOKEN_URL,
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        token_data = json.loads(resp.read().decode())
    if "access_token" not in token_data:
        raise RuntimeError(f"获取 token 失败：{token_data}")
    return token_data["access_token"]


def publish_url(access_token, url, notify_type):
    """推送单个 URL 到 Google 索引队列。返回 (status, response)。"""
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    return http_request_json(INDEXING_ENDPOINT, method="POST", headers=headers, body={"url": url, "type": notify_type})


# ---------- URL 收集 ----------

def fetch_sitemap_urls(canonical_host):
    """从线上 sitemap 抓取全部 URL。"""
    sitemap_url = canonical_host.rstrip("/") + "/sitemap.xml"
    req = urllib.request.Request(sitemap_url, headers={"User-Agent": "Mozilla/5.0 (SEO-indexing-skill)"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = resp.read().decode("utf-8", errors="replace")
    return [l.strip() for l in re.findall(r"<loc>(.*?)</loc>", body)]


def read_url_list(path):
    """从文件读取 URL 列表（每行一个）。"""
    with open(path, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]


# ---------- 主流程 ----------

def load_credentials(creds_path):
    """加载凭据配置文件，返回 gsc 配置和 canonical host。"""
    with open(creds_path, "r", encoding="utf-8") as f:
        cfg = json.load(f)
    gsc = cfg.get("gsc")
    if not gsc or not gsc.get("service_account_json"):
        raise RuntimeError("凭据配置缺少 gsc.service_account_json，请先配置（见 credentials-setup.md）")
    return gsc, cfg.get("canonical_host", "https://aniimodex.com")


def main():
    parser = argparse.ArgumentParser(description="Google Indexing API 提交脚本（零依赖）")
    parser.add_argument("--credentials", required=True, help="凭据配置 JSON 路径")
    parser.add_argument("--url", help="提交单个 URL")
    parser.add_argument("--url-list", help="从文件读取 URL 列表")
    parser.add_argument("--from-sitemap", action="store_true", help="从线上 sitemap 读取 URL")
    parser.add_argument("--limit", type=int, default=None, help="最多提交多少个 URL")
    parser.add_argument("--type", default="URL_UPDATED", choices=["URL_UPDATED", "URL_DELETED"], help="通知类型")
    parser.add_argument("--dry-run", action="store_true", help="只打印将要提交的 URL，不实际调用 API")
    parser.add_argument("--delay", type=float, default=1.0, help="每次请求间隔秒数（避免触发 429）")
    args = parser.parse_args()

    try:
        gsc, canonical_host = load_credentials(args.credentials)

        urls = []
        if args.url:
            urls = [args.url]
        elif args.url_list:
            urls = read_url_list(args.url_list)
        elif args.from_sitemap:
            urls = fetch_sitemap_urls(canonical_host)
        else:
            parser.error("必须指定 --url / --url-list / --from-sitemap 之一")

        if args.limit:
            urls = urls[: args.limit]

        if not urls:
            print("没有可提交的 URL")
            return 1

        print(f"将提交 {len(urls)} 个 URL（type={args.type}）")
        for u in urls:
            print(f"  - {u}")

        if args.dry_run:
            print("\n[dry-run] 未实际调用 API")
            return 0

        access_token = get_access_token(gsc["service_account_json"], gsc["service_account_email"])

        success, failed = 0, 0
        for i, url in enumerate(urls, 1):
            status, resp = publish_url(access_token, url, args.type)
            if status in (200, 201):
                print(f"[{i}/{len(urls)}] ✓ {url}")
                success += 1
            else:
                print(f"[{i}/{len(urls)}] ✗ {url} -> HTTP {status}: {resp}")
                failed += 1
                if status == 429:
                    print("  配额用尽，停止提交。请次日重试或降低 --delay。")
                    break
            time.sleep(args.delay)

        print(f"\n完成：成功 {success}，失败 {failed}")
        return 0 if failed == 0 else 1
    except Exception as e:  # noqa: BLE001
        print(f"错误：{e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
