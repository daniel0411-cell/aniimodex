import type { MetadataRoute } from 'next';
import { getAllAniimos } from '@/lib/aniimo';

// 站点根地址：部署后请将 NEXT_PUBLIC_SITE_URL 配置为正式域名
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.pages.dev';

// output: 'export' 静态导出模式下，metadata route 需提供静态参数生成
export function generateStaticParams() {
  return [{ __metadata_id__: [] }];
}

// 静态页面路由（不含图鉴详情，详情在下方动态生成）
const STATIC_ROUTES: { path: string; priority: number; changefreq?: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: '/dex', priority: 0.9, changefreq: 'weekly' },
  { path: '/tools', priority: 0.8, changefreq: 'monthly' },
  { path: '/tools/twine', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/type-chart', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/catch', priority: 0.7, changefreq: 'monthly' },
  { path: '/guide', priority: 0.6, changefreq: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 静态页面
  const staticUrls = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  // 图鉴详情页（每只伊莫一个 URL）
  const dexUrls = getAllAniimos().map((aniimo) => ({
    url: `${SITE_URL}/dex/${aniimo.number}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...dexUrls];
}
