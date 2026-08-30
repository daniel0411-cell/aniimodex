import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { getPublishedGuidePosts } from '@/data/guides';

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

export default async function GuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('guide');
  const tp = await getTranslations('guide.posts');
  const tb = await getTranslations('breadcrumb');
  const guidePosts = getPublishedGuidePosts();
  const groups = [
    { key: 'playDownload', slugs: ['aniimo-release-date', 'aniimo-platforms', 'is-aniimo-free-to-play', 'how-to-download-aniimo', 'aniimo-mobile', 'aniimo-nintendo-switch'] },
    { key: 'gameplay', slugs: ['what-is-aniimo', 'aniimo-twine-explained', 'aniimo-catching-guide', 'aniimo-multiplayer'] },
    { key: 'updates', slugs: ['official-aniimo-dex-status', 'aniimo-pre-registration', 'aniimo-system-requirements'] },
  ];

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

      {groups.map((group) => (
        <section key={group.key}>
          <div className="mb-4 border-b border-ink-border pb-3">
            <h2 className="text-xl font-bold text-text-primary">{t(`groups.${group.key}.title`)}</h2>
            <p className="mt-1 text-sm text-text-muted">{t(`groups.${group.key}.description`)}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {group.slugs.map((slug) => guidePosts.find((post) => post.slug === slug)).filter((post) => post !== undefined).map((post) => (
          <Link key={post.slug} href={`/guide/${post.slug}`} className="group">
            <Card className="flex h-full flex-col overflow-hidden" interactive>
              {/* 卡片缩略图 */}
              {post.image && (
                <div className="relative mb-3 aspect-[16/8] w-full overflow-hidden rounded-lg">
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? ''}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Badge label={tp(`${post.slug}.tag`)} />
                {post.element && <Badge label={post.element} element={post.element} />}
              </div>
              <h3 className="mt-3 font-semibold text-text-primary transition-colors group-hover:text-primary-light">
                {tp(`${post.slug}.title`)}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                {tp(`${post.slug}.subtitle`)}
              </p>
              <div className="mt-auto flex items-center justify-between pt-3 text-xs text-text-muted">
                <span>{post.date}</span>
                <span>
                  {post.readMinutes} {t('minRead')}
                </span>
              </div>
            </Card>
          </Link>
          ))}
          </div>
        </section>
      ))}

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
