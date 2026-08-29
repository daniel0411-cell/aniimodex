export interface SourceReference {
  id: string;
  url: string;
  title: string;
  accessedAt: string;
  evidence: string;
}

export const sources: SourceReference[] = [
  {
    id: 'aniimo-official-home-2026-08-28',
    url: 'https://www.aniimo.com/',
    title: 'Aniimo Official Website - Global Launch Announced!',
    accessedAt: '2026-08-28',
    evidence:
      'Official description identifies Aniimo as an open-world action RPG featuring creature collection, Twine, exploration, teams and quests. The page links to PS5, Xbox, Steam, iOS, Google Play and Epic Games Store.',
  },
  {
    id: 'aniimo-steam-4126040',
    url: 'https://store.steampowered.com/app/4126040/Aniimo/',
    title: 'Aniimo on Steam',
    accessedAt: '2026-08-28',
    evidence:
      'The official Aniimo website links this store page. Steam lists the game as free-to-play, Windows-only, developed and published by Pawprint Studio, with Sep 15, 2026 shown for the store region checked.',
  },
  {
    id: 'aniimo-playstation-10018491',
    url: 'https://store.playstation.com/concept/10018491',
    title: 'Aniimo on PlayStation Store',
    accessedAt: '2026-08-29',
    evidence:
      'The PlayStation Store states that Aniimo launches as a free-to-play title on September 16, 2026 at 10:00 UTC+8 and describes catching, Twine, open-world exploration and real-time challenges.',
  },
  {
    id: 'aniimo-xbox-9pk8phlcqdf6',
    url: 'https://www.xbox.com/en-US/games/store/aniimo/9pk8phlcqdf6',
    title: 'Aniimo on Xbox',
    accessedAt: '2026-08-29',
    evidence:
      'The Xbox product page lists Aniimo for PC and Xbox Series X|S and describes it as a free-to-play creature-catching open-world RPG with Twine, multiplayer and co-op play.',
  },
];

export const sourceById = new Map(sources.map((source) => [source.id, source]));
