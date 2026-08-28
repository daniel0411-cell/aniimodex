import type { GuidePost } from '@/types/guide';

/**
 * 攻略文章元数据源。
 * 正文与标题等文案存放在 messages/guide.posts[slug]（按语言各一套）。
 * 在此仅声明 slug、元素、日期、阅读时长与互链关系。
 */
export const guidePosts: GuidePost[] = [
  {
    slug: 'game-info',
    element: '暗',
    date: '2026-08-28',
    readMinutes: 5,
    relatedToolHrefs: ['/dex', '/tools/catch'],
    relatedSlugs: ['getting-started'],
    image: '/images/guides/game-info.jpg',
    imageAlt: 'Aniimo open world landscape with floating islands and elemental creatures',
    published: false,
  },
  {
    slug: 'getting-started',
    element: '风',
    date: '2026-08-28',
    readMinutes: 7,
    relatedToolHrefs: ['/dex', '/tools/twine', '/tools/catch'],
    relatedSlugs: ['element-types'],
    image: '/images/guides/getting-started.jpg',
    imageAlt: 'A young trainer with a flame-bird companion starting their adventure',
  },
  {
    slug: 'element-types',
    element: '雷',
    date: '2026-08-28',
    readMinutes: 6,
    relatedToolHrefs: ['/tools/type-chart', '/tools/twine'],
    relatedSlugs: ['getting-started', 'dex-and-shiny'],
    image: '/images/guides/element-types.jpg',
    imageAlt: 'Elemental creatures clashing with glowing element symbol orbs',
  },
  {
    slug: 'dex-and-shiny',
    element: '光',
    date: '2026-08-28',
    readMinutes: 4,
    relatedToolHrefs: ['/dex'],
    relatedSlugs: ['game-info'],
    image: '/images/guides/dex-and-shiny.jpg',
    imageAlt: 'A trainer holding a dex device beside a rare shiny creature',
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

export function getPublishedGuidePosts(): GuidePost[] {
  return guidePosts.filter((post) => post.published !== false);
}
