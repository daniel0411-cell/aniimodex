// ============================================================================
// 移动能力分组索引 —— 全站唯一派生实现
// ----------------------------------------------------------------------------
// app/[locale]/abilities 与 app/[locale]/tools/twine 必须共用本文件，
// 不得再各自从 JSON 派生，否则又会出现「同一能力两套成员集合」的问题。
// ============================================================================

import { allMobilityNames, mobilityByNumber, mobilityMeta } from '@/data/mobility';
import { getAllAniimos } from '@/lib/aniimo';
import type { AniimoEntry } from '@/types/aniimo';

export interface MobilityGroup {
  /** 官方英文能力名（专有名词，不做本地化替换） */
  name: string;
  /** 官方英文描述 */
  description?: string;
  /** 官方图标 */
  iconUrl?: string;
  /** 具备该能力的伊莫（按编号升序） */
  members: AniimoEntry[];
}

const aniimoByNumber = new Map(getAllAniimos().map((aniimo) => [aniimo.number, aniimo]));

/** mobility 名称 → 分组（按成员数降序，其次按名称升序） */
export const mobilityIndex: MobilityGroup[] = allMobilityNames
  .map((name) => {
    const meta = mobilityMeta.get(name) ?? {};
    const members: AniimoEntry[] = [];
    for (const [number, names] of mobilityByNumber) {
      if (!names.includes(name)) continue;
      const aniimo = aniimoByNumber.get(number);
      if (aniimo) members.push(aniimo);
    }
    members.sort((a, b) => Number(a.number) - Number(b.number));
    return { name, description: meta.description, iconUrl: meta.iconUrl, members };
  })
  .filter((group) => group.members.length > 0)
  .sort((a, b) => b.members.length - a.members.length || a.name.localeCompare(b.name));

/** mobility 名称 → 成员编号列表（反查用） */
export const membersByMobility: ReadonlyMap<string, readonly string[]> = new Map(
  mobilityIndex.map((group) => [group.name, group.members.map((member) => member.number)])
);

/** 并集反查：匹配任一选中能力的伊莫；空数组返回全部伊莫。 */
export function filterByMobilityNames(names: readonly string[]): AniimoEntry[] {
  const wanted = names.filter(Boolean);
  if (wanted.length === 0) return getAllAniimos();

  const numbers = new Set<string>();
  for (const name of wanted) {
    for (const number of membersByMobility.get(name) ?? []) numbers.add(number);
  }
  return getAllAniimos().filter((aniimo) => numbers.has(aniimo.number));
}

/** 按名称取分组 */
export function getMobilityGroup(name: string): MobilityGroup | undefined {
  return mobilityIndex.find((group) => group.name === name);
}
