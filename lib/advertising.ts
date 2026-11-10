// Build-time switch. Development can only display the existing inert preview.
export const advertisingEnabled = process.env.NODE_ENV === 'production' && process.env.ADSENSE_ENABLED === '1';

export const advertisingGuides = new Set([
  'aniimo-prismana-potential-breeding-guide',
  'aniimo-rv-homeland-guide',
  'aniimo-version-1-1-update',
]);
