export interface SourceReference {
  id: string;
  url: string;
  title: string;
  accessedAt: string;
  evidence: string;
  /**
   * 来源性质：官方一手来源（默认，省略即视为 official）或社区整理。
   * 社区来源只用于支撑 status='community' 的核验记录，不得当作官方结论。
   */
  kind?: 'official' | 'community';
}

export const sources: SourceReference[] = [
  {
    id: 'aniimo-official-wiki-index-2026-08-30',
    url: 'https://wiki.aniimo.com/',
    title: 'Official Aniimo Wiki - Complete Aniimo Index',
    accessedAt: '2026-08-30',
    evidence:
      'The official Aniimo Wiki index payload lists Aniimo numbers, English names, official artwork, descriptions, elements, roles and stages. AniimoDex imports only these explicitly published fields.',
  },
  {
    id: 'aniimo-official-home-2026-08-28',
    url: 'https://www.aniimo.com/',
    title: 'Aniimo Official Website - Global Launch Announced!',
    accessedAt: '2026-09-22',
    evidence:
      'The official website shows a PC launcher download alongside links to PS5, Xbox, Steam, iOS, Google Play and Epic Games Store. It also publishes a live global pre-registration counter (40,130,660 when checked) with four milestone rewards, all of which were already unlocked, plus listed launch benefits. The benefits include four free outfits through story missions, home gameplay and cumulative sign-in. The page does not publish a universal Android release date, a cross-progression statement, or current eligibility and claim deadlines for every launch benefit.',
  },
  {
    id: 'aniimo-steam-4126040',
    url: 'https://store.steampowered.com/app/4126040/Aniimo/',
    title: 'Aniimo on Steam',
    accessedAt: '2026-09-16',
    evidence:
      'Steam lists Aniimo as released, free-to-play and Windows-only, developed and published by Pawprint Studio, with Sep 15, 2026 shown for the US store region checked.',
  },
  {
    id: 'aniimo-playstation-10018491',
    url: 'https://store.playstation.com/concept/10018491',
    title: 'Aniimo on PlayStation Store',
    accessedAt: '2026-09-14',
    evidence:
      'The PlayStation Store states that Aniimo launches as a free-to-play title on September 16, 2026 at 10:00 UTC+8 and describes catching, Twine, open-world exploration and real-time challenges.',
  },
  {
    id: 'aniimo-xbox-9pk8phlcqdf6',
    url: 'https://www.xbox.com/en-US/games/store/aniimo/9pk8phlcqdf6',
    title: 'Aniimo on Xbox',
    accessedAt: '2026-09-16',
    evidence:
      'The Xbox product page lists the free base game at zero price for PC and Xbox Series X|S, with purchase and fulfillment actions available.',
  },
  {
    id: 'aniimo-app-store-6759098797',
    url: 'https://apps.apple.com/us/app/aniimo/id6759098797',
    title: 'Aniimo on the Apple App Store',
    accessedAt: '2026-09-15',
    evidence:
      'The official Aniimo App Store listing shows September 23, 2026 for iPhone and iPad in the storefronts checked. This date does not confirm the Android release date.',
  },
  {
    id: 'aniimo-epic-759396',
    url: 'https://store.epicgames.com/p/aniimo-759396',
    title: 'Aniimo on the Epic Games Store',
    accessedAt: '2026-09-16',
    evidence:
      'The Epic Games Store publishes the Windows minimum and recommended CPU, memory, GPU, DirectX and storage requirements for Aniimo.',
  },
  {
    id: 'aniimo-google-play',
    url: 'https://play.google.com/store/apps/details?id=com.x.aniimos',
    title: 'Aniimo on Google Play',
    accessedAt: '2026-09-22',
    evidence:
      'The official US Google Play listing for Aniimo (package com.x.aniimos) showed an Install action when checked on September 22, 2026, after listing an update dated September 21. It is published by Pawprint Studio as a role-playing game with in-app purchases. Availability can still vary by country, account and compatible device, so this check does not establish a simultaneous worldwide Android release.',
  },
  {
    id: 'aniimo-official-probabilities-2026-09-16',
    url: 'https://www.aniimo.com/zh-tw/formula-multipliers',
    title: 'Aniimo Official Probability Disclosure',
    accessedAt: '2026-09-18',
    evidence:
      'The official disclosure publishes the three catch scenarios (outside battle, in battle and defeated target), the region-stage base rate table for evolution stages 1-3, the level-difference, cube, HP, backstrike and special-status coefficients, the min/max status stacking rule, the two-square-root resolution for a standard cube on a normal target, and additional drop and sparkling-style tables. It also states that the base rate is decided by each Aniimo template and is not derived from level, which means per-species template rates are not published.',
  },
  {
    id: 'aniimo-type-chart-community-2026-09',
    url: 'https://aniimobook.app/type-chart/',
    title: 'Aniimo Type Chart (community-compiled) - The Aniimo Book',
    kind: 'community',
    accessedAt: '2026-09-18',
    evidence:
      'A community-compiled 9x9 element matchup chart using 1.6x super effective, 1x neutral and 0.625x resisted values, with no immunities and same-type resisted except Dark versus Dark. Cross-checked on 2026-09-18 against aniimotools.dev and games.gg: the multiplier values and most matchups agree, but a small number of cells (for example Ice versus Wind) still differ between community sources.',
  },
];

export const sourceById = new Map(sources.map((source) => [source.id, source]));
