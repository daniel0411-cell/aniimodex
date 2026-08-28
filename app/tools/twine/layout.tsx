import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export const metadata: Metadata = {
  title: 'Twine 能力反查器：按飞行、游泳、攀岩等机动能力查找伊莫 | AniimoDex',
  description:
    '选择飞行、游泳、遁地、攀岩或冲撞等 Twine 机动能力，一键反查具备对应能力的伊莫，快速规划探索路线与队伍搭配。',
  alternates: {
    canonical: `${SITE_URL}/tools/twine/`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tools/twine/`,
    title: 'Twine 能力反查器：按飞行、游泳、攀岩等机动能力查找伊莫 | AniimoDex',
    description:
      '选择飞行、游泳、遁地、攀岩或冲撞等 Twine 机动能力，一键反查具备对应能力的伊莫，快速规划探索路线与队伍搭配。',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AniimoDex Twine 能力反查器',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twine 能力反查器：按飞行、游泳、攀岩等机动能力查找伊莫 | AniimoDex',
    description:
      '选择飞行、游泳、遁地、攀岩或冲撞等 Twine 机动能力，一键反查具备对应能力的伊莫，快速规划探索路线与队伍搭配。',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function TwineLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
