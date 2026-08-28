# 收录 API 参考（Google & Bing）

本文件提供 GSC Indexing API 与 Bing Webmaster API 的技术参考，供脚本实现和排错时使用。

---

## 一、Google Indexing API

### 端点
- **基础地址**：`https://indexing.googleapis.com/v3/`
- **获取访问令牌**：通过 Service Account 的 OAuth2 JWT 换取
  - OAuth2 Token 端点：`https://oauth2.googleapis.com/token`
  - Scope：`https://www.googleapis.com/auth/indexing`

### 认证方式（Service Account JWT）
需构造一个 JWT，用 Service Account 私钥签名，换取 access_token：
- Header：`{"alg":"RS256","typ":"JWT"}`
- Claims：
  ```json
  {
    "iss": "<service_account_email>",
    "scope": "https://www.googleapis.com/auth/indexing",
    "aud": "https://oauth2.googleapis.com/token",
    "iat": <当前unix时间戳>,
    "exp": <当前unix时间戳 + 3600>
  }
  ```

### 提交 URL（推荐用于新页面/更新）
```
POST https://indexing.googleapis.com/v3/urlNotifications:publish
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "url": "https://aniimodex.com/dex/001",
  "type": "URL_UPDATED"
}
```
- `type` 可选：`URL_UPDATED`（内容更新）、`URL_DELETED`（移除）
- 响应成功返回 `{ "urlNotificationMetadata": {...}, "url": "...", "type": "URL_UPDATED" }`

### 批量处理说明
Indexing API **不支持**批量数组提交，需逐条调用 `urlNotifications:publish`。脚本会串行/并发逐个推送。

### 常用错误码
| 状态码 | 含义 | 处理 |
| --- | --- | --- |
| 200 | 成功 | 已加入抓取队列 |
| 403 | 权限不足 | 服务账号未加入 GSC 资源，或 scope 错误 |
| 429 | 配额用尽 | 等待次日或降低频率 |
| 500 | 服务器错误 | 重试 |

---

## 二、Bing Webmaster API

### 端点
- **提交 URL 抓取**：
  ```
  POST https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl
  ```
  请求体：`{"siteUrl": "https://aniimodex.com", "url": "https://aniimodex.com/dex/001"}`
  Header：`Ocp-Apim-Subscription-Key: <API_KEY>`

- **批量提交 URL**（推荐用于整份 sitemap）：
  ```
  POST https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch
  ```
  请求体：
  ```json
  {
    "siteUrl": "https://aniimodex.com",
    "urlList": ["https://aniimodex.com/dex/001", "https://aniimodex.com/dex/002"]
  }
  ```
  Header：`Ocp-Apim-Subscription-Key: <API_KEY>`
  ⚠️ 单次最多 **200 个 URL**；每天总额度约 **100 次**抓取请求

- **重新索引**：`POST .../json/RecrawlSite`（整站重抓，慎用，消耗配额）

### 常用错误码
| 状态码 | 含义 | 处理 |
| --- | --- | --- |
| 200/201 | 成功 | 已加入抓取队列 |
| 401 | API key 无效 | 检查 key 或重新生成 |
| 403 | 站点未验证 / 非 owner | 在 Webmaster 添加站点 |
| 429 | 配额用尽 | 次日再试 |
| 500 | 服务器错误 | 重试 |

---

## 三、sitemap 验证（无凭据，供所有脚本共用）

### 抓取并解析 sitemap
- GET 站点根地址 `/sitemap.xml`
- 解析 `<loc>` 标签提取所有 URL
- 对比 robots.txt 中的 Sitemap 声明是否一致

### 单 URL 可访问性检查
- GET 每个 URL，关注 HTTP 状态码
- 期望：200（正常）；关注 3xx（需确认重定向）、404/500（异常）
