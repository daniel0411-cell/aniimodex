import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export const metadata: Metadata = {
  title: '伊莫捕获估算器：捕获概率与资源准备 | AniimoDex',
  description:
    '输入目标状态与捕获条件，实时估算伊莫捕获成功率，并获取球具与资源准备建议，提高捕获效率。',
  alternates: {
    canonical: `${SITE_URL}/tools/catch/`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tools/catch/`,
    title: '伊莫捕获估算器：捕获概率与资源准备 | AniimoDex',
    description:
      '输入目标状态与捕获条件，实时估算伊莫捕获成功率，并获取球具与资源准备建议，提高捕获效率。',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AniimoDex 捕获估算器',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '伊莫捕获估算器：捕获概率与资源准备 | AniimoDex',
    description:
      '输入目标状态与捕获条件，实时估算伊莫捕获成功率，并获取球具与资源准备建议，提高捕获效率。',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function CatchLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
