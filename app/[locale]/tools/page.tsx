import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { localizedLanguages } from '@/lib/i18n-metadata';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tools' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const siteName = meta('siteName');
  const title = `${t('title')} | ${siteName}`;
  const description = t('subtitle');

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/tools/`,
      languages: localizedLanguages('/tools/'),
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/tools/`,
      title,
      description,
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

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('tools');
  const tb = await getTranslations('breadcrumb');

  const tools = [
    {
      href: '/tools/twine',
      icon: '🔗',
      titleKey: 'twineTitle',
      descKey: 'twineDesc',
      tagsKey: 'twineTags',
      tone: 'border-secondary bg-emerald-50/70',
    },
    {
      href: '/tools/type-chart',
      icon: '⚔',
      titleKey: 'typeChartTitle',
      descKey: 'typeChartDesc',
      tagsKey: 'typeChartTags',
      tone: 'border-primary bg-sky-50/70',
    },
    {
      href: '/tools/catch',
      icon: '📡',
      titleKey: 'catchTitle',
      descKey: 'catchDesc',
      tagsKey: 'catchTags',
      tone: 'border-accent bg-rose-50/70',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Breadcrumb items={[{ label: tb('tools') }]} />

      <header className="max-w-2xl space-y-2 border-b border-ink-border pb-5">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{t('title')}</h1>
        <p className="text-sm text-text-secondary sm:text-base">{t('subtitle')}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group rounded-md border-t-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover ${tool.tone}`}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white/80 text-2xl shadow-sm">
                {tool.icon}
              </span>
              <span className="text-text-muted transition-all group-hover:translate-x-1 group-hover:text-primary-light">
                →
              </span>
            </div>
            <h3 className="mt-4 font-semibold text-text-primary transition-colors group-hover:text-primary-light">
              {t(tool.titleKey)}
            </h3>
            <p className="mt-1 text-sm text-text-secondary">{t(tool.descKey)}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(t.raw(tool.tagsKey) as string[]).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink-border bg-ink-soft px-2 py-0.5 text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
