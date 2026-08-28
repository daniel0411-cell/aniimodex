import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { getAllAniimos, getAniimoByNumber } from '@/lib/aniimo';
import {
  ELEMENT_ICONS,
  ELEMENT_BADGE_CLASSES,
  ELEMENT_GRADIENTS,
  ROLE_ICONS,
  ROLE_BADGE_CLASSES,
  TWINE_ICONS,
  TWINE_BADGE_CLASSES,
} from '@/lib/aniimo-ui';
import { Link } from '@/i18n/navigation';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { locales } from '@/i18n/routing';
import type { AniimoEntry, BaseStats, EvolutionStage, Potential } from '@/types/aniimo';

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
  const elements = await getTranslations({ locale, namespace: 'elements' });
  const roles = await getTranslations({ locale, namespace: 'roles' });
  const twineAb = await getTranslations({ locale, namespace: 'twineAbility' });
  const siteName = meta('siteName');

  if (!aniimo) {
    return { title: `${t('notFound')} | ${siteName}` };
  }

  const habitatText =
    aniimo.spawn.habitats.map((h) => h.region).join('、') || t('unknownCondition');
  const twineText = twineAb(aniimo.twineAbility);
  const title = `${aniimo.name} Dex | ${siteName}`;
  const description = `${td('title')}: ${aniimo.name} (${aniimo.enName}, #${aniimo.number}), ${
    elements(aniimo.element)
  } ${roles(aniimo.role)}, Twine ${twineText}, ${habitatText}.`;
  const url = `${SITE_URL}/${locale}/dex/${aniimo.number}/`;

  return {
    title,
    description,
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

// ---- 基础属性条 ----
const STAT_LABELS: Record<keyof BaseStats, string> = {
  hp: 'HP',
  atk: 'ATK',
  def: 'DEF',
  spd: 'SPD',
  heal: 'HEAL',
  break: 'BREAK',
};

const STAT_COLORS: Record<keyof BaseStats, string> = {
  hp: 'bg-red-500',
  atk: 'bg-orange-500',
  def: 'bg-sky-500',
  spd: 'bg-yellow-400',
  heal: 'bg-green-500',
  break: 'bg-purple-500',
};

function StatBar({ label, value, max }: { label: string; value: number; max: number }) {
  const key = label as keyof BaseStats;
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 shrink-0 text-xs font-medium text-text-muted">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-soft">
        <div
          className={cn('h-full rounded-full transition-all', STAT_COLORS[key])}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right font-mono text-xs text-text-primary">{value}</span>
    </div>
  );
}

// ---- 进化阶段节点 ----
const STAGE_ORDER: EvolutionStage[] = ['Lumin', 'Gamma', 'Nova'];

async function EvolutionPanel({ aniimo }: { aniimo: AniimoEntry }) {
  const t = await getTranslations('dexDetail');
  const stages = STAGE_ORDER.slice(STAGE_ORDER.indexOf(aniimo.evolution.startStage));

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* 自身节点 */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ring-2 ring-primary-light',
            ELEMENT_GRADIENTS[aniimo.element]
          )}
        >
          {ELEMENT_ICONS[aniimo.element]}
        </div>
        <span className="mt-1 text-xs font-semibold text-text-primary">{aniimo.name}</span>
        <span className="text-[10px] text-text-muted">{aniimo.evolution.startStage}</span>
      </div>

      {/* 分支 */}
      {aniimo.evolution.branches.map((branch) => {
        const target = getAniimoByNumber(branch.target);
        const condText = branch.prerequisites
          .map((p) => {
            if (p.raw) return p.raw;
            const parts: string[] = [];
            if (p.level) parts.push(`Lv.${p.level}`);
            if (p.item) parts.push(p.item);
            if (p.timeOfDay) parts.push(p.timeOfDay === 'day' ? t('timeDay') : t('timeNight'));
            if (p.weather) parts.push(p.weather);
            return parts.join(' + ') || t('unknownCondition');
          })
          .join(` ${t('and')} `);
        return (
          <div key={branch.target} className="flex items-center gap-2">
            {/* 箭头 + 条件 */}
            <div className="flex flex-col items-center px-1 text-center">
              <span className="text-primary-light">→</span>
              <span className="max-w-24 text-[10px] leading-tight text-text-muted">{condText}</span>
            </div>
            {/* 目标节点 */}
            {target ? (
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br text-2xl',
                    ELEMENT_GRADIENTS[target.element]
                  )}
                >
                  {ELEMENT_ICONS[target.element]}
                </div>
                <span className="mt-1 text-xs font-semibold text-text-primary">{target.name}</span>
                <span className="text-[10px] text-text-muted">{branch.stage}</span>
              </div>
            ) : (
              <span className="text-xs text-text-muted">? → {branch.target}</span>
            )}
          </div>
        );
      })}

      {/* 无可进化分支 */}
      {aniimo.evolution.branches.length === 0 && (
        <span className="ml-2 rounded-full border border-ink-border px-3 py-1 text-xs text-text-muted">
          {t('finalForm')}
        </span>
      )}
    </div>
  );
}

// ---- 潜力分布 ----
const POTENTIAL_ORDER: Potential[] = ['Common', 'Good', 'Elite', 'Perfect'];

const POTENTIAL_COLORS: Record<Potential, string> = {
  Common: 'bg-slate-500',
  Good: 'bg-sky-500',
  Elite: 'bg-primary',
  Perfect: 'bg-accent',
};

function PotentialBar({ label, value }: { label: string; value: number | 'unavailable' }) {
  const pct = value === 'unavailable' ? 0 : value;
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 shrink-0 text-xs text-text-secondary">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-soft">
        <div
          className={cn('h-full rounded-full', POTENTIAL_COLORS[label as Potential])}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right font-mono text-xs text-text-primary">
        {value === 'unavailable' ? '—' : `${value}%`}
      </span>
    </div>
  );
}

// ---- 相关推荐 ----
async function RelatedAniimos({ aniimo }: { aniimo: AniimoEntry }) {
  const all = getAllAniimos();
  const t = await getTranslations();
  const related = all
    .filter((a) => a.number !== aniimo.number)
    .map((a) => {
      let score = 0;
      if (a.element === aniimo.element) score += 2;
      if (a.role === aniimo.role) score += 2;
      if (a.forms.some((f) => f.element === aniimo.element)) score += 1;
      if (a.forms.some((f) => f.role === aniimo.role)) score += 1;
      return { aniimo: a, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {related.map(({ aniimo: a }) => (
        <Link
          key={a.number}
          href={`/dex/${a.number}`}
          className="group flex items-center gap-3 rounded-xl border border-ink-border bg-ink-card p-3 transition-all hover:-translate-y-0.5 hover:border-primary-light"
        >
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xl',
              ELEMENT_GRADIENTS[a.element]
            )}
          >
            {ELEMENT_ICONS[a.element]}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text-primary group-hover:text-primary-light">
              {a.name}
            </p>
            <p className="text-xs text-text-muted">
              #{a.number} · {t(`elements.${a.element}`)} · {t(`roles.${a.role}`)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default async function DexDetailPage({ params }: PageProps) {
  const { locale, number } = await params;
  setRequestLocale(locale);
  const aniimo = getAniimoByNumber(number);
  if (!aniimo) notFound();

  const t = await getTranslations('dexDetail');
  const tr = await getTranslations();
  const elementLabel = tr(`elements.${aniimo.element}`);
  const roleLabel = tr(`roles.${aniimo.role}`);
  const twineLabel = tr(`twineAbility.${aniimo.twineAbility}`);

  const maxStat = Math.max(...Object.values(aniimo.stats).map((v) => v ?? 0));
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
        description: `${aniimo.name} ${elementLabel} ${roleLabel}, Twine ${twineLabel}.`,
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
    <div className="space-y-8">
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

      {/* 头部 */}
      <header className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        {/* 大图占位（渐变） */}
        <div
          className={cn(
            'flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-7xl shadow-glow',
            ELEMENT_GRADIENTS[aniimo.element]
          )}
        >
          {ELEMENT_ICONS[aniimo.element]}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="font-mono text-sm text-text-muted">#{aniimo.number}</span>
            <h1 className="text-3xl font-bold text-text-primary">{aniimo.name}</h1>
          </div>
          <p className="text-text-secondary">{aniimo.enName}</p>
          <div className="mt-3 flex items-center justify-center gap-2 sm:justify-start">
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm',
                ELEMENT_BADGE_CLASSES[aniimo.element]
              )}
            >
              {ELEMENT_ICONS[aniimo.element]}
              {elementLabel}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm',
                ROLE_BADGE_CLASSES[aniimo.role]
              )}
            >
              {ROLE_ICONS[aniimo.role]}
              {roleLabel}
            </span>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
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
          {aniimo.dataSource === 'placeholder' && (
            <p className="mt-2 text-xs text-accent-light">
              ⚠ {t('placeholderData', { note: aniimo.note ?? '?' })}
            </p>
          )}
        </div>
      </header>

      {/* 基础属性面板 */}
      <section className="rounded-xl border border-ink-border bg-ink-card p-5">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">{t('baseStats')}</h2>
        <div className="space-y-2.5">
          {(Object.keys(STAT_LABELS) as (keyof BaseStats)[])
            .filter((k) => aniimo.stats[k] !== undefined)
            .map((k) => (
              <StatBar key={k} label={STAT_LABELS[k]} value={aniimo.stats[k]!} max={maxStat} />
            ))}
        </div>
      </section>

      {/* 进化路线 */}
      <section className="rounded-xl border border-ink-border bg-ink-card p-5">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">{t('evolution')}</h2>
        <EvolutionPanel aniimo={aniimo} />
      </section>

      {/* Twine 能力 + 出现条件 */}
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-ink-border bg-ink-card p-5">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">{t('twineAbility')}</h2>
          <div
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm',
              TWINE_BADGE_CLASSES[aniimo.twineAbility]
            )}
          >
            <span>{TWINE_ICONS[aniimo.twineAbility]}</span>
            {twineLabel}
          </div>
          <p className="mt-3 text-sm text-text-muted">
            {aniimo.twineAbility === '无'
              ? t('noSpecialMove')
              : t('canInteract', { ability: twineLabel })}
          </p>
        </section>

        <section className="rounded-xl border border-ink-border bg-ink-card p-5">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">{t('spawnConditions')}</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-text-muted">{t('habitat')}</dt>
              <dd className="text-text-primary">
                {aniimo.spawn.habitats.map((h) => h.region).join('、') || t('unknownCondition')}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-text-muted">{t('weather')}</dt>
              <dd className="text-text-primary">{aniimo.spawn.weather}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-text-muted">{t('time')}</dt>
              <dd className="text-text-primary">{aniimo.spawn.time}</dd>
            </div>
            {aniimo.spawn.phenomenon && (
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 text-text-muted">{t('phenomenon')}</dt>
                <dd className="text-accent-light">
                  {aniimo.spawn.phenomenon.name}（{aniimo.spawn.phenomenon.description}）
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      {/* 形态列表 */}
      {aniimo.forms.length > 1 && (
        <section className="rounded-xl border border-ink-border bg-ink-card p-5">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">{t('forms')}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aniimo.forms.map((form) => (
              <div key={form.name} className="rounded-lg border border-ink-border bg-ink-soft p-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary">{form.name}</span>
                  <span className="ml-auto flex gap-1.5">
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-xs',
                        ELEMENT_BADGE_CLASSES[form.element]
                      )}
                    >
                      {tr(`elements.${form.element}`)}
                    </span>
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-xs',
                        ROLE_BADGE_CLASSES[form.role]
                      )}
                    >
                      {tr(`roles.${form.role}`)}
                    </span>
                  </span>
                </div>
                {form.description && (
                  <p className="mt-2 text-sm text-text-muted">{form.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 潜力分布 */}
      <section className="rounded-xl border border-ink-border bg-ink-card p-5">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">{t('potential')}</h2>
        <div className="space-y-2.5">
          {POTENTIAL_ORDER.map((p) => (
            <PotentialBar key={p} label={p} value={aniimo.potential[p]} />
          ))}
        </div>
      </section>

      {/* 相关推荐 */}
      <section className="rounded-xl border border-ink-border bg-ink-card p-5">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">{t('related')}</h2>
        <RelatedAniimos aniimo={aniimo} />
      </section>

      {/* 相关工具与延伸阅读 */}
      <section className="rounded-xl border border-ink-border bg-ink-card p-5">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">{t('relatedTools')}</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/dex" className="text-primary-light transition-colors hover:text-primary">
              {t('browseAll', { element: elementLabel })}
            </Link>
          </li>
          <li>
            <Link
              href="/tools/twine"
              className="text-primary-light transition-colors hover:text-primary"
            >
              {t('browseTwine')}
            </Link>
          </li>
          <li>
            <Link
              href="/tools/type-chart"
              className="text-primary-light transition-colors hover:text-primary"
            >
              {t('browseTypeChart', { element: elementLabel })}
            </Link>
          </li>
          <li>
            <Link
              href="/tools/catch"
              className="text-primary-light transition-colors hover:text-primary"
            >
              {t('browseCatch', { name: aniimo.name })}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
