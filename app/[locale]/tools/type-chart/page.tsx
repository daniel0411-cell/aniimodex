'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
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

      <section className="border-l-4 border-secondary bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-950">
        <h2 className="font-semibold">{t('sourceStatusTitle')}</h2>
        <p>{t('sourceStatusDescription')}</p>
      </section>

      <div className="grid gap-3 sm:hidden">
        <label className="text-xs font-medium text-text-secondary">{t('mobileAttacker')}
          <select value={attackEl ?? ''} onChange={(event) => setAttackEl((event.target.value || null) as Element | null)} className="mt-1 h-11 w-full rounded-md border border-ink-border bg-white px-3 text-sm">
            <option value="">{t('selectElement')}</option>
            {ELEMENTS.map((element) => <option key={element} value={element}>{elLabel(element)}</option>)}
          </select>
        </label>
        <label className="text-xs font-medium text-text-secondary">{t('mobileDefender')}
          <select value={defendEl ?? ''} onChange={(event) => setDefendEl((event.target.value || null) as Element | null)} className="mt-1 h-11 w-full rounded-md border border-ink-border bg-white px-3 text-sm">
            <option value="">{t('selectElement')}</option>
            {ELEMENTS.map((element) => <option key={element} value={element}>{elLabel(element)}</option>)}
          </select>
        </label>
        <div className="border-l-4 border-primary bg-sky-50 px-4 py-3 text-sm text-text-primary">
          {attackEl && defendEl ? t('mobileResult', { attacker: elLabel(attackEl), defender: elLabel(defendEl), value: effective(attackEl, defendEl) }) : t('mobilePrompt')}
        </div>
      </div>

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
      <div className="hidden overflow-x-auto rounded-md border border-ink-border bg-ink-card p-3 sm:block">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="sticky left-0 top-0 z-20 bg-ink-card p-2 text-xs font-medium text-text-muted" aria-label={t('attackDefend')}>
                {t('attackDefend')}
              </th>
              {ELEMENTS.map((el) => {
                const active = defendEl === el;
                return (
                  <th key={el} className="sticky top-0 z-10 bg-ink-card p-1">
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
                  <th className="sticky left-0 z-10 bg-ink-card p-1">
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

      <section className="space-y-4 border-t border-ink-border pt-8">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">{t('summaryTitle')}</h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">{t('summaryIntro')}</p>
        </div>
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {ELEMENTS.map((attacker) => {
            const strong = ELEMENTS.filter((defender) => effective(attacker, defender) === 2);
            const resisted = ELEMENTS.filter((defender) => effective(attacker, defender) === 0.5);
            const immune = ELEMENTS.filter((defender) => effective(attacker, defender) === 0);
            return (
              <article key={attacker} className="border-t border-ink-border pt-4">
                <h3 className="font-semibold text-text-primary">
                  {ELEMENT_ICONS[attacker]} {t('elementMatchups', { element: elLabel(attacker) })}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {t('strongAgainst', {
                    elements: strong.map(elLabel).join(', ') || t('none'),
                  })}
                </p>
                <p className="text-sm leading-6 text-text-secondary">
                  {t('resistedBy', {
                    elements: resisted.map(elLabel).join(', ') || t('none'),
                  })}
                </p>
                {immune.length > 0 && (
                  <p className="text-sm leading-6 text-text-secondary">
                    {t('noEffectAgainst', { elements: immune.map(elLabel).join(', ') })}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4 border-t border-ink-border pt-8">
        <h2 className="text-xl font-semibold text-text-primary">{t('faqTitle')}</h2>
        {(['readChart', 'multiplierMeaning', 'officialStatus'] as const).map((key) => (
          <details key={key} className="border-b border-ink-border pb-4">
            <summary className="cursor-pointer font-semibold text-text-primary">
              {t(`faq.${key}.question`)}
            </summary>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {t(`faq.${key}.answer`)}
            </p>
          </details>
        ))}
      </section>

      <nav className="flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-border pt-6 text-sm font-semibold text-primary-light" aria-label={t('browseElements')}>
        {ELEMENTS.map((element) => (
          <Link key={element} href={`/elements/${element.toLowerCase()}`}>{t('browseElement', { element: elLabel(element) })} →</Link>
        ))}
      </nav>
    </div>
  );
}
