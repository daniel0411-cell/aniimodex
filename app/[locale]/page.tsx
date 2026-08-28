import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import HeroSearch from '@/components/HeroSearch';
import { localizedLanguages } from '@/lib/i18n-metadata';

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

// JSON-LD 结构化数据：WebSite + SearchAction + Organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'AniimoDex',
      alternateName: 'Aniimo Dex & Tools',
      description:
        'AniimoDex is an all-in-one Aniimo companion: browse the dex, look up Twine abilities, check elemental matchups and plan captures.',
      inLanguage: ['en', 'zh-Hant', 'zh-Hans'],
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/dex?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      url: `${SITE_URL}/`,
      name: 'AniimoDex',
      alternateName: 'Aniimo Dex & Tools',
      description:
        'AniimoDex is an all-in-one Aniimo companion: browse the dex, look up Twine abilities, check elemental matchups and plan captures.',
    },
  ],
};

// 快捷入口卡片（链接不变，文案走 messages）
const quickLinkKeys = [
  { href: '/dex', icon: 'BookOpen', key: 'dex', accent: 'from-primary/20 to-primary/5' },
  {
    href: '/tools/twine',
    icon: 'Link2',
    key: 'twine',
    accent: 'from-accent/20 to-accent/5',
    recommended: true,
  },
  {
    href: '/tools/type-chart',
    icon: 'Zap',
    key: 'typeChart',
    accent: 'from-primary/20 to-primary/5',
  },
  { href: '/guide', icon: 'Compass', key: 'guide', accent: 'from-accent/20 to-accent/5' },
];

// Lucide 图标映射
const iconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  BookOpen: ({ className, size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Link2: ({ className, size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/>
    </svg>
  ),
  Zap: ({ className, size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Compass: ({ className, size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const th = await getTranslations('home');

  // 占位数据：最新更新（标题为内容型，先保留简体，后续可本地化）
  const latestUpdates = [
    { title: '图鉴数据补充：新增区域形态', date: '2026-08-20', tag: '图鉴' },
    { title: '元素克制表 v1.0 上线', date: '2026-08-12', tag: '工具' },
    { title: 'Twine 反查功能开放测试', date: '2026-08-05', tag: '工具' },
  ];

  return (
    <div className="space-y-16">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero 区域 */}
      <section className="relative overflow-hidden rounded-3xl px-4 py-12 text-center sm:py-20">
        {/* 卡通背景图 */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/70" />
        </div>
        {/* 浮动装饰 */}
        <div className="pointer-events-none absolute left-[10%] top-[15%] h-3 w-3 rounded-full bg-primary/30 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="pointer-events-none absolute right-[15%] top-[20%] h-2 w-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="pointer-events-none absolute left-[20%] bottom-[25%] h-2.5 w-2.5 rounded-full bg-primary-light/30 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
        <div className="pointer-events-none absolute right-[10%] bottom-[20%] h-3 w-3 rounded-full bg-accent/25 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }} />

        <div className="relative space-y-4">
          <span className="inline-block rounded-full border border-primary/40 bg-white/80 px-3 py-1 text-xs font-medium text-primary-hover shadow-card backdrop-blur-sm">
            {th('heroBadge')}
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary drop-shadow-sm sm:text-5xl lg:text-6xl">
            AniimoDex{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {th('heroTitleGradient')}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
            {th('heroSubtitle')}
          </p>
        </div>

        {/* 搜索入口 */}
        <div className="relative mx-auto mt-8 w-full max-w-xl">
          <HeroSearch />
        </div>
      </section>

      {/* 快捷入口卡片 */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinkKeys.map((link) => (
          <Link key={link.href} href={link.href} className="group">
            <Card className="relative h-full transition-all hover:-translate-y-0.5 hover:border-primary-light hover:shadow-glow">
              {link.recommended && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent-light ring-1 ring-accent/40">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  {th('recommended')}
                </span>
              )}
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-primary ${link.accent}`}
              >
                {(() => {
                  const Icon = iconMap[link.icon];
                  return Icon ? <Icon size={22} /> : null;
                })()}
              </div>
              <h3 className="font-semibold text-text-primary transition-colors group-hover:text-primary-light">
                {t(`home.quickLinks.${link.key}.title`)}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {t(`home.quickLinks.${link.key}.desc`)}
              </p>
            </Card>
          </Link>
        ))}
      </section>

      {/* 最新更新 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary">{th('latestUpdates')}</h2>
          <Link href="/guide" className="text-sm text-primary-light transition-colors hover:text-primary">
            {th('viewAllGuide')} →
          </Link>
        </div>
        <div className="divide-y divide-ink-border rounded-xl border border-ink-border bg-ink-card">
          {latestUpdates.map((item) => (
            <div key={item.title} className="flex items-center gap-3 px-5 py-4">
              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary-light">
                {item.tag}
              </span>
              <span className="flex-1 text-sm text-text-primary">{item.title}</span>
              <time className="shrink-0 text-xs text-text-muted">{item.date}</time>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <Button variant="secondary" size="sm">
            {th('loadMore')}
          </Button>
        </div>
      </section>
    </div>
  );
}
