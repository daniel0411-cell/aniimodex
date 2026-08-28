# 凭据申请指引（GSC & Bing Webmaster）

本 skill 的「真自动提交」依赖两个平台的 API 凭据。**未配置凭据前**，本 skill 仍可执行 sitemap 验证、URL 可访问性检查和生成提交清单等无凭据功能。

---

## 一、Google Search Console (GSC) Indexing API 凭据

### 前置条件
1. 拥有并已验证域名的 **Google Search Console** 资源
2. 一个 **Google Cloud 项目**（可在 console.cloud.google.com 免费创建）

### 申请步骤（约 15 分钟）

**Step 1：创建/选择 Google Cloud 项目**
1. 打开 <https://console.cloud.google.com>
2. 点击顶部项目下拉 →「新建项目」→ 命名（如 `aniimodex-seo`）→ 创建

**Step 2：启用 Indexing API**
1. 进入该项目 → 左侧「API 和服务」→「启用 API 和服务」
2. 搜索 **Indexing API**（`indexing.googleapis.com`）→ 点击「启用」
3. ⚠️ 记下**配额**：Indexing API 每天约 200 次 URL 提交（普通网站足够）

**Step 3：创建 Service Account**
1. 左侧「API 和服务」→「凭据」→「创建凭据」→「服务账号」
2. 命名（如 `seo-indexer`）→ 创建并继续 → 完成
3. 在服务账号列表点击刚创建的账号 →「密钥」→「添加密钥」→「创建新密钥」→ 选 **JSON**
4. 浏览器会下载一个 JSON 文件（如 `seo-indexer-xxxx.json`）——**妥善保管，勿提交到仓库**

**Step 4：将 Service Account 添加到 GSC 资源**
1. 打开 <https://search.google.com/search-console>
2. 进入你的属性（如 `https://aniimodex.com`）→「设置」→「用户和权限」→「添加用户」
3. 输入 Service Account 的**邮箱地址**（形如 `seo-indexer@project-id.iam.gserviceaccount.com`）
4. 权限选 **「完整」**（或至少「网页内容」+「其他权限」）
   - ⚠️ Indexing API 推送需要该服务账号对资源有访问权限

**Step 5：记录 Service Account 邮箱**
- 在 Google Cloud「凭据」→ 服务账号详情中，复制邮箱地址，填入本 skill 的凭据配置文件

### 完成后获得
- `credentials.json`（Service Account 密钥，JSON 文件）
- `service_account_email`（形如 `xxx@yyy.iam.gserviceaccount.com`）

---

## 二、Bing Webmaster API 凭据

### 前置条件
- 一个 **Bing Webmaster Tools** 账号（可自动同步 GSC 数据）
- 已验证站点

### 申请步骤（约 5 分钟）

**Step 1：注册并导入站点**
1. 打开 <https://www.bing.com/webmasters>
2. 用 Microsoft 账号登录
3. 添加站点：选「从 Google Search Console 导入」或「手动添加」
4. 验证所有权（DNS 记录 / HTML 标记 / 文件上传）

**Step 2：获取 API Key**
1. 登录 Bing Webmaster Tools → 左侧「设置」（齿轮图标）→「API 访问」
2. 在「API 密钥」部分点击「获取 API 密钥」
3. 复制生成的 **API Key** 字符串，填入本 skill 的凭据配置文件

**Step 3：确认站点 ID**
- API Key 是账户级的；调用提交接口时需提供**站点 URL**（如 `https://aniimodex.com`）

### 完成后获得
- `bing_api_key`（一段长字符串）
- `site_url`（如 `https://aniimodex.com`）

---

## 三、配置文件的存放位置

本 skill 读取凭据的默认路径为项目的 **`.seo/credentials.json`**（已被 `.gitignore` 建议排除）。

### 凭据文件格式（`assets/credentials.example.json` 为模板）

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

### 安全提醒
- ⚠️ **切勿**将 `credentials.json` 或 Service Account JSON 提交到 git
- 建议在项目 `.gitignore` 中加入：
  ```
  .seo/
  *.iam.gserviceaccount.com.json
  ```

---

## 四、常见问题（FAQ）

**Q：Indexing API 配额是多少？**
普通项目每天约 **200 次** URL 提交，且对内容更新频繁的 URL 优先。足以覆盖日常新页面收录。

**Q：Indexing API 只支持"网页"内容，不支持其它？**
是的，Indexing API 适合公开可访问的网页 URL。它**不是**索引提交的通用通道，用于加速新页面/更新的收录。

**Q：Bing 的 API 提交和 sitemap 提交区别？**
- **API 提交**（本 skill）：逐个/批量推送 URL，即时触发抓取
- **sitemap 提交**：周期性告知搜索引擎站点结构，抓取较慢

**Q：Bing 的 URL 提交量限制？**
每个 API key 每天可提交约 **100 次** URL 抓取请求（按账户配额）。

**Q：Google 会不会因为 API 提交而处罚？**
不会，Indexing API 是 Google 官方的受支持通道。但只应提交**真实存在、内容有更新**的 URL，不要滥用。

**Q：为什么提交了还没收录？**
收录取决于 Google/Bing 的抓取队列，API 提交只是**请求**抓取，不保证立即收录。通常新页面在数小时到数天内收录。
