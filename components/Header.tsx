'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import LocaleSwitcher from '@/components/LocaleSwitcher';

const navItems = [
  { href: '/dex', key: 'dex' },
  { href: '/evolutions', key: 'evolutions' },
  { href: '/locations', key: 'locations' },
  { href: '/abilities', key: 'abilities' },
  { href: '/guide', key: 'guide' },
  { href: '/tools', key: 'tools' },
] as const;

const mobileToolItems = [
  { href: '/tools/twine', key: 'twine' },
  { href: '/tools/type-chart', key: 'typeChart' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-glow">
            <Image
              src="/images/logo-mascot.jpg"
              alt="AniimoDex mascot"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          <span className="text-lg font-bold text-text-primary">AniimoDex</span>
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
          {mobileToolItems.map((item) => (
            <li key={item.href} className="pl-4">
              <Link href={item.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-text-muted">
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
