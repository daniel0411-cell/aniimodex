import assets from '@/data/editorial-images.json';
import dexAssets from '@/data/dex-images.json';
import taskVisuals from '@/assets/task-visuals/content.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';
export type EditorialImage = (typeof assets)[keyof typeof assets];
// Only select an image when it helps with this particular visitor task.
export const guideImageKinds: Record<string, string> = {
  'how-to-download-aniimo': 'download',
  'aniimo-mobile': 'download',
  'aniimo-crossplay-cross-save': 'account',
  'aniimo-progress-account-safety': 'account',
  'is-aniimo-free-to-play': 'spending',
  'is-aniimo-a-gacha-game': 'monetization',
  'aniimo-evolution-system': 'evolution',
  'aniimo-habitats-locations': 'habitats',
  'aniimo-forms-explained': 'forms',
  'aniimo-team-composition': 'team',
  'aniimo-roles-explained': 'team',
  'aniimo-catching-guide': 'catch',
  'aniimo-twine-explained': 'twine',
  'aniimo-choose-by-mobility-role': 'twine',
  'aniimo-mobility-abilities': 'twine',
  'aniimo-elements-explained': 'type-chart',
  'aniimo-prismana-potential-breeding-guide': 'sparkling',
  'aniimo-dev-dispatch-roadmap': 'task-dev-dispatch-roadmap',
  'aniimo-egg-heist': 'task-egg-heist',
  'aniimo-harvest-gathering-farm-guide': 'task-harvest-gathering-farm-guide',
  'aniimo-holo-battle-interlink': 'task-holo-battle-interlink',
  'aniimo-language-controller-support': 'task-language-controller-support',
  'aniimo-launch-checklist-known-issues': 'task-launch-checklist-known-issues',
  'aniimo-launch-watchlist': 'task-launch-watchlist',
  'aniimo-multiplayer': 'task-multiplayer',
  'aniimo-platforms': 'task-platforms',
  'aniimo-pre-registration': 'task-pre-registration',
  'aniimo-prismana-event-tracker': 'task-prismana-event-tracker',
  'aniimo-release-date': 'task-release-date',
  'aniimo-rv-homeland-guide': 'task-rv-homeland-guide',
  'aniimo-system-requirements': 'task-system-requirements',
  'aniimo-version-1-1-update': 'task-version-1-1-update',
  'getting-started': 'task-getting-started',
  'how-we-verify': 'task-how-we-verify',
  'official-aniimo-dex-status': 'task-official-aniimo-dex-status',
  'what-is-aniimo': 'task-what-is-aniimo',
};
export function getGuideImage(slug: string, locale: string): EditorialImage | undefined {
  const key = `${guideImageKinds[slug]}-${locale}` as keyof typeof assets;
  return assets[key];
}
// Body examples and preferred previews have different editorial requirements.
export function getEditorialPreviewImage(kind: string, locale: string): EditorialImage | undefined {
  const image = assets[`${kind}-${locale}` as keyof typeof assets];
  return image?.previewUsage === 'representative' ? image : undefined;
}
export function getGuidePreviewImage(slug: string, locale: string): EditorialImage | undefined {
  return getEditorialPreviewImage(guideImageKinds[slug], locale);
}
export function imageMetadata(image: EditorialImage) {
  return { url: `${SITE_URL}${image.src}`, width: image.width, height: image.height, alt: image.alt };
}
export function getDexImage(number: string, currentUrl?: string) {
  const asset = dexAssets[number as keyof typeof dexAssets];
  // Do not silently apply old dimensions to a changed CDN asset.
  return asset?.url === currentUrl ? asset : undefined;
}

// Place each new explanation after its corresponding complete HTML answer.
export function getGuideFigureHeading(slug: string, locale: string): string | undefined {
  const task = taskVisuals.find(row => row.slug === slug);
  return task?.afterHeading?.[locale as 'en' | 'zh-Hans' | 'zh-Hant'];
}
