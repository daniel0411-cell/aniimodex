import snapshot from '@/data/official-wiki-snapshot.json';
import type { AniimoEntry, Personality, PersonalityBonus } from '@/types/aniimo';

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
  description: record.description,
  flavorText: record.description,
  shiny: false,
  element: 'Light',
  role: 'Support',
  twineAbility: '无',
  stats: { hp: 0, atk: 0, def: 0, spd: 0 },
  potential: {
    Common: 'unavailable',
    Good: 'unavailable',
    Elite: 'unavailable',
    Perfect: 'unavailable',
  },
  evolution: { startStage: 'Lumin', branches: [] },
  spawn: { habitats: [], weather: '任何', time: '全天' },
  personality: unknownPersonality(),
  forms: [],
  dataSource: 'official',
  sourceIds: [SOURCE_ID],
  note: 'Only number, English name, official artwork and description are verified in this snapshot.',
}));

export default aniimos;
