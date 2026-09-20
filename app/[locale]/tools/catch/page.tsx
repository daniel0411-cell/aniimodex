import { getTranslations, setRequestLocale } from 'next-intl/server';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Link } from '@/i18n/navigation';
import CatchCalculator from '@/components/tools/CatchCalculator';
import {
  BACKSTRIKE_COEFFICIENT,
  CATCH_FORMULA_SOURCE,
  CUBES,
  HP_COEFFICIENTS,
  LEVEL_COEFFICIENTS,
  REGION_RATES,
  STATUS_COEFFICIENTS,
} from '@/data/catch-formula';

/**
 * 捕获率计算器（服务端外壳）。
 *
 * 页面上的每一个系数都来自官方《機率公示》：
 *   来源 URL 与抓取日期见 data/catch-formula.ts 的 CATCH_FORMULA_SOURCE。
 * 官方未公开「每种伊莫的模板基础率」，因此计算器只能按玩家选择的
 * 「区域阶段 × 进化阶段」给出区间估算，页面上必须如实标注这一点。
 */

const REGION_LABEL_KEYS: Record<string, string> = {
  standard: 'regionStandard',
  earlyMid: 'regionEarlyMid',
  mid: 'regionMid',
  midLate: 'regionMidLate',
  late: 'regionLate',
  tower: 'regionTower',
};

const CUBE_LABEL_KEYS: Record<string, string> = {
  standard: 'cubeStandard',
  advanced: 'cubeAdvanced',
  fast: 'cubeFast',
  remote: 'cubeRemote',
  remoteMass: 'cubeRemoteMass',
  ultimate: 'cubeUltimate',
  sparkling: 'cubeSparkling',
};

const STATUS_LABEL_KEYS: Record<string, string> = {
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

function formatCoefficient(value: number | 'guaranteed'): string {
  if (value === 'guaranteed') return '—';
  return `×${Number.isInteger(value) ? value : value.toFixed(2)}`;
}

export default async function CatchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('catchTool');
  const tr = await getTranslations();

  const levelRows = [
    { label: `≤${LEVEL_COEFFICIENTS[LEVEL_COEFFICIENTS.length - 1].minDiff - 1}`, coefficient: 1 },
    ...LEVEL_COEFFICIENTS.map((row) => ({
      label: `≥${row.minDiff}`,
      coefficient: row.coefficient,
    })),
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <Breadcrumb
        items={[{ label: tr('breadcrumb.tools'), href: '/tools' }, { label: t('title') }]}
      />

      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{t('title')}</h1>
        <p className="text-sm text-text-secondary sm:text-base">{t('subtitle')}</p>
      </header>

      <section className="border-y border-ink-border bg-white px-5 py-4 text-sm leading-6 text-text-secondary">
        <p className="text-xs text-emerald-700">{t('sourceNote')}</p>
        <p className="mt-2 text-xs text-text-muted">
          <a
            href={CATCH_FORMULA_SOURCE.url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary-light hover:text-primary"
          >
            {CATCH_FORMULA_SOURCE.title} ↗
          </a>{' '}
          · {tr('verification.checkedOn', { date: CATCH_FORMULA_SOURCE.accessedAt })}
        </p>
      </section>

      <CatchCalculator />

      {/* 官方系数对照表：便于逐项核验，也把「官方数值」与「估算输入」区分开 */}
      <section className="space-y-5 border-t border-ink-border pt-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-text-primary">{t('referenceTitle')}</h2>
          <p className="text-sm leading-6 text-text-secondary">{t('referenceBody')}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 基础机率 */}
          <div className="border border-ink-border bg-white p-4">
            <h3 className="text-sm font-semibold text-text-primary">{t('breakdownBase')}</h3>
            <table className="mt-2 w-full text-sm">
              <thead>
                <tr className="border-b border-ink-border text-xs text-text-muted">
                  <th className="py-1.5 text-left font-medium">{t('regionLabel')}</th>
                  <th className="py-1.5 text-right font-medium">{t('stage1')}</th>
                  <th className="py-1.5 text-right font-medium">{t('stage2')}</th>
                  <th className="py-1.5 text-right font-medium">{t('stage3')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-border">
                {REGION_RATES.map((row) => (
                  <tr key={row.id}>
                    <td className="py-1.5 text-text-secondary">{t(REGION_LABEL_KEYS[row.id])}</td>
                    {row.rates.map((rate, index) => (
                      <td key={index} className="py-1.5 text-right font-mono text-text-primary">
                        {Math.round(rate * 100)}%
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 等级系数 */}
          <div className="border border-ink-border bg-white p-4">
            <h3 className="text-sm font-semibold text-text-primary">{t('breakdownLevel')}</h3>
            <table className="mt-2 w-full text-sm">
              <thead>
                <tr className="border-b border-ink-border text-xs text-text-muted">
                  <th className="py-1.5 text-left font-medium">{t('refLevelHeader')}</th>
                  <th className="py-1.5 text-right font-medium">{t('refCoefficientHeader')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-border">
                {levelRows.map((row) => (
                  <tr key={row.label}>
                    <td className="py-1.5 text-text-secondary">{row.label}</td>
                    <td className="py-1.5 text-right font-mono text-text-primary">
                      {formatCoefficient(row.coefficient)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 谜立方系数 */}
          <div className="border border-ink-border bg-white p-4">
            <h3 className="text-sm font-semibold text-text-primary">{t('breakdownCube')}</h3>
            <table className="mt-2 w-full text-sm">
              <tbody className="divide-y divide-ink-border">
                {CUBES.map((row) => (
                  <tr key={row.id}>
                    <td className="py-1.5 text-text-secondary">{t(CUBE_LABEL_KEYS[row.id])}</td>
                    <td className="py-1.5 text-right font-mono text-text-primary">
                      {row.coefficient === 'guaranteed'
                        ? t('resultGuaranteed')
                        : formatCoefficient(row.coefficient)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 生命值与背袭 */}
          <div className="border border-ink-border bg-white p-4">
            <h3 className="text-sm font-semibold text-text-primary">{t('breakdownHp')}</h3>
            <table className="mt-2 w-full text-sm">
              <tbody className="divide-y divide-ink-border">
                {HP_COEFFICIENTS.map((row) => (
                  <tr key={row.hpPercent}>
                    <td className="py-1.5 text-text-secondary">{row.hpPercent}%</td>
                    <td className="py-1.5 text-right font-mono text-text-primary">
                      {formatCoefficient(row.coefficient)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-1.5 text-text-secondary">{t('backstrikeLabel')}</td>
                  <td className="py-1.5 text-right font-mono text-text-primary">
                    {formatCoefficient(BACKSTRIKE_COEFFICIENT)}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mt-2 text-xs leading-5 text-text-muted">{t('backstrikeHelp')}</p>
          </div>
        </div>

        {/* 特殊状态 */}
        <div className="border border-ink-border bg-white p-4">
          <h3 className="text-sm font-semibold text-text-primary">{t('breakdownStatus')}</h3>
          <div className="mt-2 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {STATUS_COEFFICIENTS.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between gap-3 border-t border-ink-border py-1.5 text-sm"
              >
                <span className="text-text-secondary">{t(STATUS_LABEL_KEYS[row.id])}</span>
                <span className="shrink-0 font-mono text-text-primary">
                  {formatCoefficient(row.coefficient)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-text-muted">{t('statusRuleNote')}</p>
        </div>
      </section>

      <nav className="flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-border pt-4 text-sm font-semibold text-primary-light">
        <Link href="/dex">{t('openDex')} →</Link>
        <Link href="/locations">{t('browseLocations')} →</Link>
        <Link href="/guide/aniimo-catching-guide">{t('readGuide')} →</Link>
      </nav>
    </div>
  );
}
