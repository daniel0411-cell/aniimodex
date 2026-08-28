import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Card from '@/components/ui/Card';
import Badge, { type Element } from '@/components/ui/Badge';
import { localizedLanguages } from '@/lib/i18n-metadata';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guide' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const siteName = meta('siteName');
  const title = `${t('title')} | ${siteName}`;
  const description = t('subtitle');

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guide/`,
      languages: localizedLanguages('/guide/'),
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/guide/`,
      title,
      description,
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

// 攻略文章（内容型：标题与标签目前为简体占位，多语言内容为后续工作）
const guideArticles: { title: string; tag: string; element: Element; href: string }[] = [
  { title: '快速上手：认识 Aniimo 的基础玩法', tag: '入门', element: '风', href: '/dex' },
  { title: '元素克制详解：如何搭配阵容', tag: '进阶', element: '雷', href: '/tools/type-chart' },
  { title: 'Twine 反查的使用技巧', tag: '工具', element: '光', href: '/tools/twine' },
];

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('guide');
  const tb = await getTranslations('breadcrumb');

  // JSON-LD 结构化数据：BreadcrumbList（locale 感知）
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: tb('home'),
            item: `${SITE_URL}/${locale}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('title'),
            item: `${SITE_URL}/${locale}/guide/`,
          },
        ],
      },
    ],
  };

  const relatedLinks: { href: string; key: string }[] = [
    { href: '/dex', key: 'browseDex' },
    { href: '/tools/twine', key: 'browseTwine' },
    { href: '/tools/type-chart', key: 'browseTypeChart' },
    { href: '/tools/catch', key: 'browseCatch' },
  ];

  return (
    <div className="space-y-6">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-text-primary">{t('title')}</h1>
        <p className="text-sm text-text-secondary">{t('subtitle')}</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guideArticles.map((article) => (
          <Link key={article.title} href={article.href} className="group">
            <Card className="h-full" interactive>
              <div className="flex items-center gap-2">
                <Badge label={article.tag} />
                <Badge label={article.element} element={article.element} />
              </div>
              <h3 className="mt-3 font-semibold text-text-primary transition-colors group-hover:text-primary-light">
                {article.title}
              </h3>
            </Card>
          </Link>
        ))}
      </section>

      <section className="rounded-xl border border-ink-border bg-ink-card p-5">
        <h2 className="text-lg font-bold text-text-primary">{t('relatedTools')}</h2>
        <p className="mt-1 text-sm text-text-secondary">{t('relatedDesc')}</p>
        <ul className="mt-3 space-y-2 text-sm">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-primary-light transition-colors hover:text-primary"
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
