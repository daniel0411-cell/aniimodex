import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'AniimoDex - 伊莫图鉴、Twine 反查与元素克制工具',
  description:
    'AniimoDex 是中文伊莫图鉴与工具站，提供伊莫精灵资料、Twine 反查、元素克制表、捕获估算和新手攻略。',
  alternates: {
    canonical: '/',
  },
  applicationName: 'AniimoDex',
  keywords: ['Aniimo', '伊莫', '图鉴', '精灵', 'Twine 反查', '元素克制', '游戏工具'],
  authors: [{ name: 'AniimoDex' }],
  openGraph: {
    type: 'website',
    siteName: 'AniimoDex',
    title: 'AniimoDex - 伊莫图鉴、Twine 反查与元素克制工具',
    description:
      'AniimoDex 是中文伊莫图鉴与工具站，提供伊莫精灵资料、Twine 反查、元素克制表、捕获估算和新手攻略。',
    url: SITE_URL,
    locale: 'zh_CN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AniimoDex - 伊莫图鉴与工具站',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AniimoDex - 伊莫图鉴、Twine 反查与元素克制工具',
    description:
      'AniimoDex 是中文伊莫图鉴与工具站，提供伊莫精灵资料、Twine 反查、元素克制表、捕获估算和新手攻略。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col bg-ink text-text-primary">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
