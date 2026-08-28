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
    evidence: 'The official Aniimo website links this Steam product page as its PC storefront.',
  },
];

export const sourceById = new Map(sources.map((source) => [source.id, source]));
