'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { getAllAniimos } from '@/lib/aniimo';
import type { AniimoEntry } from '@/types/aniimo';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { ELEMENT_BADGE_CLASSES } from '@/lib/aniimo-ui';

type TrapId = 'normal' | 'advanced' | 'master';
type TimeId = 'day' | 'night' | 'dusk';

// ---------------------------------------------------------------------------
// 计算逻辑（简化占位公式，可在后续接入真实数据）
// ---------------------------------------------------------------------------
function baseCatchRate(aniimo: AniimoEntry): number {
  // 用 Common 个体概率近似基础捕获率：越常见捕获率越高
  const common = aniimo.potential.Common;
  return typeof common === 'number' ? common : 25;
}

function computeRate(
  aniimo: AniimoEntry,
  podLevel: number,
  trap: TrapId,
  broken: boolean,
  time: TimeId
) {
  const base = baseCatchRate(aniimo);
  const trapBonus = trap === 'master' ? 30 : trap === 'advanced' ? 15 : 0;
  const timeBonus = time === 'dusk' ? 10 : time === 'night' ? 5 : 0;
  const podBonus = (podLevel / 50) * 15; // 等级越高加成越多，最高 +15%

  let rate = base + podBonus + trapBonus + (broken ? 25 : 0) + timeBonus;
  rate = Math.min(98, Math.max(1, Math.round(rate)));
  return { rate, base, trapBonus, timeBonus, podBonus };
}

// 生成策略建议（接收翻译函数）
function buildStrategy(
  t: (key: string, values?: Record<string, string | number | Date>) => string,
  aniimo: AniimoEntry,
  podLevel: number,
  trap: TrapId,
  broken: boolean,
  time: TimeId
): string {
  const { rate } = computeRate(aniimo, podLevel, trap, broken, time);
  const tips: string[] = [];

  if (!broken) tips.push(t('strategyBreak'));
  if (trap === 'normal') tips.push(t('strategyTrap'));
  if (rate < 30) tips.push(t('strategyRare'));
  if (time !== 'dusk') tips.push(t('strategyDusk'));
  if (tips.length === 0) tips.push(t('strategyIdeal'));
  return tips.join('；');
}

// ---------------------------------------------------------------------------
// 页面
// ---------------------------------------------------------------------------
export default function CatchPage() {
  const t = useTranslations('catchTool');
  const tr = useTranslations();
  const allAniimos = useMemo(() => getAllAniimos(), []);

  const [aniimoNumber, setAniimoNumber] = useState<string>(allAniimos[0]?.number ?? '001');
  const [podLevel, setPodLevel] = useState(30);
  const [trap, setTrap] = useState<TrapId>('advanced');
  const [broken, setBroken] = useState(false);
  const [time, setTime] = useState<TimeId>('dusk');

  // 结果状态（null = 尚未计算）
  const [result, setResult] = useState<ReturnType<typeof computeRate> | null>(null);
  const [strategy, setStrategy] = useState<string>('');

  const aniimo = allAniimos.find((a) => a.number === aniimoNumber);

  const trapLabel = (id: TrapId) => t(`trap${id.charAt(0).toUpperCase()}${id.slice(1)}`);
  const timeLabel = (id: TimeId) => t(`time${id.charAt(0).toUpperCase()}${id.slice(1)}`);

  const handleCalculate = () => {
    if (!aniimo) return;
    setResult(computeRate(aniimo, podLevel, trap, broken, time));
    setStrategy(buildStrategy(t, aniimo, podLevel, trap, broken, time));
  };

  const handleShare = async () => {
    if (!aniimo || !result) return;
    const text = [
      t('shareTitle'),
      t('shareAniimo', { name: aniimo.name, enName: aniimo.enName, number: aniimo.number }),
      t('sharePod', { level: podLevel }),
      t('shareTrap', { trap: trapLabel(trap) }),
      t('shareBreak', { break: broken ? t('breakYes') : t('breakNo') }),
      t('shareTime', { time: timeLabel(time) }),
      t('shareBaseRate', { rate: result.rate }),
      t('shareStrategy', { strategy }),
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      alert(t('copied'));
    } catch {
      alert(t('copyFailed'));
    }
  };

  const traps: { id: TrapId; bonus: number }[] = [
    { id: 'normal', bonus: 0 },
    { id: 'advanced', bonus: 15 },
    { id: 'master', bonus: 30 },
  ];

  const timeSlots: { id: TimeId; bonus: number }[] = [
    { id: 'day', bonus: 0 },
    { id: 'night', bonus: 5 },
    { id: 'dusk', bonus: 10 },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Breadcrumb items={[{ label: tr('breadcrumb.tools'), href: '/tools' }, { label: t('title') }]} />

      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{t('title')}</h1>
        <p className="text-sm text-text-secondary sm:text-base">{t('subtitle')}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* 表单区 */}
        <section className="space-y-5 rounded-xl border border-ink-border bg-ink-card p-5 lg:col-span-3">
          {/* 伊莫选择 */}
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text-secondary">
              {t('selectAniimo')}
            </span>
            <select
              value={aniimoNumber}
              onChange={(e) => {
                setAniimoNumber(e.target.value);
                setResult(null);
              }}
              className="w-full rounded-lg border border-ink-border bg-ink-soft px-3 py-2.5 text-sm text-text-primary focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
            >
              {allAniimos.map((a) => (
                <option key={a.number} value={a.number}>
                  #{a.number} · {a.name}（{tr(`elements.${a.element}`)}）
                </option>
              ))}
            </select>
          </label>

          {/* Aniipod 等级滑块 */}
          <label className="block">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">{t('podLevel')}</span>
              <span className="text-sm font-semibold text-primary-light">{podLevel}</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={podLevel}
              onChange={(e) => {
                setPodLevel(Number(e.target.value));
                setResult(null);
              }}
              className="w-full accent-primary"
            />
            <div className="mt-1 flex justify-between text-xs text-text-muted">
              <span>1</span>
              <span>50</span>
            </div>
          </label>

          {/* 陷阱类型 */}
          <fieldset>
            <legend className="mb-1.5 block text-sm font-medium text-text-secondary">
              {t('trapType')}
            </legend>
            <div className="flex flex-wrap gap-2">
              {traps.map((tr2) => (
                <button
                  key={tr2.id}
                  type="button"
                  onClick={() => {
                    setTrap(tr2.id);
                    setResult(null);
                  }}
                  className={cn(
                    'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                    trap === tr2.id
                      ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                      : 'border-ink-border bg-ink-soft text-text-secondary hover:border-primary-light/60'
                  )}
                >
                  {trapLabel(tr2.id)}
                </button>
              ))}
            </div>
          </fieldset>

          {/* BREAK 状态 */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={broken}
              onChange={(e) => {
                setBroken(e.target.checked);
                setResult(null);
              }}
              className="h-4 w-4 accent-primary"
            />
            <span className="text-sm text-text-secondary">{t('breakState')}</span>
          </label>

          {/* 时段 */}
          <fieldset>
            <legend className="mb-1.5 block text-sm font-medium text-text-secondary">
              {t('timeSlot')}
            </legend>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((ts) => (
                <button
                  key={ts.id}
                  type="button"
                  onClick={() => {
                    setTime(ts.id);
                    setResult(null);
                  }}
                  className={cn(
                    'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                    time === ts.id
                      ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                      : 'border-ink-border bg-ink-soft text-text-secondary hover:border-primary-light/60'
                  )}
                >
                  {timeLabel(ts.id)}
                </button>
              ))}
            </div>
          </fieldset>

          <Button variant="primary" size="lg" className="w-full" onClick={handleCalculate}>
            {t('calculate')}
          </Button>
        </section>

        {/* 结果区 */}
        <section className="space-y-4 lg:col-span-2">
          <div className="rounded-xl border border-ink-border bg-ink-card p-5">
            <h2 className="text-sm font-medium text-text-secondary">{t('result')}</h2>

            {result && aniimo ? (
              <div className="mt-4 space-y-4">
                {/* 捕获率大数字 */}
                <div className="text-center">
                  <div
                    className={cn(
                      'mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 text-3xl font-bold',
                      result.rate >= 60
                        ? 'border-green-500/40 bg-green-50 text-green-700'
                        : result.rate >= 30
                          ? 'border-amber-500/40 bg-amber-50 text-amber-700'
                          : 'border-red-500/40 bg-red-50 text-red-600'
                    )}
                  >
                    {result.rate}%
                  </div>
                  <p className="mt-2 text-xs text-text-muted">{t('baseCatchRate')}</p>
                </div>

                {/* 伊莫摘要 */}
                <div className="flex items-center gap-3 rounded-lg border border-ink-border bg-ink-soft px-3 py-2.5">
                  <span className="text-sm font-semibold text-text-muted">#{aniimo.number}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-text-primary">{aniimo.name}</p>
                    <p className="text-xs text-text-muted">{aniimo.enName}</p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium',
                      ELEMENT_BADGE_CLASSES[aniimo.element]
                    )}
                  >
                    {tr(`elements.${aniimo.element}`)}
                  </span>
                </div>

                {/* 推荐策略 */}
                <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-light">
                    {t('recommendedStrategy')}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-text-primary">{strategy}</p>
                </div>

                {/* 复制分享 */}
                <Button variant="secondary" size="md" className="w-full" onClick={handleShare}>
                  📋 {t('copyShare')}
                </Button>
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-ink-border px-4 py-10 text-center text-sm text-text-muted">
                {t('placeholder')}
              </div>
            )}
          </div>

          {/* 公式说明 */}
          <div className="rounded-xl border border-ink-border bg-ink-card px-5 py-4 text-xs leading-relaxed text-text-muted">
            <p className="mb-1 font-semibold text-text-secondary">{t('calculationNote')}</p>
            <p>{t('calculationDetail')}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
