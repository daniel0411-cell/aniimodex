import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { getGuidePost, getPublishedGuidePosts } from '@/data/guides';
import { locales } from '@/i18n/routing';
import { sourceById } from '@/data/sources';
import { getLaunchGuide } from '@/data/launch-guides';
import { formIndex } from '@/data/forms';
import { getAniimoByNumber } from '@/lib/aniimo';
import AniimoLinkList from '@/components/dex/AniimoLinkList';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';
const SUPPORT_GUIDE_SLUGS = new Set([
  'aniimo-release-date',
  'aniimo-platforms',
  'how-to-download-aniimo',
  'aniimo-mobile',
  'aniimo-ps5',
  'aniimo-launch-time-preload',
  'aniimo-crossplay-cross-save',
  'aniimo-system-requirements',
  'is-aniimo-free-to-play',
]);

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedGuidePosts().map((post) => ({ locale, slug: post.slug }))
  );
}

/** 文章正文块类型 */
type Block =
  | { t: 'p' | 'h' | 'h3' | 'li' | 'quote'; c: string }
  | { t: 'table'; head: string[]; rows: string[][] };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getGuidePost(slug);
  const t = await getTranslations({ locale, namespace: 'guide.posts' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const siteName = meta('siteName');

  if (!post || post.published === false) {
    return { title: siteName };
  }

  const launchGuide = getLaunchGuide(locale, post.slug);
  const title = `${launchGuide?.title ?? t(`${post.slug}.title`)} | ${siteName}`;
  const description = launchGuide?.subtitle ?? t(`${post.slug}.subtitle`);
  const path = `/guide/${slug}/`;

  return {
    title,
    description,
    robots: { index: Boolean(post.sourceIds?.length), follow: true },
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      languages: localizedLanguages(path),
    },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/${locale}${path}`,
      title,
      description,
      publishedTime: post.date,
      images: post.image ? [{ url: `${SITE_URL}${post.image}` }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.image ? [`${SITE_URL}${post.image}`] : undefined,
    },
  };
}

export default async function GuidePostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getGuidePost(slug);
  const t = await getTranslations('guide');
  const tp = await getTranslations('guide.posts');
  const tg = await getTranslations('guide');
  const tb = await getTranslations('breadcrumb');
  const meta = await getTranslations('meta');
  const siteName = meta('siteName');

  if (!post || post.published === false) notFound();

  // 文章标题与正文（正文为结构化块数组，直接从原始 messages 读取避免 next-intl 干扰）
  const launchGuide = getLaunchGuide(locale, post.slug);
  const title = launchGuide?.title ?? tp(`${post.slug}.title`);
  const subtitle = launchGuide?.subtitle ?? tp(`${post.slug}.subtitle`);
  const tag = launchGuide?.tag ?? tp(`${post.slug}.tag`);
  const lead = launchGuide?.lead ?? tp(`${post.slug}.lead`);
  const messages = await getMessages();
  const body = post.dataTopic
    ? (['meaning', 'confirmed', 'unknown'] as const).flatMap((key) => [
        { t: 'h', c: tg(`dataTopics.${post.dataTopic}.${key}.heading`) },
        { t: 'p', c: tg(`dataTopics.${post.dataTopic}.${key}.content`) },
      ] as Block[])
    : (launchGuide?.body ?? messages.guide.posts[post.slug].body ?? []) as Block[];
  const sources = (post.sourceIds ?? [])
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source) => source !== undefined);
  const sourceCheckedAt = sources.reduce(
    (latest, source) => source.accessedAt > latest ? source.accessedAt : latest,
    ''
  );
  const outline = body
    .map((block, index) => block.t === 'h' || block.t === 'h3' ? { index, label: block.c, level: block.t } : null)
    .filter((item) => item !== null);
  const faqItems = body.flatMap((block, index) => {
    if ((block.t !== 'h' && block.t !== 'h3') || !block.c.endsWith('?')) return [];
    const answer = body[index + 1];
    return answer?.t === 'p' ? [{ question: block.c, answer: answer.c }] : [];
  });

  // 相关工具：href → 翻译 key 映射
  const toolLinkKeys: Record<string, string> = {
    '/dex': 'browseDex',
    '/tools/twine': 'browseTwine',
    '/tools/type-chart': 'browseTypeChart',
    '/tools/catch': 'browseCatch',
  };
  const toolLinks = (post.relatedToolHrefs ?? []).map((href) => ({
    href,
    label: t(toolLinkKeys[href] ?? 'relatedTools'),
  }));

  // JSON-LD 结构化数据：Article + BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: title,
        description: subtitle,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: locale,
        image: post.image ? [`${SITE_URL}${post.image}`] : undefined,
        mainEntityOfPage: `${SITE_URL}/${locale}/guide/${post.slug}/`,
        publisher: {
          '@type': 'Organization',
          name: siteName,
        },
      },
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
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: `${SITE_URL}/${locale}/guide/${post.slug}/`,
          },
        ],
      },
      ...(faqItems.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }] : []),
    ],
  };

  // 按段落渲染正文块
  const renderedBody: ReactNode[] = [];
  let listBuffer: string[] = [];
  const flushList = (key: string) => {
    if (listBuffer.length) {
      renderedBody.push(
        <ul key={key} className="my-4 list-disc space-y-2 pl-5 text-text-primary">
          {listBuffer.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  body.forEach((block, i) => {
    if (block.t === 'li') {
      listBuffer.push(block.c);
      return;
    }
    flushList(`list-${i}`);
    if (block.t === 'h') {
      renderedBody.push(
        <h2 id={`section-${i}`} key={i} className="scroll-mt-24 mb-3 mt-8 text-xl font-bold text-text-primary">
          {block.c}
        </h2>
      );
    } else if (block.t === 'h3') {
      renderedBody.push(
        <h3 id={`section-${i}`} key={i} className="scroll-mt-24 mb-2 mt-6 text-lg font-semibold text-text-primary">
          {block.c}
        </h3>
      );
    } else if (block.t === 'p') {
      renderedBody.push(
        <p key={i} className="my-4 leading-relaxed text-text-primary">
          {block.c}
        </p>
      );
    } else if (block.t === 'quote') {
      renderedBody.push(
        <blockquote
          key={i}
          className="my-4 border-l-4 border-primary bg-ink-card px-4 py-3 text-sm italic text-text-primary"
        >
          {block.c}
        </blockquote>
      );
    } else if (block.t === 'table') {
      renderedBody.push(
        <div key={i} className="my-4 overflow-x-auto rounded-lg border border-ink-border">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="bg-ink-card">
                {block.head.map((cell, ci) => (
                  <th key={ci} className="px-4 py-2 text-left font-semibold text-primary-light">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-ink-border">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2 text-text-primary">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  });
  flushList('list-end');

  return (
    <div className="space-y-6">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: t('title'), href: '/guide/' }, { label: title }]} />

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
      <article>
        {/* 文章横幅图 */}
        {post.image && (
          <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-ink-border">
            <Image
              src={post.image}
              alt={post.imageAlt ?? ''}
              fill
              sizes="(min-width: 1024px) 100vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
        <header className="space-y-3 border-b border-ink-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge label={tag} />
            {post.element && <Badge label={post.element} element={post.element} />}
          </div>
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{title}</h1>
          <p className="text-base text-text-muted">{subtitle}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
            <span>{t('pageUpdated', { date: post.date })}</span>
            {sourceCheckedAt && <span>{t('sourceChecked', { date: sourceCheckedAt })}</span>}
            <span>
              {post.readMinutes} {t('minRead')}
            </span>
          </div>
          {sources.length > 0 && (
            <div className="border-l-4 border-secondary bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
              <strong>{t('verifiedOfficial')}</strong>
              <span className="ml-2">{t('lastVerified', { date: post.date })}</span>
            </div>
          )}
          {post.slug === 'aniimo-pre-registration' && (
            <div className="border-l-4 border-accent bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-950">
              <strong>{locale === 'en' ? 'Post-launch status:' : locale === 'zh-Hant' ? '上線後狀態：' : '上线后状态：'}</strong>{' '}
              {locale === 'en' ? 'Use official store links to download the game. Pre-registration reward eligibility depends on the current campaign terms, account, region and platform.' : locale === 'zh-Hant' ? '請透過官方商店連結下載遊戲；預約獎勵資格以目前活動條款、帳號、地區和平台為準。' : '请通过官方商店链接下载游戏；预约奖励资格以当前活动条款、账号、地区和平台为准。'}
            </div>
          )}
          <p className="mt-3 text-base leading-relaxed text-text-primary">{lead}</p>
        </header>

        <div className="pt-2">{renderedBody}</div>

        {post.slug === 'aniimo-forms-explained' && (
          <section className="mt-8 border-t border-ink-border pt-6">
            <h2 className="text-xl font-bold text-text-primary">
              {locale === 'en' ? 'Official Prismana and region form directory' : locale === 'zh-Hant' ? '官方 Prismana 與區域形態目錄' : '官方 Prismana 与区域形态目录'}
            </h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {locale === 'en' ? 'Members below come directly from the official Wiki morphology snapshot. A listed form name does not establish stat, element or ability differences.' : locale === 'zh-Hant' ? '以下成員直接來自官方 Wiki 形態快照。列出形態名不代表已確認屬性、元素或能力差異。' : '以下成员直接来自官方 Wiki 形态快照。列出形态名不代表已确认属性、元素或能力差异。'}
            </p>
            <div className="mt-5 space-y-5">
              {formIndex.filter((group) => group.kind !== 'basic').map((group) => {
                const members = group.numbers.map(getAniimoByNumber).filter((entry) => entry !== undefined);
                return (
                  <div key={group.name} className="border-t border-ink-border pt-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-semibold text-text-primary">{group.name}</h3>
                      <span className="text-xs text-text-muted">{members.length}</span>
                    </div>
                    <AniimoLinkList aniimos={members} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {SUPPORT_GUIDE_SLUGS.has(post.slug) && (
          <nav className="mt-8 grid gap-3 border-y border-ink-border py-5 sm:grid-cols-2" aria-label={t('relatedArticles')}>
            <Link href="/guide/aniimo-launch-checklist-known-issues" className="border-l-4 border-accent bg-rose-50 px-4 py-3 text-sm font-semibold text-text-primary">
              {getLaunchGuide(locale, 'aniimo-launch-checklist-known-issues')!.title} <span className="text-primary-light">→</span>
            </Link>
            <Link href="/guide/is-aniimo-a-gacha-game" className="border-l-4 border-secondary bg-emerald-50 px-4 py-3 text-sm font-semibold text-text-primary">
              {tp('is-aniimo-a-gacha-game.title')} <span className="text-primary-light">→</span>
            </Link>
          </nav>
        )}

        {sources.length > 0 && (
          <section className="mt-8 border-t border-ink-border pt-6">
            <h2 className="text-lg font-bold text-text-primary">{t('officialSources')}</h2>
            <ul className="mt-3 space-y-3">
              {sources.map((source) => (
                <li key={source.id}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary-light hover:text-primary-hover"
                  >
                    {source.title} ↗
                  </a>
                  <p className="mt-1 text-xs leading-5 text-text-muted">{source.evidence}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      {outline.length > 0 && (
        <aside className="lg:sticky lg:top-20">
          <details className="border-y border-ink-border py-3 lg:hidden"><summary className="cursor-pointer text-sm font-semibold text-text-primary">{t('tableOfContents')}</summary><nav className="mt-3 space-y-2">{outline.map((item) => <a key={item.index} href={`#section-${item.index}`} className="block text-sm text-primary-light">{item.label}</a>)}</nav></details>
          <nav className="hidden border-t border-ink-border lg:block"><p className="py-3 text-sm font-semibold text-text-primary">{t('tableOfContents')}</p>{outline.map((item) => <a key={item.index} href={`#section-${item.index}`} className={`block border-t border-ink-border py-2 text-xs text-text-secondary hover:text-primary-light ${item.level === 'h3' ? 'pl-3' : ''}`}>{item.label}</a>)}</nav>
        </aside>
      )}
      </div>

      {/* 相关工具 */}
      {toolLinks.length > 0 && (
        <section className="rounded-xl border border-ink-border bg-ink-card p-5">
          <h2 className="text-lg font-bold text-text-primary">{t('relatedTools')}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {toolLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-primary-light transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 相关文章 */}
      {post.relatedSlugs && post.relatedSlugs.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold text-text-primary">{t('relatedArticles')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {post.relatedSlugs.map((relSlug) => {
              const rel = getGuidePost(relSlug);
              if (!rel) return null;
              const relatedLaunchGuide = getLaunchGuide(locale, rel.slug);
              return (
                <Link key={relSlug} href={`/guide/${relSlug}`} className="group">
                  <Card className="flex h-full flex-col" interactive>
                    <Badge label={relatedLaunchGuide ? relatedLaunchGuide.tag : tp(`${rel.slug}.tag`)} />
                    <h3 className="mt-3 font-semibold text-text-primary transition-colors group-hover:text-primary-light">
                      {relatedLaunchGuide ? relatedLaunchGuide.title : tp(`${rel.slug}.title`)}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-text-muted">
                      {relatedLaunchGuide ? relatedLaunchGuide.subtitle : tp(`${rel.slug}.subtitle`)}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
