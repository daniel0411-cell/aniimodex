import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  /** 是否可交互（鼠标悬停有反馈） */
  interactive?: boolean;
}

export default function Card({
  title,
  description,
  children,
  className,
  interactive = false,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-ink-border bg-ink-card p-5 shadow-card',
        interactive && 'transition-all hover:border-primary-light hover:shadow-card-hover hover:-translate-y-0.5',
        className
      )}
    >
      {title && <h3 className="text-lg font-semibold text-text-primary">{title}</h3>}
      {description && <p className="mt-1 text-sm text-text-secondary">{description}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
