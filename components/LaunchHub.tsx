import { Link } from '@/i18n/navigation';

interface LaunchHubProps {
  title: string;
  description: string;
  labels: { release: string; download: string; preload: string; platforms: string };
}

const launchLinks = [
  ['release', '/guide/aniimo-release-date'],
  ['download', '/guide/how-to-download-aniimo'],
  ['preload', '/guide/aniimo-launch-time-preload'],
  ['platforms', '/guide/aniimo-platforms'],
] as const;

export default function LaunchHub({ title, description, labels }: LaunchHubProps) {
  return (
    <section className="border-y border-ink-border py-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase text-primary-light">Launch Hub</p>
        <h2 className="mt-1 text-xl font-bold text-text-primary">{title}</h2>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </div>
      <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label={title}>
        {launchLinks.map(([key, href]) => (
          <Link key={key} href={href} className="border-l-4 border-primary bg-white px-4 py-4 text-sm font-semibold text-text-primary hover:bg-sky-50">
            {labels[key]} <span className="text-primary-light">→</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
