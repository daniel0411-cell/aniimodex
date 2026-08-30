import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { mobilityGroups } from '@/data/aniimo-collections';
import AniimoLinkList from '@/components/dex/AniimoLinkList';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'collections.abilities' });
  return { title: t('title'), description: t('description'), alternates: { canonical: `${SITE_URL}/${locale}/abilities/`, languages: localizedLanguages('/abilities/') } };
}

export default async function AbilitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('collections.abilities');
  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/abilities/` }) }} />
      <header className="border-b border-ink-border pb-6"><h1 className="text-3xl font-bold text-text-primary">{t('title')}</h1><p className="mt-2 max-w-3xl text-text-secondary">{t('description')}</p><p className="mt-3 text-xs text-emerald-700">{t('sourceNote')}</p></header>
      <div className="grid gap-5 lg:grid-cols-2">{mobilityGroups.map(([name, group]) => <section key={name} className="border-l-4 border-accent bg-ink-card p-4"><div className="flex items-baseline justify-between gap-3"><h2 className="text-lg font-bold text-text-primary">{name}</h2><span className="text-xs text-text-muted">{t('count', { count: group.members.length })}</span></div>{group.description && <p className="mt-2 text-sm leading-6 text-text-secondary">{group.description}</p>}<AniimoLinkList aniimos={group.members} /></section>)}</div>
    </div>
  );
}
