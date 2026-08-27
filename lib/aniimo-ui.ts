// ============================================================================
// Aniimo UI 展示辅助：元素 / 角色 / Twine 能力 的中文标签、图标与配色
// 注意：Tailwind 类名必须完整写在源码中，勿动态拼接。
// ============================================================================

import type { Element, Role, TwineAbility } from '@/types/aniimo';

// ---- 中文标签 ----
export const ELEMENT_LABELS: Record<Element, string> = {
  Light: '光',
  Fire: '火',
  Ice: '冰',
  Dark: '暗',
  Lightning: '雷',
  Grass: '草',
  Water: '水',
  Earth: '土',
  Wind: '风',
};

export const ROLE_LABELS: Record<Role, string> = {
  DPS: '输出',
  Heal: '治疗',
  Support: '辅助',
  Break: '破防',
  Regen: '再生',
};

export const TWINE_LABELS: Record<TwineAbility, string> = {
  飞行: '飞行',
  游泳: '游泳',
  遁地: '遁地',
  攀岩: '攀岩',
  冲撞: '冲撞',
  无: '无',
};

// ---- 元素徽章配色（Badge 类名，适配浅色背景：浅底 + 深色文字）----
export const ELEMENT_BADGE_CLASSES: Record<Element, string> = {
  Light: 'bg-yellow-300/30 text-yellow-800 border-yellow-400',
  Fire: 'bg-rose-400/25 text-rose-700 border-rose-400',
  Ice: 'bg-sky-400/25 text-sky-800 border-sky-400',
  Dark: 'bg-purple-400/25 text-purple-800 border-purple-400',
  Lightning: 'bg-lime-300/30 text-lime-700 border-lime-400',
  Grass: 'bg-green-400/25 text-green-700 border-green-400',
  Water: 'bg-blue-400/25 text-blue-700 border-blue-400',
  Earth: 'bg-amber-400/30 text-amber-700 border-amber-400',
  Wind: 'bg-teal-300/30 text-teal-700 border-teal-400',
};

// ---- 元素渐变背景（用于头像 / 大图占位，浅色系）----
export const ELEMENT_GRADIENTS: Record<Element, string> = {
  Light: 'from-yellow-200 to-amber-300/60',
  Fire: 'from-rose-200 to-orange-300/60',
  Ice: 'from-cyan-200 to-sky-300/60',
  Dark: 'from-purple-300 to-indigo-400/50',
  Lightning: 'from-lime-200 to-violet-300/50',
  Grass: 'from-green-200 to-emerald-300/60',
  Water: 'from-sky-200 to-blue-300/60',
  Earth: 'from-amber-200 to-stone-300/60',
  Wind: 'from-teal-200 to-cyan-300/60',
};

// ---- 角色徽章配色（浅色背景）----
export const ROLE_BADGE_CLASSES: Record<Role, string> = {
  DPS: 'bg-primary/15 text-primary-hover border-primary/40',
  Heal: 'bg-green-400/25 text-green-700 border-green-400',
  Support: 'bg-sky-400/25 text-sky-700 border-sky-400',
  Break: 'bg-rose-400/25 text-rose-700 border-rose-400',
  Regen: 'bg-teal-300/30 text-teal-700 border-teal-400',
};

// ---- Twine 能力配色（浅色背景）----
export const TWINE_BADGE_CLASSES: Record<TwineAbility, string> = {
  飞行: 'bg-teal-300/30 text-teal-700 border-teal-400',
  游泳: 'bg-sky-400/25 text-sky-700 border-sky-400',
  遁地: 'bg-amber-400/30 text-amber-700 border-amber-400',
  攀岩: 'bg-stone-300/30 text-stone-600 border-stone-400',
  冲撞: 'bg-rose-400/25 text-rose-700 border-rose-400',
  无: 'bg-ink-border/40 text-text-muted border-ink-border',
};

// ---- 元素图标（单字，用于图标按钮）----
export const ELEMENT_ICONS: Record<Element, string> = {
  Light: '☀',
  Fire: '🔥',
  Ice: '❄',
  Dark: '🌑',
  Lightning: '⚡',
  Grass: '🌿',
  Water: '💧',
  Earth: '⛰',
  Wind: '🌬',
};

// ---- 角色图标 ----
export const ROLE_ICONS: Record<Role, string> = {
  DPS: '⚔',
  Heal: '✚',
  Support: '🛡',
  Break: '💥',
  Regen: '♻',
};

// ---- Twine 能力图标 ----
export const TWINE_ICONS: Record<TwineAbility, string> = {
  飞行: '🪽',
  游泳: '🏊',
  遁地: '🕳',
  攀岩: '🧗',
  冲撞: '💨',
  无: '—',
};

// ---- 有序数组（用于渲染筛选栏）----
export const ELEMENTS: Element[] = [
  'Light',
  'Fire',
  'Ice',
  'Dark',
  'Lightning',
  'Grass',
  'Water',
  'Earth',
  'Wind',
];

export const ROLES: Role[] = ['DPS', 'Heal', 'Support', 'Break', 'Regen'];

export const TWINE_ABILITIES: TwineAbility[] = ['飞行', '游泳', '遁地', '攀岩', '冲撞', '无'];
