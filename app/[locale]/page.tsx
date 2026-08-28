import type { Metadata } from 'next';
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
  { href: '/dex', icon: '🃏', key: 'dex', accent: 'from-primary/20 to-primary/5' },
  {
    href: '/tools/twine',
    icon: '🔗',
    key: 'twine',
    accent: 'from-accent/20 to-accent/5',
    recommended: true,
  },
  {
    href: '/tools/type-chart',
    icon: '⚡',
    key: 'typeChart',
    accent: 'from-primary/20 to-primary/5',
  },
  { href: '/guide', icon: '📖', key: 'guide', accent: 'from-accent/20 to-accent/5' },
];

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
      <section className="space-y-8 rounded-3xl bg-gradient-to-b from-primary/20 via-primary/5 to-transparent px-4 py-12 text-center sm:py-20">
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-primary/40 bg-white/70 px-3 py-1 text-xs font-medium text-primary-hover shadow-card">
            {th('heroBadge')}
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
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
        <div className="mx-auto w-full max-w-xl">
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
                  ⭐ {th('recommended')}
                </span>
              )}
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br text-2xl ${link.accent}`}
              >
                {link.icon}
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
