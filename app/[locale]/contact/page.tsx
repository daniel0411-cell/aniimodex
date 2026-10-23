import type { Metadata } from 'next';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import PolicyPage, { type PolicySection } from '@/components/PolicyPage';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { locales } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.contact' });
  return {
    title: `${t('title')} | AniimoDex`,
    description: t('intro'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact/`,
      languages: localizedLanguages('/contact/'),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const content = messages.legal.contact as {
    title: string;
    intro: string;
    updated: string;
    sections: PolicySection[];
  };
  return <PolicyPage {...content}>
    <div className="flex flex-wrap gap-5 text-sm font-semibold text-primary-light">
      <a href="mailto:privacy@aniimodex.com">privacy@aniimodex.com</a>
      <a href="mailto:copyright@aniimodex.com">copyright@aniimodex.com</a>
    </div>
  </PolicyPage>;
}
