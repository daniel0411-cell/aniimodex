import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import HeroSearch from '@/components/HeroSearch';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

// JSON-LD 结构化数据：WebSite + SearchAction + Organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'AniimoDex',
      alternateName: '伊莫图鉴与工具站',
      description:
        'AniimoDex 是中文伊莫图鉴与工具站，提供伊莫精灵资料、Twine 反查、元素克制表、捕获估算和新手攻略。',
      inLanguage: 'zh-CN',
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
      alternateName: '伊莫图鉴与工具站',
      description:
        'AniimoDex 是中文伊莫图鉴与工具站，提供伊莫精灵资料、Twine 反查、元素克制表、捕获估算和新手攻略。',
    },
  ],
};

const quickLinks: {
  href: string;
  icon: string;
  title: string;
  description: string;
  accent: string;
  recommended?: boolean;
}[] = [
  {
    href: '/dex',
    icon: '🃏',
    title: '图鉴库',
    description: '浏览 Aniimo 精灵的详细图鉴信息',
    accent: 'from-primary/20 to-primary/5',
  },
  {
    href: '/tools/twine',
    icon: '🔗',
    title: 'Twine 反查',
    description: '选择机动能力，反查对应的伊莫精灵',
    accent: 'from-accent/20 to-accent/5',
    recommended: true,
  },
  {
    href: '/tools/type-chart',
    icon: '⚡',
    title: '元素克制',
    description: '查看 9 种元素之间的克制关系',
    accent: 'from-primary/20 to-primary/5',
  },
  {
    href: '/guide',
    icon: '📖',
    title: '新手指南',
    description: '入门攻略与实用技巧合集',
    accent: 'from-accent/20 to-accent/5',
  },
];

// 占位数据：最新更新
const latestUpdates = [
  { title: '图鉴数据补充：新增区域形态', date: '2026-08-20', tag: '图鉴' },
  { title: '元素克制表 v1.0 上线', date: '2026-08-12', tag: '工具' },
  { title: 'Twine 反查功能开放测试', date: '2026-08-05', tag: '工具' },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero 区域：浅蓝到白色渐变，清新通透 */}
      <section className="space-y-8 rounded-3xl bg-gradient-to-b from-primary/20 via-primary/5 to-transparent px-4 py-12 text-center sm:py-20">
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-primary/40 bg-white/70 px-3 py-1 text-xs font-medium text-primary-hover shadow-card">
            Your Aniimo Companion
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            AniimoDex{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              - Your Aniimo Companion
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
            一站式 Aniimo 图鉴与工具站：查询精灵资料、Twine 反查、元素克制关系，尽在这里。
          </p>
        </div>

        {/* 搜索入口 */}
        <div className="mx-auto w-full max-w-xl">
          <HeroSearch />
        </div>
      </section>

      {/* 快捷入口卡片 */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href} className="group">
            <Card className="relative h-full transition-all hover:-translate-y-0.5 hover:border-primary-light hover:shadow-glow">
              {link.recommended && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent-light ring-1 ring-accent/40">
                  ⭐ 推荐工具
                </span>
              )}
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br text-2xl ${link.accent}`}
              >
                {link.icon}
              </div>
              <h3 className="font-semibold text-text-primary transition-colors group-hover:text-primary-light">
                {link.title}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">{link.description}</p>
            </Card>
          </Link>
        ))}
      </section>

      {/* 最新更新 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary">最新更新</h2>
          <Link href="/guide" className="text-sm text-primary-light transition-colors hover:text-primary">
            查看全部攻略 →
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
            加载更多
          </Button>
        </div>
      </section>
    </div>
  );
}
