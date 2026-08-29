'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
}

export default function SearchInput({
  placeholder = '搜索…',
  className,
  onSearch,
}: SearchInputProps) {
  const [value, setValue] = useState('');

  return (
    <form
      role="search"
      className={cn('relative w-full', className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.(value.trim());
      }}
    >
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-white/80 bg-white/95 py-2.5 pl-10 pr-14 text-sm text-text-primary shadow-card placeholder:text-text-muted transition-colors focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-accent text-white transition-colors hover:bg-accent-hover"
      >
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}
