import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const friendLinks = [
  { href: 'https://example.com', labelKey: 'f1' },
  { href: 'https://example.com', labelKey: 'f2' },
  { href: 'https://example.com', labelKey: 'f3' },
];

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-border bg-ink-soft">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* 版权信息 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-white">
                A
              </span>
              <span className="font-semibold text-text-primary">AniimoDex</span>
            </div>
            <p className="text-sm text-text-muted">{t('disclaimer', { year })}</p>
          </div>

          {/* 友情链接（暂时隐藏） */}
          {false && (
            <div>
              <h4 className="mb-3 text-sm font-semibold text-text-secondary">{t('friends')}</h4>
              <ul className="space-y-2">
                {friendLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-primary-light"
                    >
                      {t('friendLinks.' + link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
