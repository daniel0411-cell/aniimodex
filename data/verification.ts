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
    claim: 'Aniimo launched on PC and console on September 16, 2026 at 10:00 UTC+8.',
    status: 'official',
    checkedAt: '2026-09-21',
    sourceIds: ['aniimo-playstation-10018491'],
  },
  {
    id: 'ios-launch-date',
    claim:
      'The China App Store lists Aniimo as available for iPhone and iPad; availability in other storefronts can differ.',
    status: 'official',
    checkedAt: '2026-09-23',
    sourceIds: ['aniimo-app-store-cn-6768584375'],
  },
  {
    id: 'forms-and-sparkling-styles',
    claim:
      'The Wiki snapshot distinguishes Basic, Prismana and region-named forms. The October 27 probability observation separately lists Sparkling types I-X and Dazzling/Shadow outcomes by item and obtaining method; these are not morphology or stat probabilities.',
    status: 'official',
    checkedAt: '2026-10-27',
    sourceIds: [
      'aniimo-official-wiki-basic-2026-10-23',
      'aniimo-official-sparkling-disclosure-2026-10-27',
    ],
  },
  {
    id: 'prismana-changes-element',
    claim: 'Prismana links identify alternate forms; their element and attribute changes are not established by this Basic Form snapshot.',
    status: 'unknown',
    checkedAt: '2026-10-23',
    sourceIds: [],
  },
  {
    id: 'android-release-status',
    claim:
      'The official US Google Play listing for Aniimo showed an Install action on September 22, 2026; availability can still vary by region, account and device.',
    status: 'official',
    checkedAt: '2026-09-22',
    sourceIds: ['aniimo-google-play'],
  },
  {
    id: 'mobile-shared-launch-date',
    claim:
      'Aniimo mobile availability is live in the China iOS and US Android storefronts checked, but availability can differ by region, account and device.',
    status: 'official',
    checkedAt: '2026-09-23',
    sourceIds: ['aniimo-app-store-cn-6768584375', 'aniimo-google-play'],
  },
  {
    id: 'mobile-cross-progression',
    claim: 'A complete PC, console and mobile save or purchase-transfer policy is not established by the registered sources; cross-platform multiplayer alone does not confirm it.',
    status: 'unknown',
    checkedAt: '2026-10-23',
    sourceIds: [],
  },
  {
    id: 'pre-registration-milestones',
    claim:
      'The official site shows 40,135,279 pre-registrations and all four published milestone rewards unlocked.',
    status: 'official',
    checkedAt: '2026-09-23',
    sourceIds: ['aniimo-official-home-2026-08-28'],
  },
  {
    id: 'dex-001-020',
    claim:
      'The October 23 snapshot indexes 86 Basic Form records with names, official numbers, six attributes, elements, roles and published detail fields. Alternate-form values and complete encounter conditions are outside this import; six unresolved evolution trees remain withheld.',
    status: 'official',
    checkedAt: '2026-10-23',
    sourceIds: ['aniimo-official-wiki-basic-2026-10-23'],
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
      'The current disclosure separates field, battle and boss formulas, including boss base rate 6%, five region rows and cube, level, HP and backstrike factors. Individual status coefficients are not listed; unknown inputs prevent an ordinary-target numeric result.',
    status: 'official',
    checkedAt: '2026-10-27',
    sourceIds: ['aniimo-official-catch-disclosure-2026-10-27'],
  },
];
