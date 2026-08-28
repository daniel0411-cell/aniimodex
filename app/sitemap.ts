import type { MetadataRoute } from 'next';
import { getAllAniimos } from '@/lib/aniimo';

// 站点根地址：优先读环境变量，默认使用正式域名 aniimodex.com
// 若部署到自定义域名，可通过 NEXT_PUBLIC_SITE_URL 覆盖
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

// output: 'export' 静态导出模式下，metadata route 需提供静态参数生成
export function generateStaticParams() {
  return [{ __metadata_id__: [] }];
}

// 站点内容最近更新日期（对应首页"最新更新"中的真实数据更新日期）
// 使用固定日期而非构建时间，避免每次构建都把所有 URL 的 lastmod 伪造成当天。
const SITE_LAST_MODIFIED = '2026-08-20';

// 静态页面路由（不含图鉴详情，详情在下方动态生成）
// 注意：站点配置了 trailingSlash: true，所有目录路径均带尾斜杠（首页 "/" 除外）。
const STATIC_ROUTES: { path: string; priority: number; changefreq?: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/dex/', priority: 0.9, changefreq: 'weekly' },
  { path: '/tools/', priority: 0.8, changefreq: 'monthly' },
  { path: '/tools/twine/', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/type-chart/', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/catch/', priority: 0.7, changefreq: 'monthly' },
  { path: '/guide/', priority: 0.6, changefreq: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 静态页面
  const staticUrls = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  // 图鉴详情页（每只伊莫一个 URL，trailingSlash 模式带尾斜杠）
  const dexUrls = getAllAniimos().map((aniimo) => ({
    url: `${SITE_URL}/dex/${aniimo.number}/`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...dexUrls];
}
