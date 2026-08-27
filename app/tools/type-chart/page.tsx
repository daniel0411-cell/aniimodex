'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Element } from '@/types/aniimo';
import { ELEMENTS, ELEMENT_LABELS, ELEMENT_ICONS } from '@/lib/aniimo-ui';
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

// 倍率 → 说明（用于底部图例）
const LEGEND: { value: number; label: string }[] = [
  { value: 2, label: '克制' },
  { value: 1, label: '普通' },
  { value: 0.5, label: '抵抗' },
  { value: 0, label: '免疫' },
];

export default function TypeChartPage() {
  // 当前高亮的攻击 / 防御元素（null 表示未选中）
  const [attackEl, setAttackEl] = useState<Element | null>(null);
  const [defendEl, setDefendEl] = useState<Element | null>(null);

  const toggleAttack = (el: Element) => setAttackEl((cur) => (cur === el ? null : el));
  const toggleDefend = (el: Element) => setDefendEl((cur) => (cur === el ? null : el));

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Breadcrumb items={[{ label: '工具', href: '/tools' }, { label: '元素克制矩阵' }]} />

      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">元素克制矩阵</h1>
        <p className="text-sm text-text-secondary sm:text-base">
          行 = 攻击方元素 · 列 = 防御方元素。点击行/列表头可高亮查看对应元素的克制关系。
        </p>
      </header>

      {/* 图例 */}
      <div className="flex flex-wrap items-center gap-3">
        {LEGEND.map((item) => (
          <span key={item.value} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span
              className={cn('inline-block h-3.5 w-3.5 rounded', MULTIPLIER_STYLE[item.value])}
            />
            {item.label} {item.value}x
          </span>
        ))}
      </div>

      {/* 克制表格 */}
      <div className="overflow-x-auto rounded-xl border border-ink-border bg-ink-card p-3">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="p-2 text-xs font-medium text-text-muted" aria-label="攻击方 / 防御方">
                攻\防
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
                      title={`防御方：${ELEMENT_LABELS[el]}`}
                    >
                      <span className="text-base sm:text-lg" aria-hidden>
                        {ELEMENT_ICONS[el]}
                      </span>
                      <span className="text-xs">{ELEMENT_LABELS[el]}</span>
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
                      title={`攻击方：${ELEMENT_LABELS[atk]}`}
                    >
                      <span className="text-base sm:text-lg" aria-hidden>
                        {ELEMENT_ICONS[atk]}
                      </span>
                      <span className="text-xs">{ELEMENT_LABELS[atk]}</span>
                    </button>
                  </th>

                  {ELEMENTS.map((def) => {
                    const value = effective(atk, def);
                    const highlighted =
                      attackEl === atk || defendEl === def || (attackEl === atk && defendEl === def);
                    return (
                      <td key={def} className="p-1">
                        <div
                          title={`${ELEMENT_LABELS[atk]} 攻击 ${ELEMENT_LABELS[def]}：${value}x`}
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
            <span className="font-semibold text-primary-light">{ELEMENT_LABELS[attackEl]}</span>{' '}
            攻击{' '}
            <span className="font-semibold text-primary-light">{ELEMENT_LABELS[defendEl]}</span>{' '}
            的伤害倍率为{' '}
            <span className="font-semibold text-text-primary">
              {effective(attackEl, defendEl)}x
            </span>
            。
          </p>
        ) : attackEl ? (
          <p>
            已选中攻击方 <span className="font-semibold text-primary-light">{ELEMENT_LABELS[attackEl]}</span>，
            再点击一个防御方元素查看倍率。
          </p>
        ) : defendEl ? (
          <p>
            已选中防御方 <span className="font-semibold text-primary-light">{ELEMENT_LABELS[defendEl]}</span>，
            再点击一个攻击方元素查看倍率。
          </p>
        ) : (
          <p>点击任意表头的元素图标即可选中并高亮该行 / 列。</p>
        )}
      </div>

      {/* 底部说明：克制关系规则 */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-text-primary">克制关系规则</h2>
        <ul className="list-inside list-disc space-y-1.5 rounded-xl border border-ink-border bg-ink-card px-5 py-4 text-sm text-text-secondary">
          <li>
            <span className="font-semibold text-red-600">2x（克制）</span>：攻击方元素克制防御方元素，伤害翻倍。
          </li>
          <li>
            <span className="font-semibold text-sky-600">½x（抵抗）</span>：防御方元素抵抗攻击方元素，伤害减半。
          </li>
          <li>
            <span className="font-semibold text-text-muted">0x（免疫）</span>：防御方完全免疫该元素攻击，不造成伤害。
          </li>
          <li>
            <span className="font-semibold text-text-secondary">1x（普通）</span>：无特殊克制关系，造成正常伤害。
          </li>
          <li>同一元素之间的攻击通常效果减半（½x）。</li>
        </ul>
      </section>
    </div>
  );
}
