'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Element } from '@/types/aniimo';
import { ELEMENTS, ELEMENT_ICONS } from '@/lib/aniimo-ui';
import Breadcrumb from '@/components/ui/Breadcrumb';

// ---------------------------------------------------------------------------
// 克制矩阵数据：行 = 攻击方，列 = 防御方
// 值：2 = 克制、1 = 普通、0.5 = 抵抗、0 = 免疫（未列出则默认为 1）
// ---------------------------------------------------------------------------
const CHART: Record<Element, Partial<Record<Element, number>>> = {
  Fire: { Grass: 2, Ice: 2, Fire: 0.5, Water: 0.5, Earth: 0.5 },
  Water: { Fire: 2, Earth: 2, Grass: 0.5, Water: 0.5, Lightning: 0.5 },
  Grass: { Water: 2, Earth: 2, Fire: 0.5, Grass: 0.5, Wind: 0.5, Ice: 0.5 },
  Lightning: { Water: 2, Wind: 2, Earth: 0, Grass: 0.5, Lightning: 0.5 },
  Ice: { Grass: 2, Wind: 2, Earth: 2, Fire: 0.5, Water: 0.5, Ice: 0.5 },
  Earth: { Fire: 2, Lightning: 2, Wind: 0, Water: 0.5, Ice: 0.5, Grass: 0.5 },
  Wind: { Earth: 2, Grass: 2, Lightning: 0.5, Ice: 0.5, Water: 0.5 },
  Light: { Dark: 2, Light: 0.5 },
  Dark: { Light: 2, Dark: 0.5 },
};

function effective(attacker: Element, defender: Element): number {
  return CHART[attacker][defender] ?? 1;
}

// 倍率 → 配色 / 文字（浅色背景下的深色文字，保证对比度）
const MULTIPLIER_STYLE: Record<number, string> = {
  2: 'bg-red-100 text-red-700 font-bold border border-red-300',
  1: 'bg-ink-soft text-text-secondary',
  0.5: 'bg-sky-100 text-sky-700 border border-sky-300',
  0: 'bg-slate-900 text-slate-100',
};

export default function TypeChartPage() {
  const t = useTranslations('typeChartTool');
  const tr = useTranslations();
  // 当前高亮的攻击 / 防御元素（null 表示未选中）
  const [attackEl, setAttackEl] = useState<Element | null>(null);
  const [defendEl, setDefendEl] = useState<Element | null>(null);

  const toggleAttack = (el: Element) => setAttackEl((cur) => (cur === el ? null : el));
  const toggleDefend = (el: Element) => setDefendEl((cur) => (cur === el ? null : el));

  const elLabel = (el: Element) => tr(`elements.${el}`);

  // 图例
  const legend: { value: number; labelKey: string }[] = [
    { value: 2, labelKey: 'superEffective' },
    { value: 1, labelKey: 'neutral' },
    { value: 0.5, labelKey: 'resisted' },
    { value: 0, labelKey: 'immune' },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Breadcrumb items={[{ label: tr('breadcrumb.tools'), href: '/tools' }, { label: t('title') }]} />

      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{t('title')}</h1>
        <p className="text-sm text-text-secondary sm:text-base">{t('subtitle')}</p>
      </header>

      {/* 图例 */}
      <div className="flex flex-wrap items-center gap-3">
        {legend.map((item) => (
          <span key={item.value} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span
              className={cn('inline-block h-3.5 w-3.5 rounded', MULTIPLIER_STYLE[item.value])}
            />
            {t(item.labelKey)} {item.value}x
          </span>
        ))}
      </div>

      {/* 克制表格 */}
      <div className="overflow-x-auto rounded-xl border border-ink-border bg-ink-card p-3">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="p-2 text-xs font-medium text-text-muted" aria-label={t('attackDefend')}>
                {t('attackDefend')}
              </th>
              {ELEMENTS.map((el) => {
                const active = defendEl === el;
                return (
                  <th key={el} className="p-1">
                    <button
                      type="button"
                      onClick={() => toggleDefend(el)}
                      className={cn(
                        'mx-auto flex w-10 flex-col items-center justify-center gap-0.5 rounded-lg border px-1 py-1.5 transition-all sm:w-12',
                        active
                          ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                          : 'border-ink-border bg-ink-soft text-text-secondary hover:border-primary-light/60'
                      )}
                      title={t('defenderTitle', { element: elLabel(el) })}
                    >
                      <span className="text-base sm:text-lg" aria-hidden>
                        {ELEMENT_ICONS[el]}
                      </span>
                      <span className="text-xs">{elLabel(el)}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {ELEMENTS.map((atk) => {
              const atkActive = attackEl === atk;
              return (
                <tr key={atk} className="group">
                  {/* 攻击方表头 */}
                  <th className="p-1">
                    <button
                      type="button"
                      onClick={() => toggleAttack(atk)}
                      className={cn(
                        'flex w-full flex-col items-center justify-center gap-0.5 rounded-lg border px-1 py-1.5 transition-all',
                        atkActive
                          ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                          : 'border-ink-border bg-ink-soft text-text-secondary group-hover:border-primary-light/60'
                      )}
                      title={t('attackerTitle', { element: elLabel(atk) })}
                    >
                      <span className="text-base sm:text-lg" aria-hidden>
                        {ELEMENT_ICONS[atk]}
                      </span>
                      <span className="text-xs">{elLabel(atk)}</span>
                    </button>
                  </th>

                  {ELEMENTS.map((def) => {
                    const value = effective(atk, def);
                    const highlighted = attackEl === atk || defendEl === def;
                    return (
                      <td key={def} className="p-1">
                        <div
                          title={`${elLabel(atk)} ${t('attackText')} ${elLabel(def)}: ${value}x`}
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-md border border-transparent text-sm transition-all sm:h-12 sm:w-12',
                            MULTIPLIER_STYLE[value],
                            highlighted && 'ring-2 ring-primary/70',
                            !highlighted && 'opacity-80 hover:opacity-100'
                          )}
                        >
                          {value === 0.5 ? '½' : value}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 当前选中状态说明 */}
      <div className="rounded-xl border border-ink-border bg-ink-card px-5 py-4 text-sm text-text-secondary">
        {attackEl && defendEl ? (
          <p>
            {t.rich('multiplierOf', {
              attacker: elLabel(attackEl),
              defender: elLabel(defendEl),
              value: effective(attackEl, defendEl),
            })}
          </p>
        ) : attackEl ? (
          <p>{t('selectedAttack', { element: elLabel(attackEl) })}</p>
        ) : defendEl ? (
          <p>{t('selectedDefend', { element: elLabel(defendEl) })}</p>
        ) : (
          <p>{t('clickToSelect')}</p>
        )}
      </div>

      {/* 底部说明：克制关系规则 */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-text-primary">{t('rulesTitle')}</h2>
        <ul className="list-inside list-disc space-y-1.5 rounded-xl border border-ink-border bg-ink-card px-5 py-4 text-sm text-text-secondary">
          <li>{t('rule2x')}</li>
          <li>{t('ruleHalf')}</li>
          <li>{t('rule0')}</li>
          <li>{t('rule1')}</li>
          <li>{t('ruleSame')}</li>
        </ul>
      </section>
    </div>
  );
}
