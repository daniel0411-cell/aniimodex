import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import HeroSearch from '@/components/HeroSearch';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { getAllAniimos } from '@/lib/aniimo';
import { evolutionFamilies, habitatGroups, mobilityGroups } from '@/data/aniimo-collections';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const title = meta('defaultTitle');
  const description = meta('defaultDescription');
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/`,
      languages: localizedLanguages('/'),
    },
    openGraph: {
      type: 'website',
      siteName: meta('siteName'),
      title,
      description,
      url: `${SITE_URL}/${locale}/`,
      locale: locale === 'zh-Hant' ? 'zh_TW' : locale === 'zh-Hans' ? 'zh_CN' : 'en_US',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

const featuredNumbers = ['001', '002', '005', '007', '011', '016'];
const guideSlugs = ['aniimo-platforms', 'aniimo-crossplay-cross-save', 'aniimo-twine-explained', 'official-aniimo-dex-status'] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const th = await getTranslations('home');
  const allAniimos = getAllAniimos();
  const featured = featuredNumbers
    .map((number) => allAniimos.find((aniimo) => aniimo.number === number))
    .filter((aniimo) => aniimo !== undefined);
  const metrics = [
    { value: allAniimos.length, label: th('stats.dexEntries'), href: '/dex' },
    { value: evolutionFamilies.length, label: th('stats.evolutions'), href: '/evolutions' },
    { value: habitatGroups.length, label: th('stats.habitats'), href: '/locations' },
    { value: mobilityGroups.length, label: th('stats.abilities'), href: '/abilities' },
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}/`,
    name: 'AniimoDex',
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/dex/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="space-y-10 sm:space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative min-h-[30rem] overflow-hidden rounded-lg sm:min-h-[34rem]">
        <div className="absolute inset-0 -z-10"><Image src="/images/hero-bg.jpg" alt="" fill sizes="100vw" className="object-cover object-center" priority /><div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/45 to-transparent" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" /></div>
        <div className="relative flex min-h-[30rem] max-w-2xl flex-col justify-end px-5 py-8 sm:min-h-[34rem] sm:px-10 sm:py-12 lg:px-14">
          <span className="mb-4 text-xs font-bold uppercase text-emerald-200">{th('heroBadge')}</span><h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">AniimoDex</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">{th('heroSubtitle')}</p><div className="mt-6 w-full max-w-xl"><HeroSearch /></div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white"><Link href="/dex" className="hover:text-white/75">{th('exploreDex')} →</Link><Link href="/evolutions" className="hover:text-white/75">{t('collections.evolutions.title')}</Link><Link href="/locations" className="hover:text-white/75">{t('collections.locations.title')}</Link></div>
        </div>
      </section>
      <section aria-label={th('exploreData')}><p className="mb-2 text-xs font-semibold uppercase text-text-muted">{th('exploreData')}</p><div className="grid grid-cols-2 divide-x divide-y divide-ink-border border-y border-ink-border bg-white/70 sm:grid-cols-4 sm:divide-y-0">{metrics.map((metric) => <Link key={metric.label} href={metric.href} className="group px-4 py-4 hover:bg-white sm:px-5"><p className="font-mono text-2xl font-bold text-primary-light">{metric.value}</p><p className="mt-1 text-[11px] font-medium uppercase text-text-muted">{metric.label} <span className="inline-block transition-transform group-hover:translate-x-1">→</span></p></Link>)}</div></section>
      <section>
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase text-primary-light">{th('databaseLabel')}</p><h2 className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl">{th('databaseTitle')}</h2></div><Link href="/dex" className="text-sm font-semibold text-primary-light">{th('viewAllData')} →</Link></div>
        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr_1fr]">
          <Link href="/dex" className="group relative min-h-56 overflow-hidden border-t-4 border-primary bg-sky-50 p-6"><h3 className="text-2xl font-bold text-text-primary">{t('home.quickLinks.dex.title')}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-text-secondary">{t('home.quickLinks.dex.desc')}</p><span className="absolute bottom-6 text-sm font-semibold text-primary-light">{allAniimos.length} {th('entries')} →</span><div className="absolute -bottom-10 -right-8 h-40 w-40 rounded-full border-[24px] border-white/70" /></Link>
          <Link href="/evolutions" className="relative min-h-56 border-t-4 border-secondary bg-emerald-50 p-6"><h3 className="text-xl font-bold text-text-primary">{t('collections.evolutions.title')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('collections.evolutions.description')}</p><span className="absolute bottom-6 text-sm font-semibold text-emerald-700">{evolutionFamilies.length} {th('families')} →</span></Link>
          <Link href="/locations" className="relative min-h-56 border-t-4 border-accent bg-rose-50 p-6"><h3 className="text-xl font-bold text-text-primary">{t('collections.locations.title')}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{t('collections.locations.description')}</p><span className="absolute bottom-6 text-sm font-semibold text-rose-700">{habitatGroups.length} {th('habitats')} →</span></Link>
        </div>
      </section>
      <section className="-mx-4 border-y border-sky-100 bg-sky-50/80 px-4 py-12 sm:-mx-6 sm:px-6 lg:rounded-lg lg:border">
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase text-emerald-700">{th('featuredLabel')}</p><h2 className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl">{th('featuredTitle')}</h2></div><Link href="/dex" className="text-sm font-semibold text-primary-light">{th('viewAllAniimo')} →</Link></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{featured.map((aniimo) => <Link key={aniimo.number} href={`/dex/${aniimo.number}`} className="group overflow-hidden rounded-md bg-white p-2 text-text-primary"><div className="relative aspect-square bg-sky-50"><Image src={aniimo.imageUrl!} alt={aniimo.name} fill sizes="(min-width: 1024px) 16vw, 50vw" className="object-contain transition-transform group-hover:scale-105" /></div><p className="mt-2 truncate text-sm font-semibold">{aniimo.name}</p><p className="text-[10px] text-text-muted">#{aniimo.number} · {aniimo.officialElements?.map((element) => t(`elements.${element}`)).join(' / ')}</p></Link>)}</div>
      </section>
      <section className="border-y border-ink-border py-5 sm:flex sm:items-center sm:gap-5">
        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-emerald-800">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {th('verificationTitle')}
        </div>
        <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary sm:mt-0">
          {th('verificationDescription')}
        </p>
        <Link href="/guide/official-aniimo-dex-status" className="mt-3 inline-flex shrink-0 text-sm font-semibold text-primary-light sm:mt-0">
          {th('coverageLink')} →
        </Link>
      </section>
      <section>
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase text-primary-light">{th('officialGuidesLabel')}</p><h2 className="mt-1 text-2xl font-bold text-text-primary">{th('guideSectionTitle')}</h2></div><Link href="/guide" className="text-sm font-semibold text-primary-light">{th('viewAllGuide')} →</Link></div>
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]"><Link href="/guide/aniimo-launch-time-preload" className="border-t-4 border-primary bg-white p-6 shadow-card"><span className="text-xs font-semibold uppercase text-primary-light">{t('guide.posts.aniimo-launch-time-preload.tag')}</span><h3 className="mt-3 text-2xl font-bold text-text-primary">{t('guide.posts.aniimo-launch-time-preload.title')}</h3><p className="mt-3 text-sm leading-6 text-text-secondary">{t('guide.posts.aniimo-launch-time-preload.subtitle')}</p><span className="mt-6 inline-flex text-sm font-semibold text-primary-light">{th('readGuide')} →</span></Link><div className="border-t border-ink-border">{guideSlugs.map((slug) => <Link key={slug} href={`/guide/${slug}`} className="block border-b border-ink-border py-4"><span className="text-[10px] font-semibold uppercase text-primary-light">{t(`guide.posts.${slug}.tag`)}</span><h3 className="mt-1 text-sm font-semibold text-text-primary">{t(`guide.posts.${slug}.title`)}</h3></Link>)}</div></div>
      </section>
    </div>
  );
}
