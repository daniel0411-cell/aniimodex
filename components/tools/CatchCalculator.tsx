'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CATCH_SCENARIOS,
  CUBES,
  HP_COEFFICIENTS,
  REGION_RATES,
  TARGET_STAGES,
  calculateCatchRate,
  type CatchScenario,
  type CubeId,
  type RegionId,
  type TargetStage,
} from '@/data/catch-formula';

const fieldClass =
  'h-10 w-full rounded border border-ink-border bg-white px-2 text-sm text-text-primary';
const percent = (value: number) => `${Number((value * 100).toFixed(2))}%`;
const factor = (value: number) => `×${Number(value.toFixed(2))}`;

export default function CatchCalculator() {
  const t = useTranslations('catchTool');
  const [scenario, setScenario] = useState<CatchScenario>('field');
  const [regionId, setRegionId] = useState<RegionId>('standard');
  const [targetStage, setTargetStage] = useState<TargetStage>(1);
  const [useRegionRate, setUseRegionRate] = useState(false);
  const [playerLevel, setPlayerLevel] = useState('1');
  const [aniimoLevel, setAniimoLevel] = useState('1');
  const [bonus, setBonus] = useState('');
  const [cubeId, setCubeId] = useState<CubeId>('standard');
  const [hpPercent, setHpPercent] = useState(100);
  const [backstrike, setBackstrike] = useState(false);
  const [statusMode, setStatusMode] = useState<'unknown' | 'none'>('unknown');
  const [eligible, setEligible] = useState(false);
  const cube = CUBES.find((item) => item.id === cubeId)!;
  const ordinary = scenario !== 'boss' && cube.coefficient !== 'guaranteed';
  const result = calculateCatchRate({
    scenario,
    regionId,
    targetStage,
    useRegionRate,
    playerLevel: Number(playerLevel),
    aniimoLevel: Number(aniimoLevel),
    playerBonus: bonus.trim() === '' ? null : Number(bonus) / 100,
    cubeId,
    hpPercent,
    backstrike,
    statusMode,
    eligible,
  });

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <section className="min-w-0 space-y-5 border-t-4 border-primary bg-white p-4">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">{t('scenarioLabel')}</legend>
          <div className="grid grid-cols-3 gap-1">
            {CATCH_SCENARIOS.map((item) => (
              <label key={item} className="flex items-start gap-1 text-sm">
                <input
                  className="mt-1"
                  type="radio"
                  name="catch-scenario"
                  value={item}
                  checked={scenario === item}
                  onChange={() => setScenario(item)}
                />
                <span>{t(`current.scenario.${item}`)}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block space-y-1.5">
          <span className="block text-sm font-medium">{t('cubeLabel')}</span>
          <select
            className={fieldClass}
            value={cubeId}
            onChange={(event) => setCubeId(event.target.value as CubeId)}
          >
            {CUBES.map((item) => (
              <option key={item.id} value={item.id}>
                {t(`current.cubes.${item.id}`)} ·{' '}
                {item.coefficient === 'guaranteed'
                  ? t('current.guaranteedCube')
                  : factor(item.coefficient)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-start gap-2 text-sm leading-6">
          <input
            className="mt-1 h-4 w-4 shrink-0"
            type="checkbox"
            checked={eligible}
            onChange={(event) => setEligible(event.target.checked)}
          />
          <span>{t('current.eligibility')}</span>
        </label>
        {ordinary && (
          <>
            <label className="block space-y-1.5">
              <span className="block text-sm font-medium">{t('regionLabel')}</span>
              <select
                className={fieldClass}
                value={regionId}
                onChange={(event) => setRegionId(event.target.value as RegionId)}
              >
                {REGION_RATES.map((row) => (
                  <option key={row.id} value={row.id}>
                    {t(`current.regions.${row.id}`)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="block text-sm font-medium">{t('stageLabel')}</span>
              <select
                className={fieldClass}
                value={targetStage}
                onChange={(event) => setTargetStage(Number(event.target.value) as TargetStage)}
              >
                {TARGET_STAGES.map((stage) => (
                  <option key={stage} value={stage}>
                    {t(`stage${stage}`)}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-start gap-2 text-sm leading-6">
              <input
                className="mt-1 h-4 w-4 shrink-0"
                type="checkbox"
                checked={useRegionRate}
                onChange={(event) => setUseRegionRate(event.target.checked)}
              />
              <span>{t('current.useRegion')}</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="min-w-0 space-y-1.5 text-sm">
                <span className="block">{t('playerLevelLabel')}</span>
                <input
                  className={fieldClass}
                  type="number"
                  min={1}
                  step={1}
                  value={playerLevel}
                  onChange={(event) => setPlayerLevel(event.target.value)}
                />
              </label>
              <label className="min-w-0 space-y-1.5 text-sm">
                <span className="block">{t('aniimoLevelLabel')}</span>
                <input
                  className={fieldClass}
                  type="number"
                  min={1}
                  step={1}
                  value={aniimoLevel}
                  onChange={(event) => setAniimoLevel(event.target.value)}
                />
              </label>
            </div>
            <label className="block space-y-1.5 text-sm">
              <span className="block">{t('playerBonusLabel')}</span>
              <input
                className={fieldClass}
                type="number"
                min={0}
                step="any"
                value={bonus}
                onChange={(event) => setBonus(event.target.value)}
              />
              <span className="block text-xs leading-5 text-text-muted">
                {t('current.bonusHelp')}
              </span>
            </label>
            {scenario === 'battle' && (
              <label className="block space-y-1.5 text-sm">
                <span className="block">{t('hpLabel')}</span>
                <select
                  className={fieldClass}
                  value={hpPercent}
                  onChange={(event) => setHpPercent(Number(event.target.value))}
                >
                  {HP_COEFFICIENTS.map((row) => (
                    <option key={row.hpPercent} value={row.hpPercent}>
                      {row.hpPercent}% · {factor(row.coefficient)}
                    </option>
                  ))}
                </select>
                <span className="block text-xs leading-5 text-text-muted">{t('hpHelp')}</span>
              </label>
            )}
            {scenario === 'field' && (
              <label className="flex items-start gap-2 text-sm leading-6">
                <input
                  className="mt-1 h-4 w-4 shrink-0"
                  type="checkbox"
                  disabled={!cube.allowsBackstrike}
                  checked={backstrike && cube.allowsBackstrike}
                  onChange={(event) => setBackstrike(event.target.checked)}
                />
                <span>{t('backstrikeLabel')}</span>
              </label>
            )}
            <label className="block space-y-1.5 text-sm">
              <span className="block">{t('statusLabel')}</span>
              <select
                className={fieldClass}
                value={statusMode}
                onChange={(event) => setStatusMode(event.target.value as 'unknown' | 'none')}
              >
                <option value="unknown">{t('current.statusUnknown')}</option>
                <option value="none">{t('current.statusNone')}</option>
              </select>
            </label>
          </>
        )}
      </section>
      <div className="min-w-0 space-y-5 lg:sticky lg:top-20">
        <section
          className="border-y border-ink-border bg-white p-5 sm:p-6"
          aria-live="polite"
          aria-atomic="true"
          data-testid="catch-result"
        >
          <h2 className="text-lg font-bold">{t('current.resultTitle')}</h2>
          <p className="mt-3 min-h-12 text-3xl font-bold text-primary-hover">
            {result.finalRate === null ? t('current.unknown') : percent(result.finalRate)}
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            {t(result.guaranteed ? 'current.guaranteeNote' : 'current.conditional')}
          </p>
          {result.missing.length > 0 && (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-amber-900">
              {result.missing.map((key) => (
                <li key={key}>{t(`current.missing.${key}`)}</li>
              ))}
            </ul>
          )}
          {result.breakdown.length > 0 && (
            <dl className="mt-5 divide-y divide-ink-border border-t border-ink-border text-sm">
              {result.breakdown.map((entry) => (
                <div key={entry.key} className="flex justify-between gap-3 py-2">
                  <dt>{t(`breakdown${entry.key[0].toUpperCase()}${entry.key.slice(1)}`)}</dt>
                  <dd className="shrink-0 font-mono">
                    {entry.coefficient === null
                      ? '—'
                      : entry.key === 'base'
                        ? percent(entry.coefficient)
                        : factor(entry.coefficient)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>
        <aside className="border-l-4 border-amber-500 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <h2 className="font-semibold">{t('current.scopeTitle')}</h2>
          <p className="mt-2">{t('current.scope')}</p>
          <p className="mt-2">{t('current.statusNote')}</p>
        </aside>
      </div>
    </div>
  );
}
