'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import LocaleSwitcher from '@/components/LocaleSwitcher';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/dex', key: 'dex' },
  { href: '/tools/twine', key: 'twine' },
  { href: '/tools/type-chart', key: 'typeChart' },
  { href: '/guide', key: 'guide' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-border bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white shadow-glow">
            A
          </span>
          <span className="text-lg font-bold tracking-tight text-text-primary">AniimoDex</span>
        </Link>

        {/* 桌面端导航 */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-primary/15 text-primary-hover'
                    : 'text-text-secondary hover:bg-ink-soft hover:text-primary-hover'
                )}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <LocaleSwitcher />
          </li>
        </ul>

        {/* 移动端汉堡按钮 */}
        <div className="flex items-center gap-1 md:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            aria-label={open ? 'closeMenu' : 'openMenu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-ink-card hover:text-text-primary"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* 移动端下拉菜单 */}
      {open && (
        <ul className="border-t border-ink-border bg-ink-soft px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-primary/15 text-primary-hover'
                    : 'text-text-secondary hover:bg-ink-soft hover:text-primary-hover'
                )}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
