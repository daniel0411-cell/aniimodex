import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { habitatGroups } from '@/data/aniimo-collections';
import AniimoLinkList from '@/components/dex/AniimoLinkList';
import { Link } from '@/i18n/navigation';
import { getOfficialAniimoDetail } from '@/data/aniimo-details';
import PrismanaSchedule from '@/components/guide/PrismanaSchedule';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';
const habitatId = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'collections.locations' });
  return { title: t('title'), description: t('description'), alternates: { canonical: `${SITE_URL}/${locale}/locations/`, languages: localizedLanguages('/locations/') } };
}

export default async function LocationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('collections.locations');
  const mappedAniimo = new Set(habitatGroups.flatMap(([, members]) => members.map((member) => member.number))).size;
  const faqItems = ['map', 'coordinates', 'conditions'].map((key) => ({ question: t(`faq.${key}.question`), answer: t(`faq.${key}.answer`) }));
  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'CollectionPage', name: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/locations/` }, { '@type': 'FAQPage', mainEntity: faqItems.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }] }) }} />
      <header className="border-b border-ink-border pb-6"><h1 className="text-3xl font-bold text-text-primary">{t('title')}</h1><p className="mt-2 max-w-3xl text-text-secondary">{t('description')}</p><p className="mt-3 text-xs text-emerald-700">{t('sourceNote')}</p></header>
      <section className="border-l-4 border-secondary bg-emerald-50 px-5 py-4"><h2 className="font-semibold text-emerald-950">{t('definitionTitle')}</h2><p className="mt-1 max-w-4xl text-sm leading-6 text-emerald-950">{t('definition', { habitats: habitatGroups.length, aniimo: mappedAniimo })}</p></section>
      <section className="border-b border-ink-border pb-6">
        <a href="#basic-habitats" className="mb-4 inline-block text-sm font-semibold text-primary-light">{t('basicHabitatsTitle')} ↓</a>
        <h2 className="text-xl font-bold text-text-primary">{t('eventTitle')}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">{t('eventScope')}</p>
        <PrismanaSchedule locale={locale} />
        <nav className="flex flex-wrap gap-4 text-sm font-semibold text-primary-light">
          <Link href="/guide/aniimo-prismana-event-tracker">{t('eventGuide')} →</Link>
          <a href="https://www.aniimo.com/newslist/detail/100244" target="_blank" rel="noreferrer">{t('eventSource')} →</a>
        </nav>
      </section>
      <h2 id="basic-habitats" className="scroll-mt-24 text-xl font-bold text-text-primary">{t('basicHabitatsTitle')}</h2>
      <nav aria-label={t('directoryTitle')} className="flex flex-wrap gap-2">{habitatGroups.map(([habitat]) => <a key={habitat} href={`#${habitatId(habitat)}`} className="rounded border border-ink-border bg-white px-2.5 py-1.5 text-xs text-primary-light">{habitat}</a>)}</nav>
      <div className="space-y-8">{habitatGroups.map(([habitat, members]) => {
        const elements = Array.from(new Set(members.flatMap((member) => member.officialElements ?? [])));
        const families = new Set(members.map((member) => getOfficialAniimoDetail(member.number)?.evolution.name).filter(Boolean));
        return <section id={habitatId(habitat)} key={habitat} className="scroll-mt-24"><div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink-border pb-2"><h3 className="text-xl font-bold text-text-primary">{habitat}</h3><span className="text-xs text-text-muted">{t('count', { count: members.length })}</span></div><p className="mt-2 text-xs text-text-muted">{t('summary', { elements: elements.join(', '), families: families.size })}</p><Link href={{ pathname: '/dex', query: { habitat } }} className="mt-3 inline-block text-sm font-semibold text-primary-light">{t('compareHabitat')} →</Link><AniimoLinkList aniimos={members} /></section>;
      })}</div>
      <section className="border-t border-ink-border pt-8">
        <h2 className="text-xl font-bold text-text-primary">{t('howToTitle')}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">{t('howToDescription')}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3"><div className="border-t border-ink-border pt-4"><h3 className="font-semibold text-text-primary">{t('faq.map.question')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('faq.map.answer')}</p></div><div className="border-t border-ink-border pt-4"><h3 className="font-semibold text-text-primary">{t('faq.coordinates.question')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('faq.coordinates.answer')}</p></div><div className="border-t border-ink-border pt-4"><h3 className="font-semibold text-text-primary">{t('faq.conditions.question')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('faq.conditions.answer')}</p></div></div>
        <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary-light"><Link href="/dex">{t('browseDex')} →</Link><Link href="/evolutions">{t('browseEvolutions')} →</Link><Link href="/abilities">{t('browseAbilities')} →</Link></nav>
      </section>
    </div>
  );
}
