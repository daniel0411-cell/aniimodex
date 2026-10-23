import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ELEMENTS } from '@/lib/aniimo-ui';
import { filterByElement, getAllAniimos } from '@/lib/aniimo';
import AniimoLinkList from '@/components/dex/AniimoLinkList';
import snapshot from '@/data/official-wiki-snapshot.json';

const copy = {
  en: {
    title: 'All nine elements: entries and examples',
    scope: 'Counts below come from the official Wiki index snapshot checked on {date}, not a live census. Each numbered Dex entry counts once per listed element, so dual-element entries appear in two rows. Forms are not counted separately here.',
    element: 'Element',
    count: 'Dex entries',
    examples: 'Examples',
    missing: 'No entries in this snapshot; this does not mean the element is absent from the game.',
    dualTitle: 'How to read dual-element entries',
    dualBody: 'Inferlupa (#004), for example, is listed as Fire and Dark. Open an entry to compare its published role, evolution, habitats and skills. Element labels do not establish damage multipliers or an optimal build.',
    nextTitle: 'Choose your next step',
    browse: 'Browse all numbered entries',
    matchups: 'Check the separately sourced matchup table',
    team: 'Compare elements and roles in the team builder',
  },
  'zh-Hans': {
    title: '九种元素：图鉴数量与实例',
    scope: '下表来自 {date} 核验的官方 Wiki 索引快照，不是实时统计。每个编号在其所属的每种元素中各计一次，因此双属性条目会出现在两行；这里不另计形态数量。',
    element: '元素',
    count: '图鉴条目',
    examples: '实例',
    missing: '这份快照没有对应条目，不代表游戏中不存在该元素。',
    dualTitle: '如何阅读双属性条目',
    dualBody: '例如 Inferlupa（#004）的官方标签为火与暗。进入条目后，可以继续比较其已公布定位、进化、栖息地与技能。元素标签本身不能确定伤害倍率或最优配装。',
    nextTitle: '继续查询',
    browse: '浏览全部编号图鉴',
    matchups: '查看另有来源支持的属性克制表',
    team: '在队伍构筑器中比较元素与定位',
  },
  'zh-Hant': {
    title: '九種元素：圖鑑數量與實例',
    scope: '下表來自 {date} 核驗的官方 Wiki 索引快照，不是即時統計。每個編號在其所屬的每種元素中各計一次，因此雙屬性條目會出現在兩行；這裡不另計形態數量。',
    element: '元素',
    count: '圖鑑條目',
    examples: '實例',
    missing: '這份快照沒有對應條目，不代表遊戲中不存在該元素。',
    dualTitle: '如何閱讀雙屬性條目',
    dualBody: '例如 Inferlupa（#004）的官方標籤為火與暗。進入條目後，可以繼續比較其已公布定位、進化、棲息地與技能。元素標籤本身不能確定傷害倍率或最優配裝。',
    nextTitle: '繼續查詢',
    browse: '瀏覽全部編號圖鑑',
    matchups: '查看另有來源支持的屬性剋制表',
    team: '在隊伍構築器中比較元素與定位',
  },
};

export default async function ElementGuideDirectory({ locale }: { locale: string }) {
  const text = copy[locale as keyof typeof copy] ?? copy.en;
  const t = await getTranslations({ locale, namespace: 'elements' });
  const dualEntries = getAllAniimos()
    .filter((entry) => (entry.officialElements?.length ?? 0) > 1)
    .slice(0, 3);

  return (
    <section className="mt-8 space-y-6 border-t border-ink-border pt-6">
      <div>
        <h2 id="element-directory" className="scroll-mt-24 text-xl font-bold text-text-primary">{text.title}</h2>
        <p className="mt-3 text-sm leading-6 text-text-secondary">{text.scope.replace('{date}', snapshot.checkedAt)}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead className="border-y border-ink-border bg-ink-card text-left">
              <tr>
                <th scope="col" className="px-3 py-3">{text.element}</th>
                <th scope="col" className="px-3 py-3">{text.count}</th>
                <th scope="col" className="px-3 py-3">{text.examples}</th>
              </tr>
            </thead>
            <tbody>
              {ELEMENTS.map((element) => {
                const entries = filterByElement(element);
                return (
                  <tr key={element} className="border-b border-ink-border align-top">
                    <th scope="row" className="px-3 py-3 text-left font-semibold">
                      <Link href={`/elements/${element.toLowerCase()}`} className="text-primary-light hover:underline">{t(element)}</Link>
                    </th>
                    <td className="px-3 py-3 tabular-nums">{entries.length}</td>
                    <td className="px-3 pb-3">
                      {entries.length > 0 ? <AniimoLinkList aniimos={entries.slice(0, 2)} /> : <p className="pt-3 text-xs leading-5 text-text-muted">{text.missing}</p>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 id="dual-elements" className="scroll-mt-24 text-xl font-bold text-text-primary">{text.dualTitle}</h2>
        <p className="mt-3 leading-relaxed text-text-primary">{text.dualBody}</p>
        <ul className="mt-3 divide-y divide-ink-border">
          {dualEntries.map((entry) => (
            <li key={entry.number} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
              <Link href={`/dex/${entry.number}`} className="font-semibold text-primary-light hover:underline">#{entry.number} {entry.name}</Link>
              <span>{entry.officialElements!.map((element) => t(element)).join(' / ')}</span>
            </li>
          ))}
        </ul>
      </div>
      <nav aria-label={text.nextTitle} className="space-y-3 border-t border-ink-border pt-5 text-sm font-semibold text-primary-light">
        <h2 className="text-lg text-text-primary">{text.nextTitle}</h2>
        <Link href="/dex" className="block hover:underline">{text.browse}</Link>
        <Link href="/tools/type-chart" className="block hover:underline">{text.matchups}</Link>
        <Link href="/tools/team-builder" className="block hover:underline">{text.team}</Link>
      </nav>
    </section>
  );
}
