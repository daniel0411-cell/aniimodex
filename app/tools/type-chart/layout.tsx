import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export const metadata: Metadata = {
  title: '伊莫元素克制表：9 种元素相克关系与弱点查询 | AniimoDex',
  description:
    '查看伊莫 9 种元素之间的克制关系、属性弱点和推荐对战方向，快速找到克制的元素搭配，提升对战胜率。',
  alternates: {
    canonical: `${SITE_URL}/tools/type-chart/`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tools/type-chart/`,
    title: '伊莫元素克制表：9 种元素相克关系与弱点查询 | AniimoDex',
    description:
      '查看伊莫 9 种元素之间的克制关系、属性弱点和推荐对战方向，快速找到克制的元素搭配，提升对战胜率。',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AniimoDex 元素克制表',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '伊莫元素克制表：9 种元素相克关系与弱点查询 | AniimoDex',
    description:
      '查看伊莫 9 种元素之间的克制关系、属性弱点和推荐对战方向，快速找到克制的元素搭配，提升对战胜率。',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function TypeChartLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
