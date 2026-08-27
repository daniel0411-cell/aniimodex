import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.pages.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AniimoDex - Your Aniimo Companion',
    template: '%s | AniimoDex',
  },
  description:
    'AniimoDex - Your Aniimo Companion · 一站式 Aniimo 图鉴与工具站：精灵资料、Twine 反查、元素克制、捕获估算，尽在这里。',
  applicationName: 'AniimoDex',
  keywords: ['Aniimo', '图鉴', '精灵', 'Twine 反查', '元素克制', '游戏工具'],
  authors: [{ name: 'AniimoDex' }],
  openGraph: {
    type: 'website',
    siteName: 'AniimoDex',
    title: 'AniimoDex - Your Aniimo Companion',
    description:
      '一站式 Aniimo 图鉴与工具站：精灵资料、Twine 反查、元素克制、捕获估算，尽在这里。',
    url: SITE_URL,
    locale: 'zh_CN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AniimoDex',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AniimoDex - Your Aniimo Companion',
    description:
      '一站式 Aniimo 图鉴与工具站：精灵资料、Twine 反查、元素克制、捕获估算，尽在这里。',
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
