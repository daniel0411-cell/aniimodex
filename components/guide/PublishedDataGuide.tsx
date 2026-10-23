import { getTranslations } from 'next-intl/server';
import { getAllAniimos } from '@/lib/aniimo';
import { evolutionFamilies, flattenEvolution, habitatGroups, mobilityGroups } from '@/data/aniimo-collections';
import type { OfficialEvolutionNode } from '@/data/aniimo-details';
import { Link } from '@/i18n/navigation';

const hasBranch = (node: OfficialEvolutionNode): boolean => node.children.length > 1 || node.children.some(hasBranch);

export default async function PublishedDataGuide({ locale, topic }: { locale: string; topic: string }) {
  const t = await getTranslations({ locale, namespace: 'publishedDataGuide' });
  const tr = await getTranslations({ locale });
  const entries = getAllAniimos();
  const rows = topic === 'roles'
    ? ['DPS', 'Heal', 'Support', 'Break', 'Regen'].map((role) => ({
      label: tr(`roles.${role}`),
      members: entries.filter((entry) => entry.officialRole === role),
    }))
    : topic === 'evolution'
      ? evolutionFamilies.filter(hasBranch).map((family) => ({ label: family.name, members: entries.filter((entry) => flattenEvolution(family).includes(entry.enName)) }))
      : topic === 'habitats'
        ? habitatGroups.slice(0, 6).map(([label, members]) => ({ label, members }))
        : topic === 'mobility'
          ? [...mobilityGroups].sort((a, b) => b[1].members.length - a[1].members.length || a[0].localeCompare(b[0])).slice(0, 6).map(([label, group]) => ({ label, members: group.members }))
          : [];
  if (!rows.length) return null;
  const destination = topic === 'roles' ? '/tools/team-builder' : topic === 'evolution' ? '/evolutions' : topic === 'habitats' ? '/locations' : '/tools/twine';

  return <section className="mt-8 space-y-4 border-t border-ink-border pt-6">
    <h2 id="published-data" className="scroll-mt-24 text-xl font-bold text-text-primary">{t(`${topic}Title`)}</h2>
    <p className="text-sm leading-6 text-text-secondary">{t(`${topic}Scope`)}</p>
    <p className="text-xs leading-5 text-text-muted">{t('snapshotNote')}</p>
    <div className="overflow-x-auto" role="region" aria-label={t(`${topic}Title`)} tabIndex={0}>
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-y border-ink-border"><tr>{['group', 'count', 'elements', 'examples'].map((key) => <th key={key} scope="col" className="px-3 py-3">{t(key)}</th>)}</tr></thead>
        <tbody>{rows.map(({ label, members }) => <tr key={label} className="border-b border-ink-border align-top">
          <th scope="row" className="px-3 py-3">{label}</th>
          <td className="px-3 py-3 tabular-nums">{members.length}</td>
          <td className="px-3 py-3">{Array.from(new Set(members.flatMap((entry) => entry.officialElements ?? []))).map((element) => tr(`elements.${element}`)).join(' / ')}</td>
          <td className="px-3 py-3"><ul className="space-y-2">{members.slice(0, topic === 'evolution' ? members.length : 3).map((entry) => <li key={entry.number}><Link href={`/dex/${entry.number}`} className="font-semibold text-primary-light hover:underline">#{entry.number} {locale === 'en' ? entry.enName : entry.name}</Link></li>)}</ul></td>
        </tr>)}</tbody>
      </table>
    </div>
    <Link href={destination} className="inline-flex text-sm font-semibold text-primary-light">{t(`${topic}Next`)} →</Link>
  </section>;
}
