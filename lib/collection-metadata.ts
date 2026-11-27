import type { Metadata } from 'next';
import { localizedLanguages } from '@/lib/i18n-metadata';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

// Aggregate pages use the site identity card, with their own actual topic text.
export function collectionMetadata(locale: string, path: string, title: string, description: string): Metadata {
  const image = { url: `${SITE_URL}/images/site-share.webp`, width: 1200, height: 624, alt: 'AniimoDex site identity' };
  return {
    title, description,
    alternates: { canonical: `${SITE_URL}/${locale}${path}`, languages: localizedLanguages(path) },
    openGraph: { type: 'website', title, description, url: `${SITE_URL}/${locale}${path}`, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
