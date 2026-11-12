import { advertisingEnabled } from '@/lib/advertising';
import Script from 'next/script';
import { getPublishedGuidePosts } from '@/data/guides';

export default function Advertising() {
  if (!advertisingEnabled) return null;
  const paths = ['/', '/dex/', '/locations/', '/evolutions/', '/abilities/',
    ...getPublishedGuidePosts().map(({ slug }) => `/guide/${slug}/`)];
  return <Script id="aniimo-advertising" src="/advertising.js" strategy="afterInteractive" data-aniimo-advertising="live" data-auto-ad-paths={JSON.stringify(paths)} />;
}
