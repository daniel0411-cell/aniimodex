import type { GuidePost } from '@/types/guide';

/**
 * 攻略文章元数据源。
 * 正文与标题等文案存放在 messages/guide.posts[slug]（按语言各一套）。
 * 在此仅声明 slug、元素、日期、阅读时长与互链关系。
 */
export const guidePosts: GuidePost[] = [
  {
    slug: 'game-info',
    titleKey: 'game-info.title',
    subtitleKey: 'game-info.subtitle',
    tagKey: 'game-info.tag',
    element: '暗',
    date: '2026-08-28',
    readMinutes: 5,
    relatedToolHrefs: ['/dex', '/tools/catch'],
    relatedSlugs: ['getting-started'],
  },
  {
    slug: 'getting-started',
    titleKey: 'getting-started.title',
    subtitleKey: 'getting-started.subtitle',
    tagKey: 'getting-started.tag',
    element: '风',
    date: '2026-08-28',
    readMinutes: 7,
    relatedToolHrefs: ['/dex', '/tools/twine', '/tools/catch'],
    relatedSlugs: ['element-types'],
  },
  {
    slug: 'element-types',
    titleKey: 'element-types.title',
    subtitleKey: 'element-types.subtitle',
    tagKey: 'element-types.tag',
    element: '雷',
    date: '2026-08-28',
    readMinutes: 6,
    relatedToolHrefs: ['/tools/type-chart', '/tools/twine'],
    relatedSlugs: ['getting-started', 'dex-and-shiny'],
  },
  {
    slug: 'dex-and-shiny',
    titleKey: 'dex-and-shiny.title',
    subtitleKey: 'dex-and-shiny.subtitle',
    tagKey: 'dex-and-shiny.tag',
    element: '光',
    date: '2026-08-28',
    readMinutes: 4,
    relatedToolHrefs: ['/dex'],
    relatedSlugs: ['game-info'],
  },
];

/** 按 slug 查找文章元数据 */
export function getGuidePost(slug: string): GuidePost | undefined {
  return guidePosts.find((p) => p.slug === slug);
}

/** 全部文章 slug（供 generateStaticParams 使用） */
export function getAllGuideSlugs(): string[] {
  return guidePosts.map((p) => p.slug);
}
