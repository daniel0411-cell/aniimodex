import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
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
  const tc = await getTranslations('collections');
  const guidePosts = getPublishedGuidePosts();
  const groups = [
    { key: 'playDownload', slugs: ['aniimo-release-date', 'aniimo-launch-time-preload', 'aniimo-platforms', 'is-aniimo-free-to-play', 'how-to-download-aniimo', 'aniimo-mobile', 'aniimo-nintendo-switch'] },
    { key: 'gameplay', slugs: ['what-is-aniimo', 'aniimo-twine-explained', 'aniimo-catching-guide', 'aniimo-multiplayer', 'aniimo-crossplay-cross-save'] },
    { key: 'updates', slugs: ['official-aniimo-dex-status', 'aniimo-launch-coverage-status', 'aniimo-language-controller-support', 'aniimo-pre-registration', 'aniimo-system-requirements'] },
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
  const collectionLinks = [
    { href: '/evolutions', label: tc('evolutions.title') },
    { href: '/locations', label: tc('locations.title') },
    { href: '/abilities', label: tc('abilities.title') },
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
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {group.slugs.map((slug) => guidePosts.find((post) => post.slug === slug)).filter((post) => post !== undefined).slice(0, 1).map((post) => (
              <Link key={post.slug} href={`/guide/${post.slug}`} className="border-t-4 border-primary bg-white p-5 shadow-card">
                <span className="text-xs font-semibold uppercase text-primary-light">{tp(`${post.slug}.tag`)}</span>
                <h3 className="mt-2 text-xl font-bold text-text-primary">{tp(`${post.slug}.title`)}</h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{tp(`${post.slug}.subtitle`)}</p>
                <p className="mt-4 text-xs text-text-muted">{post.date} · {post.readMinutes} {t('minRead')} · {post.sourceIds?.length ?? 0} {t('sources')}</p>
              </Link>
            ))}
            <div className="border-t border-ink-border">
              {group.slugs.map((slug) => guidePosts.find((post) => post.slug === slug)).filter((post) => post !== undefined).slice(1).map((post) => (
                <Link key={post.slug} href={`/guide/${post.slug}`} className="grid gap-1 border-b border-ink-border py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                  <span className="text-sm font-semibold text-text-primary">{tp(`${post.slug}.title`)}</span>
                  <span className="text-xs text-text-muted">{post.date} · {post.sourceIds?.length ?? 0} {t('sources')}</span>
                </Link>
              ))}
            </div>
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
          {collectionLinks.map((link) => (
            <li key={link.href}><Link href={link.href} className="text-primary-light transition-colors hover:text-primary">{link.label}</Link></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
