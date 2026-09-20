import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { combatSkillGroups, mobilityGroups, traitGroups } from '@/data/aniimo-collections';
import AniimoLinkList from '@/components/dex/AniimoLinkList';
import SkillDirectory from '@/components/dex/SkillDirectory';
import { Link } from '@/i18n/navigation';

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
  const tr = await getTranslations();

  // mobility 为官方英文专名；有本地化短名/说明时优先展示，缺失则回退英文原文
  const mobilityLabel = (name: string) =>
    tr.has(`mobilityNames.${name}`) ? tr(`mobilityNames.${name}`) : name;
  const mobilityDescription = (name: string, fallback?: string) =>
    tr.has(`mobilityDescriptions.${name}`) ? tr(`mobilityDescriptions.${name}`) : fallback;

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/abilities/` }) }} />
      <header className="border-b border-ink-border pb-6"><h1 className="text-3xl font-bold text-text-primary">{t('title')}</h1><p className="mt-2 max-w-3xl text-text-secondary">{t('description')}</p><p className="mt-3 text-xs text-emerald-700">{t('sourceNote')}</p></header>
      <section className="grid divide-y divide-ink-border border-y border-ink-border bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="p-4"><strong className="text-2xl text-primary-light">{mobilityGroups.length}</strong><p className="mt-1 text-xs text-text-muted">{t('stats.mobility')}</p></div>
        <div className="p-4"><strong className="text-2xl text-primary-light">{traitGroups.length}</strong><p className="mt-1 text-xs text-text-muted">{t('stats.traits')}</p></div>
        <div className="p-4"><strong className="text-2xl text-primary-light">{combatSkillGroups.length}</strong><p className="mt-1 text-xs text-text-muted">{t('stats.skills')}</p></div>
      </section>
      <section>
        <h2 className="mb-4 text-xl font-bold text-text-primary">{t('mobilityTitle')}</h2>
      <div className="grid gap-5 lg:grid-cols-2">{mobilityGroups.map(([name, group]) => { const description = mobilityDescription(name, group.description); return <section key={name} className="border-l-4 border-accent bg-ink-card p-4"><div className="flex items-baseline justify-between gap-3"><h2 className="text-lg font-bold text-text-primary">{mobilityLabel(name)}</h2><span className="text-xs text-text-muted">{t('count', { count: group.members.length })}</span></div>{description && <p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p>}<AniimoLinkList aniimos={group.members} /></section>; })}</div>
      </section>
      <section className="border-t border-ink-border pt-8">
        <h2 className="text-xl font-bold text-text-primary">{t('traitsTitle')}</h2>
        <p className="mb-4 mt-2 text-sm text-text-secondary">{t('traitsDescription')}</p>
        <SkillDirectory groups={traitGroups.map(([name, group]) => ({ name, ...group }))} labels={{ search: t('searchTraits'), empty: t('empty'), count: t('count', { count: '{count}' }), initial: t('initial', { count: 24 }) }} />
      </section>
      <section className="border-t border-ink-border pt-8">
        <h2 className="text-xl font-bold text-text-primary">{t('skillsTitle')}</h2>
        <p className="mb-4 mt-2 text-sm text-text-secondary">{t('skillsDescription')}</p>
        <SkillDirectory groups={combatSkillGroups.map(([name, group]) => ({ name, ...group }))} labels={{ search: t('searchSkills'), empty: t('empty'), count: t('count', { count: '{count}' }), initial: t('initial', { count: 24 }) }} />
      </section>
      <section className="border-t border-ink-border pt-8">
        <h2 className="text-xl font-bold text-text-primary">{t('howToTitle')}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">{t('howToDescription')}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="border-t border-ink-border pt-4"><h3 className="font-semibold text-text-primary">{t('faq.combat.question')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('faq.combat.answer')}</p></div><div className="border-t border-ink-border pt-4"><h3 className="font-semibold text-text-primary">{t('faq.complete.question')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('faq.complete.answer')}</p></div></div>
        <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary-light"><Link href="/dex">{t('browseDex')} →</Link><Link href="/locations">{t('browseLocations')} →</Link></nav>
      </section>
    </div>
  );
}
