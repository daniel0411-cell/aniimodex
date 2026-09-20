'use client';

// ============================================================================
// Twine / mobility 反查工具的交互部分（客户端岛）
// ----------------------------------------------------------------------------
// 选项与候选数据由服务端 page.tsx 预先生成后传入，避免把 272KB 的
// official-wiki-details.json 打进客户端 bundle。
// 能力名称为官方英文专名，中文短名/说明从 messages 读取，缺失时回退英文原文。
// ============================================================================

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ELEMENT_BADGE_CLASSES, mobilityBadgeClass } from '@/lib/aniimo-ui';
import type { Element } from '@/types/aniimo';

export interface TwineLookupOption {
  name: string;
  description?: string;
  iconUrl?: string;
  count: number;
}

export interface TwineLookupEntry {
  number: string;
  name: string;
  enName: string;
  element: Element;
  mobility: string[];
}

interface TwineLookupProps {
  options: TwineLookupOption[];
  entries: TwineLookupEntry[];
  coveredCount: number;
  totalCount: number;
}

export default function TwineLookup({
  options,
  entries,
  coveredCount,
  totalCount,
}: TwineLookupProps) {
  const t = useTranslations('twineTool');
  const tr = useTranslations();
  // 选中的 mobility 名称（空 = 全部）
  const [selected, setSelected] = useState<string[]>([]);

  // 并集反查：匹配任一选中能力
  const results = useMemo(() => {
    if (selected.length === 0) return entries;
    const wanted = new Set(selected);
    return entries.filter((entry) => entry.mobility.some((name) => wanted.has(name)));
  }, [entries, selected]);

  const allSelected = selected.length === 0;

  function toggle(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  }

  function selectAll() {
    setSelected([]);
  }

  /** mobility 为官方英文专名；有本地化短名时优先展示 */
  function mobilityLabel(name: string): string {
    return tr.has(`mobilityNames.${name}`) ? tr(`mobilityNames.${name}`) : name;
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
      {/* 能力选择区 */}
      <section className="space-y-3 border-t-4 border-primary bg-white p-4 lg:sticky lg:top-20">
        <h2 className="text-sm font-medium text-text-secondary">{t('selectAbility')}</h2>
        <p className="text-xs leading-5 text-text-muted">
          {t('coverage', { covered: coveredCount, total: totalCount })}
        </p>
        <div className="grid gap-2">
          {/* 全部按钮 */}
          <button
            type="button"
            onClick={selectAll}
            aria-pressed={allSelected}
            className={cn(
              'inline-flex min-w-[72px] items-center justify-start gap-2 rounded-md border px-3 py-2.5 text-sm font-medium transition-all',
              allSelected
                ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                : 'border-ink-border bg-ink-card text-text-secondary hover:border-primary/50 hover:text-text-primary'
            )}
          >
            {t('all')}
          </button>

          {options.map((option) => {
            const active = selected.includes(option.name);
            return (
              <button
                key={option.name}
                type="button"
                onClick={() => toggle(option.name)}
                aria-pressed={active}
                className={cn(
                  'inline-flex items-center justify-start gap-2 rounded-md border px-3 py-2.5 text-left text-sm font-medium transition-all',
                  active
                    ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                    : 'border-ink-border bg-ink-card text-text-secondary hover:border-primary/50 hover:text-text-primary'
                )}
              >
                {option.iconUrl ? (
                  <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded">
                    <Image
                      src={option.iconUrl}
                      alt=""
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </span>
                ) : (
                  <span aria-hidden className="h-6 w-6 shrink-0 rounded bg-ink-soft" />
                )}
                <span className="min-w-0 flex-1 truncate">{mobilityLabel(option.name)}</span>
                <span className="shrink-0 text-xs text-text-muted">{option.count}</span>
              </button>
            );
          })}
        </div>
        <Link href="/abilities" className="inline-flex text-sm font-semibold text-primary-light">
          {t('browseAbilities')} →
        </Link>
      </section>

      <div className="min-w-0 space-y-4">
        {/* 结果统计 */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            {t.rich('found', { count: results.length, b: (chunks) => <b>{chunks}</b> })}
          </p>
          {!allSelected && (
            <button
              type="button"
              onClick={selectAll}
              className="text-sm text-primary-light transition-colors hover:text-primary"
            >
              {t('clear')}
            </button>
          )}
        </div>

        {/* 结果列表 */}
        {results.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {results.map((entry) => (
              <li key={entry.number}>
                <Link
                  href={`/dex/${entry.number}`}
                  className="group flex items-start gap-3 rounded-md border border-ink-border bg-ink-card p-4 transition-all hover:border-primary-light hover:shadow-card"
                >
                  <span className="shrink-0 pt-0.5 text-sm font-semibold text-text-muted">
                    #{entry.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-semibold text-text-primary transition-colors group-hover:text-primary-light">
                        {entry.name}
                      </h3>
                      <span className="shrink-0 text-xs text-text-muted">{entry.enName}</span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                          ELEMENT_BADGE_CLASSES[entry.element]
                        )}
                      >
                        {tr(`elements.${entry.element}`)}
                      </span>
                      {entry.mobility.length > 0 ? (
                        entry.mobility.map((name) => (
                          <span
                            key={name}
                            className={cn(
                              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                              mobilityBadgeClass(name),
                              selected.includes(name) && 'ring-1 ring-primary/40'
                            )}
                          >
                            {mobilityLabel(name)}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-text-muted">{t('noMobility')}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-md border border-dashed border-ink-border bg-ink-card px-6 py-12 text-center">
            <p className="text-text-muted">{t('empty')}</p>
            <button
              type="button"
              onClick={selectAll}
              className="mt-3 text-sm font-semibold text-primary-light"
            >
              {t('clear')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
