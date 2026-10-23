'use client';

// ============================================================================
// 队伍机动与属性协同模拟器（客户端交互组件）
// ----------------------------------------------------------------------------
// 规则与数据源：
// 1. 机动能力（Mobility）：来自 data/official-wiki-details.json 的 detail.mobility。
// 2. 元素克制（Matchups）：来自 data/element-matchups.ts（1.6x 超克制 / 0.625x 抵抗）。
// 3. 战斗定位（Roles）：来自官方 Wiki 战斗分类与 10.13 BREAK 保底机制。
// ============================================================================

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getAllAniimos } from '@/lib/aniimo';
import { mobilityByNumber } from '@/data/mobility';
import { ELEMENT_MATCHUPS } from '@/data/element-matchups';
import { combinedEffectiveness } from '@/lib/type-chart';
import {
  ELEMENTS,
  ELEMENT_BADGE_CLASSES,
  ROLE_BADGE_CLASSES,
  ELEMENT_GRADIENTS,
  mobilityBadgeClass,
} from '@/lib/aniimo-ui';
import { cn } from '@/lib/utils';
import type { AniimoEntry, Element, Role } from '@/types/aniimo';

const MOBILITY_CATEGORIES = [
  {
    key: 'flight',
    titleKey: 'flight',
    tipKey: 'flightTip',
    icon: '🦅',
    skills: ['Take Off', 'Cloudwalk'],
  },
  {
    key: 'aquatic',
    titleKey: 'aquatic',
    tipKey: 'aquaticTip',
    icon: '🌊',
    skills: ['Floaty Bubble', 'Bubble Drift'],
  },
  {
    key: 'climbing',
    titleKey: 'climbing',
    tipKey: 'climbingTip',
    icon: '⛏️',
    skills: ['Hookshot', 'High Jump', 'Puff Up'],
  },
  {
    key: 'speed',
    titleKey: 'speed',
    tipKey: 'speedTip',
    icon: '⚡',
    skills: ['Hustle', 'Scurry', 'Fast and Furious'],
  },
] as const;

export default function TeamBuilder() {
  const t = useTranslations('teamBuilder');
  const tr = useTranslations();
  const elementLabel = (element: Element) => tr(`elements.${element}`);
  const roleLabel = (role: Role) => tr(`roles.${role}`);
  const locale = useLocale();
  const allAniimos = useMemo(() => getAllAniimos(), []);

  // 4 个槽位
  const [team, setTeam] = useState<(AniimoEntry | null)[]>([null, null, null, null]);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);

  // 弹窗内的筛选状态
  const [searchQuery, setSearchQuery] = useState('');
  const [elementFilter, setElementFilter] = useState<Element | 'ALL'>('ALL');
  const [roleFilter, setRoleFilter] = useState<Role | 'ALL'>('ALL');

  // 获取伊莫在当前语言下的展示名称
  const getDisplayName = (aniimo: AniimoEntry) => {
    return locale === 'en' ? aniimo.enName : aniimo.name;
  };

  // 筛选伊莫列表
  const filteredAniimos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allAniimos.filter((aniimo) => {
      if (elementFilter !== 'ALL' && !aniimo.officialElements?.includes(elementFilter)) {
        return false;
      }
      if (roleFilter !== 'ALL' && aniimo.officialRole !== roleFilter) {
        return false;
      }
      if (query) {
        const matchNumber = (aniimo.officialNumber ?? aniimo.number).toLowerCase().includes(query);
        const matchName = aniimo.name.toLowerCase().includes(query);
        const matchEn = aniimo.enName.toLowerCase().includes(query);
        if (!matchNumber && !matchName && !matchEn) return false;
      }
      return true;
    });
  }, [allAniimos, searchQuery, elementFilter, roleFilter]);

  // 已入队的非空伊莫列表
  const assignedAniimos = useMemo(() => {
    return team.filter((a): a is AniimoEntry => a !== null);
  }, [team]);

  // 获取某只伊莫在队伍中的机动能力列表
  const getAniimoMobilities = (aniimo: AniimoEntry): string[] => {
    const list = mobilityByNumber.get(aniimo.number);
    if (list && list.length > 0) return list;
    return aniimo.mobility ?? [];
  };

  // 1. 机动能力覆盖度分析
  const mobilityCoverage = useMemo(() => {
    return MOBILITY_CATEGORIES.map((cat) => {
      const providers: AniimoEntry[] = [];
      for (const aniimo of assignedAniimos) {
        const skills = getAniimoMobilities(aniimo);
        if (skills.some((s) => (cat.skills as readonly string[]).includes(s))) {
          providers.push(aniimo);
        }
      }
      return {
        ...cat,
        covered: providers.length > 0,
        providers,
      };
    });
  }, [assignedAniimos]);

  // 2. 进攻端：全队能够克制哪些属性（1.6x）
  const offensiveCoverage = useMemo(() => {
    const teamElements = new Set<Element>();
    for (const a of assignedAniimos) {
      for (const el of a.officialElements ?? [a.element]) {
        teamElements.add(el);
      }
    }

    const coverageMap = new Map<Element, Element[]>();
    for (const targetEl of ELEMENTS) {
      const counters: Element[] = [];
      for (const atkEl of teamElements) {
        if (ELEMENT_MATCHUPS[atkEl]?.[targetEl] === 1.6) {
          counters.push(atkEl);
        }
      }
      if (counters.length > 0) {
        coverageMap.set(targetEl, counters);
      }
    }

    const coveredCount = coverageMap.size;
    const percent = Math.round((coveredCount / ELEMENTS.length) * 100);

    return { coverageMap, coveredCount, percent };
  }, [assignedAniimos]);

  // 3. 防守端：敌方属性对全队的克制分析（重点识别共享弱点）
  const defensiveAnalysis = useMemo(() => {
    const vulnerabilityMap = new Map<Element, AniimoEntry[]>();

    for (const attackingEl of ELEMENTS) {
      const victims: AniimoEntry[] = [];
      for (const aniimo of assignedAniimos) {
        const defenderElements = aniimo.officialElements ?? [aniimo.element];
        const multiplier = combinedEffectiveness(attackingEl, defenderElements);
        const isWeak = multiplier !== null && multiplier > 1;
        if (isWeak) {
          victims.push(aniimo);
        }
      }
      if (victims.length > 0) {
        vulnerabilityMap.set(attackingEl, victims);
      }
    }

    // 共享弱点（2只或以上伊莫共有的弱点）
    const sharedWeaknesses: { element: Element; victims: AniimoEntry[] }[] = [];
    for (const [el, victims] of vulnerabilityMap.entries()) {
      if (victims.length >= 2) {
        sharedWeaknesses.push({ element: el, victims });
      }
    }

    return { vulnerabilityMap, sharedWeaknesses };
  }, [assignedAniimos]);

  // 4. 角色平衡性与 BREAK 协同分析
  const roleAnalysis = useMemo(() => {
    const counts: Record<Role, number> = {
      DPS: 0,
      Break: 0,
      Heal: 0,
      Support: 0,
      Regen: 0,
    };

    for (const a of assignedAniimos) {
      const r = a.officialRole ?? a.role;
      if (counts[r] !== undefined) {
        counts[r] += 1;
      }
    }

    const hasBreak = counts.Break > 0;
    const hasSustain = counts.Heal + counts.Support + counts.Regen > 0;
    const hasDPS = counts.DPS > 0;

    return { counts, hasBreak, hasSustain, hasDPS };
  }, [assignedAniimos]);

  // 槽位操作
  const handleAssignAniimo = (aniimo: AniimoEntry) => {
    if (activeSlotIndex === null) return;
    setTeam((prev) => {
      const next = [...prev];
      next[activeSlotIndex] = aniimo;
      return next;
    });
    setActiveSlotIndex(null);
  };

  const handleRemoveSlot = (index: number) => {
    setTeam((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleClearAll = () => {
    setTeam([null, null, null, null]);
  };

  // 预设快捷套用
  const applyPreset = (numbers: string[]) => {
    const presetAniimos = numbers.map((num) => allAniimos.find((a) => a.number === num) ?? null);
    while (presetAniimos.length < 4) presetAniimos.push(null);
    setTeam(presetAniimos.slice(0, 4));
  };

  return (
    <div className="space-y-8">
      {/* 快捷预设与一键清空 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-border pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            {t('presetsTitle')}:
          </span>
          <button
            type="button"
            onClick={() => applyPreset(['001', '007', '019', '024'])}
            className="rounded border border-ink-border bg-white px-3 py-1 text-xs font-medium text-text-secondary transition-colors hover:border-primary-light hover:text-primary-light shadow-sm"
          >
            🧭 {t('presetExplorer')} (#001, #007, #019, #024)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['024', '003', '019', '012'])}
            className="rounded border border-ink-border bg-white px-3 py-1 text-xs font-medium text-text-secondary transition-colors hover:border-primary-light hover:text-primary-light shadow-sm"
          >
            ⚔️ {t('presetChaos')} (#024, #003, #019, #012)
          </button>
        </div>
        {assignedAniimos.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline"
          >
            {t('clearAll')}
          </button>
        )}
      </div>

      {/* 4 个队伍槽位 */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((aniimo, index) => {
          if (!aniimo) {
            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlotIndex(index)}
                className="group flex min-h-[220px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-ink-border bg-white p-5 text-center transition-all hover:border-primary-light hover:bg-sky-50/40 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-soft text-xl text-text-muted transition-transform group-hover:scale-110 group-hover:text-primary-light">
                  +
                </div>
                <div className="mt-3 text-sm font-semibold text-text-primary group-hover:text-primary-light">
                  {t('slot', { num: index + 1 })}
                </div>
                <p className="mt-1 text-xs text-text-muted">{t('emptySlot')}</p>
              </button>
            );
          }

          const primaryElement = aniimo.officialElements?.[0] ?? aniimo.element;
          const mobilities = getAniimoMobilities(aniimo);

          return (
            <div
              key={index}
              className="relative flex flex-col justify-between rounded-lg border border-ink-border bg-white p-4 shadow-sm transition-all hover:shadow-card-hover"
            >
              {/* 顶部操作：更换 & 移除 */}
              <div className="flex items-center justify-between border-b border-ink-border pb-2">
                <span className="text-xs font-bold text-text-muted">
                  {t('slot', { num: index + 1 })}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSlotIndex(index)}
                    className="text-xs font-medium text-primary-light hover:underline"
                  >
                    {t('replace')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(index)}
                    className="flex h-5 w-5 items-center justify-center rounded-full text-text-muted hover:bg-rose-50 hover:text-rose-600"
                    title={t('remove')}
                    aria-label={t('remove')}
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* 中间信息：立绘与基础属性 */}
              <div className="my-3 flex items-center gap-3">
                <div
                  className={cn(
                    'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-ink-border bg-gradient-to-br',
                    ELEMENT_GRADIENTS[primaryElement]
                  )}
                >
                  {aniimo.imageUrl ? (
                    <Image
                      src={aniimo.imageUrl}
                      alt={getDisplayName(aniimo)}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-mono text-xs text-text-muted">
                      #{aniimo.officialNumber ?? aniimo.number}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-xs text-text-muted">#{aniimo.officialNumber ?? aniimo.number}</div>
                  <h3 className="truncate font-bold text-text-primary">{getDisplayName(aniimo)}</h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {(aniimo.officialElements ?? [aniimo.element]).map((el) => (
                      <span
                        key={el}
                        className={cn(
                          'rounded px-1.5 py-0.5 text-[10px] font-medium border',
                          ELEMENT_BADGE_CLASSES[el]
                        )}
                      >
                        {elementLabel(el)}
                      </span>
                    ))}
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 text-[10px] font-medium border',
                        ROLE_BADGE_CLASSES[aniimo.officialRole ?? aniimo.role]
                      )}
                    >
                      {roleLabel(aniimo.officialRole ?? aniimo.role)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 机动能力标签 */}
              <div className="border-t border-ink-border pt-2">
                <div className="text-[10px] font-semibold text-text-muted uppercase">
                  {t('mobilityLabel')}:
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {mobilities.length > 0 ? (
                    mobilities.map((skill) => (
                      <span
                        key={skill}
                        className={cn(
                          'rounded-full border px-2 py-0.5 text-[10px] font-medium',
                          mobilityBadgeClass(skill)
                        )}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-text-muted italic">—</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 协同分析总览（有成员时展示） */}
      {assignedAniimos.length > 0 ? (
        <div className="space-y-6">
          {/* 分析模块 1：Twine 大世界探索机动能力覆盖 */}
          <section className="rounded-lg border border-ink-border bg-white p-5 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <span>🧭</span> {t('mobilityTitle')}
              </h2>
              <p className="mt-1 text-xs text-text-secondary sm:text-sm">{t('mobilitySubtitle')}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {mobilityCoverage.map((cat) => (
                <div
                  key={cat.key}
                  className={cn(
                    'flex flex-col justify-between rounded-md border p-3 text-xs transition-colors',
                    cat.covered
                      ? 'border-emerald-300 bg-emerald-50/60'
                      : 'border-amber-300 bg-amber-50/60'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-text-primary flex items-center gap-1.5">
                        <span>{cat.icon}</span> {t(cat.titleKey)}
                      </span>
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-bold',
                          cat.covered
                            ? 'bg-emerald-200 text-emerald-800'
                            : 'bg-amber-200 text-amber-900'
                        )}
                      >
                        {cat.covered ? t('covered') : t('missing')}
                      </span>
                    </div>
                    <p className="mt-2 text-text-secondary leading-relaxed">{t(cat.tipKey)}</p>
                  </div>

                  <div className="mt-3 border-t border-black/10 pt-2 font-medium">
                    {cat.covered ? (
                      <span className="text-emerald-800">
                        {t('providedBy', {
                          names: cat.providers.map(getDisplayName).join(', '),
                        })}
                      </span>
                    ) : (
                      <span className="text-amber-800">⚠️ {t('missing')}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 分析模块 2：元素攻防克制分析 & 共享弱点预警 */}
          <section className="rounded-lg border border-ink-border bg-white p-5 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <span>⚔️</span> {t('elementSynergyTitle')}
              </h2>
              <p className="mt-1 text-xs text-text-secondary sm:text-sm">
                {t('elementSynergySubtitle')}
              </p>
              {assignedAniimos.some((aniimo) => aniimo.officialElements?.includes('Wind')) && <p className="mt-2 text-xs text-amber-800">{t('disputedMatchupNote')}</p>}
            </div>

            {/* 进攻覆盖 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-text-primary">{t('offensiveCoverage')}</span>
                <span className="font-mono text-primary-light">
                  {t('coveredCount', {
                    covered: offensiveCoverage.coveredCount,
                    percent: offensiveCoverage.percent,
                  })}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ELEMENTS.map((targetEl) => {
                  const isCovered = offensiveCoverage.coverageMap.has(targetEl);
                  const counters = offensiveCoverage.coverageMap.get(targetEl) ?? [];
                  return (
                    <div
                      key={targetEl}
                      className={cn(
                        'flex items-center gap-1 rounded border px-2 py-1 text-xs font-medium',
                        isCovered
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                          : 'border-ink-border bg-ink-soft text-text-muted opacity-60'
                      )}
                      title={
                        isCovered
                          ? t('counteredBy', { elements: counters.map(elementLabel).join(', ') })
                          : t('noCounter')
                      }
                    >
                      <span>{elementLabel(targetEl)}</span>
                      {isCovered && <span className="font-mono text-[10px]">1.6x</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 防守端共享弱点预警 */}
            <div className="border-t border-ink-border pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                {t('defensiveVulnerabilities')}:
              </h3>

              {defensiveAnalysis.sharedWeaknesses.length > 0 ? (
                <div className="space-y-2">
                  {defensiveAnalysis.sharedWeaknesses.map(({ element, victims }) => (
                    <div
                      key={element}
                      className="rounded-md border border-rose-300 bg-rose-50/80 p-3 text-xs text-rose-900"
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <span>⚠️</span> {t('sharedWeaknessAlert')} ({elementLabel(element)})
                      </div>
                      <p className="mt-1">
                        {t('sharedWeaknessDesc', {
                          count: victims.length,
                          element: elementLabel(element),
                        })}
                      </p>
                      <div className="mt-1 text-[11px] text-rose-700">
                        {t('affected', { names: victims.map(getDisplayName).join(', ') })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border border-emerald-300 bg-emerald-50/80 p-3 text-xs text-emerald-900 font-medium">
                  ✓ {t('noSharedWeakness')}
                </div>
              )}
            </div>
          </section>

          {/* 分析模块 3：战斗定位与 BREAK 破防协同评估 */}
          <section className="rounded-lg border border-ink-border bg-white p-5 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <span>🛡️</span> {t('roleSynergyTitle')}
              </h2>
              <p className="mt-1 text-xs text-text-secondary sm:text-sm">
                {t('roleSynergySubtitle')}
              </p>
            </div>

            {/* 定位统计条 */}
            <div className="flex flex-wrap items-center gap-4 border-b border-ink-border pb-3 text-xs">
              {(['DPS', 'Break', 'Heal', 'Support', 'Regen'] as Role[]).map((role) => (
                <div key={role} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-[10px] font-bold border',
                      ROLE_BADGE_CLASSES[role]
                    )}
                  >
                    {roleLabel(role)}
                  </span>
                  <span className="font-mono font-bold text-text-primary">
                    {roleAnalysis.counts[role]}
                  </span>
                </div>
              ))}
            </div>

            {/* 协同判定提示 */}
            <div className="space-y-2 text-xs">
              <div
                className={cn(
                  'rounded p-2.5 flex items-start gap-2 border',
                  roleAnalysis.hasBreak
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-800'
                    : 'border-amber-200 bg-amber-50/70 text-amber-900'
                )}
              >
                <span>{roleAnalysis.hasBreak ? '✓' : '⚠️'}</span>
                <span>{roleAnalysis.hasBreak ? t('breakCheckPass') : t('breakCheckFail')}</span>
              </div>

              <div
                className={cn(
                  'rounded p-2.5 flex items-start gap-2 border',
                  roleAnalysis.hasSustain
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-800'
                    : 'border-amber-200 bg-amber-50/70 text-amber-900'
                )}
              >
                <span>{roleAnalysis.hasSustain ? '✓' : 'ℹ️'}</span>
                <span>
                  {roleAnalysis.hasSustain ? t('sustainCheckPass') : t('sustainCheckFail')}
                </span>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-ink-border bg-ink-soft/40 p-8 text-center text-sm text-text-muted">
          👆 {t('emptySlot')}
        </div>
      )}

      {/* 底部免责声明 */}
      <footer className="border-t border-ink-border pt-4 text-xs text-text-muted">
        <p>{t('sourceNotice')}</p>
      </footer>

      {/* 选择伊莫的模态弹窗 */}
      {activeSlotIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-xl border border-ink-border">
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between border-b border-ink-border p-4">
              <h3 className="font-bold text-text-primary">
                {t('selectAniimo', { num: activeSlotIndex + 1 })}
              </h3>
              <button
                type="button"
                onClick={() => setActiveSlotIndex(null)}
                className="rounded p-1 text-text-muted hover:bg-ink-soft hover:text-text-primary"
                aria-label={t('close')}
              >
                ✕
              </button>
            </div>

            {/* 搜索与筛选控制栏 */}
            <div className="space-y-3 border-b border-ink-border bg-ink-soft/30 p-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full rounded-md border border-ink-border bg-white px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
                autoFocus
              />

              {/* 元素筛选 */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-medium text-text-muted">{t('filterElement')}:</span>
                <button
                  type="button"
                  onClick={() => setElementFilter('ALL')}
                  className={cn(
                    'rounded px-2 py-0.5 font-medium border transition-colors',
                    elementFilter === 'ALL'
                      ? 'border-primary bg-primary text-white'
                      : 'border-ink-border bg-white text-text-secondary hover:border-ink'
                  )}
                >
                  {t('allElements')}
                </button>
                {ELEMENTS.map((el) => (
                  <button
                    key={el}
                    type="button"
                    onClick={() => setElementFilter(el)}
                    className={cn(
                      'rounded px-2 py-0.5 font-medium border transition-colors',
                      elementFilter === el
                        ? 'border-primary bg-primary text-white'
                        : 'border-ink-border bg-white text-text-secondary hover:border-ink'
                    )}
                  >
                    {elementLabel(el)}
                  </button>
                ))}
              </div>

              {/* 角色定位筛选 */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-medium text-text-muted">{t('filterRole')}:</span>
                <button
                  type="button"
                  onClick={() => setRoleFilter('ALL')}
                  className={cn(
                    'rounded px-2 py-0.5 font-medium border transition-colors',
                    roleFilter === 'ALL'
                      ? 'border-primary bg-primary text-white'
                      : 'border-ink-border bg-white text-text-secondary hover:border-ink'
                  )}
                >
                  {t('allRoles')}
                </button>
                {(['DPS', 'Break', 'Heal', 'Support', 'Regen'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRoleFilter(r)}
                    className={cn(
                      'rounded px-2 py-0.5 font-medium border transition-colors',
                      roleFilter === r
                        ? 'border-primary bg-primary text-white'
                        : 'border-ink-border bg-white text-text-secondary hover:border-ink'
                    )}
                  >
                    {roleLabel(r)}
                  </button>
                ))}
              </div>
            </div>

            {/* 可选伊莫列表 */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-ink-border">
              {filteredAniimos.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {filteredAniimos.map((aniimo) => {
                    const primaryEl = aniimo.officialElements?.[0] ?? aniimo.element;
                    const mobilities = getAniimoMobilities(aniimo);
                    return (
                      <button
                        key={aniimo.number}
                        type="button"
                        onClick={() => handleAssignAniimo(aniimo)}
                        className="group flex items-center gap-3 rounded-lg border border-ink-border bg-white p-2.5 text-left transition-all hover:border-primary-light hover:bg-sky-50/50 hover:shadow-sm"
                      >
                        <div
                          className={cn(
                            'relative h-12 w-12 flex-shrink-0 overflow-hidden rounded border border-ink-border bg-gradient-to-br',
                            ELEMENT_GRADIENTS[primaryEl]
                          )}
                        >
                          {aniimo.imageUrl ? (
                            <Image
                              src={aniimo.imageUrl}
                              alt={getDisplayName(aniimo)}
                              fill
                              sizes="48px"
                              className="object-contain p-0.5"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center font-mono text-[10px] text-text-muted">
                              #{aniimo.officialNumber ?? aniimo.number}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="truncate font-bold text-sm text-text-primary group-hover:text-primary-light">
                              {getDisplayName(aniimo)}
                            </span>
                            <span className="font-mono text-xs text-text-muted">
                              #{aniimo.officialNumber ?? aniimo.number}
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {(aniimo.officialElements ?? [aniimo.element]).map((el) => (
                              <span
                                key={el}
                                className={cn(
                                  'rounded px-1 py-0.2 text-[9px] font-medium border',
                                  ELEMENT_BADGE_CLASSES[el]
                                )}
                              >
                                {elementLabel(el)}
                              </span>
                            ))}
                            <span
                              className={cn(
                                'rounded px-1 py-0.2 text-[9px] font-medium border',
                                ROLE_BADGE_CLASSES[aniimo.officialRole ?? aniimo.role]
                              )}
                            >
                              {roleLabel(aniimo.officialRole ?? aniimo.role)}
                            </span>
                          </div>
                          {mobilities.length > 0 && (
                            <div className="mt-1 truncate text-[10px] text-text-muted">
                              {mobilities.join(' · ')}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-sm text-text-muted">{t('noResults')}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
