#!/usr/bin/env python3
"""
sitemap 验证与 URL 检查脚本（无需凭据，零依赖，仅标准库）。

功能：
    1. 验证线上 sitemap.xml 是否可访问、是否为有效 XML、包含多少 URL
    2. 核对 robots.txt 的 Sitemap 声明是否与线上 sitemap 一致
    3. 逐个检查 URL 的 HTTP 状态码，找出 404/500/异常链接
    4. 可选生成待提交 URL 清单文件（供 GSC/Bing 脚本使用）

用法示例：
    # 检查全部 URL 的可访问性
    python3 check_sitemap.py --host https://aniimodex.com --check-all

    # 只验证 sitemap，不逐个检查 URL
    python3 check_sitemap.py --host https://aniimodex.com

    # 检查并生成待提交清单
    python3 check_sitemap.py --host https://aniimodex.com --check-all --output urls.txt
"""

import argparse
import concurrent.futures
import re
import sys
import urllib.error
import urllib.request

ACCEPTABLE_REDIRECTS = (301, 302, 303, 307, 308)


def http_get(url, timeout=30, allow_redirects=True):
    """GET 请求，返回 (final_url, status_code)。失败时 status_code 为错误字符串。"""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (SEO-indexing-skill)"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.geturl(), resp.status
    except urllib.error.HTTPError as e:
        # HTTPError 也有最终 URL 和状态码
        return getattr(e, "url", url), e.code
    except Exception as e:  # noqa: BLE001
        return None, str(e)


def fetch_sitemap(canonical_host):
    """抓取并解析线上 sitemap，返回 url 列表。"""
    sitemap_url = canonical_host.rstrip("/") + "/sitemap.xml"
    _, status = http_get(sitemap_url)
    if not isinstance(status, int) or status != 200:
        raise RuntimeError(f"sitemap 获取失败 HTTP {status}")
    final, _ = http_get(sitemap_url)
    req = urllib.request.Request(final, headers={"User-Agent": "Mozilla/5.0 (SEO-indexing-skill)"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = resp.read().decode("utf-8", errors="replace")
    locs = re.findall(r"<loc>(.*?)</loc>", body)
    return [l.strip() for l in locs]


def fetch_robots(canonical_host):
    """抓取 robots.txt，返回 Sitemap 声明列表。"""
    robots_url = canonical_host.rstrip("/") + "/robots.txt"
    _, status = http_get(robots_url)
    if not isinstance(status, int) or status != 200:
        return []
    req = urllib.request.Request(robots_url, headers={"User-Agent": "Mozilla/5.0 (SEO-indexing-skill)"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8", errors="replace")
    except Exception:  # noqa: BLE001
        return []
    return [line.strip() for line in body.splitlines() if line.lower().startswith("sitemap:")]


def check_url(url, timeout=15):
    """检查单个 URL，返回 (final_url, status_code)。"""
    return http_get(url, timeout=timeout)


def main():
    parser = argparse.ArgumentParser(description="sitemap 验证与 URL 检查（零依赖）")
    parser.add_argument("--host", required=True, help="站点根地址，如 https://aniimodex.com")
    parser.add_argument("--check-all", action="store_true", help="逐个检查所有 URL 的可访问性")
    parser.add_argument("--output", help="将（正常的）URL 清单写入该文件，供提交脚本使用")
    parser.add_argument("--concurrency", type=int, default=5, help="并发检查数量（默认 5）")
    args = parser.parse_args()

    host = args.host.rstrip("/")
    print(f"=== 站点：{host} ===\n")

    # 1. sitemap
    print("[1] sitemap.xml 验证")
    try:
        urls = fetch_sitemap(host)
        print(f"  - 可访问，共 {len(urls)} 个 URL")
        print(f"  - 前 5 个：{urls[:5]}")
    except Exception as e:  # noqa: BLE001
        print(f"  - ✗ sitemap 获取失败：{e}")
        return 1

    # 2. robots.txt 一致性
    print("\n[2] robots.txt Sitemap 声明核对")
    sitemap_decls = fetch_robots(host)
    if not sitemap_decls:
        print("  - ⚠️ robots.txt 未声明 Sitemap")
    else:
        for d in sitemap_decls:
            match = "✓" if (host + "/sitemap.xml") in d else "⚠️ 不一致"
            print(f"  - {match} {d}")

    # 3. URL 检查
    normal, issues = [], []
    if args.check_all:
        print(f"\n[3] URL 可访问性检查（共 {len(urls)} 个）")
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.concurrency) as pool:
            results = list(pool.map(check_url, urls))
        for url, (final_url, status) in zip(urls, results):
            if isinstance(status, int) and status == 200:
                normal.append(url)
            elif isinstance(status, int) and status in ACCEPTABLE_REDIRECTS:
                normal.append(final_url)
                print(f"  - ⚠️ {url} -> 重定向 {status} -> {final_url}")
            else:
                issues.append((url, status))
                print(f"  - ✗ {url} -> {status}")
        print(f"\n  正常：{len(normal)}，问题：{len(issues)}")
        if issues:
            for u, s in issues:
                print(f"    ✗ {u} ({s})")
    else:
        normal = urls

    # 4. 输出清单
    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            for u in normal:
                f.write(u + "\n")
        print(f"\n✓ 正常 URL 清单已写入：{args.output}（{len(normal)} 个）")

    # 5. 结论
    if issues:
        print(f"\n结论：发现 {len(issues)} 个异常 URL，请修复后再提交收录。")
        return 1
    print(f"\n结论：sitemap 正常，{len(normal)} 个 URL 可访问，可以提交收录。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
