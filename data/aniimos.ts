import snapshot from '@/data/official-wiki-snapshot.json';
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

const aniimos: AniimoEntry[] = snapshot.entries.map((record) => ({
  number: record.number,
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
  sourceIds: [SOURCE_ID],
  note:
    'Number, English name, artwork, description, elements, role and stage come from the official Wiki index snapshot. Mobility names come from the official Wiki detail snapshot and are empty when the official record publishes none.',
}));

export default aniimos;
