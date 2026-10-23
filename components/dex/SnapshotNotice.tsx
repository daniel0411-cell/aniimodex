import { getCurrentWikiEntry } from '@/data/wiki-current-index';

export default function SnapshotNotice({ locale, name }: { locale: string; name?: string }) {
  const t = (en: string, hans: string, hant: string) =>
    locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
  const current = name ? getCurrentWikiEntry(name) : undefined;
  return (
    <aside className="my-4 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
      <p>
        {t(
          'Historical data: this page uses the August 30 Wiki snapshot. An October 23 index check found changed names, numbering and routes. Skills, habitats and comparisons here have not been revalidated against the new Wiki.',
          '历史数据：本页使用 8 月 30 日 Wiki 快照。10 月 23 日目录核对发现名称、编号与路由已有变化；本页技能、栖息地与对比尚未按新版 Wiki 重新核验。',
          '歷史資料：本頁使用 8 月 30 日 Wiki 快照。10 月 23 日目錄核對發現名稱、編號與路由已有變化；本頁技能、棲息地與比較尚未依新版 Wiki 重新核驗。'
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
