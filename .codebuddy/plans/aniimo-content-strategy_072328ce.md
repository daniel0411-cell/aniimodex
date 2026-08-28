---
name: aniimo-content-strategy
overview: 基于美国市场 Aniimo 关键词数据分析，制定网站的 SEO 内容规划：优先承接「发布信息、游戏介绍、百科/图鉴」等高需求低竞争词，并设计配套的多语言攻略内容与落地页结构。
design:
  architecture:
    framework: react
  styleKeywords:
    - Ink-dark modern
    - Consistent with existing site
    - Clean editorial typography
    - Card-based grid
  fontSystem:
    fontFamily: PingFang SC
    heading:
      size: 28px
      weight: 700
    subheading:
      size: 18px
      weight: 600
    body:
      size: 16px
      weight: 400
  colorSystem:
    primary:
      - "#0EA5E9"
      - "#38BDF8"
      - "#0284C7"
    background:
      - "#0B1220"
      - "#0F172A"
      - "#1E293B"
    text:
      - "#E2E8F0"
      - "#94A3B8"
      - "#FFFFFF"
    functional:
      - "#22C55E"
      - "#EF4444"
      - "#F59E0B"
      - "#3B82F6"
todos:
  - id: content-data-layer
    content: 新建 data/guides.ts 文章元数据源，并在 types 中定义 GuidePost 结构（slug/标题key/标签/元素/日期）
    status: completed
  - id: dex-content-enhance
    content: 为 data/aniimos.ts 的 20 只伊莫补充英文 flavorText 描述与 shiny 形态字段，同步更新 types/aniimo.ts
    status: completed
  - id: guide-list-rework
    content: 改造 guide/page.tsx 从 data/guides.ts 动态渲染文章卡片列表，复用 Card/Badge，保留面包屑与相关工具
    status: completed
    dependencies:
      - content-data-layer
  - id: article-detail-page
    content: 新增 guide/[slug]/page.tsx 静态文章详情页，含 generateStaticParams、generateMetadata、JSON-LD 与面包屑
    status: completed
    dependencies:
      - content-data-layer
  - id: localize-content
    content: 为 en/zh-Hant/zh-Hans 三个 messages 文件新增 guide-posts 各文章正文与新增字段文案，保证 i18n 完整
    status: completed
    dependencies:
      - content-data-layer
      - dex-content-enhance
  - id: seo-indexing-submit
    content: 使用 [skill:seo-indexing] 验证新增 URL 可访问性并提交 GSC/Bing 收录
    status: completed
    dependencies:
      - guide-list-rework
      - article-detail-page
      - localize-content
---

## 用户需求

基于关键词数据文件（`aniimo_all-keywords_us_2026-08-28.csv`，美国市场 5 万关键词），为已基本完成的 aniimodex.com 网站制定「接下来内容怎么做」的优先级规划，并落地第一批高价值内容页面，以承接真实搜索流量、抢占先发优势。

## 数据结论（规划依据）

1. Aniimo 处于**发布前预热期**：最大机会词是发布类（`aniimo release date` 4400/KD35、`when is aniimo coming out` 170、`will aniimo go to ps5` 480）。
2. 高相关意图分布（总搜索量）：发布/上线 ~5000、平台/终端 ~1030、社区/百科 ~310、Beta ~270、Gacha ~250、下载 ~240、游戏介绍 ~70、攻略/玩法 ~60。
3. 信息内容类高价值词：`aniimo dex`(50/KD27)、`what is aniimo`(40/KD33)、`aniimo wiki`(140/KD26)、`aniimo review`(30)、`aniimo system requirements`(30)、`aniimo shiny`(20)、`aniimo how to play`(20)、`aniimo map`(50)。
4. 玩法长尾词（进化/克制/捕捉）尚未形成规模——存在**先发优势窗口**，可提前布局内容占位。
5. 中相关词绝大多数为无关游戏噪音（nier/audino/monoco 等），**不应作为内容依据**。

## 产品定位

把 aniimodex.com 从「纯工具站」升级为「**Aniimo 一站式信息 + 工具 + 指南**」内容站，形成「信息页（承接搜索入口）→ 工具页（功能承接）→ 指南文章（深度留存）」的流量闭环。

## 核心功能（第一批落地）

- **游戏信息页**（/guide/game-info）：承接发布日、平台、系统需求、是否 gacha、是否 AI 等问答类关键词。
- **新手指南文章**（/guide/getting-started）：承接 `how to play`、`what is aniimo`，串联 dex/tools。
- **指南中心改造**：guide 从单页改为「列表 + 多文章路由」，支持后续持续扩充内容。
- **图鉴内容增强**：为 20 只伊莫补全英文介绍内容与 Shiny 形态标注，承接 `aniimo dex`、`aniimo shiny`。
- **SEO 基建复用**：所有新页面自动进入多语言 sitemap、hreflang、JSON-LD，复用现有 `_redirects` 与元数据模式。

## 技术栈

沿用现有栈，不引入新框架：

- Next.js 14 App Router + TypeScript + Tailwind CSS + next-intl v4（多语言）
- 纯静态导出（`output: 'export'`）部署 Cloudflare Pages
- 数据层复用 `data/aniimos.ts`，UI 复用 `components/ui/*`

## 实施策略

核心是把 guide 从「单页占位」升级为「**指南中心 + 文章详情**」的静态内容体系，与现有 dex/tools 形成内容矩阵，所有新内容自动接入既有 i18n + SEO 基建。

### 架构设计（架构图）

```mermaid
graph LR
  A[关键词数据] --> B[内容规划: 信息页/指南/图鉴增强]
  B --> C[guide 指南中心]
  B --> D[data 数据层]
  B --> E[dex 图鉴详情]
  C --> F[文章详情页 /guide/[slug]]
  C --> G[文章列表页 /guide]
  D --> E
  F --> H[复用: sitemap/hreflang/JSON-LD/i18n]
  G --> H
  E --> H
```

### 关键设计决策

1. **guide 路由改造**：新增 `app/[locale]/guide/[slug]/page.tsx` 动态文章路由 + `generateStaticParams` 静态生成所有文章；`guide/page.tsx` 改造为文章列表（复用现有 Card/Badge 组件）。文章内容用**本地化结构化数据**（每语言一套），而非共享数据源——因为攻略是内容型，多语言文案需独立维护。
2. **内容组织**：新增 `data/guides.ts` 存文章元数据（slug、标题、标签、element、发布日期），正文通过 `messages/{locale}/guide-posts.json` 按语言存放，保证 i18n 完整。
3. **文章类型划分**（首批 3-4 篇，覆盖最高搜索意图）：

- 游戏信息总览（release/平台/系统需求/gacha/AI 问答聚合）
- 新手入门 How to Play
- 元素克制进阶（承接 type-chart 工具）
- 图鉴使用与 Shiny 形态说明

4. **图鉴内容增强**：`data/aniimos.ts` 增加 `flavorText`（英文描述）与 `shiny`（是否有闪亮形态）字段，补充到详情页；新增一个 `guide/[slug]` 文章聚合展示「图鉴全览 + 闪亮形态获取」。
5. **SEO**：文章页 `generateMetadata` 复用 `lib/i18n-metadata.ts` 的 `localizedLanguages`，自动生成 hreflang + canonical + JSON-LD（Article/BreadcrumbList）；sitemap 因数据驱动会自动纳入新 URL，无需手改。
6. **性能**：纯静态生成，每文章按语言独立预渲染，无运行时开销；`data/guides.ts` 元数据轻量，避免重复遍历。

### 实施注意

- 文章正文为内容型，**需为 en/zh-Hant/zh-Hans 三语言各写一套**（可先英文完整、中英占位缩略），严格对齐 `guide` 现有 i18n 模式。
- 新增 messages key 时同步更新三个语言文件，防止 build 报错。
- 保持 `guide/page.tsx` 的 Breadcrumb/JSON-LD/relatedLinks 结构，仅把硬编码文章数组替换为 `data/guides.ts` 数据源。
- 不改动 dex 与 tools 现有逻辑，仅做增量字段补充，控制改动爆炸半径。

## 目录结构

```
project-root/
├── app/[locale]/guide/
│   ├── page.tsx                      # [MODIFY] 指南列表：改为从 data/guides.ts 读取文章卡片，复用 Card/Badge
│   └── [slug]/page.tsx               # [NEW] 文章详情页：generateStaticParams 静态生成，含 generateMetadata + JSON-LD + 面包屑
├── data/
│   └── guides.ts                     # [NEW] 文章元数据（slug/标题/标签/element/日期），本地化 key 指向 messages
├── messages/
│   ├── en.json                       # [MODIFY] 新增 guide-posts 各文章正文文案
│   ├── zh-Hant.json                  # [MODIFY] 繁体对应文案
│   └── zh-Hans.json                  # [MODIFY] 简体对应文案
├── data/
│   └── aniimos.ts                    # [MODIFY] 为 20 只伊莫补充 flavorText（英文描述）+ shiny 形态字段
├── types/
│   └── aniimo.ts                     # [MODIFY] AniimoEntry 增加 flavorText/shiny 可选字段
└── lib/
    └── aniimo.ts                     # [MODIFY]（如需）暴露新增字段的访问辅助
```

## 设计风格

本任务以内容新增为主，延续网站现有深色「墨水风」设计体系（ink-bg / ink-card / ink-border / primary 高亮），不改变整体视觉语言。新增内容遵循现有 Card、Badge、Breadcrumb、网格布局模式，保证一致性。

### 指南中心列表页（guide/page.tsx）

- 沿用现有「标题 + 副标题 header」结构，下方为 `sm:grid-cols-2 lg:grid-cols-3` 响应式文章卡片网格。
- 每张文章卡片：顶部 Badge（标签 + 元素），中间标题，底部发布日期与预估阅读时长，hover 时标题变 primary 高亮 + 轻微上浮。
- 保留「相关工具」区块，串联 dex/twine/type-chart/catch。

### 文章详情页（guide/[slug]/page.tsx）

- 顶部面包屑（Home > Guide > 文章标题）。
- 文章头：h1 标题 + 副标题（英文引言）+ 元信息行（标签 Badge、元素 Badge、发布日期、阅读时长）。
- 正文区块：`prose` 风格排版，标题层级 h2/h3、要点列表、表格（用于系统需求/平台对照）、引用块，配 primary 高亮链接到 dex/tools。
- 文末「相关工具与文章」推荐区，增强站内互链与留存。

### 交互

- 文章卡片 hover 上浮 + 标题变色；详情页代码块/表格响应式横向滚动。
- 所有新页面保留 light/dark 兼容，复用现有 Tailwind token。

## Agent Extensions

### Skill

- **seo-indexing**
- Purpose: 内容上线并提交到 GitHub/Cloudflare 部署后，重新运行 sitemap 验证与 GSC/Bing 提交，确保新内容页被搜索引擎收录。
- Expected outcome: 新文章/信息页 URL 全部可访问（无 404/500），GSC Indexing API 提交成功，Bing 在配额内完成提交，返回收录报告。