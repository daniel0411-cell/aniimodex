'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getAllAniimos, filterByTwineAbilities } from '@/lib/aniimo';
import type { AniimoEntry, TwineAbility } from '@/types/aniimo';
import { ELEMENT_BADGE_CLASSES, TWINE_ICONS, TWINE_BADGE_CLASSES } from '@/lib/aniimo-ui';

// 能力选项定义（英文标识用于匹配，值用于 TwineAbility 匹配）
interface AbilityOption {
  id: string;
  value: TwineAbility;
}

const ABILITY_OPTIONS: AbilityOption[] = [
  { id: 'fly', value: '飞行' },
  { id: 'swim', value: '游泳' },
  { id: 'dig', value: '遁地' },
  { id: 'climb', value: '攀岩' },
  { id: 'ram', value: '冲撞' },
];

/**
 * Twine 能力反查器。
 * 使用客户端 useState 管理选中能力，避免 useSearchParams 导致静态导出 bailout，
 * 从而保证全量伊莫列表（主要可索引内容）在服务端 HTML 中可见。
 * 由于站点为静态导出，筛选状态不写入 URL，canonical 指向 /tools/twine/ 基础页。
 */
export default function TwinePage() {
  const t = useTranslations('twineTool');
  const tr = useTranslations();
  // 选中能力 id 列表（空 = 全部）
  const [selected, setSelected] = useState<string[]>([]);

  const allAniimos = useMemo(() => getAllAniimos(), []);

  // 依并集过滤：匹配任一选中能力
  const results = useMemo(() => {
    const abilities = selected
      .map((id) => ABILITY_OPTIONS.find((o) => o.id === id)?.value)
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
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{t('title')}</h1>
        <p className="text-sm text-text-secondary sm:text-base">{t('subtitle')}</p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
      {/* 能力选择区 */}
      <section className="space-y-3 border-t-4 border-primary bg-white p-4 lg:sticky lg:top-20">
        <h2 className="text-sm font-medium text-text-secondary">{t('selectAbility')}</h2>
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

          {ABILITY_OPTIONS.map((opt) => {
            const active = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
                aria-pressed={active}
                className={cn(
                  'inline-flex min-w-[72px] items-center justify-start gap-2 rounded-md border px-3 py-2.5 text-sm font-medium transition-all',
                  active
                    ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                    : 'border-ink-border bg-ink-card text-text-secondary hover:border-primary/50 hover:text-text-primary'
                )}
              >
                <span aria-hidden>{TWINE_ICONS[opt.value]}</span>
                {tr(`twineAbility.${opt.value}`)}
              </button>
            );
          })}
        </div>
        <Link href="/abilities" className="inline-flex text-sm font-semibold text-primary-light">{t('browseAbilities')} →</Link>
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
          {results.map((aniimo) => (
            <li key={aniimo.number}>
              <AniimoRow aniimo={aniimo} activeIds={selected} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-md border border-dashed border-ink-border bg-ink-card px-6 py-12 text-center">
          <p className="text-text-muted">{t('empty')}</p>
          <button type="button" onClick={selectAll} className="mt-3 text-sm font-semibold text-primary-light">{t('clear')}</button>
        </div>
      )}
      </div>
      </div>
    </div>
  );
}

// 单只伊莫结果卡片
function AniimoRow({ aniimo, activeIds }: { aniimo: AniimoEntry; activeIds: string[] }) {
  const tr = useTranslations();
  const highlighted = activeIds.some(
    (id) => aniimo.twineAbility === ABILITY_OPTIONS.find((o) => o.id === id)?.value
  );
  return (
    <Link
      href={`/dex/${aniimo.number}`}
      className="group flex items-center gap-3 rounded-md border border-ink-border bg-ink-card p-4 transition-all hover:border-primary-light hover:shadow-card"
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
            {tr(`elements.${aniimo.element}`)}
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
        {tr(`twineAbility.${aniimo.twineAbility}`)}
      </span>
    </Link>
  );
}
