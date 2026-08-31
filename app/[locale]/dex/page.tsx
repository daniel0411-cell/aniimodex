'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getAllAniimos, searchAniimos } from '@/lib/aniimo';
import {
  ELEMENTS,
  ELEMENT_BADGE_CLASSES,
  ELEMENT_ICON_COLORS,
  ROLE_ICONS,
  ROLES,
} from '@/lib/aniimo-ui';
import ElementIcon from '@/components/ui/ElementIcons';
import type { AniimoEntry, Element, Role } from '@/types/aniimo';
import { cn } from '@/lib/utils';

// 元素/角色/能力选项（用于参数校验）
const VALID_ELEMENTS = ELEMENTS as string[];
const VALID_ROLES = ROLES as string[];

/** 卡片组件 */
function DexCard({ aniimo }: { aniimo: AniimoEntry }) {
  const t = useTranslations();

  return (
    <Link
      href={`/dex/${aniimo.number}`}
      className="group min-w-0 overflow-hidden rounded-lg border border-ink-border bg-ink-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
    >
      <div className="flex items-center justify-between px-3 pt-3">
        <span className="font-mono text-[11px] font-semibold text-text-muted">
          #{aniimo.number}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {t('dex.officialBasic')}
        </span>
      </div>

      <div className="relative mt-2 flex aspect-[4/3] items-center justify-center overflow-hidden bg-sky-50">
        {aniimo.imageUrl && (
          <Image
            src={aniimo.imageUrl}
            alt={aniimo.enName}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="truncate font-semibold text-text-primary group-hover:text-primary-light">
          {aniimo.name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1">
          {aniimo.officialElements?.map((item) => (
            <span key={item} className={cn('rounded border px-1.5 py-0.5 text-[10px]', ELEMENT_BADGE_CLASSES[item])}>
              {t(`elements.${item}`)}
            </span>
          ))}
          {aniimo.officialRole && (
            <span className="rounded border border-ink-border bg-white px-1.5 py-0.5 text-[10px] text-text-secondary">
              {ROLE_ICONS[aniimo.officialRole]} {t(`roles.${aniimo.officialRole}`)}
            </span>
          )}
          {aniimo.officialStage !== 'Unknown' && (
            <span className="rounded border border-ink-border bg-white px-1.5 py-0.5 text-[10px] text-text-secondary">
              {aniimo.officialStage}
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 min-h-8 text-xs leading-4 text-text-muted">
          {aniimo.description}
        </p>
      </div>
    </Link>
  );
}

/**
 * 图鉴列表页。
 * 使用客户端 useState 管理筛选，避免 useSearchParams 导致静态导出 bailout，
 * 从而保证完整伊莫列表（主要可索引内容）在服务端 HTML 中可见。
 * 由于站点为静态导出（output: 'export'），筛选状态不写入 URL，
 * canonical 始终指向 /dex/（无参数基础页面）。
 */
export default function DexPage() {
  const t = useTranslations();
  const td = useTranslations('dex');
  const locale = useLocale();
  const [element, setElement] = useState<Element | ''>('');
  const [role, setRole] = useState<Role | ''>('');
  const [q, setQ] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sort, setSort] = useState<'number' | 'name' | 'element' | 'stage'>('number');

  useEffect(() => {
    setQ(new URLSearchParams(window.location.search).get('q')?.trim() ?? '');
  }, []);

  // 过滤数据（初始无筛选 = 全量，服务端预渲染时即可见全部伊莫）
  const filtered = useMemo(() => {
    let list = getAllAniimos();
    if (element && VALID_ELEMENTS.includes(element)) {
      list = list.filter((a) => a.officialElements?.includes(element));
    }
    if (role && VALID_ROLES.includes(role)) {
      list = list.filter((a) => a.officialRole === role);
    }
    if (q) {
      list = searchAniimos(q);
    }
    return [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'element') return (a.officialElements?.[0] ?? '').localeCompare(b.officialElements?.[0] ?? '') || a.number.localeCompare(b.number);
      if (sort === 'stage') return (a.officialStage ?? '').localeCompare(b.officialStage ?? '') || a.number.localeCompare(b.number);
      return a.number.localeCompare(b.number);
    });
  }, [element, role, q, sort]);

  const hasActiveFilter = Boolean(element || role || q);
  const resetFilters = () => {
    setElement('');
    setRole('');
    setQ('');
  };

  // JSON-LD 结构化数据：CollectionPage + ItemList（基于完整图鉴数据）
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Aniimo Dex',
        description: td('title'),
        url: `${SITE_URL}/${locale}/dex/`,
      },
      {
        '@type': 'ItemList',
        name: 'Aniimo Dex list',
        itemListElement: getAllAniimos().map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: a.name,
          url: `${SITE_URL}/${locale}/dex/${a.number}/`,
        })),
      },
    ],
  };

  return (
    <div className="space-y-6 pb-8">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-ink-border pb-5 pt-2 sm:flex sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase text-primary-light">ANIIMO ARCHIVE</span>
          <h1 className="mt-1 text-3xl font-bold text-text-primary sm:text-4xl">{td('title')}</h1>
        </div>
        <p className="mt-2 font-mono text-sm text-text-secondary sm:mt-0">
          {td('subtitle', { filtered: filtered.length, total: getAllAniimos().length })}
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
      {/* 筛选栏 */}
      <aside className="rounded-md border border-ink-border bg-white/90 p-3 shadow-card backdrop-blur-xl lg:sticky lg:top-20 lg:p-4">
        <button type="button" onClick={() => setFiltersOpen((open) => !open)} className="flex w-full items-center justify-between text-left sm:hidden">
          <span className="text-sm font-semibold text-text-primary">{td('searchLabel')}</span>
          <span className="text-xs text-text-muted">{filtersOpen ? '−' : '+'}</span>
        </button>
        <div className={cn('space-y-3', !filtersOpen && 'hidden sm:block')}>
        {/* 搜索框 */}
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={td('searchPlaceholder')}
          className="h-10 w-full rounded-md border border-ink-border bg-white px-3 text-sm text-text-primary focus:border-primary-light focus:outline-none"
        />

        <label className="block text-xs text-text-muted">
          {td('sortLabel')}
          <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} className="mt-1 h-9 w-full rounded-md border border-ink-border bg-white px-2 text-sm text-text-primary">
            <option value="number">{td('sortNumber')}</option>
            <option value="name">{td('sortName')}</option>
            <option value="element">{td('sortElement')}</option>
            <option value="stage">{td('sortStage')}</option>
          </select>
        </label>

        <div className="border-l-4 border-secondary bg-emerald-50 px-3 py-2 text-xs leading-5 text-emerald-950">
          {td('officialScope')}
        </div>

        {/* 元素筛选（图标按钮） */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-10 shrink-0 text-xs text-text-muted">{td('filterElement')}</span>
          <div className="flex flex-wrap gap-1.5">
            {ELEMENTS.map((el) => {
              const active = element === el;
              return (
                <button
                  key={el}
                  type="button"
                  onClick={() => setElement(active ? '' : el)}
                  title={t(`elements.${el}`)}
                  aria-label={td('filterElementAria', { element: t(`elements.${el}`) })}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-md border transition-all',
                    active
                      ? 'border-primary bg-primary/20 shadow-glow'
                      : 'border-ink-border bg-ink-soft hover:border-primary-light hover:bg-primary/10'
                  )}
                >
                  <ElementIcon element={el} className={ELEMENT_ICON_COLORS[el]} size={18} />
                </button>
              );
            })}
          </div>
        </div>

        {/* 角色筛选 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-10 shrink-0 text-xs text-text-muted">{td('filterRole')}</span>
          <div className="flex flex-wrap gap-1.5">
            {ROLES.map((r) => {
              const active = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(active ? '' : r)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all',
                    active
                      ? 'border-primary bg-primary/20 text-primary-light'
                      : 'border-ink-border bg-ink-soft text-text-secondary hover:border-primary-light hover:text-primary-light'
                  )}
                >
                  {ROLE_ICONS[r]}
                  {t(`roles.${r}`)}
                </button>
              );
            })}
          </div>
        </div>

          {hasActiveFilter && (
            <div className="flex flex-wrap items-center gap-2 border-t border-ink-border pt-3">
              {q && <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary-hover">“{q}”</span>}
              <button type="button" onClick={resetFilters} className="text-xs font-semibold text-primary-light hover:text-primary">{td('clearAll')}</button>
            </div>
          )}
        </div>
      </aside>

      <div className="min-w-0 space-y-6">

      {/* 卡片网格 / 空状态 */}
      {filtered.length > 0 ? (
        <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((aniimo) => (
            <DexCard key={aniimo.number} aniimo={aniimo} />
          ))}
        </section>
      ) : (
        <div className="rounded-xl border border-ink-border bg-ink-card py-16 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-3 text-text-secondary">{td('emptyTitle')}</p>
          <p className="mt-1 text-sm text-text-muted">{td('emptyHint')}</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 text-sm text-primary-light hover:text-primary"
          >
            {td('resetAll')}
          </button>
        </div>
      )}

      <section className="border-t border-ink-border pt-8">
        <h2 className="text-xl font-semibold text-text-primary">{td('browseTitle')}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">
          {td('browseDescription')}
        </p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">{td('browseElements')}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {ELEMENTS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setElement(item)}
                  className="inline-flex items-center gap-1.5 rounded border border-ink-border bg-white px-2.5 py-1.5 text-xs text-text-secondary hover:border-primary-light"
                >
                  <ElementIcon element={item} className={ELEMENT_ICON_COLORS[item]} size={14} />
                  {t(`elements.${item}`)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">{td('browseRoles')}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {ROLES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className="rounded border border-ink-border bg-white px-2.5 py-1.5 text-xs text-text-secondary hover:border-primary-light"
                >
                  {ROLE_ICONS[item]} {t(`roles.${item}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary-light">
          <Link href="/evolutions">{td('browseEvolutions')} →</Link>
          <Link href="/locations">{td('browseLocations')} →</Link>
          <Link href="/abilities">{td('browseAbilities')} →</Link>
          <Link href="/tools/type-chart">{td('browseMatchups')} →</Link>
        </nav>
      </section>
      </div>
      </div>
    </div>
  );
}
