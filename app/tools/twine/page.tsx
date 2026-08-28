'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getAllAniimos, filterByTwineAbilities } from '@/lib/aniimo';
import type { AniimoEntry, TwineAbility } from '@/types/aniimo';
import { ELEMENT_LABELS, ELEMENT_BADGE_CLASSES, TWINE_ICONS, TWINE_BADGE_CLASSES } from '@/lib/aniimo-ui';

// ---------------------------------------------------------------------------
// 能力选项定义（英文标识用于匹配，中文用于 TwineAbility 匹配）
// ---------------------------------------------------------------------------
interface AbilityOption {
  id: string;
  label: TwineAbility;
}

const ABILITY_OPTIONS: AbilityOption[] = [
  { id: 'fly', label: '飞行' },
  { id: 'swim', label: '游泳' },
  { id: 'dig', label: '遁地' },
  { id: 'climb', label: '攀岩' },
  { id: 'ram', label: '冲撞' },
];

/**
 * Twine 能力反查器。
 * 使用客户端 useState 管理选中能力，避免 useSearchParams 导致静态导出 bailout，
 * 从而保证全量伊莫列表（主要可索引内容）在服务端 HTML 中可见。
 * 由于站点为静态导出，筛选状态不写入 URL，canonical 指向 /tools/twine/ 基础页。
 */
export default function TwinePage() {
  // 选中能力 id 列表（空 = 全部）
  const [selected, setSelected] = useState<string[]>([]);

  const allAniimos = useMemo(() => getAllAniimos(), []);

  // 依并集过滤：匹配任一选中能力
  const results = useMemo(() => {
    const abilities = selected
      .map((id) => ABILITY_OPTIONS.find((o) => o.id === id)?.label)
      .filter((a): a is TwineAbility => Boolean(a));
    return filterByTwineAbilities(abilities);
  }, [selected]);

  const allSelected = selected.length === 0;

  /** 切换某个能力（选中/取消） */
  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  /** 清空所有选择 */
  function selectAll() {
    setSelected([]);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Twine 能力反查器</h1>
        <p className="text-sm text-text-secondary sm:text-base">
          选择你需要的机动能力，找到对应的伊莫
        </p>
      </header>

      {/* 能力选择区 */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-text-secondary">选择机动能力</h2>
        <div className="flex flex-wrap gap-2.5">
          {/* 全部按钮 */}
          <button
            type="button"
            onClick={selectAll}
            aria-pressed={allSelected}
            className={cn(
              'inline-flex min-w-[72px] items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all',
              allSelected
                ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                : 'border-ink-border bg-ink-card text-text-secondary hover:border-primary/50 hover:text-text-primary'
            )}
          >
            全部
          </button>

          {ABILITY_OPTIONS.map((opt) => {
            const active = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
                aria-pressed={active}
                className={cn(
                  'inline-flex min-w-[72px] items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all',
                  active
                    ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                    : 'border-ink-border bg-ink-card text-text-secondary hover:border-primary/50 hover:text-text-primary'
                )}
              >
                <span aria-hidden>{TWINE_ICONS[opt.label]}</span>
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 结果统计 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          找到 <span className="font-semibold text-primary-light">{results.length}</span> 只伊莫
        </p>
        {!allSelected && (
          <button
            type="button"
            onClick={selectAll}
            className="text-sm text-primary-light transition-colors hover:text-primary"
          >
            清空筛选
          </button>
        )}
      </div>

      {/* 结果列表 */}
      {results.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {results.map((aniimo) => (
            <li key={aniimo.number}>
              <AniimoRow aniimo={aniimo} activeIds={selected} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed border-ink-border bg-ink-card px-6 py-12 text-center">
          <p className="text-text-muted">没有符合条件的结果，试试调整能力选择。</p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 单只伊莫结果卡片
// ---------------------------------------------------------------------------
function AniimoRow({ aniimo, activeIds }: { aniimo: AniimoEntry; activeIds: string[] }) {
  const highlighted = activeIds.some(
    (id) => aniimo.twineAbility === ABILITY_OPTIONS.find((o) => o.id === id)?.label
  );
  return (
    <Link
      href={`/dex/${aniimo.number}`}
      className="group flex items-center gap-3 rounded-xl border border-ink-border bg-ink-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary-light hover:shadow-glow"
    >
      {/* 编号 */}
      <span className="shrink-0 text-sm font-semibold text-text-muted">#{aniimo.number}</span>

      {/* 名称 + 元素 */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold text-text-primary transition-colors group-hover:text-primary-light">
            {aniimo.name}
          </h3>
          <span className="shrink-0 text-xs text-text-muted">{aniimo.enName}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
              ELEMENT_BADGE_CLASSES[aniimo.element]
            )}
          >
            {ELEMENT_LABELS[aniimo.element]}
          </span>
        </div>
      </div>

      {/* Twine 能力标签 */}
      <span
        className={cn(
          'inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
          TWINE_BADGE_CLASSES[aniimo.twineAbility],
          highlighted && 'ring-1 ring-primary/40'
        )}
      >
        <span aria-hidden>{TWINE_ICONS[aniimo.twineAbility]}</span>
        {aniimo.twineAbility}
      </span>
    </Link>
  );
}
