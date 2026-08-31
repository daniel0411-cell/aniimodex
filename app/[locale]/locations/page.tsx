import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { habitatGroups } from '@/data/aniimo-collections';
import AniimoLinkList from '@/components/dex/AniimoLinkList';
import { Link } from '@/i18n/navigation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'collections.locations' });
  return { title: t('title'), description: t('description'), alternates: { canonical: `${SITE_URL}/${locale}/locations/`, languages: localizedLanguages('/locations/') } };
}

export default async function LocationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('collections.locations');
  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/locations/` }) }} />
      <header className="border-b border-ink-border pb-6"><h1 className="text-3xl font-bold text-text-primary">{t('title')}</h1><p className="mt-2 max-w-3xl text-text-secondary">{t('description')}</p><p className="mt-3 text-xs text-emerald-700">{t('sourceNote')}</p></header>
      <div className="space-y-6">{habitatGroups.map(([habitat, members]) => <section key={habitat}><div className="flex items-baseline justify-between border-b border-ink-border pb-2"><h2 className="text-xl font-bold text-text-primary">{habitat}</h2><span className="text-xs text-text-muted">{t('count', { count: members.length })}</span></div><AniimoLinkList aniimos={members} /></section>)}</div>
      <section className="border-t border-ink-border pt-8">
        <h2 className="text-xl font-bold text-text-primary">{t('howToTitle')}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">{t('howToDescription')}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="border-t border-ink-border pt-4"><h3 className="font-semibold text-text-primary">{t('faq.coordinates.question')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('faq.coordinates.answer')}</p></div><div className="border-t border-ink-border pt-4"><h3 className="font-semibold text-text-primary">{t('faq.conditions.question')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('faq.conditions.answer')}</p></div></div>
        <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary-light"><Link href="/dex">{t('browseDex')} →</Link><Link href="/evolutions">{t('browseEvolutions')} →</Link></nav>
      </section>
    </div>
  );
}
