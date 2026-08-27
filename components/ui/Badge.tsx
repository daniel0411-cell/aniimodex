import { cn } from '@/lib/utils';

/**
 * Aniimo 的 9 种元素，每种对应一种徽章配色。
 * 注意：类名必须完整写在源码中，Tailwind 才能扫描到。
 */
export type Element = '火' | '水' | '风' | '土' | '光' | '暗' | '雷' | '冰' | '草';

const ELEMENT_STYLES: Record<Element, string> = {
  火: 'bg-rose-100 text-rose-700 border-rose-300',
  水: 'bg-sky-100 text-sky-700 border-sky-300',
  风: 'bg-teal-100 text-teal-700 border-teal-300',
  土: 'bg-amber-100 text-amber-700 border-amber-300',
  光: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  暗: 'bg-purple-100 text-purple-700 border-purple-300',
  雷: 'bg-lime-100 text-lime-700 border-lime-300',
  冰: 'bg-cyan-100 text-cyan-700 border-cyan-300',
  草: 'bg-green-100 text-green-700 border-green-300',
};

interface BadgeProps {
  label: string;
  element?: Element;
  className?: string;
}

export default function Badge({ label, element, className }: BadgeProps) {
  const base = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium';
  const style = element ? ELEMENT_STYLES[element] : 'border-ink-border bg-ink-soft text-text-secondary';
  return <span className={cn(base, style, className)}>{label}</span>;
}
