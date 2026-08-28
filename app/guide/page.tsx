import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge, { type Element } from '@/components/ui/Badge';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

export const metadata: Metadata = {
  title: '伊莫攻略：新手入门、培养、捕获与探索指南 | AniimoDex',
  description:
    '整理伊莫新手攻略、前期培养建议、捕获技巧、元素搭配、Twine 使用和探索指南。',
  alternates: {
    canonical: `${SITE_URL}/guide/`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/guide/`,
    title: '伊莫攻略：新手入门、培养、捕获与探索指南 | AniimoDex',
    description:
      '整理伊莫新手攻略、前期培养建议、捕获技巧、元素搭配、Twine 使用和探索指南。',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AniimoDex 攻略',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '伊莫攻略：新手入门、培养、捕获与探索指南 | AniimoDex',
    description:
      '整理伊莫新手攻略、前期培养建议、捕获技巧、元素搭配、Twine 使用和探索指南。',
    images: [`${SITE_URL}/og-image.png`],
  },
};

const guideArticles: { title: string; tag: string; element: Element; href: string }[] = [
  { title: '快速上手：认识 Aniimo 的基础玩法', tag: '入门', element: '风', href: '/dex' },
  { title: '元素克制详解：如何搭配阵容', tag: '进阶', element: '雷', href: '/tools/type-chart' },
  { title: 'Twine 反查的使用技巧', tag: '工具', element: '光', href: '/tools/twine' },
];

// JSON-LD 结构化数据：BreadcrumbList + 文章索引
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '攻略',
          item: `${SITE_URL}/guide/`,
        },
      ],
    },
  ],
};

export default function GuidePage() {
  return (
    <div className="space-y-6">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-text-primary">伊莫攻略</h1>
        <p className="text-sm text-text-secondary">新手教程与进阶攻略</p>
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
        <h2 className="text-lg font-bold text-text-primary">相关工具</h2>
        <p className="mt-1 text-sm text-text-secondary">
          搭配使用以下工具，规划你的探索与队伍搭配：
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link href="/dex" className="text-primary-light transition-colors hover:text-primary">
              浏览完整伊莫图鉴，查询属性与获取方式
            </Link>
          </li>
          <li>
            <Link href="/tools/twine" className="text-primary-light transition-colors hover:text-primary">
              使用 Twine 反查工具，按机动能力查找伊莫
            </Link>
          </li>
          <li>
            <Link href="/tools/type-chart" className="text-primary-light transition-colors hover:text-primary">
              查看伊莫元素克制表，了解属性相克关系
            </Link>
          </li>
          <li>
            <Link href="/tools/catch" className="text-primary-light transition-colors hover:text-primary">
              使用伊莫捕获估算器，提前准备捕获资源
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
