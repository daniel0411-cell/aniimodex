/** November 27 editorial plan from announced windows, not live availability. */
export function getNovemberPlanningCards(locale: string) {
  const t = (en: string, hans: string, hant: string) => locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
  return [
    {
      date: '11/27 · 14:00 → 12/01 · 12:00',
      title: t('Carnival · free gift · Student I', '嘉年华 · 免费礼包 · Student I', '嘉年華 · 免費禮包 · Student I'),
      action: t('Corrected November 27 against the official notice: starts at 14:00 on each server, not 10:00. Claim event-page daily rewards separately from the free Shop > Pack gift; spending tiers are optional.', '11月27日依官网更正：各服14:00开始，不是10:00。活动页每日奖励与 Shop > Pack 免费礼包分开领取；累计消费档位另算。', '11月27日依官網更正：各服14:00開始，不是10:00。活動頁每日獎勵與 Shop > Pack 免費禮包分開領取；累計消費檔位另算。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
    {
      date: '11/27 · 04:00 → 12/02 · 03:59',
      title: t('Home Shop · Resource Exchange', '家园商店 · Resource Exchange', '家園商店 · Resource Exchange'),
      action: t('Server clock. Check the item, currency, price and remaining limit before exchanging. This is separate from the free Carnival gift; the notice does not publish an optimal shopping list.', '各服时钟。兑换前核对物品、货币、价格和剩余限额；与嘉年华免费礼包分开，公告未给最优购买清单。', '各服時鐘。兌換前核對物品、貨幣、價格和剩餘限額；與嘉年華免費禮包分開，公告未給最佳購買清單。'),
      href: '/guide/aniimo-rv-homeland-guide',
    },
    {
      date: '11/26 update → 12/09 · 23:59',
      title: t('Egg Heist · collectible rate-up', 'Egg Heist · 藏品掉率加成', 'Egg Heist · 藏品掉率加成'),
      action: t('Team Mode all difficulties: specified common/prized collectible rates +100%. Compare the 200-star missing-item selection with random boxes; no guaranteed missing drop.', 'Team Mode 全难度：指定普通／珍贵藏品掉率＋100%。对照200星补缺自选与随机箱；加成不保证掉缺项。', 'Team Mode 全難度：指定普通／珍貴藏品掉率＋100%。對照200星補缺自選與隨機箱；加成不保證掉缺項。'),
      href: '/guide/aniimo-egg-heist',
    },
    {
      date: '12/10 · 20:00 UTC+0 = 12/11 · 04:00 UTC+8',
      title: t('Gracewing · reset decision', 'Gracewing · 重置判断', 'Gracewing · 重置判斷'),
      action: t('One global deadline, Americas December 10 16:00 UTC-4. Check pre-balance individual eligibility and lost progress before refunding; separate from Whirlbite.', '全球同一截止，美洲12月10日16:00 UTC-4。返还前核对调整前个体资格及撤销成长，不能套用 Whirlbite 时间。', '全球同一截止，美洲12月10日16:00 UTC-4。返還前核對調整前個體資格及撤銷成長，不能套用 Whirlbite 時間。'),
      href: '/guide/aniimo-launch-checklist-known-issues',
    },
    {
      date: '11/23 → 11/30',
      title: 'Glameep · Prismana Vein · Student II',
      action: t('Check Crescent Bay / Echoback Landing for the announced rotation. Snapshots phase 3 is separate: confirm its designated form and missing regular types in the event panel.', '按公告轮换查看 Crescent Bay／Echoback Landing。Snapshots 第三期是另一项活动，请在面板确认指定形态和缺少的普通类型。', '按公告輪換查看 Crescent Bay／Echoback Landing。Snapshots 第三期是另一項活動，請在面板確認指定形態和缺少的普通類型。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
    {
      date: '11/26 · announced update',
      title: 'Redrock Trail · Lv.40',
      action: t('The announced November 26 opening is now a past date, not a live-access check. After updating, confirm the Lv.40 entry and try the solo weekly tasks; no fastest route has been tested here.', '公告11月26日开放日期已过去，不代表本站已实测入口。更新后核对40级入口及单人周任务；本站未实测最快路线。', '公告11月26日開放日期已過去，不代表本站已實測入口。更新後核對40級入口及單人週任務；本站未實測最快路線。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
    {
      date: '11/27 · 04:00',
      title: t('Whirlbite · check your server cutoff', 'Whirlbite · 按服核对截止', 'Whirlbite · 按服核對截止'),
      action: t('The November 27 04:00 deadline is server-local: 04:00 / 12:00 / 16:00 Beijing for Apac / Europe / Americas. If your window has passed, do not follow the old reset checklist as an available action; no extension is verified.', '11月27日各服04:00截止，换算北京时间亚太04:00／欧洲12:00／美洲16:00。所在服已过期就不要按旧清单继续操作，尚未核验延期。', '11月27日各服04:00截止，換算北京時間亞太04:00／歐洲12:00／美洲16:00。所在服已過期就不要按舊清單繼續操作，尚未核驗延期。'),
      href: '/guide/aniimo-launch-checklist-known-issues',
    },
    {
      date: '11/27 · 04:00 → 12/04 · 03:59',
      title: t('Photo / ecological phase 3', '摄影／生态调查第三期', '攝影／生態調查第三期'),
      action: t('Photo requires Student II; ecology requires Student I. Reuse eligible album photos; ecology targets absent from your Index award double first-survey points, while repeats add none.', '摄影要求 Student II，生态调查要求 Student I。可复用合格旧照片；生态名单中 Index 未收录目标首次积分翻倍，重复目标不增分。', '攝影要求 Student II，生態調查要求 Student I。可重用合格舊照片；生態名單中 Index 未收錄目標首次積分翻倍，重複目標不增分。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
    {
      date: '11/26 update → 12/17 · 03:59',
      title: 'Jaguaraun · Student I',
      action: t('Fantasy Resonance opens after the November 26 update, ending at local server time. Daily 04:00 appearances; Companion catches can count. Finish investigation for the recipe, and designated round tasks for tokens redeemable for past recipes; inspect vendor stock.', 'Fantasy Resonance 延至11月26日更新后，按各服当地时间截止。每日04:00刷新，Companion 捕获可计入。完成调查拿配方，每轮指定任务拿代币兑换往期配方；核对商人实际库存。', 'Fantasy Resonance 延至11月26日更新後，按各服當地時間截止。每日04:00重新整理，Companion 捕獲可計入。完成調查拿配方，每輪指定任務拿代幣兌換往期配方；核對商人實際庫存。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
    {
      date: '11/30 · 04:00 → 12/07 · 03:59',
      title: t('Four-form Prismana catch-up · Student II', 'Prismana 四形态补赶 · Student II', 'Prismana 四形態補趕 · Student II'),
      action: t('Choose a missing form and its region: Pouchwisp, Royalby, Jeburst or Glameep. Their announced return does not confirm a replay of every concentrated spawn or weekend bonus.', '按缺项选择 Pouchwisp、Royalby、Jeburst 或 Glameep 及对应地区；形态返场公告不等于全部集中刷新与周末增益重播。', '按缺項選擇 Pouchwisp、Royalby、Jeburst 或 Glameep 及對應地區；形態返場公告不等於全部集中重新整理與週末增益重播。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
  ];
}
