import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllAniimos, getAniimoByNumber } from '@/lib/aniimo';
import { Link } from '@/i18n/navigation';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { locales } from '@/i18n/routing';
import { sourceById } from '@/data/sources';

interface PageProps {
  params: Promise<{ locale: string; number: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

// 静态导出：预生成全部 locale × 编号路由
export function generateStaticParams() {
  const numbers = getAllAniimos().map((a) => ({ number: a.number }));
  return locales.flatMap((locale) => numbers.map((n) => ({ locale, ...n })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, number } = await params;
  const aniimo = getAniimoByNumber(number);
  const t = await getTranslations({ locale, namespace: 'dexDetail' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const td = await getTranslations({ locale, namespace: 'dex' });
  const siteName = meta('siteName');

  if (!aniimo) {
    return { title: `${t('notFound')} | ${siteName}` };
  }

  const displayName = locale === 'en' ? aniimo.enName : aniimo.name;
  const title = `${displayName} Aniimo Dex | ${siteName}`;
  const description = `${td('title')}: ${aniimo.enName} (#${aniimo.number}). ${aniimo.description}`;
  const url = `${SITE_URL}/${locale}/dex/${aniimo.number}/`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: localizedLanguages(`/dex/${aniimo.number}/`),
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName,
      locale: locale === 'zh-Hant' ? 'zh_TW' : locale === 'zh-Hans' ? 'zh_CN' : 'en_US',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${aniimo.name} Dex - ${siteName}`,
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

export default async function DexDetailPage({ params }: PageProps) {
  const { locale, number } = await params;
  setRequestLocale(locale);
  const aniimo = getAniimoByNumber(number);
  if (!aniimo) notFound();

  const t = await getTranslations('dexDetail');
  const tr = await getTranslations();
  const allAniimos = getAllAniimos();
  const currentIndex = allAniimos.findIndex((entry) => entry.number === aniimo.number);
  const previous = currentIndex > 0 ? allAniimos[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? allAniimos[currentIndex + 1] : undefined;

  const url = `${SITE_URL}/${locale}/dex/${aniimo.number}/`;

  // JSON-LD 结构化数据：WebPage + BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${aniimo.name} Dex - AniimoDex`,
        description: aniimo.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: tr('breadcrumb.home'),
            item: `${SITE_URL}/${locale}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: tr('breadcrumb.dex'),
            item: `${SITE_URL}/${locale}/dex/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: aniimo.name,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-8 pb-8">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 面包屑 */}
      <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
        <Link href="/" className="hover:text-primary-light">
          {tr('breadcrumb.home')}
        </Link>
        <span className="mx-2">/</span>
        <Link href="/dex" className="hover:text-primary-light">
          {tr('breadcrumb.dex')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{aniimo.name}</span>
      </nav>

      <div className="flex items-center justify-between border-y border-ink-border py-3 text-sm">
        {previous ? <Link href={`/dex/${previous.number}`} className="text-primary-light hover:text-primary">← #{previous.number} {previous.name}</Link> : <span />}
        <Link href="/dex" className="font-semibold text-text-secondary hover:text-primary-light">{tr('breadcrumb.dex')}</Link>
        {next ? <Link href={`/dex/${next.number}`} className="text-primary-light hover:text-primary">{next.name} #{next.number} →</Link> : <span />}
      </div>

      {/* 头部 */}
      <header className="grid overflow-hidden rounded-lg border border-ink-border bg-white shadow-card md:grid-cols-[minmax(18rem,0.85fr)_1.15fr]">
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-sky-50 md:min-h-[30rem]">
          {aniimo.imageUrl && <Image src={aniimo.imageUrl} alt={aniimo.enName} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-contain" priority />}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-text-muted">
              #{aniimo.number}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t('officialBasic')}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">{aniimo.name}</h1>
          <p className="mt-1 text-text-secondary">{aniimo.enName}</p>
          <p className="mt-5 max-w-xl text-sm leading-6 text-text-secondary">
            {aniimo.description}
          </p>
          {/* 英文图鉴简介（flavor text） */}
          {aniimo.flavorText && (
            <p className="mt-2 max-w-xl text-sm italic text-text-muted">
              &ldquo;{aniimo.flavorText}&rdquo;
            </p>
          )}
          {/* 闪亮形态标记 */}
          {aniimo.shiny && (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
              <span aria-hidden>✦</span>
              {t('shinyAvailable')}
            </span>
          )}
          <div className="mt-5 border-l-4 border-secondary bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-950">{t('officialScope')}</div>
          {(aniimo.sourceIds ?? [])
            .map((sourceId) => sourceById.get(sourceId))
            .filter(Boolean)
            .map((source) => (
              <a
                key={source!.id}
                href={source!.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-xs text-primary-light underline"
              >
                {t('source')}: {source!.title} ({source!.accessedAt})
              </a>
            ))}
        </div>
      </header>

      {/* 相关工具与延伸阅读 */}
      <section className="rounded-lg border border-ink-border bg-ink-card p-5">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">{t('relatedTools')}</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/dex" className="text-primary-light transition-colors hover:text-primary">
              {tr('dex.title')}
            </Link>
          </li>
          <li>
            <Link
              href="/guide/official-aniimo-dex-status"
              className="text-primary-light transition-colors hover:text-primary"
            >
              {t('officialBasic')}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
