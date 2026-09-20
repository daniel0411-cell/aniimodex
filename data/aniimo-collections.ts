import detailsSnapshot from '@/data/official-wiki-details.json';
import { getAllAniimos } from '@/lib/aniimo';
import { mobilityIndex } from '@/lib/mobility';
import type { OfficialAniimoDetail, OfficialEvolutionNode } from '@/data/aniimo-details';
import type { AniimoEntry, Element } from '@/types/aniimo';

const details = detailsSnapshot.details as OfficialAniimoDetail[];
const aniimoByNumber = new Map(getAllAniimos().map((aniimo) => [aniimo.number, aniimo]));

export const evolutionFamilies = Array.from(
  new Map(details.map((detail) => [detail.evolution.name, detail.evolution])).values()
);

export const habitatGroups = Array.from(
  details.reduce((groups, detail) => {
    for (const habitat of detail.habitats) {
      const members = groups.get(habitat) ?? [];
      const aniimo = aniimoByNumber.get(detail.number);
      if (aniimo) members.push(aniimo);
      groups.set(habitat, members);
    }
    return groups;
  }, new Map<string, ReturnType<typeof getAllAniimos>>())
).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

/**
 * 移动能力分组。
 * 统一由 lib/mobility.ts 派生（官方英文能力名 + 成员），本文件不再自行聚合，
 * 以保证 abilities 页与 twine 反查工具对同一能力展示的成员集合完全一致。
 */
export const mobilityGroups: [string, { description?: string; members: AniimoEntry[] }][] =
  mobilityIndex.map((group) => [
    group.name,
    { description: group.description, members: group.members },
  ]);

export const elementGroups = Array.from(
  getAllAniimos().reduce((groups, aniimo) => {
    for (const element of aniimo.officialElements ?? []) {
      const members = groups.get(element) ?? [];
      members.push(aniimo);
      groups.set(element, members);
    }
    return groups;
  }, new Map<Element, ReturnType<typeof getAllAniimos>>())
).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

export function flattenEvolution(node: OfficialEvolutionNode): string[] {
  return [node.name, ...node.children.flatMap(flattenEvolution)];
}
