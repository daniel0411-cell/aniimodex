# AniimoDex

> AniimoDex - Your Aniimo Companion · 一站式 Aniimo 图鉴与工具站

基于 **Next.js 14（App Router）+ TypeScript + Tailwind CSS + next-intl** 构建的**多语言**静态站点，提供 Aniimo 精灵图鉴、Twine 能力反查、元素克制矩阵、捕获条件估算等实用工具。

![Node](https://img.shields.io/badge/node-%3E%3D18-blue) ![Next.js](https://img.shields.io/badge/next-14-black) ![TypeScript](https://img.shields.io/badge/typescript-5-blue) ![next-intl](https://img.shields.io/badge/next--intl-4-blue)

## 功能特性

- 🌐 **多语言**：支持英文（en）、简体中文（zh-Hans）、繁体中文（zh-Hant），含语言切换器与 hreflang 多语言 SEO
- 📖 **图鉴库**：浏览全部 Aniimo 精灵详情（基础属性、进化路线、Twine 能力、出现条件、形态、潜力分布、相关推荐）
- 🔗 **Twine 能力反查器**：按机动能力（飞行/游泳/遁地/攀岩/冲撞）反查伊莫，支持多选
- ⚔ **元素克制矩阵**：9×9 元素相克倍率表，交互式高亮
- 📡 **捕获条件工具**：根据等级、陷阱、BREAK、时段估算捕获率并给出策略
- 🔎 全局搜索、响应式移动端布局

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | Next.js 14（App Router） |
| 语言 | TypeScript |
| 国际化 | next-intl v4（App Router） |
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

> 提示：`next.config.mjs` 配置了 `output: 'export'`（纯静态导出）并通过 `createNextIntlPlugin` 开启多语言。本地 `pnpm dev` 正常开发；`pnpm build` 会输出静态文件到 `out/` 目录。

> 多语言下访问带语言前缀的路径，如 `http://localhost:3000/en`、`http://localhost:3000/zh-Hans`。根路径 `/` 会 308 重定向到默认语言 `/en/`。

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
- **重定向**：`public/_redirects` 处理根路径重定向到默认语言、旧路由迁移（如 `/twine` → `/en/tools/twine`）及 trailing slash 规则。
- **图鉴 URL**：因配置了 `trailingSlash: true`，详情页路径为 `/en/dex/001/`，sitemap 中会正确生成。

## 多语言架构（i18n）

本项目使用 **next-intl v4** 实现多语言，`localePrefix: 'always'`（所有路径带语言前缀）。

### 支持的语言

| Locale | 语言 | 示例路径 |
| --- | --- | --- |
| `en` | 英文（默认） | `/en/dex/` |
| `zh-Hant` | 繁体中文 | `/zh-Hant/dex/` |
| `zh-Hans` | 简体中文 | `/zh-Hans/dex/` |

### 核心文件

- `src/i18n/routing.ts` — `defineRouting` 定义语言列表、默认语言与 `localePrefix`
- `src/i18n/navigation.ts` — `createNavigation` 导出的 `Link` / `useRouter` / `usePathname` / `redirect`（自动携带语言前缀）
- `src/i18n/request.ts` — `getRequestConfig` 按请求语言动态加载 `messages/{locale}.json`，无效语言回退默认语言
- `src/middleware.ts` — 请求层语言路由中间件（静态导出下由 `_redirects` 兜底）
- `messages/{en,zh-Hant,zh-Hans}.json` — 全部 UI 字符串（导航、按钮、筛选器、元素/角色/Twine 名称等）
- `app/[locale]/` — 所有页面迁移至该动态段，layout 通过 `setRequestLocale` + `generateStaticParams` 实现静态渲染

### 使用方式

```tsx
// 服务端组件：异步获取翻译
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('dex');
t('title');

// 客户端组件：Hook 获取翻译
import { useTranslations } from 'next-intl';
const t = useTranslations('dex');
t('title');

// 带语言前缀的链接（自动处理 locale）
import { Link } from '@/i18n/navigation';
<Link href="/dex">图鉴</Link>;
```

### 内容本地化说明

- **UI 框架字符串**（导航、按钮、表单、筛选器等）已完整 i18n。
- **数据层伊莫名称**（`data/aniimos.ts` 的 `name` / `enName`）暂保持原样，后续可做名称本地化映射。
- **攻略文章标题与正文**为内容型，多语言为后续工作，当前保留简体占位。

## 项目结构

```
├── app/                        # 路由与页面（App Router）
│   ├── [locale]/               # 多语言动态段
│   │   ├── dex/                # 图鉴列表 + [number] 详情页
│   │   ├── tools/              # 工具中心（twine / type-chart / catch）
│   │   ├── guide/              # 攻略页
│   │   ├── layout.tsx          # [locale] 布局（html/body + Provider + setRequestLocale）
│   │   ├── page.tsx            # 首页（含 JSON-LD 与 generateMetadata）
│   │   └── not-found.tsx       # 404 页
│   ├── layout.tsx              # 根布局（passthrough）
│   ├── page.tsx                # 根路径 → 重定向默认语言
│   ├── sitemap.ts              # 多语言 sitemap（含 hreflang）
│   └── robots.ts               # robots.txt
├── src/i18n/                   # next-intl 配置
│   ├── routing.ts              # defineRouting（语言/默认/前缀）
│   ├── navigation.ts           # Link / useRouter / usePathname / redirect
│   ├── request.ts              # getRequestConfig（按语言加载 messages）
│   └── middleware.ts           # 语言路由中间件
├── messages/                   # 多语言文案（en / zh-Hant / zh-Hans）
├── components/                 # 通用组件（Header/Footer/LocaleSwitcher/ui/*）
├── data/                       # Aniimo 种子数据
├── lib/                        # 工具函数（aniimo / aniimo-ui / i18n-metadata / utils）
├── types/                      # TypeScript 类型定义
├── public/                     # 静态资源（og-image、_headers、_redirects）
├── next.config.mjs             # output: 'export' + next-intl 插件
└── package.json
```

## License

仅用于学习与展示，Aniimo 相关数据版权归原作者所有。
