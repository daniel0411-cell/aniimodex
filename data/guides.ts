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
    published: false,
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
    published: false,
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
    published: false,
  },
  {
    slug: 'aniimo-release-date',
    date: '2026-08-29',
    readMinutes: 4,
    relatedSlugs: ['what-is-aniimo', 'aniimo-platforms'],
    sourceIds: ['aniimo-playstation-10018491', 'aniimo-steam-4126040'],
  },
  {
    slug: 'aniimo-platforms',
    date: '2026-08-29',
    readMinutes: 5,
    relatedSlugs: ['aniimo-release-date', 'aniimo-crossplay-cross-save'],
    sourceIds: [
      'aniimo-official-home-2026-08-28',
      'aniimo-steam-4126040',
      'aniimo-playstation-10018491',
      'aniimo-xbox-9pk8phlcqdf6',
    ],
  },
  {
    slug: 'what-is-aniimo',
    date: '2026-08-29',
    readMinutes: 6,
    relatedToolHrefs: ['/dex'],
    relatedSlugs: ['aniimo-release-date', 'aniimo-platforms'],
    sourceIds: [
      'aniimo-official-home-2026-08-28',
      'aniimo-playstation-10018491',
      'aniimo-xbox-9pk8phlcqdf6',
    ],
  },
  {
    slug: 'is-aniimo-free-to-play',
    date: '2026-08-30',
    readMinutes: 4,
    relatedSlugs: ['aniimo-release-date', 'how-to-download-aniimo'],
    sourceIds: ['aniimo-steam-4126040', 'aniimo-playstation-10018491', 'aniimo-xbox-9pk8phlcqdf6'],
  },
  {
    slug: 'how-to-download-aniimo',
    date: '2026-08-30',
    readMinutes: 5,
    relatedSlugs: ['aniimo-platforms', 'aniimo-pre-registration'],
    sourceIds: ['aniimo-official-home-2026-08-28', 'aniimo-steam-4126040', 'aniimo-playstation-10018491', 'aniimo-xbox-9pk8phlcqdf6'],
  },
  {
    slug: 'aniimo-mobile',
    date: '2026-08-30',
    readMinutes: 4,
    relatedSlugs: ['aniimo-platforms', 'aniimo-release-date'],
    sourceIds: ['aniimo-official-home-2026-08-28'],
  },
  {
    slug: 'aniimo-nintendo-switch',
    date: '2026-08-30',
    readMinutes: 3,
    relatedSlugs: ['aniimo-platforms', 'aniimo-release-date'],
    sourceIds: ['aniimo-official-home-2026-08-28'],
  },
  {
    slug: 'aniimo-twine-explained',
    date: '2026-08-30',
    readMinutes: 5,
    relatedToolHrefs: ['/tools/twine'],
    relatedSlugs: ['what-is-aniimo', 'aniimo-catching-guide'],
    sourceIds: ['aniimo-official-home-2026-08-28', 'aniimo-playstation-10018491'],
  },
  {
    slug: 'aniimo-catching-guide',
    date: '2026-08-30',
    readMinutes: 5,
    relatedSlugs: ['aniimo-twine-explained', 'what-is-aniimo'],
    sourceIds: ['aniimo-playstation-10018491'],
  },
  {
    slug: 'aniimo-multiplayer',
    date: '2026-08-30',
    readMinutes: 5,
    relatedSlugs: ['aniimo-crossplay-cross-save', 'aniimo-platforms'],
    sourceIds: ['aniimo-steam-4126040', 'aniimo-xbox-9pk8phlcqdf6'],
  },
  {
    slug: 'aniimo-pre-registration',
    date: '2026-08-30',
    readMinutes: 4,
    relatedSlugs: ['how-to-download-aniimo', 'aniimo-release-date'],
    sourceIds: ['aniimo-official-home-2026-08-28'],
  },
  {
    slug: 'aniimo-system-requirements',
    date: '2026-08-30',
    readMinutes: 4,
    relatedSlugs: ['aniimo-platforms', 'aniimo-crossplay-cross-save'],
    sourceIds: ['aniimo-steam-4126040', 'aniimo-xbox-9pk8phlcqdf6'],
  },
  {
    slug: 'official-aniimo-dex-status',
    date: '2026-08-30',
    readMinutes: 5,
    relatedToolHrefs: ['/dex'],
    relatedSlugs: ['what-is-aniimo', 'aniimo-twine-explained'],
    sourceIds: ['aniimo-official-wiki-index-2026-08-30'],
  },
  {
    slug: 'aniimo-launch-time-preload',
    date: '2026-08-30',
    readMinutes: 5,
    relatedSlugs: ['aniimo-release-date', 'how-to-download-aniimo'],
    sourceIds: ['aniimo-playstation-10018491', 'aniimo-steam-4126040'],
  },
  {
    slug: 'aniimo-crossplay-cross-save',
    date: '2026-08-30',
    readMinutes: 5,
    relatedSlugs: ['aniimo-multiplayer', 'aniimo-platforms', 'how-to-download-aniimo', 'aniimo-system-requirements'],
    sourceIds: ['aniimo-steam-4126040', 'aniimo-xbox-9pk8phlcqdf6'],
  },
  {
    slug: 'aniimo-language-controller-support',
    date: '2026-08-30',
    readMinutes: 5,
    relatedSlugs: ['aniimo-platforms', 'aniimo-system-requirements'],
    sourceIds: ['aniimo-steam-4126040', 'aniimo-playstation-10018491', 'aniimo-xbox-9pk8phlcqdf6'],
  },
  {
    slug: 'aniimo-launch-coverage-status',
    date: '2026-08-30',
    readMinutes: 6,
    relatedToolHrefs: ['/dex'],
    relatedSlugs: ['official-aniimo-dex-status', 'aniimo-launch-time-preload'],
    sourceIds: ['aniimo-official-home-2026-08-28', 'aniimo-official-wiki-index-2026-08-30'],
  },
  ...([['aniimo-elements-explained', 'elements'], ['aniimo-roles-explained', 'roles'], ['aniimo-evolution-system', 'evolution'], ['aniimo-mobility-abilities', 'mobility'], ['aniimo-habitats-locations', 'habitats']] as const).map(([slug, dataTopic]) => ({
    slug, dataTopic,
    date: '2026-08-31',
    readMinutes: 5,
    relatedToolHrefs: slug === 'aniimo-elements-explained' ? ['/dex', '/tools/type-chart'] : ['/dex'],
    relatedSlugs: ['official-aniimo-dex-status'],
    sourceIds: ['aniimo-official-wiki-index-2026-08-30'],
  })),
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
