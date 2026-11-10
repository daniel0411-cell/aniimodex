import type { Metadata } from 'next';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import PolicyPage, { type PolicySection } from '@/components/PolicyPage';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { locales } from '@/i18n/routing';
import { advertisingEnabled } from '@/lib/advertising';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });
  return { title: `${t('title')} | AniimoDex`, description: t('intro'), alternates: { canonical: `${SITE_URL}/${locale}/privacy/`, languages: localizedLanguages('/privacy/') } };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const content = messages.legal.privacy as { title: string; intro: string; updated: string; activeStatus: string; sections: PolicySection[] };
  const footer = await getTranslations('footer');
  const sections = content.sections.map((section, index) => advertisingEnabled && index === 0
    ? { ...section, paragraphs: [content.activeStatus, ...(section.paragraphs?.slice(1) ?? [])] }
    : section);
  return <PolicyPage {...content} sections={sections}>
    <a href={`/${locale}/privacy/#privacy-choices`} data-privacy-choices className="inline-block text-primary-light underline underline-offset-4">{footer('privacyChoices')}</a>
  </PolicyPage>;
}
