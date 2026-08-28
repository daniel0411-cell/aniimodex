import type { MetadataRoute } from 'next';
import { getAllAniimos } from '@/lib/aniimo';
import { guidePosts } from '@/data/guides';
import { locales, defaultLocale } from '@/i18n/routing';

// 站点根地址：优先读环境变量，默认使用正式域名 aniimodex.com
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

// output: 'export' 静态导出模式下，metadata route 需提供静态参数生成
export function generateStaticParams() {
  return [{ __metadata_id__: [] }];
}

// 站点内容最近更新日期
const SITE_LAST_MODIFIED = '2026-08-28';

// 静态页面路由（不含图鉴详情）
const STATIC_ROUTES: {
  path: string;
  priority: number;
  changefreq?: MetadataRoute.Sitemap[number]['changeFrequency'];
}[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/dex/', priority: 0.9, changefreq: 'weekly' },
  { path: '/tools/', priority: 0.8, changefreq: 'monthly' },
  { path: '/tools/twine/', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/type-chart/', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/catch/', priority: 0.7, changefreq: 'monthly' },
  { path: '/guide/', priority: 0.6, changefreq: 'monthly' },
];

// 为单个（无 locale 的）路径生成所有 locale 的 URL + hreflang alternates
function buildLocalizedUrls(
  path: string,
  priority: number,
  changefreq: MetadataRoute.Sitemap[number]['changeFrequency']
): MetadataRoute.Sitemap {
  const fullPath = path === '/' ? '/' : path; // 路径本身带尾斜杠
  // 各 locale 完整 URL
  const localizedUrls = locales.map((locale) => `${SITE_URL}/${locale}${fullPath}`);

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
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: changefreq,
      priority,
      alternates: { languages },
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 静态页面（每个页面 × 每个 locale）
  const staticUrls = STATIC_ROUTES.flatMap((route) =>
    buildLocalizedUrls(route.path, route.priority, route.changefreq ?? 'monthly')
  );

  // 图鉴详情页（每只伊莫 × 每个 locale）
  const dexUrls = getAllAniimos().flatMap((aniimo) =>
    buildLocalizedUrls(`/dex/${aniimo.number}/`, 0.6, 'weekly')
  );

  // 攻略文章详情页（每篇文章 × 每个 locale）
  const guideUrls = guidePosts.flatMap((post) =>
    buildLocalizedUrls(`/guide/${post.slug}/`, 0.6, 'monthly')
  );

  return [...staticUrls, ...dexUrls, ...guideUrls];
}
