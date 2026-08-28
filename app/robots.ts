import type { MetadataRoute } from 'next';

// 站点根地址：优先读环境变量，默认使用正式域名 aniimodex.com
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

// output: 'export' 静态导出模式下，metadata route 需提供静态参数生成
export function generateStaticParams() {
  return [{ __metadata_id__: [] }];
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
