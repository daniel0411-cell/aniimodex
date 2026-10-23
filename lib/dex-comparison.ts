import { getAllAniimos } from '@/lib/aniimo';
import { getOfficialAniimoDetail } from '@/data/aniimo-details';
import type { AniimoEntry } from '@/types/aniimo';

/** Compare published labels, without inferring strength from them. */
export function getDexComparisons(current: AniimoEntry) {
  const detail = getOfficialAniimoDetail(current.number);
  return getAllAniimos()
    .filter((entry) => entry.number !== current.number)
    .map((entry) => {
      const candidate = getOfficialAniimoDetail(entry.number);
      const sharedElements = entry.officialElements?.filter((element) => current.officialElements?.includes(element)) ?? [];
      const sameRole = Boolean(current.officialRole && current.officialRole === entry.officialRole);
      const sharedHabitats = candidate?.habitats.filter((habitat) => detail?.habitats.includes(habitat)) ?? [];
      return { entry, detail: candidate, sharedElements, sameRole, sharedHabitats };
    })
    .filter((item) => item.sameRole || item.sharedElements.length > 0)
    .sort((a, b) => Number(b.sameRole) - Number(a.sameRole) || b.sharedElements.length - a.sharedElements.length || b.sharedHabitats.length - a.sharedHabitats.length || Number(a.entry.number) - Number(b.entry.number))
    .slice(0, 4);
}
