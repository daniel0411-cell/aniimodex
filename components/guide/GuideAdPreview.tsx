import { advertisingEnabled, advertisingGuides } from '@/lib/advertising';

export default function GuideAdPreview({ locale, slug }: { locale: string; slug: string }) {
  const preview = process.env.NODE_ENV === 'development' && process.env.AD_LAYOUT_PREVIEW === '1';
  if ((!advertisingEnabled && !preview) || !advertisingGuides.has(slug)) return null;

  const label = locale === 'en' ? 'Advertisement' : locale === 'zh-Hant' ? '廣告' : '广告';
  const note = locale === 'en' ? 'Local layout preview · No ad requests' : locale === 'zh-Hant' ? '本機版面預覽 · 不請求真實廣告' : '本地布局预览 · 不请求真实广告';

  if (advertisingEnabled) {
    return (
      <aside data-guide-ad hidden aria-label={label} className="my-8 border-y border-ink-border py-4">
        <p className="mb-2 text-center text-xs text-text-muted">{label}</p>
        <div className="min-h-[250px] w-full sm:min-h-[280px]">
          <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-2321309842883439" data-ad-slot="3760991389" data-ad-format="auto" data-full-width-responsive="true" />
        </div>
      </aside>
    );
  }

  return (
    <aside data-ad-preview aria-label={label} className="my-8 border-y border-ink-border py-4">
      <p className="mb-2 text-center text-xs text-text-muted">{label}</p>
      <div className="flex h-[250px] w-full items-center justify-center border border-dashed border-ink-border bg-ink-card px-4 text-center sm:h-[280px]">
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-secondary">AniimoDex_Guide_End</p>
          <p className="text-xs text-text-muted">{note}</p>
        </div>
      </div>
    </aside>
  );
}
