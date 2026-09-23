import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

export interface PolicySection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export default function PolicyPage({
  title,
  intro,
  updated,
  sections,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: PolicySection[];
  children?: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl space-y-8 pb-10">
      <header className="border-b border-ink-border pb-6">
        <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
        <p className="mt-3 text-base leading-7 text-text-secondary">{intro}</p>
        <p className="mt-3 text-xs text-text-muted">{updated}</p>
      </header>
      {sections.map((section) => (
        <section key={section.heading} className="border-t border-ink-border pt-6 first:border-0 first:pt-0">
          <h2 className="text-xl font-bold text-text-primary">{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-3 leading-7 text-text-secondary">{paragraph}</p>
          ))}
          {section.items && (
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-text-secondary">
              {section.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
        </section>
      ))}
      {children}
      <nav className="flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-border pt-6 text-sm font-semibold text-primary-light">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms &amp; copyright</Link>
        <Link href="/guide/how-we-verify">How we verify</Link>
      </nav>
    </article>
  );
}
