'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/navigation';

interface DirectoryGroup {
  name: string;
  description?: string;
  members: { number: string; name: string }[];
}

export default function SkillDirectory({
  groups,
  labels,
}: {
  groups: DirectoryGroup[];
  labels: { search: string; empty: string; count: string; initial: string };
}) {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const visible = useMemo(() => {
    if (!normalized) return groups.slice(0, 24);
    return groups.filter((group) =>
      [group.name, group.description ?? '', ...group.members.map((member) => member.name)]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    );
  }, [groups, normalized]);

  return (
    <div className="space-y-4">
      <label className="block max-w-xl">
        <span className="sr-only">{labels.search}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.search}
          className="w-full rounded border border-ink-border bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-primary"
        />
      </label>
      {!normalized && <p className="text-xs text-text-muted">{labels.initial}</p>}
      {visible.length === 0 ? (
        <p className="border-y border-ink-border py-5 text-sm text-text-muted">{labels.empty}</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((group) => (
            <section key={group.name} className="border-t-2 border-primary bg-ink-card p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold text-text-primary">{group.name}</h3>
                <span className="shrink-0 text-xs text-text-muted">
                  {labels.count.replace('{count}', String(group.members.length))}
                </span>
              </div>
              {group.description && (
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-text-secondary">
                  {group.description}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {group.members.map((member) => (
                  <Link
                    key={member.number}
                    href={`/dex/${member.number}`}
                    className="rounded border border-ink-border bg-white px-2 py-1 text-xs text-text-primary hover:border-primary-light"
                  >
                    #{member.number} {member.name}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
