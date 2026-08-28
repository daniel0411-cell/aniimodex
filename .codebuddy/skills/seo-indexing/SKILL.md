---
name: seo-indexing
description: 自动处理 Google Search Console (GSC) 与 Bing Webmaster 的收录/索引请求。当用户提出「提交收录」「提交 GSC」「提交 Bing/必应」「触发索引」「请求收录」「检查 sitemap」「提交 sitemap 到搜索引擎」等需求时使用本 skill。提供 sitemap 验证、URL 可访问性检查、GSC Indexing API 自动提交、Bing Webmaster API 自动提交，以及凭据申请指引。
---

# SEO Indexing — 自动收录提交

## Overview

本 skill 用于自动执行「网站收录/索引」相关操作，避免手动登录 GSC / Bing Webmaster 后台。核心能力：

1. **验证与检查**（无需凭据）：验证线上 sitemap、核对 robots.txt 一致性、逐个检查 URL 可访问性，找出 404/500 异常链接
2. **提交 GSC**（需 Service Account 凭据）：通过 Google Indexing API 将 URL 推送到 Google 索引队列
3. **提交 Bing**（需 API Key 凭据）：通过 Bing Webmaster API 将 URL 提交到 Bing 索引队列
4. **凭据管理**：提供 GSC / Bing 凭据的申请指引与配置模板

> **重要**：凭据未配置前，验证/检查功能照常可用；只有「真正调用 API 提交」需要凭据。

### 依赖情况
- `check_sitemap.py`、`bing_submit.py`：**纯标准库，零依赖**，系统 `python3` 直接可运行
- `gsc_indexing.py`：需 `cryptography` 库（用于 RS256 JWT 签名）。首次使用前运行 `bash scripts/install_deps.sh` 安装（创建 `.venv` 虚拟环境），之后用 `.venv/bin/python` 运行

---

## Workflow（工作流）

执行任何收录请求时，按以下顺序处理：

1. **确认站点与目标 URL**
   - 站点根地址：默认 `https://aniimodex.com`（本项目正式域名）
   - 目标 URL：用户指定，或默认使用线上 sitemap 中的全部/部分 URL

2. **先验证，后提交**（强烈建议）
   - 运行 `check_sitemap.py` 验证 sitemap 和 URL 可访问性
   - 若存在 404/500 异常 URL，**先向用户报告**，不要提交异常 URL

3. **提交到目标平台**
   - Google：运行 `gsc_indexing.py`
   - Bing：运行 `bing_submit.py`
   - 两者都要：依次运行两个脚本

4. **输出报告**
   - 汇总每个 URL 的提交结果（成功/失败/配额）
   - 说明收录是「请求抓取」而非即时生效，通常在数小时到数天内收录

---

## 1. 验证与检查（无需凭据）

运行 `scripts/check_sitemap.py`：

```bash
python3 scripts/check_sitemap.py --host https://aniimodex.com --check-all --output urls.txt
```

- `--host`：站点根地址（必填）
- `--check-all`：逐个检查所有 URL 的 HTTP 状态
- `--output urls.txt`：将正常 URL 写入清单，供后续提交脚本复用
- 无 `--check-all` 时只验证 sitemap 结构，不逐个检查

**判断逻辑**：检查出 404/500 或异常 URL 时，先报告给用户处理，不提交异常链接。

---

## 2. 提交到 Google Search Console

运行 `scripts/gsc_indexing.py`。需要已配置 GSC 凭据，且已安装 `cryptography` 依赖。

**首次使用先装依赖**：
```bash
bash scripts/install_deps.sh
# 之后用虚拟环境中的 python 运行：
GSCPY=".codebuddy/skills/seo-indexing/.venv/bin/python"
```

```bash
# 从线上 sitemap 提交前 5 个 URL（推荐先小范围测试）
$GSCPY scripts/gsc_indexing.py --credentials .seo/credentials.json --from-sitemap --limit 5

# 提交单个 URL
$GSCPY scripts/gsc_indexing.py --credentials .seo/credentials.json --url https://aniimodex.com/dex/001

# 从清单文件提交
$GSCPY scripts/gsc_indexing.py --credentials .seo/credentials.json --url-list urls.txt

# 先预览，不实际调用
$GSCPY scripts/gsc_indexing.py --credentials .seo/credentials.json --from-sitemap --dry-run
```

**注意**：
- Indexing API 默认每天约 200 次提交配额，注意 `--limit` 控制数量
- 用 `--dry-run` 先预览再真正提交
- 403 错误 = 服务账号未加入 GSC 资源；429 = 配额用尽

---

## 3. 提交到 Bing Webmaster

运行 `scripts/bing_submit.py`。需要已配置 Bing API Key。

```bash
# 从线上 sitemap 批量提交全部 URL
python3 scripts/bing_submit.py --credentials .seo/credentials.json --from-sitemap

# 提交单个 URL
python3 scripts/bing_submit.py --credentials .seo/credentials.json --url https://aniimodex.com/dex/001

# 先预览
python3 scripts/bing_submit.py --credentials .seo/credentials.json --from-sitemap --dry-run
```

**注意**：
- 单次批量最多 200 个 URL，脚本会自动分块
- 每天约 100 次抓取请求配额
- 401 = API key 无效；403 = 站点未在 Webmaster 验证

---

## 4. 凭据配置（首次使用必读）

凭据未配置时，运行提交脚本会提示缺少凭据。配置流程见 `references/credentials-setup.md`。

**快速配置**：
1. 按 `references/credentials-setup.md` 申请 GSC Service Account 和 Bing API Key
2. 复制 `assets/credentials.example.json` 为 `.seo/credentials.json`
3. 填入真实的 Service Account JSON 路径、邮箱、Bing API Key
4. 确认 `.seo/` 在 `.gitignore` 中（防止凭据泄漏）

**凭据文件结构**（`assets/credentials.example.json`）：
```json
{
  "gsc": {
    "service_account_json": "/绝对/路径/到/seo-indexer-xxxx.json",
    "service_account_email": "seo-indexer@project-id.iam.gserviceaccount.com"
  },
  "bing": {
    "api_key": "YOUR_BING_API_KEY",
    "site_url": "https://aniimodex.com"
  },
  "canonical_host": "https://aniimodex.com"
}
```

---

## 5. 常用命令速查

| 需求 | 命令 |
| --- | --- |
| 验证 sitemap 和 URL | `python3 scripts/check_sitemap.py --host https://aniimodex.com --check-all` |
| 提交前 10 个 URL 到 Google | `python3 scripts/gsc_indexing.py --credentials .seo/credentials.json --from-sitemap --limit 10` |
| 提交全部 URL 到 Bing | `python3 scripts/bing_submit.py --credentials .seo/credentials.json --from-sitemap` |
| 预览提交（不调用 API） | 两个脚本都支持 `--dry-run` |
| 提交单个新页面到两个平台 | 分别用 `--url https://aniimodex.com/新页面` 运行两个脚本 |

---

## Resources

### scripts/
- `check_sitemap.py` — sitemap 验证 + URL 可访问性检查（无凭据，零依赖）
- `gsc_indexing.py` — Google Indexing API 提交（需 GSC 凭据 + cryptography）
- `bing_submit.py` — Bing Webmaster API 提交（需 Bing 凭据，零依赖）
- `install_deps.sh` — 为 gsc_indexing.py 创建 .venv 并安装 cryptography

### requirements.txt
- 声明 gsc_indexing.py 的运行时依赖（仅 cryptography）

### references/
- `credentials-setup.md` — GSC / Bing 凭据申请步骤与常见问题
- `api-reference.md` — 两个平台的 API 端点、认证、错误码参考

### assets/
- `credentials.example.json` — 凭据配置文件模板
