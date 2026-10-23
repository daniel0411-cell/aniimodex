import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllAniimos, getAniimoByNumber, getAniimoByName } from '@/lib/aniimo';
import { getDexComparisons } from '@/lib/dex-comparison';
import { ELEMENT_BADGE_CLASSES, ROLE_BADGE_CLASSES, ROLE_ICONS } from '@/lib/aniimo-ui';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { localizedLanguages } from '@/lib/i18n-metadata';
import { locales } from '@/i18n/routing';
import { sourceById } from '@/data/sources';
import { getOfficialAniimoDetail, isSuspiciousOfficialDescription, type OfficialEvolutionNode, type OfficialSkill } from '@/data/aniimo-details';
import { formKind, type FormKind } from '@/data/forms';
import { flattenEvolution } from '@/data/aniimo-collections';
import AniimoLinkList from '@/components/dex/AniimoLinkList';

interface PageProps {
  params: Promise<{ locale: string; number: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

// 官方形态分类配色：基础 / 虹彩（Prismana）/ 区域
const FORM_KIND_CLASSES: Record<FormKind, string> = {
  basic: 'border-ink-border bg-ink-soft text-text-secondary',
  prismana: 'border-violet-300 bg-violet-50 text-violet-700',
  region: 'border-emerald-300 bg-emerald-50 text-emerald-700',
};

function EvolutionTree({ node, locale, stageLabel }: { node: OfficialEvolutionNode; locale: string; stageLabel: string }) {
  const entry = getAniimoByName(node.name);
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded border border-ink-border bg-white px-3 py-2 text-sm">
        {entry ? <Link href={`/dex/${entry.number}`} className="font-semibold text-primary-light">{locale === 'en' ? entry.enName : entry.name}</Link> : <span className="font-semibold text-text-primary">{node.name}</span>}
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

function SkillList({ skills }: { skills: OfficialSkill[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {skills.map((skill) => (
        <article key={`${skill.group ?? 'ability'}-${skill.name}`} className="flex gap-3 border-t border-ink-border pt-3">
          {skill.iconUrl && (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-ink-soft">
              <Image src={skill.iconUrl} alt="" fill sizes="48px" className="object-contain" />
            </div>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-text-primary">{skill.name}</h3>
              {skill.group && <span className="text-[10px] uppercase text-text-muted">{skill.group}</span>}
            </div>
            {skill.description && !isSuspiciousOfficialDescription(skill.description) && <p className="mt-1 text-xs leading-5 text-text-secondary">{skill.description}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

// 静态导出：预生成全部 locale × 编号路由
export function generateStaticParams() {
  const numbers = getAllAniimos().map((a) => ({ number: a.number }));
  return locales.flatMap((locale) => numbers.map((n) => ({ locale, ...n })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, number } = await params;
  const aniimo = getAniimoByNumber(number);
  const t = await getTranslations({ locale, namespace: 'dexDetail' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const td = await getTranslations({ locale, namespace: 'dex' });
  const siteName = meta('siteName');

  if (!aniimo) {
    return { title: `${t('notFound')} | ${siteName}` };
  }

  const displayName = locale === 'en' ? aniimo.enName : aniimo.name;
  const title = t('metaTitle', { name: displayName, number: aniimo.number });
  const elements = aniimo.officialElements?.map((element) => td(`elementNames.${element}`)).join(', ');
  const role = aniimo.officialRole ? td(`roleNames.${aniimo.officialRole}`) : '';
  const stage = aniimo.officialStage === 'Unknown' ? '' : aniimo.officialStage;
  const description = `${td('title')}: ${aniimo.enName} (#${aniimo.number})${elements ? `, ${elements}` : ''}${role ? `, ${role}` : ''}${stage ? `, ${stage}` : ''}. ${aniimo.description}`;
  const url = `${SITE_URL}/${locale}/dex/${aniimo.number}/`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: localizedLanguages(`/dex/${aniimo.number}/`),
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName,
      locale: locale === 'zh-Hant' ? 'zh_TW' : locale === 'zh-Hans' ? 'zh_CN' : 'en_US',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${aniimo.name} Dex - ${siteName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function DexDetailPage({ params }: PageProps) {
  const { locale, number } = await params;
  setRequestLocale(locale);
  const aniimo = getAniimoByNumber(number);
  if (!aniimo) notFound();
  const detail = getOfficialAniimoDetail(aniimo.number);

  const t = await getTranslations('dexDetail');
  const tr = await getTranslations();
  const collections = await getTranslations('collections');
  const allAniimos = getAllAniimos();
  const currentIndex = allAniimos.findIndex((entry) => entry.number === aniimo.number);
  const previous = currentIndex > 0 ? allAniimos[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? allAniimos[currentIndex + 1] : undefined;
  const familyNames = new Set(detail ? flattenEvolution(detail.evolution) : []);
  const familyAniimos = allAniimos.filter((entry) => entry.number !== aniimo.number && familyNames.has(entry.enName));
  const habitatAniimos = allAniimos.filter((entry) => {
    const candidate = getOfficialAniimoDetail(entry.number);
    return entry.number !== aniimo.number && !familyNames.has(entry.enName) && candidate?.habitats.some((habitat) => detail?.habitats.includes(habitat));
  }).slice(0, 8);
  const comparisons = getDexComparisons(aniimo);

  const url = `${SITE_URL}/${locale}/dex/${aniimo.number}/`;

  // JSON-LD 结构化数据：WebPage + BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${aniimo.name} Dex - AniimoDex`,
        description: aniimo.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: tr('breadcrumb.home'),
            item: `${SITE_URL}/${locale}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: tr('breadcrumb.dex'),
            item: `${SITE_URL}/${locale}/dex/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: aniimo.name,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-8 pb-8">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 面包屑 */}
      <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
        <Link href="/" className="hover:text-primary-light">
          {tr('breadcrumb.home')}
        </Link>
        <span className="mx-2">/</span>
        <Link href="/dex" className="hover:text-primary-light">
          {tr('breadcrumb.dex')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{aniimo.name}</span>
      </nav>

      <div className="flex items-center justify-between border-y border-ink-border py-3 text-sm">
        {previous ? <Link href={`/dex/${previous.number}`} className="text-primary-light hover:text-primary">← #{previous.number}<span className="hidden sm:inline"> {previous.name}</span></Link> : <span />}
        <Link href="/dex" className="font-semibold text-text-secondary hover:text-primary-light">{tr('breadcrumb.dex')}</Link>
        {next ? <Link href={`/dex/${next.number}`} className="text-primary-light hover:text-primary"><span className="hidden sm:inline">{next.name} </span>#{next.number} →</Link> : <span />}
      </div>

      {/* 头部 */}
      <header className="grid overflow-hidden rounded-lg border border-ink-border bg-white shadow-card md:grid-cols-[minmax(18rem,0.85fr)_1.15fr]">
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-sky-50 md:min-h-[30rem]">
          {aniimo.imageUrl && <Image src={aniimo.imageUrl} alt={aniimo.enName} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-contain" priority />}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-text-muted">
              #{aniimo.number}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t('officialBasic')}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">{aniimo.name}</h1>
          <p className="mt-1 text-text-secondary">{aniimo.enName}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {aniimo.officialElements?.map((element) => (
              <Link key={element} href={`/elements/${element.toLowerCase()}`} className={cn('rounded border px-2.5 py-1 text-xs', ELEMENT_BADGE_CLASSES[element])}>
                {tr(`elements.${element}`)}
              </Link>
            ))}
            {aniimo.officialRole && (
              <span className={cn('rounded border px-2.5 py-1 text-xs', ROLE_BADGE_CLASSES[aniimo.officialRole])}>
                {ROLE_ICONS[aniimo.officialRole]} {tr(`roles.${aniimo.officialRole}`)}
              </span>
            )}
            <span className="rounded border border-ink-border bg-ink-soft px-2.5 py-1 text-xs text-text-secondary">
              {aniimo.officialStage === 'Unknown' ? t('stageUnlisted') : aniimo.officialStage}
            </span>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-6 text-text-secondary">
            {aniimo.description}
          </p>
          {/* 英文图鉴简介（flavor text） */}
          {aniimo.flavorText && aniimo.flavorText !== aniimo.description && (
            <p className="mt-2 max-w-xl text-sm italic text-text-muted">
              &ldquo;{aniimo.flavorText}&rdquo;
            </p>
          )}
          <div className="mt-5 border-l-4 border-secondary bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-950">{t('officialScope')}</div>
          <div className="mt-4 border-t border-ink-border pt-3 text-xs text-text-muted">
            <span className="font-semibold text-text-secondary">{t('dataStatus')}</span> · {t('lastVerified', { date: '2026-08-30' })}
          </div>
          {detail && <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-ink-border pt-4 text-xs"><div><dt className="text-text-muted">{t('officialEvolution')}</dt><dd className="mt-1 font-semibold text-text-primary">{detail.evolution.name}</dd></div><div><dt className="text-text-muted">{t('officialHabitats')}</dt><dd className="mt-1 font-semibold text-text-primary">{detail.habitats.length || t('notListed')}</dd></div><div><dt className="text-text-muted">{t('officialForms')}</dt><dd className="mt-1 font-semibold text-text-primary">{detail.morphologyList.length || t('notListed')}</dd></div><div><dt className="text-text-muted">{t('officialMobility')}</dt><dd className="mt-1 font-semibold text-text-primary">{detail.mobility.length || t('notListed')}</dd></div></dl>}
          {(aniimo.sourceIds ?? [])
            .map((sourceId) => sourceById.get(sourceId))
            .filter(Boolean)
            .map((source) => (
              <a
                key={source!.id}
                href={source!.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-xs text-primary-light underline"
              >
                {t('source')}: {source!.title} ({source!.accessedAt})
              </a>
            ))}
        </div>
      </header>

      {detail && <nav className="flex gap-4 overflow-x-auto border-b border-ink-border pb-3 text-sm font-semibold text-primary-light"><a href="#evolution">{t('officialEvolution')}</a><a href="#habitats">{t('officialHabitats')}</a>{detail.morphologyList.length > 0 && <a href="#forms">{t('officialForms')}</a>}<a href="#mobility">{t('officialMobility')}</a><a href="#traits">{t('officialTraits')}</a><a href="#skills">{t('officialSkills')}</a></nav>}

      <section className="border-t border-ink-border pt-5">
        <h2 className="text-lg font-bold text-text-primary">{t('continueExploring')}</h2>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary-light">
          <Link href={`/tools/type-chart?aniimo=${aniimo.number}`}>{t('checkMatchup', { element: aniimo.officialElements?.map((element) => tr(`elements.${element}`)).join(' / ') ?? '' })} →</Link>
          <Link href="/locations">{t('checkHabitats')} →</Link>
          <Link href="/evolutions">{t('checkEvolution')} →</Link>
          <Link href="/abilities">{t('checkMobility')} →</Link>
          <Link href="/tools/twine">{t('openTwine')} →</Link>
        </div>
      </section>

      {detail && (
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8">
            <section id="evolution" className="scroll-mt-24">
              <h2 className="mb-4 text-xl font-bold text-text-primary">{t('officialEvolution')}</h2>
              <EvolutionTree node={detail.evolution} locale={locale} stageLabel={t('stageLabel')} />
            </section>

            {(
              <section id="habitats" className="scroll-mt-24">
                <h2 className="mb-3 text-xl font-bold text-text-primary">{t('officialHabitats')}</h2>
                {detail.habitats.length === 0 && <p className="text-sm leading-6 text-text-secondary">{t('habitatsUnlisted')}</p>}
                <div className="flex flex-wrap gap-2">
                  {detail.habitats.map((habitat) => (
                    <span key={habitat} className="rounded border border-ink-border bg-white px-2.5 py-1 text-xs text-text-secondary">
                      {habitat}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {detail.morphologyList.length > 0 && (
              <section id="forms" className="scroll-mt-24">
                <h2 className="mb-3 text-xl font-bold text-text-primary">{t('officialForms')}</h2>
                {/* 形态名为官方索引原文（专有名词），只翻译分类标签 */}
                <ul className="divide-y divide-ink-border border-y border-ink-border">
                  {detail.morphologyList.map((form) => {
                    const kind = formKind(form.name);
                    return (
                      <li key={form.wikiId} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                        <span className="font-semibold text-text-primary">{form.name}</span>
                        <span className={cn('rounded-full border px-2.5 py-0.5 text-xs font-medium', FORM_KIND_CLASSES[kind])}>
                          {t(`formsCategory.${kind}`)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-2 text-xs leading-5 text-text-muted">{t('formsNote')}</p>
                <Link href="/guide/aniimo-forms-explained" className="mt-2 inline-flex text-sm font-semibold text-primary-light">
                  {t('formsReadMore')} →
                </Link>
              </section>
            )}
          </div>

          <div className="space-y-8">
            {(
              <section id="mobility" className="scroll-mt-24">
                <h2 className="mb-3 text-xl font-bold text-text-primary">{t('officialMobility')}</h2>
                <SkillList skills={detail.mobility} />
                {detail.mobility.length === 0 && <p className="text-sm leading-6 text-text-secondary">{t('mobilityUnlisted')}</p>}
              </section>
            )}
            <section id="traits" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-bold text-text-primary">{t('officialTraits')}</h2>
              <SkillList skills={detail.traits} />
            </section>
            <section id="skills" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-bold text-text-primary">{t('officialSkills')}</h2>
              <SkillList skills={detail.skills} />
            </section>
          </div>
        </div>
      )}

      {comparisons.length > 0 && <section className="border-t border-ink-border pt-6">
        <h2 className="text-xl font-bold text-text-primary">{t('comparisonTitle')}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">{t('comparisonScope')}</p>
        <div className="mt-4 overflow-x-auto" role="region" aria-label={t('comparisonTitle')} tabIndex={0}>
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-ink-border text-xs text-text-secondary"><tr>{['comparisonAniimo', 'comparisonElements', 'comparisonRole', 'officialHabitats', 'officialMobility'].map((key) => <th key={key} scope="col" className="px-3 py-2">{t(key)}</th>)}</tr></thead>
            <tbody>{[{ entry: aniimo, detail }, ...comparisons].map(({ entry, detail: comparedDetail }) => <tr key={entry.number} className={cn('border-b border-ink-border align-top', entry.number === aniimo.number && 'bg-sky-50')}>
              <th scope="row" className="px-3 py-3 font-semibold"><Link href={`/dex/${entry.number}`} className="text-primary-light">#{entry.number} {locale === 'en' ? entry.enName : entry.name}</Link></th>
              <td className="px-3 py-3">{entry.officialElements?.map((element) => tr(`elements.${element}`)).join(' / ') || t('notListed')}</td>
              <td className="px-3 py-3">{entry.officialRole ? tr(`roles.${entry.officialRole}`) : t('notListed')}</td>
              <td className="px-3 py-3">{comparedDetail?.habitats.join(', ') || t('notListed')}</td>
              <td className="px-3 py-3">{comparedDetail?.mobility.map((ability) => ability.name).join(', ') || t('notListed')}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>}

      {(familyAniimos.length > 0 || habitatAniimos.length > 0) && <section className="space-y-6 border-t border-ink-border pt-6"><div><h2 className="text-xl font-bold text-text-primary">{t('related')}</h2><p className="mt-2 text-sm text-text-secondary">{t('relatedReason')}</p></div>{familyAniimos.length > 0 && <div><h3 className="font-semibold text-text-primary">{t('relatedFamily')}</h3><AniimoLinkList aniimos={familyAniimos} /></div>}{habitatAniimos.length > 0 && <div><h3 className="font-semibold text-text-primary">{t('relatedHabitat')}</h3><AniimoLinkList aniimos={habitatAniimos} /></div>}</section>}

      {/* 相关工具与延伸阅读 */}
      <section className="rounded-lg border border-ink-border bg-ink-card p-5">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">{t('relatedTools')}</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/dex" className="text-primary-light transition-colors hover:text-primary">
              {tr('dex.title')}
            </Link>
          </li>
          <li>
            <Link
              href="/guide/official-aniimo-dex-status"
              className="text-primary-light transition-colors hover:text-primary"
            >
              {t('officialBasic')}
            </Link>
          </li>
          <li><Link href="/evolutions" className="text-primary-light transition-colors hover:text-primary">{collections('evolutions.title')}</Link></li>
          <li><Link href="/locations" className="text-primary-light transition-colors hover:text-primary">{collections('locations.title')}</Link></li>
          <li><Link href="/abilities" className="text-primary-light transition-colors hover:text-primary">{collections('abilities.title')}</Link></li>
        </ul>
      </section>
    </div>
  );
}
