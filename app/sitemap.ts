import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/routing';
import { getPublishedGuidePosts } from '@/data/guides';
import { getAllAniimos } from '@/lib/aniimo';
import { ELEMENTS } from '@/lib/aniimo-ui';

// 站点根地址：优先读环境变量，默认使用正式域名 aniimodex.com
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';
const LAST_PUBLISHED = '2026-09-05';

// output: 'export' 静态导出模式下，metadata route 需提供静态参数生成
export function generateStaticParams() {
  return [{ __metadata_id__: [] }];
}

// 只提交已核验且允许索引的入口页；工具和内容详情待数据来源确认后再加入。
const STATIC_ROUTES: {
  path: string;
  lastModified: string;
  priority: number;
  changefreq?: MetadataRoute.Sitemap[number]['changeFrequency'];
}[] = [
  { path: '/', lastModified: LAST_PUBLISHED, priority: 1.0, changefreq: 'weekly' },
  { path: '/dex/', lastModified: LAST_PUBLISHED, priority: 0.9, changefreq: 'weekly' },
  { path: '/tools/', lastModified: LAST_PUBLISHED, priority: 0.8, changefreq: 'monthly' },
  { path: '/guide/', lastModified: LAST_PUBLISHED, priority: 0.7, changefreq: 'monthly' },
  { path: '/evolutions/', lastModified: LAST_PUBLISHED, priority: 0.85, changefreq: 'weekly' },
  { path: '/locations/', lastModified: LAST_PUBLISHED, priority: 0.85, changefreq: 'weekly' },
  { path: '/abilities/', lastModified: LAST_PUBLISHED, priority: 0.8, changefreq: 'weekly' },
  { path: '/tools/type-chart/', lastModified: LAST_PUBLISHED, priority: 0.85, changefreq: 'weekly' },
];

// 为单个（无 locale 的）路径生成所有 locale 的 URL + hreflang alternates
function buildLocalizedUrls(
  path: string,
  lastModified: string,
  priority: number,
  changefreq: MetadataRoute.Sitemap[number]['changeFrequency']
): MetadataRoute.Sitemap {
  const fullPath = path === '/' ? '/' : path; // 路径本身带尾斜杠
  return locales.map((locale) => {
    const url = `${SITE_URL}/${locale}${fullPath}`;
    // 构建当前 URL 对应的 hreflang 语言版本（含 x-default → defaultLocale）
    const languages: Record<string, string> = {};
    locales.forEach((l) => {
      languages[l] = `${SITE_URL}/${l}${fullPath}`;
    });
    languages['x-default'] = `${SITE_URL}/${defaultLocale}${fullPath}`;

    return {
      url,
      lastModified,
      changeFrequency: changefreq,
      priority,
      alternates: { languages },
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 静态页面（每个页面 × 每个 locale）
  const staticUrls = STATIC_ROUTES.flatMap((route) =>
    buildLocalizedUrls(
      route.path,
      route.lastModified,
      route.priority,
      route.changefreq ?? 'monthly'
    )
  );
  const guideUrls = getPublishedGuidePosts()
    .filter((post) => post.sourceIds?.length)
    .flatMap((post) => buildLocalizedUrls(`/guide/${post.slug}/`, post.date, 0.8, 'weekly'));
  const dexUrls = getAllAniimos().flatMap((aniimo) =>
    buildLocalizedUrls(`/dex/${aniimo.number}/`, LAST_PUBLISHED, 0.75, 'weekly')
  );
  const elementUrls = ELEMENTS.flatMap((element) =>
    buildLocalizedUrls(`/elements/${element.toLowerCase()}/`, LAST_PUBLISHED, 0.8, 'weekly')
  );
  return [...staticUrls, ...guideUrls, ...dexUrls, ...elementUrls];
}
