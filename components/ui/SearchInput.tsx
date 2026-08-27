'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  /** 防抖延迟（毫秒），默认 300 */
  delay?: number;
  placeholder?: string;
  className?: string;
  /** 防抖后的值变化时触发 */
  onSearch?: (value: string) => void;
}

export default function SearchInput({
  delay = 300,
  placeholder = '搜索…',
  className,
  onSearch,
}: SearchInputProps) {
  const [value, setValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setValue(next);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch?.(next.trim()), delay);
  };

  return (
    <div className={cn('relative w-full', className)}>
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
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ink-border bg-ink-soft py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
