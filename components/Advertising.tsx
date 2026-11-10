import { advertisingEnabled } from '@/lib/advertising';
import Script from 'next/script';

export default function Advertising() {
  if (!advertisingEnabled) return null;
  // One document-level bootstrap survives client-side navigation. Google supplies
  // the regional messages through its AdSense tag after dashboard publication.
  return <Script id="aniimo-advertising" src="/advertising.js" strategy="afterInteractive" data-aniimo-advertising="live" />;
}
