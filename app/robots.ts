import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.pages.dev';

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
