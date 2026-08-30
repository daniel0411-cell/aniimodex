import detailsSnapshot from '@/data/official-wiki-details.json';
import { getAllAniimos } from '@/lib/aniimo';
import type { OfficialAniimoDetail, OfficialEvolutionNode } from '@/data/aniimo-details';

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

export const mobilityGroups = Array.from(
  details.reduce((groups, detail) => {
    for (const mobility of detail.mobility) {
      const group = groups.get(mobility.name) ?? { description: mobility.description, members: [] };
      const aniimo = aniimoByNumber.get(detail.number);
      if (aniimo) group.members.push(aniimo);
      groups.set(mobility.name, group);
    }
    return groups;
  }, new Map<string, { description?: string; members: ReturnType<typeof getAllAniimos> }>())
).sort((a, b) => b[1].members.length - a[1].members.length || a[0].localeCompare(b[0]));

export function flattenEvolution(node: OfficialEvolutionNode): string[] {
  return [node.name, ...node.children.flatMap(flattenEvolution)];
}
