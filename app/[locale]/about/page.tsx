import type { Metadata } from 'next';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import PolicyPage, { type PolicySection } from '@/components/PolicyPage';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { locales } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.about' });
  return { title: `${t('title')} | AniimoDex`, description: t('intro'), alternates: { canonical: `${SITE_URL}/${locale}/about/`, languages: localizedLanguages('/about/') } };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const content = messages.legal.about as { title: string; intro: string; updated: string; sections: PolicySection[] };
  return <PolicyPage {...content} />;
}
