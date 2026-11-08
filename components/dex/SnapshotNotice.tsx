import { getCurrentWikiEntry } from '@/data/wiki-current-index';

export default function SnapshotNotice({ locale, name }: { locale: string; name?: string }) {
  const t = (en: string, hans: string, hant: string) =>
    locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
  const current = name ? getCurrentWikiEntry(name) : undefined;
  const historical = Boolean(name && !current);
  return (
    <aside className={`my-4 border-l-4 px-4 py-3 text-sm leading-6 ${historical ? 'border-amber-500 bg-amber-50 text-amber-950' : 'border-sky-500 bg-sky-50 text-sky-950'}`}>
      <p>
        {historical ? t(
          'Historical data: this page uses the August 30 Wiki snapshot. An October 23 index check found changed names, numbering and routes. Skills, habitats and comparisons here have not been revalidated against the new Wiki.',
          '历史数据：本页使用 8 月 30 日 Wiki 快照。10 月 23 日目录核对发现名称、编号与路由已有变化；本页技能、栖息地与对比尚未按新版 Wiki 重新核验。',
          '歷史資料：本頁使用 8 月 30 日 Wiki 快照。10 月 23 日目錄核對發現名稱、編號與路由已有變化；本頁技能、棲息地與比較尚未依新版 Wiki 重新核驗。'
        ) : current?.checkedAt === '2026-11-08' ? t(
          'Basic Form checked November 8, 2026. This record uses a separate official Wiki route; its number may also identify a different Aniimo in the older roster. These are not Prismana Form values. The evolution family is unresolved; missing fields do not confirm absence.',
          '基础形态核验于 2026 年 11 月 8 日。本条目使用独立的官方 Wiki 路由；同一编号在旧名单中可能对应其他伊莫。这里不是 Prismana 形态数值。进化家族尚未解析，字段缺失不代表不存在。',
          '基礎形態核驗於 2026 年 11 月 8 日。本條目使用獨立的官方 Wiki 路由；同一編號在舊名單中可能對應其他伊莫。這裡不是 Prismana 形態數值。進化家族尚未解析，欄位缺失不代表不存在。'
        ) : !name ? t(
          'Coverage: 86 Basic Form records checked October 23, 2026, plus Royalby, Pouchwisp, Jeburst and Glameep checked November 8. This is a partial roster with mixed evidence dates. Alternate-form values are excluded; missing fields do not prove absence.',
          '收录范围：2026年10月23日核验的86个基础形态，加上11月8日核验的 Royalby、Pouchwisp、Jeburst、Glameep。名单仍不完整，各批次来源日期不同；未纳入其他形态数值，缺失字段不代表不存在。',
          '收錄範圍：2026年10月23日核驗的86個基礎形態，加上11月8日核驗的 Royalby、Pouchwisp、Jeburst、Glameep。名單仍不完整，各批次來源日期不同；未納入其他形態數值，缺失欄位不代表不存在。'
        ) : t(
          'This Basic Form record was checked October 23, 2026, in a batch of 86 pages. Comparisons may include four additions checked November 8; each detail page retains its own date. The S1 Part 2 roster is incomplete. Alternate-form values are excluded. Missing fields do not prove absence.',
          '本基础形态记录核验于2026年10月23日，属于当日86页批次。对比可能包含11月8日补充的4条记录，各详情保留自身日期；S1 后半段名单仍不完整。未导入其他形态数值，字段缺失不代表不存在。',
          '本基礎形態記錄核驗於2026年10月23日，屬於當日86頁批次。比較可能包含11月8日補充的4條記錄，各詳情保留自身日期；S1 後半段名單仍不完整。未匯入其他形態數值，欄位缺失不代表不存在。'
        )}
      </p>
      <a
        href={current?.url ?? 'https://wiki.aniimo.com/'}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block font-semibold underline underline-offset-4"
      >
        {current
          ? t(
              `Current official entry for ${name}: #${current.number}`,
              `${name} 当前官方条目：#${current.number}`,
              `${name} 目前官方條目：#${current.number}`
            )
          : t('Open the current official Wiki', '查看当前官方 Wiki', '查看目前官方 Wiki')}
      </a>
    </aside>
  );
}
