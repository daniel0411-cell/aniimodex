import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { sources } from '@/data/sources';
import { locales } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';
const PATH = '/guide/how-we-verify/';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'verification' });
  return {
    title: `${t('title')} | AniimoDex`,
    description: t('description'),
    alternates: { canonical: `${SITE_URL}/${locale}${PATH}`, languages: localizedLanguages(PATH) },
  };
}

export default async function VerificationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('verification');
  const tr = await getTranslations('breadcrumb');
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <Breadcrumb items={[{ label: tr('guide'), href: '/guide/' }, { label: t('title') }]} />
      <header className="space-y-3 border-b border-ink-border pb-6">
        <p className="text-xs font-semibold uppercase text-emerald-700">{t('eyebrow')}</p>
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">{t('title')}</h1>
        <p className="max-w-2xl text-base leading-7 text-text-secondary">{t('description')}</p>
      </header>
      <section className="grid gap-4 sm:grid-cols-2">
        {(['official', 'store', 'unknown', 'testing'] as const).map((key) => (
          <article key={key} className="border-t-4 border-secondary bg-emerald-50 p-5">
            <h2 className="font-semibold text-text-primary">{t(`tiers.${key}.title`)}</h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{t(`tiers.${key}.body`)}</p>
          </article>
        ))}
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-text-primary">{t('sourcesTitle')}</h2>
        <p className="text-sm leading-6 text-text-secondary">{t('sourcesDescription')}</p>
        <ul className="divide-y divide-ink-border border-y border-ink-border">
          {sources.map((source) => (
            <li key={source.id} className="py-4">
              <a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-primary-light hover:text-primary">{source.title} ↗</a>
              <p className="mt-1 text-xs text-text-muted">{source.evidence}</p>
              <p className="mt-1 text-xs text-text-muted">{t('checkedOn', { date: source.accessedAt })}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-l-4 border-primary bg-sky-50 px-4 py-3 text-sm leading-6 text-text-primary">
        <h2 className="font-semibold">{t('correctionsTitle')}</h2>
        <p className="mt-1">{t('correctionsBody')}</p>
      </section>
      <Link href="/guide" className="inline-flex text-sm font-semibold text-primary-light">{t('backToGuides')} →</Link>
    </div>
  );
}
