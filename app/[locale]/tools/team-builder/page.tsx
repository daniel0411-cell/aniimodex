import assets from '@/data/editorial-images.json';
import { imageMetadata } from '@/lib/editorial-images';
import EditorialFigure from '@/components/guide/EditorialFigure';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Link } from '@/i18n/navigation';
import TeamBuilder from '@/components/tools/TeamBuilder';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export default async function TeamBuilderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('teamBuilder');
  const tr = await getTranslations();

  const representative = assets[`team-${locale}` as keyof typeof assets];
  const screenshot = { '@type': 'ImageObject', ...imageMetadata(representative) };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t('title'),
    description: t('subtitle'),
    url: `${SITE_URL}/${locale}/tools/team-builder/`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    image: screenshot,
    screenshot,
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[{ label: tr('breadcrumb.tools'), href: '/tools' }, { label: t('title') }]}
      />

      <header className="space-y-2 border-b border-ink-border pb-5">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{t('title')}</h1>
        <p className="max-w-3xl text-sm leading-6 text-text-secondary sm:text-base">
          {t('subtitle')}
        </p>
      </header>

      <TeamBuilder />

      <details className="border-t border-ink-border pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-primary-light">{locale === 'en' ? 'How to read the member cards: Example A' : locale === 'zh-Hant' ? '如何閱讀成員卡片：範例 A' : '如何阅读成员卡片：示例 A'}</summary>
        <EditorialFigure image={representative} locale={locale} />
      </details>

      <section className="border-t border-ink-border pt-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted">
          {tr('tools.databaseTitle')}
        </h2>
        <nav
          className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-primary-light"
          aria-label="Related tools"
        >
          <Link href="/tools/type-chart">{tr('tools.typeChartTitle')} →</Link>
          <Link href="/tools/twine">{tr('tools.twineTitle')} →</Link>
          <Link href="/tools/catch">{tr('tools.catchTitle')} →</Link>
          <Link href="/dex">{tr('tools.browseDex')} →</Link>
        </nav>
      </section>
    </div>
  );
}
