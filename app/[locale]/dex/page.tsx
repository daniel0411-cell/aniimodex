'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getAllAniimos, searchAniimos } from '@/lib/aniimo';
import {
  ELEMENTS,
  ELEMENT_BADGE_CLASSES,
  ELEMENT_GRADIENTS,
  ELEMENT_ICON_COLORS,
  ROLE_ICONS,
  ROLE_BADGE_CLASSES,
  ROLES,
  TWINE_ABILITIES,
  TWINE_ICONS,
} from '@/lib/aniimo-ui';
import ElementIcon from '@/components/ui/ElementIcons';
import type { AniimoEntry, Element, Role, TwineAbility } from '@/types/aniimo';
import { cn } from '@/lib/utils';

// 元素/角色/能力选项（用于参数校验）
const VALID_ELEMENTS = ELEMENTS as string[];
const VALID_ROLES = ROLES as string[];
const VALID_TWINE = TWINE_ABILITIES as string[];

/** 卡片组件 */
function DexCard({ aniimo }: { aniimo: AniimoEntry }) {
  const t = useTranslations();
  const elementLabel = t(`elements.${aniimo.element}`);
  const roleLabel = t(`roles.${aniimo.role}`);
  const twineLabel = t(`twineAbility.${aniimo.twineAbility}`);

  return (
    <Link
      href={`/dex/${aniimo.number}`}
      className="group rounded-2xl border border-ink-border bg-ink-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary-light hover:shadow-glow"
    >
      {/* 头部：编号 + Twine 图标 */}
      <div className="flex items-start justify-between">
        <span className="text-xs font-mono text-text-muted">#{aniimo.number}</span>
        <span title={t('dex.twineTitle', { name: twineLabel })} className="text-sm opacity-70">
          {TWINE_ICONS[aniimo.twineAbility]}
        </span>
      </div>

      {/* 头像占位（渐变） */}
      <div
        className={cn(
          'mx-auto mt-3 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110',
          ELEMENT_GRADIENTS[aniimo.element]
        )}
      >
        <ElementIcon element={aniimo.element} className={ELEMENT_ICON_COLORS[aniimo.element]} size={36} />
      </div>

      {/* 名称 */}
      <h3 className="mt-3 text-center font-semibold text-text-primary group-hover:text-primary-light">
        {aniimo.name}
      </h3>
      <p className="text-center text-xs text-text-muted">{aniimo.enName}</p>

      {/* 标签：元素 + 角色 */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2 py-0.5 text-xs',
            ELEMENT_BADGE_CLASSES[aniimo.element]
          )}
        >
          {elementLabel}
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs',
            ROLE_BADGE_CLASSES[aniimo.role]
          )}
        >
          {ROLE_ICONS[aniimo.role]}
          {roleLabel}
        </span>
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
  const [twine, setTwine] = useState<TwineAbility | ''>('');
  const [q, setQ] = useState('');

  useEffect(() => {
    setQ(new URLSearchParams(window.location.search).get('q')?.trim() ?? '');
  }, []);

  // 过滤数据（初始无筛选 = 全量，服务端预渲染时即可见全部伊莫）
  const filtered = useMemo(() => {
    let list = getAllAniimos();
    if (element && VALID_ELEMENTS.includes(element)) {
      list = list.filter((a) => a.element === element || a.forms.some((f) => f.element === element));
    }
    if (role && VALID_ROLES.includes(role)) {
      list = list.filter((a) => a.role === role || a.forms.some((f) => f.role === role));
    }
    if (twine && VALID_TWINE.includes(twine)) {
      list = list.filter(
        (a) => a.twineAbility === twine || a.forms.some((f) => f.twineAbility === twine)
      );
    }
    if (q) {
      list = searchAniimos(q);
    }
    return list;
  }, [element, role, twine, q]);

  const hasActiveFilter = Boolean(element || role || twine || q);
  const resetFilters = () => {
    setElement('');
    setRole('');
    setTwine('');
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
    <div className="space-y-6">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-text-primary">{td('title')}</h1>
        <p className="text-sm text-text-secondary">
          {td('subtitle', { filtered: filtered.length, total: getAllAniimos().length })}
        </p>
      </header>

      {/* 筛选栏 */}
      <div className="space-y-3 rounded-xl border border-ink-border bg-ink-card p-4">
        {/* 搜索框 */}
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={td('searchPlaceholder')}
          className="w-full rounded-lg border border-ink-border bg-ink-soft px-3 py-2 text-sm text-text-primary focus:border-primary-light focus:outline-none"
        />

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
                    'flex h-9 w-9 items-center justify-center rounded-xl border transition-all',
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

        {/* Twine 能力筛选（下拉） */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-10 shrink-0 text-xs text-text-muted">{td('filterTwine')}</span>
          <select
            value={twine}
            onChange={(e) => setTwine(e.target.value as TwineAbility | '')}
            className="rounded-lg border border-ink-border bg-ink-soft px-3 py-1.5 text-xs text-text-primary focus:border-primary-light focus:outline-none"
          >
            <option value="">{td('allTwine')}</option>
            {TWINE_ABILITIES.map((tw) => (
              <option key={tw} value={tw}>
                {t(`twineAbility.${tw}`)}
              </option>
            ))}
          </select>
        </div>

        {/* 清除筛选 */}
        {hasActiveFilter && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-primary-light hover:text-primary"
          >
            ✕ {td('clearAll')}
          </button>
        )}
      </div>

      {/* 卡片网格 / 空状态 */}
      {filtered.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
    </div>
  );
}
