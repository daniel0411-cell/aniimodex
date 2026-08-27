'use client';

import { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getAllAniimos, searchAniimos } from '@/lib/aniimo';
import SearchInput from '@/components/ui/SearchInput';
import {
  ELEMENTS,
  ELEMENT_ICONS,
  ELEMENT_LABELS,
  ELEMENT_BADGE_CLASSES,
  ELEMENT_GRADIENTS,
  ROLE_ICONS,
  ROLE_LABELS,
  ROLE_BADGE_CLASSES,
  ROLES,
  TWINE_ABILITIES,
  TWINE_ICONS,
  TWINE_LABELS,
} from '@/lib/aniimo-ui';
import type { AniimoEntry, Element, Role, TwineAbility } from '@/types/aniimo';

// 元素/角色/能力选项（用于参数校验）
const VALID_ELEMENTS = ELEMENTS as string[];
const VALID_ROLES = ROLES as string[];
const VALID_TWINE = TWINE_ABILITIES as string[];

/** 卡片组件 */
function DexCard({ aniimo }: { aniimo: AniimoEntry }) {
  return (
    <Link
      href={`/dex/${aniimo.number}`}
      className="group rounded-xl border border-ink-border bg-ink-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary-light hover:shadow-glow"
    >
      {/* 头部：编号 + Twine 图标 */}
      <div className="flex items-start justify-between">
        <span className="text-xs font-mono text-text-muted">#{aniimo.number}</span>
        <span title={`Twine：${TWINE_LABELS[aniimo.twineAbility]}`} className="text-sm opacity-70">
          {TWINE_ICONS[aniimo.twineAbility]}
        </span>
      </div>

      {/* 头像占位（渐变） */}
      <div
        className={cn(
          'mx-auto mt-3 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br text-4xl transition-transform duration-300 group-hover:scale-110',
          ELEMENT_GRADIENTS[aniimo.element]
        )}
      >
        {ELEMENT_ICONS[aniimo.element]}
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
          {ELEMENT_LABELS[aniimo.element]}
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs',
            ROLE_BADGE_CLASSES[aniimo.role]
          )}
        >
          {ROLE_ICONS[aniimo.role]}
          {ROLE_LABELS[aniimo.role]}
        </span>
      </div>
    </Link>
  );
}

/** 列表页主体（内部组件，包裹于 Suspense 以支持 useSearchParams） */
function DexContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 从 URL 读取筛选状态
  const element = (searchParams.get('element') ?? '') as Element | '';
  const role = (searchParams.get('role') ?? '') as Role | '';
  const twine = (searchParams.get('twine') ?? '') as TwineAbility | '';
  const q = searchParams.get('q') ?? '';

  /** 更新 URL 参数并保持其他参数 */
  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.replace(`/dex?${params.toString()}`);
  };

  // 过滤数据
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

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-text-primary">Aniimo 图鉴</h1>
        <p className="text-sm text-text-secondary">共 {filtered.length} / {getAllAniimos().length} 只伊莫</p>
      </header>

      {/* 筛选栏 */}
      <div className="space-y-3 rounded-xl border border-ink-border bg-ink-card p-4">
        {/* 搜索框 */}
        <SearchInput
          placeholder="搜索名称、编号、关键词…"
          delay={300}
          onSearch={(value) => updateParams({ q: value })}
        />

        {/* 元素筛选（图标按钮） */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-10 shrink-0 text-xs text-text-muted">元素</span>
          <div className="flex flex-wrap gap-1.5">
            {ELEMENTS.map((el) => {
              const active = element === el;
              return (
                <button
                  key={el}
                  type="button"
                  onClick={() => updateParams({ element: active ? '' : el })}
                  title={ELEMENT_LABELS[el]}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg border text-base transition-all',
                    active
                      ? 'border-primary bg-primary/20 shadow-glow'
                      : 'border-ink-border bg-ink-soft hover:border-primary-light hover:bg-primary/10'
                  )}
                >
                  {ELEMENT_ICONS[el]}
                </button>
              );
            })}
          </div>
        </div>

        {/* 角色筛选 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-10 shrink-0 text-xs text-text-muted">角色</span>
          <div className="flex flex-wrap gap-1.5">
            {ROLES.map((r) => {
              const active = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => updateParams({ role: active ? '' : r })}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all',
                    active
                      ? 'border-primary bg-primary/20 text-primary-light'
                      : 'border-ink-border bg-ink-soft text-text-secondary hover:border-primary-light hover:text-primary-light'
                  )}
                >
                  {ROLE_ICONS[r]}
                  {ROLE_LABELS[r]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Twine 能力筛选（下拉） */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-10 shrink-0 text-xs text-text-muted">Twine</span>
          <select
            value={twine}
            onChange={(e) => updateParams({ twine: e.target.value })}
            className="rounded-lg border border-ink-border bg-ink-soft px-3 py-1.5 text-xs text-text-primary focus:border-primary-light focus:outline-none"
          >
            <option value="">全部能力</option>
            {TWINE_ABILITIES.map((t) => (
              <option key={t} value={t}>
                {TWINE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        {/* 清除筛选 */}
        {hasActiveFilter && (
          <button
            type="button"
            onClick={() => router.replace('/dex')}
            className="text-xs text-primary-light hover:text-primary"
          >
            ✕ 清除全部筛选
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
          <p className="mt-3 text-text-secondary">没有找到符合条件的伊莫</p>
          <p className="mt-1 text-sm text-text-muted">试试调整筛选条件或更换关键词</p>
          <button
            type="button"
            onClick={() => router.replace('/dex')}
            className="mt-4 text-sm text-primary-light hover:text-primary"
          >
            重置全部筛选
          </button>
        </div>
      )}
    </div>
  );
}

export default function DexPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-text-muted">加载中…</div>}>
      <DexContent />
    </Suspense>
  );
}
