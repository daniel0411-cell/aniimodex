import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { AniimoEntry } from '@/types/aniimo';

export default function AniimoLinkList({ aniimos }: { aniimos: AniimoEntry[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {aniimos.map((aniimo) => (
        <Link key={aniimo.number} href={`/dex/${aniimo.number}`} className="inline-flex items-center gap-2 rounded border border-ink-border bg-white px-2 py-1.5 text-xs text-text-primary hover:border-primary-light">
          {aniimo.imageUrl && <span className="relative h-7 w-7"><Image src={aniimo.imageUrl} alt="" fill sizes="28px" className="object-contain" /></span>}
          <span>#{aniimo.number} {aniimo.name}</span>
        </Link>
      ))}
    </div>
  );
}
