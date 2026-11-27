import assets from '@/data/editorial-images.json';
import dexAssets from '@/data/dex-images.json';

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
