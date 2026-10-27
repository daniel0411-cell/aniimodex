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
} from '@/data/catch-formula';

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
      label: row.minDiff === 15 ? '≥15' : `${row.minDiff}`,
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
                    <td className="py-1.5 text-text-secondary">{t(`current.regions.${row.id}`)}</td>
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
                    <td className="py-1.5 text-text-secondary">{t(`current.cubes.${row.id}`)}</td>
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
          <p className="mt-2 text-sm leading-6 text-text-secondary">{t('current.statusNote')}</p>
          <p className="mt-3 text-xs leading-5 text-text-muted">{t('statusRuleNote')}</p>
        </div>
      </section>

      {/* 实战捕获策略与资源节约指南 */}
      <section className="space-y-4 border-t border-ink-border pt-8">
        <div>
          <h2 className="text-xl font-bold text-text-primary">{t('strategyTitle')}</h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">{t('strategyIntro')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border-l border-ink-border pl-4">
            <h3 className="font-semibold text-text-primary">{t('strategyBreakTitle')}</h3>
            <p className="mt-2 text-xs leading-5 text-text-secondary">{t('strategyBreakDesc')}</p>
          </div>
          <div className="border-l border-ink-border pl-4">
            <h3 className="font-semibold text-text-primary">{t('strategyHpTitle')}</h3>
            <p className="mt-2 text-xs leading-5 text-text-secondary">{t('strategyHpDesc')}</p>
          </div>
          <div className="border-l border-ink-border pl-4">
            <h3 className="font-semibold text-text-primary">{t('strategyCubeTitle')}</h3>
            <p className="mt-2 text-xs leading-5 text-text-secondary">{t('strategyCubeDesc')}</p>
          </div>
        </div>
      </section>

      {/* 常见捕获机制 FAQ */}
      <section className="space-y-4 border-t border-ink-border pt-8">
        <h2 className="text-xl font-bold text-text-primary">{t('faqTitle')}</h2>
        {(['breakVsHp', 'hpLimit', 'backstrike', 'uncatchable'] as const).map((key) => (
          <details key={key} className="border-b border-ink-border pb-4" open={key === 'breakVsHp'}>
            <summary className="cursor-pointer font-semibold text-text-primary hover:text-primary-light">
              {t(`faq.${key}.q`)}
            </summary>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{t(`faq.${key}.a`)}</p>
          </details>
        ))}
      </section>

      <nav className="flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-border pt-4 text-sm font-semibold text-primary-light">
        <Link href="/dex">{t('openDex')} →</Link>
        <Link href="/locations">{t('browseLocations')} →</Link>
        <Link href="/guide/aniimo-catching-guide">{t('readGuide')} →</Link>
      </nav>
    </div>
  );
}
