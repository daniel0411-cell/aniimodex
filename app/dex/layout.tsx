import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export const metadata: Metadata = {
  title: '伊莫图鉴大全：全部属性、技能、Twine 与获取方式 | AniimoDex',
  description:
    '浏览完整伊莫图鉴，按元素、定位和 Twine 能力筛选，查看每只伊莫的属性、进化路线、出现位置、捕获方法与培养建议。',
  alternates: {
    canonical: `${SITE_URL}/dex/`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/dex/`,
    title: '伊莫图鉴大全：全部属性、技能、Twine 与获取方式 | AniimoDex',
    description:
      '浏览完整伊莫图鉴，按元素、定位和 Twine 能力筛选，查看每只伊莫的属性、进化路线、出现位置、捕获方法与培养建议。',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AniimoDex 伊莫图鉴',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '伊莫图鉴大全：全部属性、技能、Twine 与获取方式 | AniimoDex',
    description:
      '浏览完整伊莫图鉴，按元素、定位和 Twine 能力筛选，查看每只伊莫的属性、进化路线、出现位置、捕获方法与培养建议。',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function DexLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
