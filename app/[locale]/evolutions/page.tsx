import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { getAniimoByName } from '@/lib/aniimo';
import { evolutionFamilies, flattenEvolution } from '@/data/aniimo-collections';
import AniimoLinkList from '@/components/dex/AniimoLinkList';
import { Link } from '@/i18n/navigation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'collections.evolutions' });
  return { title: t('title'), description: t('description'), alternates: { canonical: `${SITE_URL}/${locale}/evolutions/`, languages: localizedLanguages('/evolutions/') } };
}

export default async function EvolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('collections.evolutions');
  const familyMembers = evolutionFamilies.map((family) => flattenEvolution(family));
  const branchingFamilies = evolutionFamilies.filter((family) => family.children.length > 1).length;
  const mappedMembers = new Set(familyMembers.flat()).size;
  const faqItems = [
    { question: t('faq.branching.question'), answer: t('faq.branching.answer') },
    { question: t('faq.requirements.question'), answer: t('faq.requirements.answer') },
  ];
  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'CollectionPage', name: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/evolutions/` }, { '@type': 'FAQPage', mainEntity: faqItems.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }] }) }} />
      <header className="border-b border-ink-border pb-6"><h1 className="text-3xl font-bold text-text-primary">{t('title')}</h1><p className="mt-2 max-w-3xl text-text-secondary">{t('description')}</p><p className="mt-3 text-xs text-emerald-700">{t('sourceNote')}</p></header>
      <section className="grid divide-y divide-ink-border border-y border-ink-border bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0"><div className="p-4"><strong className="text-2xl text-primary-light">{evolutionFamilies.length}</strong><p className="mt-1 text-xs text-text-muted">{t('stats.families')}</p></div><div className="p-4"><strong className="text-2xl text-primary-light">{branchingFamilies}</strong><p className="mt-1 text-xs text-text-muted">{t('stats.branching')}</p></div><div className="p-4"><strong className="text-2xl text-primary-light">{mappedMembers}</strong><p className="mt-1 text-xs text-text-muted">{t('stats.members')}</p></div></section>
      <p className="border-l-4 border-secondary bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-950">{t('definition', { families: evolutionFamilies.length, members: mappedMembers })}</p>
      <div className="grid gap-5 lg:grid-cols-2">
        {evolutionFamilies.map((family) => {
          const members = flattenEvolution(family).map(getAniimoByName).filter((entry) => entry !== undefined);
          return <section key={family.name} className="border-t-4 border-primary bg-ink-card p-4"><h2 className="text-lg font-bold text-text-primary">{family.name} {t('family')}</h2><AniimoLinkList aniimos={members} /></section>;
        })}
      </div>
      <section className="border-t border-ink-border pt-8">
        <h2 className="text-xl font-bold text-text-primary">{t('howToTitle')}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">{t('howToDescription')}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="border-t border-ink-border pt-4"><h3 className="font-semibold text-text-primary">{t('faq.branching.question')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('faq.branching.answer')}</p></div>
          <div className="border-t border-ink-border pt-4"><h3 className="font-semibold text-text-primary">{t('faq.requirements.question')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('faq.requirements.answer')}</p></div>
        </div>
        <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary-light"><Link href="/dex">{t('browseDex')} →</Link><Link href="/locations">{t('browseLocations')} →</Link></nav>
      </section>
    </div>
  );
}
