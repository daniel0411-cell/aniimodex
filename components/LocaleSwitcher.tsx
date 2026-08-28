'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const localeLabels: Record<string, string> = {
  en: 'EN',
  'zh-Hant': '繁中',
  'zh-Hans': '简中',
};

export default function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg bg-ink-soft p-0.5"
      role="group"
      aria-label={t('label')}
    >
      {locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            aria-pressed={active}
            onClick={() => {
              router.replace(pathname, { locale: loc });
            }}
            className={cn(
              'rounded-md px-2 py-1 text-xs font-medium transition-colors',
              active
                ? 'bg-primary text-white shadow'
                : 'text-text-secondary hover:bg-ink-card hover:text-text-primary'
            )}
          >
            {localeLabels[loc] ?? loc}
          </button>
        );
      })}
    </div>
  );
}
