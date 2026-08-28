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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

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

  const title = `${t(`${post.slug}.title`)} | ${siteName}`;
  const description = t(`${post.slug}.subtitle`);
  const path = `/guide/${slug}/`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
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
      images: [
        {
          url: `${SITE_URL}${post.image}`,
          width: 1200,
          height: 760,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}${post.image}`],
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
  const tb = await getTranslations('breadcrumb');
  const meta = await getTranslations('meta');
  const siteName = meta('siteName');

  if (!post || post.published === false) notFound();

  // 文章标题与正文（正文为结构化块数组，直接从原始 messages 读取避免 next-intl 干扰）
  const title = tp(`${post.slug}.title`);
  const subtitle = tp(`${post.slug}.subtitle`);
  const tag = tp(`${post.slug}.tag`);
  const lead = tp(`${post.slug}.lead`);
  const messages = await getMessages();
  const body = (messages.guide.posts[post.slug].body ?? []) as Block[];

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
        inLanguage: locale,
        image: [`${SITE_URL}${post.image}`],
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
        <h2 key={i} className="mb-3 mt-8 text-xl font-bold text-text-primary">
          {block.c}
        </h2>
      );
    } else if (block.t === 'h3') {
      renderedBody.push(
        <h3 key={i} className="mb-2 mt-6 text-lg font-semibold text-text-primary">
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
                  <th
                    key={ci}
                    className="px-4 py-2 text-left font-semibold text-primary-light"
                  >
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
      <Breadcrumb
        items={[
          { label: t('title'), href: '/guide/' },
          { label: title },
        ]}
      />

      <article>
        {/* 文章横幅图 */}
        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-ink-border">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(min-width: 1024px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <header className="space-y-3 border-b border-ink-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge label={tag} />
            {post.element && <Badge label={post.element} element={post.element} />}
          </div>
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{title}</h1>
          <p className="text-base text-text-muted">{subtitle}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
            <span>{post.date}</span>
            <span>
              {post.readMinutes} {t('minRead')}
            </span>
          </div>
          <p className="mt-3 text-base leading-relaxed text-text-primary">{lead}</p>
        </header>

        <div className="pt-2">{renderedBody}</div>
      </article>

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
          <h2 className="mb-3 text-lg font-bold text-text-primary">
            {t('relatedArticles')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {post.relatedSlugs.map((relSlug) => {
              const rel = getGuidePost(relSlug);
              if (!rel) return null;
              return (
                <Link key={relSlug} href={`/guide/${relSlug}`} className="group">
                  <Card className="flex h-full flex-col" interactive>
                    <Badge label={tp(`${rel.slug}.tag`)} />
                    <h3 className="mt-3 font-semibold text-text-primary transition-colors group-hover:text-primary-light">
                      {tp(`${rel.slug}.title`)}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-text-muted">
                      {tp(`${rel.slug}.subtitle`)}
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
