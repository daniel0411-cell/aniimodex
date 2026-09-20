'use client';

// ============================================================================
// 捕获率计算器（客户端交互）
// ----------------------------------------------------------------------------
// 全部系数来自 data/catch-formula.ts（官方《機率公示》）。
// 本组件不自行编造任何系数；「区域阶段 / 进化阶段」需要玩家自选、
// 是因为官方的每种伊莫模板基础率并未公开，这一点在页面上必须如实说明。
// ============================================================================

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  CATCH_SCENARIOS,
  CUBES,
  HP_COEFFICIENTS,
  REGION_RATES,
  STATUS_COEFFICIENTS,
  TARGET_STAGES,
  calculateCatchRate,
  levelCoefficient,
  type CatchScenario,
  type CubeId,
  type RegionId,
  type StatusId,
  type TargetStage,
} from '@/data/catch-formula';

const REGION_KEYS: Record<RegionId, string> = {
  standard: 'regionStandard',
  earlyMid: 'regionEarlyMid',
  mid: 'regionMid',
  midLate: 'regionMidLate',
  late: 'regionLate',
  tower: 'regionTower',
};

const SCENARIO_KEYS: Record<CatchScenario, string> = {
  field: 'scenarioField',
  battle: 'scenarioBattle',
  defeated: 'scenarioDefeated',
};

const CUBE_KEYS: Record<CubeId, string> = {
  standard: 'cubeStandard',
  advanced: 'cubeAdvanced',
  fast: 'cubeFast',
  remote: 'cubeRemote',
  remoteMass: 'cubeRemoteMass',
  ultimate: 'cubeUltimate',
  sparkling: 'cubeSparkling',
};

const STATUS_KEYS: Record<StatusId, string> = {
  break: 'statusBreak',
  breakBonus: 'statusBreakBonus',
  common: 'statusCommon',
  specialStun: 'statusSpecialStun',
  hundredX: 'statusHundredX',
  invisible: 'statusInvisible',
  alert: 'statusAlert',
  leaving: 'statusLeaving',
  uncatchable: 'statusUncatchable',
};

const BREAKDOWN_KEYS: Record<string, string> = {
  base: 'breakdownBase',
  level: 'breakdownLevel',
  cube: 'breakdownCube',
  hp: 'breakdownHp',
  backstrike: 'breakdownBackstrike',
  status: 'breakdownStatus',
};

/** 百分比格式化：整数不带小数，其余保留一位 */
function formatPercent(value: number): string {
  const pct = Math.round(value * 1000) / 10;
  return `${Number.isInteger(pct) ? pct : pct.toFixed(1)}%`;
}

function formatCoefficient(value: number): string {
  return `×${Number.isInteger(value) ? value : value.toFixed(2)}`;
}

export default function CatchCalculator() {
  const t = useTranslations('catchTool');

  const [scenario, setScenario] = useState<CatchScenario>('field');
  const [regionId, setRegionId] = useState<RegionId>('standard');
  const [targetStage, setTargetStage] = useState<TargetStage>(1);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [aniimoLevel, setAniimoLevel] = useState(1);
  const [playerBonusPercent, setPlayerBonusPercent] = useState(0);
  const [cubeId, setCubeId] = useState<CubeId>('standard');
  const [hpPercent, setHpPercent] = useState(100);
  const [backstrike, setBackstrike] = useState(false);
  const [statusIds, setStatusIds] = useState<StatusId[]>([]);

  const levelDiff = aniimoLevel - playerLevel;

  const result = useMemo(
    () =>
      calculateCatchRate({
        scenario,
        regionId,
        targetStage,
        playerLevel,
        aniimoLevel,
        playerBonus: Math.max(0, playerBonusPercent) / 100,
        cubeId,
        hpPercent,
        backstrike,
        statusIds,
      }),
    [
      scenario,
      regionId,
      targetStage,
      playerLevel,
      aniimoLevel,
      playerBonusPercent,
      cubeId,
      hpPercent,
      backstrike,
      statusIds,
    ]
  );

  const cube = CUBES.find((item) => item.id === cubeId) ?? CUBES[0];
  const showRegionInputs = scenario !== 'defeated';
  const showLevelInputs = scenario !== 'defeated';

  function toggleStatus(id: StatusId) {
    setStatusIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  /** 依据当前输入给出可执行建议（只比较官方公布的系数） */
  const strategyKeys: string[] = [];
  if (scenario === 'field' && cube.allowsBackstrike && !backstrike)
    strategyKeys.push('strategyBackstrike');
  if (scenario === 'battle' && hpPercent > 0) strategyKeys.push('strategyHp');
  if (statusIds.length === 0) strategyKeys.push('strategyStatus');
  if (showLevelInputs && levelDiff >= 11) strategyKeys.push('strategyLevel');
  if (cubeId === 'standard' || cubeId === 'advanced') strategyKeys.push('strategyCube');

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
      {/* 输入区 */}
      <section className="space-y-5 border-t-4 border-primary bg-white p-4 lg:sticky lg:top-20">
        {/* 场景 */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-text-secondary">{t('scenarioLabel')}</h2>
          <div className="grid gap-2">
            {CATCH_SCENARIOS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setScenario(item)}
                aria-pressed={scenario === item}
                className={cn(
                  'rounded-md border px-3 py-2 text-left text-sm font-medium transition-all',
                  scenario === item
                    ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                    : 'border-ink-border bg-ink-card text-text-secondary hover:border-primary/50 hover:text-text-primary'
                )}
              >
                {t(SCENARIO_KEYS[item])}
              </button>
            ))}
          </div>
        </div>

        {scenario === 'defeated' && (
          <p className="text-xs leading-5 text-amber-700">{t('defeatedNote')}</p>
        )}

        {/* 区域阶段 + 进化阶段 */}
        {showRegionInputs && (
          <>
            <label className="block space-y-1.5">
              <span className="block text-sm font-medium text-text-secondary">
                {t('regionLabel')}
              </span>
              <select
                value={regionId}
                onChange={(event) => setRegionId(event.target.value as RegionId)}
                className="h-10 w-full rounded-md border border-ink-border bg-white px-2 text-sm text-text-primary"
              >
                {REGION_RATES.map((row) => (
                  <option key={row.id} value={row.id}>
                    {t(REGION_KEYS[row.id])}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-1.5">
              <span className="block text-sm font-medium text-text-secondary">
                {t('stageLabel')}
              </span>
              <select
                value={targetStage}
                onChange={(event) => setTargetStage(Number(event.target.value) as TargetStage)}
                className="h-10 w-full rounded-md border border-ink-border bg-white px-2 text-sm text-text-primary"
              >
                {TARGET_STAGES.map((stage) => (
                  <option key={stage} value={stage}>
                    {t(`stage${stage}`)}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        {/* 等级 */}
        {showLevelInputs && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1.5">
                <span className="block text-sm font-medium text-text-secondary">
                  {t('playerLevelLabel')}
                </span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={playerLevel}
                  onChange={(event) => setPlayerLevel(Number(event.target.value) || 0)}
                  className="h-10 w-full rounded-md border border-ink-border bg-white px-2 text-sm text-text-primary"
                />
              </label>
              <label className="block space-y-1.5">
                <span className="block text-sm font-medium text-text-secondary">
                  {t('aniimoLevelLabel')}
                </span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={aniimoLevel}
                  onChange={(event) => setAniimoLevel(Number(event.target.value) || 0)}
                  className="h-10 w-full rounded-md border border-ink-border bg-white px-2 text-sm text-text-primary"
                />
              </label>
            </div>
            <p className="text-xs text-text-muted">
              {t('levelDiffValue', { diff: levelDiff })} · {t('breakdownLevel')}{' '}
              {formatCoefficient(levelCoefficient(levelDiff))}
            </p>
          </>
        )}

        {/* 人物基础捕捉加成 */}
        <label className="block space-y-1.5">
          <span className="block text-sm font-medium text-text-secondary">
            {t('playerBonusLabel')}
          </span>
          <input
            type="number"
            min={0}
            value={playerBonusPercent}
            onChange={(event) => setPlayerBonusPercent(Number(event.target.value) || 0)}
            className="h-10 w-full rounded-md border border-ink-border bg-white px-2 text-sm text-text-primary"
          />
          <span className="block text-xs leading-5 text-text-muted">{t('playerBonusHelp')}</span>
        </label>

        {/* 立方 */}
        <label className="block space-y-1.5">
          <span className="block text-sm font-medium text-text-secondary">{t('cubeLabel')}</span>
          <select
            value={cubeId}
            onChange={(event) => setCubeId(event.target.value as CubeId)}
            className="h-10 w-full rounded-md border border-ink-border bg-white px-2 text-sm text-text-primary"
          >
            {CUBES.map((row) => (
              <option key={row.id} value={row.id}>
                {t(CUBE_KEYS[row.id])}
                {row.coefficient === 'guaranteed'
                  ? ` · ${t('resultGuaranteed')}`
                  : ` · ${formatCoefficient(row.coefficient)}`}
              </option>
            ))}
          </select>
          {cube.coefficient === 'guaranteed' && (
            <span className="block text-xs leading-5 text-emerald-700">
              {t('cubeGuaranteedNote')}
            </span>
          )}
        </label>

        {/* 生命值（仅战斗中） */}
        {scenario === 'battle' && (
          <label className="block space-y-1.5">
            <span className="block text-sm font-medium text-text-secondary">{t('hpLabel')}</span>
            <select
              value={hpPercent}
              onChange={(event) => setHpPercent(Number(event.target.value))}
              className="h-10 w-full rounded-md border border-ink-border bg-white px-2 text-sm text-text-primary"
            >
              {HP_COEFFICIENTS.map((row) => (
                <option key={row.hpPercent} value={row.hpPercent}>
                  {row.hpPercent}% · {formatCoefficient(row.coefficient)}
                </option>
              ))}
            </select>
            <span className="block text-xs leading-5 text-text-muted">{t('hpHelp')}</span>
          </label>
        )}

        {/* 背袭（仅战斗外） */}
        {scenario === 'field' && (
          <div className="space-y-1.5">
            <label className="flex items-start gap-2 text-sm font-medium text-text-secondary">
              <input
                type="checkbox"
                checked={backstrike}
                disabled={!cube.allowsBackstrike}
                onChange={(event) => setBackstrike(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-ink-border"
              />
              <span>{t('backstrikeLabel')}</span>
            </label>
            <p className="text-xs leading-5 text-text-muted">{t('backstrikeHelp')}</p>
          </div>
        )}

        {/* 特殊状态 */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-text-secondary">{t('statusLabel')}</h2>
          <div className="grid gap-2">
            {STATUS_COEFFICIENTS.map((row) => {
              const active = statusIds.includes(row.id);
              return (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => toggleStatus(row.id)}
                  aria-pressed={active}
                  className={cn(
                    'flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-xs font-medium transition-all',
                    active
                      ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                      : 'border-ink-border bg-ink-card text-text-secondary hover:border-primary/50 hover:text-text-primary'
                  )}
                >
                  <span className="min-w-0 flex-1">{t(STATUS_KEYS[row.id])}</span>
                  <span className="shrink-0">{formatCoefficient(row.coefficient)}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs leading-5 text-text-muted">{t('statusRuleNote')}</p>
        </div>
      </section>

      {/* 结果区 */}
      <div className="min-w-0 space-y-5">
        <section className="border border-ink-border bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-text-primary">{t('resultTitle')}</h2>
            <span className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
              {t('officialStatus')}
            </span>
          </div>

          <p className="mt-3 text-4xl font-bold text-primary-hover">
            {result.uncatchable ? '0%' : formatPercent(result.finalRate)}
          </p>

          {result.guaranteed && (
            <p className="mt-2 text-sm font-semibold text-emerald-700">{t('resultGuaranteed')}</p>
          )}
          {result.uncatchable && (
            <p className="mt-2 text-sm font-semibold text-amber-700">{t('resultUncatchable')}</p>
          )}

          {/* 系数明细 */}
          <div className="mt-5 border-t border-ink-border pt-4">
            <h3 className="text-sm font-semibold text-text-primary">{t('breakdownTitle')}</h3>
            <dl className="mt-2 divide-y divide-ink-border text-sm">
              {result.breakdown.map((entry) => (
                <div key={entry.key} className="flex items-center justify-between gap-3 py-1.5">
                  <dt className="text-text-secondary">{t(BREAKDOWN_KEYS[entry.key])}</dt>
                  <dd className="font-mono font-semibold text-text-primary">
                    {entry.key === 'base'
                      ? formatPercent(entry.coefficient)
                      : formatCoefficient(entry.coefficient)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {result.doubleCheck && (
            <p className="mt-4 border-l-4 border-primary bg-sky-50 px-3 py-2 text-xs leading-5 text-text-primary">
              {t('doubleCheckNote')}
            </p>
          )}
        </section>

        {strategyKeys.length > 0 && (
          <section className="border border-ink-border bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-text-primary">{t('strategyTitle')}</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
              {strategyKeys.map((key) => (
                <li key={key} className="border-l-4 border-accent pl-3">
                  {t(key)}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 估算边界：必须与官方数值区分开 */}
        <section className="border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
          <h2 className="text-sm font-semibold text-amber-900">{t('templateCaveatTitle')}</h2>
          <p className="mt-1 text-sm leading-6 text-amber-900">{t('templateCaveatBody')}</p>
        </section>
      </div>
    </div>
  );
}
