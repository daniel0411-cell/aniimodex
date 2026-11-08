'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { prismanaServers, prismanaWindows, prismanaWindowStatus } from '@/data/prismana-schedule';

export default function PrismanaSchedule({ locale }: { locale: string }) {
  const t = (en: string, hans: string, hant: string) => locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
  const [serverId, setServerId] = useState('apac');
  const [now, setNow] = useState<number>(NaN);
  useEffect(() => {
    const refresh = () => setNow(Date.now());
    refresh();
    const timer = setInterval(refresh, 30000);
    return () => clearInterval(timer);
  }, []);
  const server = prismanaServers.find((item) => item.id === serverId)!;
  const statusLabels = {
    unknown: t('Check server time', '请核对服务器时间', '請核對伺服器時間'),
    upcoming: t('Upcoming', '未开始', '未開始'),
    active: t('Scheduled active', '公告时间内', '公告時間內'),
    ended: t('Ended', '已结束', '已結束'),
  };
  return <div id="prismana-schedule" className="my-4 scroll-mt-24 space-y-3" data-testid="prismana-schedule">
    <label className="flex flex-wrap items-center gap-3 text-sm font-semibold">
      {t('Server', '服务器', '伺服器')}
      <select value={serverId} onChange={(event) => setServerId(event.target.value)} className="max-w-full rounded border border-ink-border bg-white px-3 py-2">
        {prismanaServers.map((item) => <option key={item.id} value={item.id}>{item.name} ({item.zone})</option>)}
      </select>
    </label>
    <p className="text-xs leading-5 text-text-secondary">{t(
      'The dates below use the selected server clock, not your device timezone. Status uses your device time against the published fixed UTC offset; it does not monitor servers or future schedule changes. Check the current in-game notice if the clock or schedule differs.',
      '下表按所选服务器时钟显示，不是设备所在时区。状态依据设备时间和公告固定 UTC 偏移计算，不监测服务器或后续排期变更；时钟或排期不一致时请以当前游戏公告为准。',
      '下表按所選伺服器時鐘顯示，不是裝置所在時區。狀態依據裝置時間和公告固定 UTC 偏移計算，不監測伺服器或後續排期變更；時鐘或排期不一致時請以目前遊戲公告為準。'
    )}</p>
    <div role="region" aria-label={t('Prismana schedule', 'Prismana 排期', 'Prismana 排期')} tabIndex={0} className="overflow-x-auto border border-ink-border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="px-3 py-2 text-left font-semibold">{server.name} · {server.zone} · {t('Source checked November 8, 2026', '来源核对：2026年11月8日', '來源核對：2026年11月8日')}</caption>
        <thead><tr className="bg-ink-card">{[t('Window', '时间窗口', '時間窗口'), t('Prismana Form / area', 'Prismana 形态／区域', 'Prismana 形態／區域'), t('Schedule status', '排期状态', '排期狀態')].map((label) => <th key={label} scope="col" className="px-3 py-2">{label}</th>)}</tr></thead>
        <tbody>{prismanaWindows.map((item) => <tr key={item.start} className="border-t border-ink-border align-top">
          <td className="whitespace-nowrap px-3 py-3">{item.start} 04:00<br />{t('to', '至', '至')} {item.end} 03:59</td>
          <th scope="row" className="px-3 py-3 font-normal"><span className="font-semibold">{item.name}</span><p className="mt-1 text-xs leading-5">{item.region}</p><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">{item.name.split(' / ').map((name) => <Link key={name} className="underline underline-offset-4" href={`/${locale}/dex/${({ Pouchwisp: 'wiki-300301-008', Royalby: 'wiki-300301-022', Jeburst: 'wiki-300301-028', Glameep: '089' } as Record<string, string>)[name]}/`}>{name} · {t('Basic Form data', '基础形态资料', '基礎形態資料')}</Link>)}</div></th>
          <td className="whitespace-nowrap px-3 py-3" data-status={prismanaWindowStatus(item.start, item.end, server.offset, now)}>{statusLabels[prismanaWindowStatus(item.start, item.end, server.offset, now)]}</td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>;
}
