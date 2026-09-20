import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllAniimos } from '@/lib/aniimo';
import { mobilityIndex } from '@/lib/mobility';
import TwineLookup from '@/components/tools/TwineLookup';
import type { TwineLookupEntry, TwineLookupOption } from '@/components/tools/TwineLookup';

/**
 * Twine 能力反查器（服务端外壳）。
 *
 * 选项与候选数据在此预计算后传给客户端岛 TwineLookup：
 * 客户端组件按选中能力做并集过滤，避免把 official-wiki-details.json 打进浏览器 bundle。
 * 站点为静态导出，筛选状态不写入 URL，canonical 由同目录 layout.tsx 指向 /tools/twine/。
 */
export default async function TwinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('twineTool');
  const tr = await getTranslations();

  const aniimos = getAllAniimos();

  const entries: TwineLookupEntry[] = aniimos.map((aniimo) => ({
    number: aniimo.number,
    name: aniimo.name,
    enName: aniimo.enName,
    element: aniimo.element,
    mobility: aniimo.mobility,
  }));

  const options: TwineLookupOption[] = mobilityIndex.map((group) => ({
    name: group.name,
    description: group.description,
    iconUrl: group.iconUrl,
    count: group.members.length,
  }));

  const coveredCount = aniimos.filter((aniimo) => aniimo.mobility.length > 0).length;

  /** mobility 为官方英文专名；有本地化短名/说明时优先展示 */
  const mobilityLabel = (name: string) =>
    tr.has(`mobilityNames.${name}`) ? tr(`mobilityNames.${name}`) : name;
  const mobilityDescription = (name: string, fallback?: string) =>
    tr.has(`mobilityDescriptions.${name}`) ? tr(`mobilityDescriptions.${name}`) : fallback;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{t('title')}</h1>
        <p className="text-sm text-text-secondary sm:text-base">{t('subtitle')}</p>
      </header>

      <section className="border-y border-ink-border bg-white px-5 py-4 text-sm leading-6 text-text-secondary">
        <h2 className="font-semibold text-text-primary">{t('howItWorksTitle')}</h2>
        <p className="mt-1">{t('howItWorksDescription')}</p>
        <p className="mt-2 text-xs text-emerald-700">{t('sourceScope')}</p>
      </section>

      <TwineLookup
        entries={entries}
        options={options}
        coveredCount={coveredCount}
        totalCount={aniimos.length}
      />

      <section className="border-t border-ink-border pt-6">
        <h2 className="text-xl font-bold text-text-primary">{t('abilityGuideTitle')}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => (
            <article key={option.name} className="border-l-4 border-primary bg-white px-4 py-3">
              <h3 className="flex items-center gap-2 font-semibold text-text-primary">
                {option.iconUrl && (
                  <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded">
                    <Image
                      src={option.iconUrl}
                      alt=""
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </span>
                )}
                {mobilityLabel(option.name)}
                <span className="text-xs font-normal text-text-muted">{option.count}</span>
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                {mobilityDescription(option.name, option.description)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
