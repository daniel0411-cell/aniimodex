// ============================================================================
// 元素克制查询工具函数
// ----------------------------------------------------------------------------
// 倍率数据已迁至 data/element-matchups.ts（那里写明了来源状态：
// 未证实假设，不是官方战斗表）。本文件只保留查询逻辑，不再持有数据。
// ============================================================================

import type { Element } from '@/types/aniimo';
import { ELEMENT_MATCHUPS } from '@/data/element-matchups';

export { ELEMENT_MATCHUPS } from '@/data/element-matchups';

/** 攻击方对防御方的伤害倍率；未列出的组合为 1 */
export function effectiveness(attacker: Element, defender: Element): number {
  return ELEMENT_MATCHUPS[attacker][defender] ?? 1;
}

/** 针对一组防御方元素，按综合倍率从高到低排列全部攻击方元素 */
export function bestAttackers(defenders: Element[]): { element: Element; value: number }[] {
  return (Object.keys(ELEMENT_MATCHUPS) as Element[])
    .map((element) => ({
      element,
      value: defenders.reduce((total, defender) => total * effectiveness(element, defender), 1),
    }))
    .sort((a, b) => b.value - a.value);
}
