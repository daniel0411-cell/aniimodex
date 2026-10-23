// ============================================================================
// 元素克制查询工具函数
// ----------------------------------------------------------------------------
// 倍率数据已迁至 data/element-matchups.ts（那里写明了来源状态：
// 社区参考，不是官方战斗表）。本文件只保留查询逻辑，不再持有数据。
// ============================================================================

import type { Element } from '@/types/aniimo';
import { ELEMENT_MATCHUPS } from '@/data/element-matchups';

export { ELEMENT_MATCHUPS } from '@/data/element-matchups';

/** A disputed relationship has no numeric answer; it must not become neutral. */
export function effectiveness(attacker: Element, defender: Element): number | null {
  if (attacker === 'Ice' && defender === 'Wind') return null;
  return ELEMENT_MATCHUPS[attacker][defender] ?? 1;
}

/** Combine all defender elements, including resistances that cancel weaknesses. */
export function combinedEffectiveness(attacker: Element, defenders: Element[]): number | null {
  let total = 1;
  for (const defender of defenders) {
    const value = effectiveness(attacker, defender);
    if (value === null) return null;
    total *= value;
  }
  return total;
}

/** 针对一组防御方元素，按综合倍率从高到低排列全部攻击方元素 */
export function bestAttackers(defenders: Element[]): { element: Element; value: number }[] {
  return (Object.keys(ELEMENT_MATCHUPS) as Element[])
    .map((element) => ({
      element,
      value: combinedEffectiveness(element, defenders),
    }))
    .filter((item): item is { element: Element; value: number } => item.value !== null)
    .sort((a, b) => b.value - a.value);
}
