import type { EvidenceStatus } from '@/types/aniimo';

export interface VerifiedClaim {
  id: string;
  claim: string;
  status: EvidenceStatus;
  checkedAt: string;
  sourceIds: string[];
}

export const verifiedClaims: VerifiedClaim[] = [
  {
    id: 'game-genre-and-core-loop',
    claim:
      'Aniimo is an open-world action RPG with creature collection, Twine, exploration, team play and quests.',
    status: 'official',
    checkedAt: '2026-08-28',
    sourceIds: [
      'aniimo-official-home-2026-08-28',
      'aniimo-playstation-10018491',
      'aniimo-xbox-9pk8phlcqdf6',
    ],
  },
  {
    id: 'announced-platforms',
    claim: 'The official site links PS5, Xbox, Steam, iOS, Google Play and Epic Games Store.',
    status: 'official',
    checkedAt: '2026-08-29',
    sourceIds: [
      'aniimo-official-home-2026-08-28',
      'aniimo-steam-4126040',
      'aniimo-playstation-10018491',
      'aniimo-xbox-9pk8phlcqdf6',
    ],
  },
  {
    id: 'global-launch-date',
    claim: 'Aniimo launches globally on September 16, 2026 at 10:00 UTC+8.',
    status: 'official',
    checkedAt: '2026-08-29',
    sourceIds: ['aniimo-playstation-10018491'],
  },
  {
    id: 'dex-001-020',
    claim:
      'Current Aniimo names, numbers, stats, elements, roles, evolutions and spawn conditions.',
    status: 'unknown',
    checkedAt: '2026-08-28',
    sourceIds: [],
  },
  {
    id: 'element-matchups',
    claim: 'Current elemental matchup multipliers and immunities.',
    status: 'unknown',
    checkedAt: '2026-08-28',
    sourceIds: [],
  },
  {
    id: 'catch-formula',
    claim: 'Current base catch rates and catch probability formula.',
    status: 'unknown',
    checkedAt: '2026-08-28',
    sourceIds: [],
  },
];
