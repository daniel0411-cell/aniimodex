import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="面包屑" className="flex flex-wrap items-center gap-1 text-sm">
      <Link href="/" className="text-text-muted transition-colors hover:text-primary-light">
        首页
      </Link>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            <span className="text-text-muted" aria-hidden>
              /
            </span>
            {item.href && !last ? (
              <Link href={item.href} className="text-text-muted transition-colors hover:text-primary-light">
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
