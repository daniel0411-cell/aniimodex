'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const t = useTranslations('breadcrumb');

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm">
      <Link href="/" className="text-text-muted transition-colors hover:text-primary-light">
        {t('home')}
      </Link>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            <span className="text-text-muted" aria-hidden>
              /
            </span>
            {item.href && !last ? (
              <Link
                href={item.href}
                className="text-text-muted transition-colors hover:text-primary-light"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text-primary">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
