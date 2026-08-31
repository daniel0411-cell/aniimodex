'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getAllAniimos } from '@/lib/aniimo';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Link } from '@/i18n/navigation';

export default function CatchPage() {
  const t = useTranslations('catchTool');
  const tr = useTranslations();
  const allAniimos = useMemo(() => getAllAniimos(), []);
  const [aniimoNumber, setAniimoNumber] = useState(allAniimos[0]?.number ?? '001');
  const aniimo = allAniimos.find((entry) => entry.number === aniimoNumber);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Breadcrumb items={[{ label: tr('breadcrumb.tools'), href: '/tools' }, { label: t('title') }]} />
      <header className="space-y-2"><h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{t('title')}</h1><p className="text-sm text-text-secondary sm:text-base">{t('subtitle')}</p></header>
      <div className="border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950"><p className="font-semibold">{t('formulaPendingTitle')}</p><p>{t('formulaPendingDescription')}</p></div>
      <div className="grid items-start gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <label className="block border-t-4 border-primary bg-white p-4 shadow-card"><span className="mb-2 block text-sm font-semibold text-text-primary">{t('selectAniimo')}</span><select value={aniimoNumber} onChange={(event) => setAniimoNumber(event.target.value)} className="h-11 w-full rounded-md border border-ink-border bg-white px-3 text-sm text-text-primary">{allAniimos.map((entry) => <option key={entry.number} value={entry.number}>#{entry.number} · {entry.name}</option>)}</select><p className="mt-3 text-xs leading-5 text-text-muted">{t('selectorHelp')}</p></label>
        {aniimo && <section className="space-y-5 border border-ink-border bg-white p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-4 border-b border-ink-border pb-4"><div><p className="font-mono text-xs text-text-muted">#{aniimo.number}</p><h2 className="mt-1 text-2xl font-bold text-text-primary">{aniimo.name}</h2><p className="text-sm text-text-secondary">{aniimo.enName}</p></div><span className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">{t('officialStatus')}</span></div><dl className="grid gap-4 sm:grid-cols-2"><div><dt className="text-xs font-semibold uppercase text-text-muted">{t('elementsLabel')}</dt><dd className="mt-1 text-sm text-text-primary">{aniimo.officialElements?.map((element) => tr(`elements.${element}`)).join(' / ')}</dd></div><div><dt className="text-xs font-semibold uppercase text-text-muted">{t('roleLabel')}</dt><dd className="mt-1 text-sm text-text-primary">{aniimo.officialRole ? tr(`roles.${aniimo.officialRole}`) : tr('common.unknown')}</dd></div><div><dt className="text-xs font-semibold uppercase text-text-muted">{t('catchRateLabel')}</dt><dd className="mt-1 text-sm font-semibold text-amber-700">{t('notPublished')}</dd></div><div><dt className="text-xs font-semibold uppercase text-text-muted">{t('conditionsLabel')}</dt><dd className="mt-1 text-sm font-semibold text-amber-700">{t('notPublished')}</dd></div></dl><nav className="flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-border pt-4 text-sm font-semibold text-primary-light"><Link href={`/dex/${aniimo.number}`}>{t('openDex')} →</Link><Link href="/locations">{t('browseLocations')} →</Link><Link href="/guide/aniimo-catching-guide">{t('readGuide')} →</Link></nav></section>}
      </div>
    </div>
  );
}
