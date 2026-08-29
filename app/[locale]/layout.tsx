import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales, routing } from '@/i18n/routing';
import '../globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 全局基础 metadata（具体页面会用 generateMetadata 覆盖）
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'AniimoDex',
  keywords: ['Aniimo', '伊莫', '图鉴', '精灵', 'Twine 反查', '元素克制', '游戏工具'],
  authors: [{ name: 'AniimoDex' }],
  robots: {
    index: true,
    follow: true,
  },
};

// 启用静态渲染（output: 'export' 下 setRequestLocale 是必须的）
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 校验 locale，无效则 404
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col bg-ink text-text-primary">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
