# AniimoDex

> AniimoDex - Your Aniimo Companion · 一站式 Aniimo 图鉴与工具站

基于 **Next.js 14（App Router）+ TypeScript + Tailwind CSS** 构建的静态站点，提供 Aniimo 精灵图鉴、Twine 能力反查、元素克制矩阵、捕获条件估算等实用工具。

![Node](https://img.shields.io/badge/node-%3E%3D18-blue) ![Next.js](https://img.shields.io/badge/next-14-black) ![TypeScript](https://img.shields.io/badge/typescript-5-blue)

## 功能特性

- 📖 **图鉴库**：浏览全部 Aniimo 精灵详情（基础属性、进化路线、Twine 能力、出现条件、形态、潜力分布、相关推荐）
- 🔗 **Twine 能力反查器**：按机动能力（飞行/游泳/遁地/攀岩/冲撞）反查伊莫，支持多选与 URL 同步
- ⚔ **元素克制矩阵**：9×9 元素相克倍率表，交互式高亮
- 📡 **捕获条件工具**：根据等级、陷阱、BREAK、时段估算捕获率并给出策略
- 🔎 全局搜索、响应式移动端布局

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | Next.js 14（App Router） |
| 语言 | TypeScript |
| 样式 | Tailwind CSS |
| 包管理 | pnpm |
| 代码规范 | ESLint + Prettier |
| 部署 | Cloudflare Pages（静态导出） |

## 本地开发

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器（默认 http://localhost:3000）
pnpm dev

# 3. 代码检查
pnpm lint

# 4. 格式化
pnpm format
```

> 提示：`next.config.js` 配置了 `output: 'export'`（纯静态导出）。本地 `pnpm dev` 正常开发；`pnpm build` 会输出静态文件到 `out/` 目录。

### 环境变量

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 站点正式域名，用于 sitemap / canonical / Open Graph | `https://aniimodex.com` |

## 构建与静态预览

```bash
# 构建静态产物（输出到 out/）
pnpm build

# 本地预览静态产物（等价于 Cloudflare Pages 的服务方式）
pnpm pages:dev

# 或
pnpm pages:build   # 同 pnpm build
```

## 部署到 Cloudflare Pages（连接 GitHub）

本项目为**纯静态导出**（`output: 'export'`），无需 wrangler / Worker，可直接由 Cloudflare Pages 托管 `out/` 目录。

### 方式一：通过 GitHub 自动部署（推荐）

1. **推送代码到 GitHub**：将项目推送到一个 GitHub 仓库（如 `username/aniimodex`）。
2. **创建 Pages 项目**：
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → **Create application** → **Pages**。
   - 选择 **Connect to Git**。
   - 授权 Cloudflare 访问 GitHub，选择 `aniimodex` 仓库。
3. **配置构建设置**：

   | 配置项 | 值 |
   | --- | --- |
   | 生产分支 | `main`（或你的主分支） |
   | 框架预设 | **Next.js (Static HTML Export)** |
   | 构建命令 | `pnpm build`（页面会提示是否覆盖，可确认使用） |
   | 构建输出目录 | `out` |
   | 安装命令 | `pnpm install` |

   > 若 Cloudflare 预设未自动识别，请手动填入：构建命令 `pnpm build`，输出目录 `out`。
4. 点击 **Save and Deploy**，等待首次构建完成。
5. 构建成功后，Cloudflare 会分配一个 `*.pages.dev` 域名（如 `aniimodex.pages.dev`）。

### 方式二：通过 Wrangler CLI / 直接上传

```bash
# 构建
pnpm build

# 方式 A：上传 out/ 目录（需安装 wrangler）
npx wrangler pages deploy out --project-name=aniimodex

# 方式 B：Wrangler 本地预览
npx wrangler pages dev out
```

### 自定义域名（可选）

- 在 Pages 项目 → **Custom domains** → **Set up a custom domain**，绑定你的域名。
- 绑定后，在 `package.json` / 环境变量中配置正式域名：
  - Dashboard → 项目 → **Settings** → **Environment variables** → 添加 `NEXT_PUBLIC_SITE_URL = https://你的域名`
  - 保存后 **Re-deploy**，使 sitemap / canonical 使用正式域名。

### 注意事项

- **纯静态站点**：所有页面在构建时预渲染，无服务端运行时；动态功能（反查、捕获计算）均为客户端实现。
- **安全头**：`public/_headers` 已配置基础安全头（X-Frame-Options、nosniff、Referrer-Policy 等）。
- **重定向**：`public/_redirects` 处理旧路由迁移（如 `/twine` → `/tools/twine`）及 trailing slash 规则。
- **图鉴 URL**：因配置了 `trailingSlash: true`，详情页路径为 `/dex/001/`，sitemap 中会正确生成。

## 项目结构

```
├── app/                 # 路由与页面（App Router）
│   ├── dex/             # 图鉴列表 + [number] 详情页
│   ├── tools/           # 工具中心（twine / type-chart / catch）
│   ├── guide/           # 攻略页
│   ├── layout.tsx       # 全局布局 + metadata
│   ├── page.tsx         # 首页（含 JSON-LD）
│   ├── sitemap.ts       # 动态 sitemap
│   └── robots.ts        # robots.txt
├── components/          # 通用组件（Header/Footer/ui/*）
├── data/                # Aniimo 种子数据
├── lib/                 # 工具函数（aniimo / aniimo-ui / utils）
├── types/               # TypeScript 类型定义
├── public/              # 静态资源（og-image、_headers、_redirects）
├── next.config.js       # output: 'export' 静态导出配置
└── package.json
```

## License

仅用于学习与展示，Aniimo 相关数据版权归原作者所有。
