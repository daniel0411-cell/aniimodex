'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { getAllAniimos } from '@/lib/aniimo';
import type { AniimoEntry } from '@/types/aniimo';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { ELEMENT_LABELS, ELEMENT_BADGE_CLASSES } from '@/lib/aniimo-ui';

// ---------------------------------------------------------------------------
// 表单常量
// ---------------------------------------------------------------------------
const TRAPS = [
  { id: 'normal', label: '普通', bonus: 0 },
  { id: 'advanced', label: '高级', bonus: 15 },
  { id: 'master', label: '大师', bonus: 30 },
] as const;

const TIME_SLOTS = [
  { id: 'day', label: '白天', bonus: 0 },
  { id: 'night', label: '夜晚', bonus: 5 },
  { id: 'dusk', label: '黄昏', bonus: 10 },
] as const;

type TrapId = (typeof TRAPS)[number]['id'];
type TimeId = (typeof TIME_SLOTS)[number]['id'];

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
  const trapBonus = TRAPS.find((t) => t.id === trap)!.bonus;
  const timeBonus = TIME_SLOTS.find((t) => t.id === time)!.bonus;
  const podBonus = (podLevel / 50) * 15; // 等级越高加成越多，最高 +15%

  let rate = base + podBonus + trapBonus + (broken ? 25 : 0) + timeBonus;
  rate = Math.min(98, Math.max(1, Math.round(rate)));
  return { rate, base, trapBonus, timeBonus, podBonus };
}

function buildStrategy(
  aniimo: AniimoEntry,
  podLevel: number,
  trap: TrapId,
  broken: boolean,
  time: TimeId
): string {
  const { rate } = computeRate(aniimo, podLevel, trap, broken, time);
  const tips: string[] = [];

  if (!broken) {
    tips.push('建议先使用 BREAK 破防，大幅提升捕获率');
  }
  if (trap === 'normal') {
    tips.push('建议改用高级陷阱或大师陷阱');
  }
  if (rate < 30) {
    tips.push('该伊莫较稀有，建议备好高级/大师陷阱并趁破防状态出手');
  }
  if (time !== 'dusk') {
    tips.push('黄昏时段捕获率最高，可考虑延后捕获');
  }
  if (tips.length === 0) {
    tips.push('当前配置已处于理想捕获状态，祝捕获顺利！');
  }
  return tips.join('；');
}

function trapLabel(id: TrapId) {
  return TRAPS.find((t) => t.id === id)!.label;
}
function timeLabel(id: TimeId) {
  return TIME_SLOTS.find((t) => t.id === id)!.label;
}

// ---------------------------------------------------------------------------
// 页面
// ---------------------------------------------------------------------------
export default function CatchPage() {
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

  const handleCalculate = () => {
    if (!aniimo) return;
    setResult(computeRate(aniimo, podLevel, trap, broken, time));
    setStrategy(buildStrategy(aniimo, podLevel, trap, broken, time));
  };

  const handleShare = async () => {
    if (!aniimo || !result) return;
    const text = [
      `【Aniimo 捕获计算】`,
      `伊莫：${aniimo.name}（${aniimo.enName}）#${aniimo.number}`,
      `Aniipod 等级：${podLevel} / 50`,
      `陷阱：${trapLabel(trap)}`,
      `BREAK 破防：${broken ? '是' : '否'}`,
      `时段：${timeLabel(time)}`,
      `基础捕获率：${result.rate}%`,
      `推荐策略：${strategy}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      alert('已复制捕获方案到剪贴板');
    } catch {
      alert('复制失败，请手动复制');
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Breadcrumb items={[{ label: '工具', href: '/tools' }, { label: '捕获条件工具' }]} />

      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">捕获条件工具</h1>
        <p className="text-sm text-text-secondary sm:text-base">
          根据伊莫、Aniipod 等级、陷阱与时段，估算基础捕获率并获取推荐策略。
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* 表单区 */}
        <section className="space-y-5 rounded-xl border border-ink-border bg-ink-card p-5 lg:col-span-3">
          {/* 伊莫选择 */}
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text-secondary">伊莫选择</span>
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
                  #{a.number} · {a.name}（{ELEMENT_LABELS[a.element]}）
                </option>
              ))}
            </select>
          </label>

          {/* Aniipod 等级滑块 */}
          <label className="block">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">Aniipod 等级</span>
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
            <legend className="mb-1.5 block text-sm font-medium text-text-secondary">陷阱类型</legend>
            <div className="flex flex-wrap gap-2">
              {TRAPS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTrap(t.id);
                    setResult(null);
                  }}
                  className={cn(
                    'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                    trap === t.id
                      ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                      : 'border-ink-border bg-ink-soft text-text-secondary hover:border-primary-light/60'
                  )}
                >
                  {t.label}
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
            <span className="text-sm text-text-secondary">BREAK 状态（是否破防）</span>
          </label>

          {/* 时段 */}
          <fieldset>
            <legend className="mb-1.5 block text-sm font-medium text-text-secondary">时段</legend>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTime(t.id);
                    setResult(null);
                  }}
                  className={cn(
                    'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                    time === t.id
                      ? 'border-primary bg-primary/20 text-primary-light shadow-glow'
                      : 'border-ink-border bg-ink-soft text-text-secondary hover:border-primary-light/60'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </fieldset>

          <Button variant="primary" size="lg" className="w-full" onClick={handleCalculate}>
            计算捕获率
          </Button>
        </section>

        {/* 结果区 */}
        <section className="space-y-4 lg:col-span-2">
          <div className="rounded-xl border border-ink-border bg-ink-card p-5">
            <h2 className="text-sm font-medium text-text-secondary">计算结果</h2>

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
                  <p className="mt-2 text-xs text-text-muted">基础捕获率</p>
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
                    {ELEMENT_LABELS[aniimo.element]}
                  </span>
                </div>

                {/* 推荐策略 */}
                <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-light">
                    推荐策略
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-text-primary">{strategy}</p>
                </div>

                {/* 复制分享 */}
                <Button variant="secondary" size="md" className="w-full" onClick={handleShare}>
                  📋 复制分享方案
                </Button>
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-ink-border px-4 py-10 text-center text-sm text-text-muted">
                填写左侧条件后，点击「计算捕获率」查看结果。
              </div>
            )}
          </div>

          {/* 公式说明 */}
          <div className="rounded-xl border border-ink-border bg-ink-card px-5 py-4 text-xs leading-relaxed text-text-muted">
            <p className="mb-1 font-semibold text-text-secondary">计算说明（简化占位公式）</p>
            <p>
              捕获率 = 伊莫基础值 + Aniipod 等级加成 + 陷阱加成 + 破防加成 + 时段加成，最终限制在 1% ~ 98% 之间。数值为占位，真实公式待接入游戏数据。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
