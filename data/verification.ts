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
    checkedAt: '2026-09-14',
    sourceIds: [
      'aniimo-official-home-2026-08-28',
      'aniimo-steam-4126040',
      'aniimo-playstation-10018491',
      'aniimo-xbox-9pk8phlcqdf6',
    ],
  },
  {
    id: 'global-launch-date',
    claim: 'Aniimo launches on PC and console on September 16, 2026 at 10:00 UTC+8.',
    status: 'official',
    checkedAt: '2026-08-29',
    sourceIds: ['aniimo-playstation-10018491'],
  },
  {
    id: 'ios-launch-date',
    claim: 'The Aniimo App Store listing shows September 23, 2026 for iPhone and iPad.',
    status: 'official',
    checkedAt: '2026-09-15',
    sourceIds: ['aniimo-app-store-6759098797'],
  },
  {
    id: 'forms-and-sparkling-styles',
    claim:
      'The official Wiki detail snapshot publishes three kinds of morphology entries (Basic Form, Prismana Form and region-named forms). The official probability disclosure separately publishes a sparkling style table with three styles and the rate of each per obtaining method.',
    status: 'official',
    checkedAt: '2026-09-18',
    sourceIds: [
      'aniimo-official-wiki-index-2026-08-30',
      'aniimo-official-probabilities-2026-09-16',
    ],
  },
  {
    id: 'prismana-changes-element',
    claim: 'A Prismana form changes an Aniimo element rather than its stats.',
    status: 'community',
    checkedAt: '2026-09-18',
    sourceIds: [],
  },
  {
    id: 'android-release-status',
    claim:
      'The official Google Play listing for Aniimo is live, currently offers a wishlist action instead of an install action, and publishes no Android release date.',
    status: 'official',
    checkedAt: '2026-09-18',
    sourceIds: ['aniimo-google-play'],
  },
  {
    id: 'mobile-shared-launch-date',
    claim:
      'Aniimo mobile launches on September 23, 2026 for both iOS and Android.',
    status: 'community',
    checkedAt: '2026-09-18',
    sourceIds: [],
  },
  {
    id: 'mobile-cross-progression',
    claim: 'Aniimo mobile shares progress with the PC and console versions.',
    status: 'community',
    checkedAt: '2026-09-18',
    sourceIds: [],
  },
  {
    id: 'pre-registration-milestones',
    claim:
      'The official site shows 39,566,123 pre-registrations and all four published milestone rewards unlocked.',
    status: 'official',
    checkedAt: '2026-09-21',
    sourceIds: ['aniimo-official-home-2026-08-28'],
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
    claim:
      'Elemental matchup multipliers. No official combat table has been published, so the values shown are a community consensus (1.6x super effective, 0.625x resisted, no immunities), and a small number of cells still differ between community sources.',
    status: 'community',
    checkedAt: '2026-09-18',
    sourceIds: ['aniimo-type-chart-community-2026-09'],
  },
  {
    id: 'catch-formula',
    claim:
      'The official probability disclosure publishes the catch formula for all three scenarios plus the region-stage base rate table and the level, cube, HP, backstrike and status coefficients. Per-species template base rates are not published.',
    status: 'official',
    checkedAt: '2026-09-16',
    sourceIds: ['aniimo-official-probabilities-2026-09-16'],
  },
];
