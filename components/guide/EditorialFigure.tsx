import Image from 'next/image';
import type { EditorialImage } from '@/lib/editorial-images';
import { Link } from '@/i18n/navigation';

export default function EditorialFigure({ image, locale }: { image: EditorialImage; locale: string }) {
  return (
    <figure className="my-6 min-w-0 border-y border-ink-border py-5" data-editorial-image={image.src}>
      <Image src={image.src} width={image.width} height={image.height} alt={image.alt}
        loading="lazy" sizes="(min-width: 1024px) 900px, calc(100vw - 32px)"
        className="h-auto w-full rounded border border-ink-border" style={{ maxWidth: image.width }} />
      <figcaption className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
        <p>{image.caption}</p>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-primary-light">
          <Link href={image.source.replace(/^\/(en|zh-Hans|zh-Hant)/, '')} className="underline underline-offset-4">
            {locale === 'en' ? 'Open the source page' : locale === 'zh-Hant' ? '開啟來源頁面' : '打开来源页面'} →
          </Link>
          <a href={image.src} className="underline underline-offset-4">{locale === 'en' ? 'View full-size image' : locale === 'zh-Hant' ? '查看原尺寸圖片' : '查看原尺寸图片'}</a>
        </p>
      </figcaption>
    </figure>
  );
}
