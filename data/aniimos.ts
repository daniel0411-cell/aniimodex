import snapshot from '@/data/official-wiki-snapshot.json';
import currentSnapshot from '@/data/current-wiki-snapshot.json';
import { mobilityByNumber } from '@/data/mobility';
import type { AniimoEntry, EvolutionStage, Personality, PersonalityBonus } from '@/types/aniimo';

const SOURCE_ID = 'aniimo-official-wiki-index-2026-08-30';

function unknownPersonality(): Record<Personality, PersonalityBonus> {
  const value = {
    stat: 'atk' as const,
    multiplier: 1,
    note: 'Unknown; not published from the indexed source.',
  };
  return {
    Analyst: value,
    Diplomat: value,
    Sentinel: value,
    Explorer: value,
    Sage: value,
    Trickster: value,
  };
}

const currentNames = new Set(currentSnapshot.entries.map((entry) => entry.name));
const records = [...currentSnapshot.entries.map((entry) => ({ ...entry, archived: false })), ...snapshot.entries.filter((entry) => !currentNames.has(entry.name)).map((entry) => ({ ...entry, officialNumber: undefined, archived: true }))];
const allEntries: AniimoEntry[] = records.map((record) => ({
  number: record.number,
  officialNumber: record.officialNumber,
  archived: record.archived,
  name: record.name,
  enName: record.name,
  officialWikiId: record.officialId,
  imageUrl: record.imageUrl,
  officialElements: record.elements as AniimoEntry['officialElements'],
  officialRole: record.role as AniimoEntry['officialRole'],
  officialStage: record.stage as AniimoEntry['officialStage'],
  description: record.description,
  flavorText: record.description,
  element: record.elements[0] as AniimoEntry['element'],
  role: record.role as AniimoEntry['role'],
  // 移动能力来自官方详情快照（detail.mobility），未公布时为 []
  mobility: mobilityByNumber.get(record.number) ?? [],
  stats: { hp: 0, atk: 0, def: 0, spd: 0 },
  potential: {
    Common: 'unavailable',
    Good: 'unavailable',
    Elite: 'unavailable',
    Perfect: 'unavailable',
  },
  evolution: { startStage: (record.stage === 'Unknown' ? 'Lumin' : record.stage) as EvolutionStage, branches: [] },
  spawn: { habitats: [], weather: '任何', time: '全天' },
  personality: unknownPersonality(),
  forms: [],
  dataSource: 'official',
  sourceIds: [record.archived ? SOURCE_ID : 'aniimo-official-wiki-basic-2026-10-23'],
  note:
    'Current Basic Form data and resolved evolution stages use the October 23 rendered Wiki snapshot; archived records retain the August evidence. Empty fields mean missing evidence.',
}));

export const archivedAniimos = allEntries.filter((entry) => entry.archived);
export const routeAniimos = allEntries;
export default allEntries.filter((entry) => !entry.archived);
