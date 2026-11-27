import assets from '@/data/editorial-images.json';
import { imageMetadata } from '@/lib/editorial-images';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedLanguages } from '@/lib/i18n-metadata';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'twineTool' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const siteName = meta('siteName');
  const title = `${t('title')} | ${siteName}`;
  const description = t('subtitle');
  const representative = assets[`twine-${locale}` as keyof typeof assets];

  return {
    title,
    description,
    robots: { 'max-image-preview': 'large', index: true, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${locale}/tools/twine/`,
      languages: localizedLanguages('/tools/twine/'),
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/tools/twine/`,
      title,
      description,
      images: [imageMetadata(representative)],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageMetadata(representative)],
    },
  };
}

export default async function TwineLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
