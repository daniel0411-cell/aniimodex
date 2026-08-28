#!/usr/bin/env python3
"""
Bing Webmaster API 提交脚本（零依赖，仅标准库）。

功能：使用 Bing API Key，将 URL 提交到 Bing 索引队列。
支持：单个提交（SubmitUrl）、批量提交（SubmitUrlBatch，单次最多 200 个）、从 sitemap 读取。

用法示例：
    # 从线上 sitemap 读取全部 URL 并批量提交
    python3 bing_submit.py --credentials .seo/credentials.json --from-sitemap

    # 提交单个 URL
    python3 bing_submit.py --credentials .seo/credentials.json --url https://aniimodex.com/dex/001

    # 从文件读取 URL 列表提交
    python3 bing_submit.py --credentials .seo/credentials.json --url-list urls.txt

    # 只打印将提交的 URL，不实际调用
    python3 bing_submit.py --credentials .seo/credentials.json --from-sitemap --dry-run
"""

import argparse
import json
import re
import sys
import urllib.error
import urllib.request

SUBMIT_URL = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl"
SUBMIT_BATCH = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch"
BATCH_MAX = 200  # 单次批量最多 200 个 URL


def auth_url(endpoint, api_key):
    """返回带 apikey 查询参数的 URL（Bing Webmaster API 的认证方式是 URL 查询参数）。"""
    sep = "&" if "?" in endpoint else "?"
    return f"{endpoint}{sep}apikey={api_key}"


def http_post_json(url, headers, body, timeout=30):
    """POST JSON 请求，返回 (status_code, text)。"""
    data = json.dumps(body).encode("utf-8")
    headers = dict(headers)
    headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, method="POST", headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", errors="replace")
    except Exception as e:  # noqa: BLE001
        return 0, str(e)


def load_credentials(creds_path):
    """加载凭据配置文件，返回 bing 配置和 canonical host。"""
    with open(creds_path, "r", encoding="utf-8") as f:
        cfg = json.load(f)
    bing = cfg.get("bing")
    if not bing or not bing.get("api_key"):
        raise RuntimeError("凭据配置缺少 bing.api_key，请先配置（见 credentials-setup.md）")
    return bing, cfg.get("canonical_host", "https://aniimodex.com")


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


def submit_single(api_key, site_url, url):
    """提交单个 URL。Bing Webmaster API 认证使用 URL 查询参数 apikey。"""
    headers = {"Content-Type": "application/json"}
    return http_post_json(auth_url(SUBMIT_URL, api_key), headers, {"siteUrl": site_url, "url": url})


def submit_batch(api_key, site_url, url_list):
    """批量提交 URL（单次最多 200 个）。认证使用 URL 查询参数 apikey。"""
    headers = {"Content-Type": "application/json"}
    return http_post_json(auth_url(SUBMIT_BATCH, api_key), headers, {"siteUrl": site_url, "urlList": url_list})


def main():
    parser = argparse.ArgumentParser(description="Bing Webmaster API 提交脚本（零依赖）")
    parser.add_argument("--credentials", required=True, help="凭据配置 JSON 路径")
    parser.add_argument("--url", help="提交单个 URL")
    parser.add_argument("--url-list", help="从文件读取 URL 列表")
    parser.add_argument("--from-sitemap", action="store_true", help="从线上 sitemap 读取 URL")
    parser.add_argument("--limit", type=int, default=None, help="最多提交多少个 URL")
    parser.add_argument("--dry-run", action="store_true", help="只打印将要提交的 URL，不实际调用 API")
    args = parser.parse_args()

    try:
        bing, canonical_host = load_credentials(args.credentials)
        site_url = bing.get("site_url") or canonical_host
        api_key = bing["api_key"]

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

        print(f"将提交 {len(urls)} 个 URL 到站点 {site_url}")
        for u in urls:
            print(f"  - {u}")

        if args.dry_run:
            print("\n[dry-run] 未实际调用 API")
            return 0

        success, failed = 0, 0
        for i in range(0, len(urls), BATCH_MAX):
            chunk = urls[i : i + BATCH_MAX]
            if len(chunk) == 1:
                status, text = submit_single(api_key, site_url, chunk[0])
            else:
                status, text = submit_batch(api_key, site_url, chunk)
            if status in (200, 201, 202):
                print(f"[批次 {i // BATCH_MAX + 1}] ✓ 提交 {len(chunk)} 个 URL")
                success += len(chunk)
            else:
                print(f"[批次 {i // BATCH_MAX + 1}] ✗ HTTP {status}: {text[:300]}")
                failed += len(chunk)
                if status == 429:
                    print("配额用尽，停止提交。请次日重试。")
                    break

        print(f"\n完成：成功 {success}，失败 {failed}")
        return 0 if failed == 0 else 1
    except Exception as e:  # noqa: BLE001
        print(f"错误：{e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
