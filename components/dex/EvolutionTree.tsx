import { getAniimoByName } from '@/lib/aniimo';
import { Link } from '@/i18n/navigation';
import type { OfficialEvolutionNode } from '@/data/aniimo-details';

export default function EvolutionTree({ node, locale, stageLabel }: { node: OfficialEvolutionNode; locale: string; stageLabel: string }) {
  const entry = getAniimoByName(node.name);
  return (
    <div data-evolution-name={node.name}>
      <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded border border-ink-border bg-white px-3 py-2 text-sm">
        {entry ? <Link href={`/dex/${entry.number}`} className="break-words font-semibold text-primary-light">{locale === 'en' ? entry.enName : entry.name}</Link> : <span className="break-words font-semibold text-text-primary">{node.name}</span>}
        {node.stage > 0 && <span className="text-xs text-text-muted">{stageLabel} {node.stage}</span>}
      </div>
      {node.children.length > 0 && (
        <div className="ml-4 mt-2 space-y-2 border-l-2 border-ink-border pl-4">
          {node.children.map((child) => <EvolutionTree key={`${child.name}-${child.stage}`} node={child} locale={locale} stageLabel={stageLabel} />)}
        </div>
      )}
    </div>
  );
}
