import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { ELEMENTS, ELEMENT_ICONS } from '@/lib/aniimo-ui';
import { filterByElement } from '@/lib/aniimo';
import type { Element } from '@/types/aniimo';
import AniimoLinkList from '@/components/dex/AniimoLinkList';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Link } from '@/i18n/navigation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';
const elementBySlug = new Map(ELEMENTS.map((element) => [element.toLowerCase(), element]));

export function generateStaticParams() {
  return locales.flatMap((locale) => ELEMENTS.map((element) => ({ locale, element: element.toLowerCase() })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; element: string }> }): Promise<Metadata> {
  const { locale, element: slug } = await params;
  const element = elementBySlug.get(slug);
  if (!element) return {};
  const t = await getTranslations({ locale, namespace: 'collections.elements' });
  const tr = await getTranslations({ locale, namespace: 'elements' });
  const name = tr(element);
  const path = `/elements/${slug}/`;
  return { title: t('metaTitle', { element: name }), description: t('metaDescription', { element: name }), alternates: { canonical: `${SITE_URL}/${locale}${path}`, languages: localizedLanguages(path) } };
}

export default async function ElementPage({ params }: { params: Promise<{ locale: string; element: string }> }) {
  const { locale, element: slug } = await params;
  setRequestLocale(locale);
  const element = elementBySlug.get(slug) as Element | undefined;
  if (!element) notFound();
  const t = await getTranslations('collections.elements');
  const tr = await getTranslations();
  const members = filterByElement(element);
  const roleCounts = members.reduce((counts, member) => {
    if (member.officialRole) counts.set(member.officialRole, (counts.get(member.officialRole) ?? 0) + 1);
    return counts;
  }, new Map<string, number>());
  const name = tr(`elements.${element}`);
  const url = `${SITE_URL}/${locale}/elements/${slug}/`;

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: t('title', { element: name }), description: t('description', { element: name, count: members.length }), url }) }} />
      <Breadcrumb items={[{ label: tr('breadcrumb.dex'), href: '/dex' }, { label: name }]} />
      <header className="border-b border-ink-border pb-6">
        <p className="text-3xl" aria-hidden>{ELEMENT_ICONS[element]}</p>
        <h1 className="mt-2 text-3xl font-bold text-text-primary">{t('title', { element: name })}</h1>
        <p className="mt-2 max-w-3xl text-text-secondary">{t('description', { element: name, count: members.length })}</p>
        <p className="mt-3 text-xs text-emerald-700">{t('sourceNote')}</p>
      </header>
      <section>
        <div className="flex items-baseline justify-between border-b border-ink-border pb-2"><h2 className="text-xl font-bold text-text-primary">{t('dexTitle', { element: name })}</h2><span className="text-xs text-text-muted">{t('count', { count: members.length })}</span></div>
        <AniimoLinkList aniimos={members} />
      </section>
      <section className="border-t border-ink-border pt-6">
        <h2 className="text-xl font-bold text-text-primary">{t('rolesTitle')}</h2>
        <div className="mt-3 flex flex-wrap gap-2">{Array.from(roleCounts).map(([role, count]) => <span key={role} className="rounded border border-ink-border bg-white px-3 py-2 text-sm text-text-secondary">{tr(`roles.${role}`)} · {count}</span>)}</div>
      </section>
      <section className="border-t border-ink-border pt-6"><h2 className="text-xl font-bold text-text-primary">{t('scopeTitle')}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">{t('scopeDescription', { element: name })}</p><nav className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary-light"><Link href="/dex">{t('browseDex')} →</Link><Link href="/tools/type-chart">{t('browseMatchups')} →</Link><Link href="/guide/aniimo-elements-explained">{t('readGuide')} →</Link></nav></section>
    </div>
  );
}
