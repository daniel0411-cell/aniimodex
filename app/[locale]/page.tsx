import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import HeroSearch from '@/components/HeroSearch';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { getAllAniimos } from '@/lib/aniimo';
import { sources } from '@/data/sources';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

// 首页 metadata（locale 感知）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const siteName = meta('siteName');
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
      siteName,
      title,
      description,
      url: `${SITE_URL}/${locale}/`,
      locale: locale === 'zh-Hant' ? 'zh_TW' : locale === 'zh-Hans' ? 'zh_CN' : 'en_US',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

// 快捷入口卡片（链接不变，文案走 messages）
const quickLinkKeys = [
  {
    href: '/tools/twine',
    icon: 'Link2',
    key: 'twine',
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    href: '/tools/type-chart',
    icon: 'Zap',
    key: 'typeChart',
    accent: 'bg-sky-100 text-sky-700',
  },
  { href: '/guide', icon: 'Compass', key: 'guide', accent: 'bg-rose-100 text-rose-700' },
];

// Lucide 图标映射
const iconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  BookOpen: ({ className, size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Link2: ({ className, size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
      <line x1="8" x2="16" y1="12" y2="12" />
    </svg>
  ),
  Zap: ({ className, size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Compass: ({ className, size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const th = await getTranslations('home');
  const stats = [
    { value: getAllAniimos().length, label: th('stats.dexEntries'), tone: 'text-primary-light' },
    { value: sources.length, label: th('stats.sources'), tone: 'text-secondary-light' },
    { value: 3, label: th('stats.tools'), tone: 'text-accent-light' },
    { value: '2026.08', label: th('stats.updated'), tone: 'text-text-primary' },
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
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero 区域 */}
      <section className="relative min-h-[32rem] overflow-hidden rounded-lg sm:min-h-[38rem]">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
        </div>

        <div className="relative flex min-h-[32rem] max-w-2xl flex-col justify-end px-5 py-8 sm:min-h-[38rem] sm:px-10 sm:py-12 lg:px-14">
          <span className="mb-4 w-fit rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {th('heroBadge')}
          </span>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            AniimoDex
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
            {th('heroSubtitle')}
          </p>
          <div className="mt-6 w-full max-w-xl">
            <HeroSearch />
          </div>
          <Link
            href="/dex"
            className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white hover:text-white/80"
          >
            {t('home.quickLinks.dex.title')} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 divide-x divide-y divide-ink-border border-y border-ink-border bg-white/70 sm:grid-cols-4 sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-4 py-4 sm:px-5">
            <p className={`font-mono text-xl font-bold ${stat.tone}`}>{stat.value}</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-text-muted">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Link
          href="/dex"
          className="group relative min-h-64 overflow-hidden rounded-lg bg-sky-100 p-6 sm:p-8"
        >
          <div className="relative z-10 max-w-md">
            <span className="text-xs font-semibold uppercase text-primary-light">01 / DEX</span>
            <h2 className="mt-3 text-2xl font-bold text-text-primary sm:text-3xl">
              {t('home.quickLinks.dex.title')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {t('home.quickLinks.dex.desc')}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-light">
              {th('exploreDex')} <span aria-hidden>→</span>
            </span>
          </div>
          <div className="absolute -bottom-12 -right-5 h-56 w-56 rounded-full border-[28px] border-white/50 transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute bottom-9 right-10 text-7xl font-black text-white/80" aria-hidden>
            ?
          </div>
        </Link>

        <div className="divide-y divide-ink-border border-y border-ink-border">
          {quickLinkKeys.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <Link key={link.href} href={link.href} className="group flex items-center gap-4 py-5">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${link.accent}`}
                >
                  {Icon ? <Icon size={21} /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-text-primary group-hover:text-primary-light">
                    {t(`home.quickLinks.${link.key}.title`)}
                  </span>
                  <span className="mt-0.5 block text-sm text-text-muted">
                    {t(`home.quickLinks.${link.key}.desc`)}
                  </span>
                </span>
                <span className="text-text-muted group-hover:text-primary-light" aria-hidden>
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-l-4 border-secondary bg-white px-5 py-4 shadow-card sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-secondary-light">
            {th('verificationLabel')}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-text-primary">
            {th('verificationTitle')}
          </h2>
          <p className="mt-1 text-sm text-text-muted">{th('verificationDescription')}</p>
        </div>
        <a
          href="https://www.aniimo.com/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex shrink-0 text-sm font-semibold text-primary-light hover:text-primary-hover sm:mt-0"
        >
          {th('officialSource')} ↗
        </a>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-primary-light">
              {th('officialGuidesLabel')}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-text-primary">
              {th('officialGuidesTitle')}
            </h2>
          </div>
          <Link
            href="/guide"
            className="text-sm font-semibold text-primary-light hover:text-primary-hover"
          >
            {th('viewAllGuide')} →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {(['what-is-aniimo', 'aniimo-release-date', 'aniimo-platforms'] as const).map((slug) => (
            <Link
              key={slug}
              href={`/guide/${slug}`}
              className="group border-t-2 border-ink-border bg-white px-5 py-5 shadow-card transition-colors hover:border-primary"
            >
              <h3 className="font-semibold text-text-primary group-hover:text-primary-light">
                {t(`guide.posts.${slug}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-5 text-text-muted">
                {t(`guide.posts.${slug}.subtitle`)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
