import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-border bg-ink-soft">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-white">
                A
              </span>
              <span className="font-semibold text-text-primary">AniimoDex</span>
            </div>
            <p className="text-sm text-text-muted">{t('disclaimer', { year })}</p>
          </div>

          <nav aria-label={t('legalNav')} className="flex max-w-xl flex-wrap gap-x-5 gap-y-3 text-sm">
            <Link href="/about" className="text-text-secondary hover:text-primary-light">{t('about')}</Link>
            <Link href="/privacy" className="text-text-secondary hover:text-primary-light">{t('privacy')}</Link>
            <Link href="/terms" className="text-text-secondary hover:text-primary-light">{t('terms')}</Link>
            <Link href="/guide/how-we-verify" className="text-text-secondary hover:text-primary-light">{t('verification')}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
