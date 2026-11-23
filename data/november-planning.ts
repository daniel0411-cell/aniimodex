/** Announced server-clock milestones; this is a dated plan, not live availability. */
export function getNovemberPlanningCards(locale: string) {
  const t = (en: string, hans: string, hant: string) => locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
  return [
    {
      date: '11/23 → 11/30',
      title: 'Glameep · Prismana Vein · Student II',
      action: t('Check Crescent Bay / Echoback Landing for the announced rotation. Snapshots phase 3 is separate: confirm its designated form and missing regular types in the event panel.', '按公告轮换查看 Crescent Bay／Echoback Landing。Snapshots 第三期是另一项活动，请在面板确认指定形态和缺少的普通类型。', '按公告輪換查看 Crescent Bay／Echoback Landing。Snapshots 第三期是另一項活動，請在面板確認指定形態和缺少的普通類型。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
    {
      date: '11/26',
      title: 'Redrock Trail · Lv.40',
      action: t('Scheduled after the version update; exact hour unannounced. Prepare your party and buffs, then check access. Multiplayer special track events are not available under the published rules.', '计划在版本更新后开放，未公布具体时刻。先准备队伍与增益，再确认入口；按已公布规则，多人赛暂不可用特殊赛道事件。', '計畫在版本更新後開放，未公布具體時刻。先準備隊伍與增益，再確認入口；按已公布規則，多人賽暫不可用特殊賽道事件。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
    {
      date: '11/27 · 04:00',
      title: t('Whirlbite reset deadline', 'Whirlbite 重置截止', 'Whirlbite 重置截止'),
      action: t('Only pre-balance Basic/Prismana individuals are named. Compare the refunded resources with the progression being removed before choosing to reset.', '仅点名平衡调整前获得的基础／Prismana 个体。决定重置前，对照返还资源与将撤销的成长效果。', '僅點名平衡調整前獲得的基礎／Prismana 個體。決定重置前，對照返還資源與將撤銷的成長效果。'),
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
      action: t('Fantasy Resonance opens after the November 26 update, ending at local server time. Follow actual event targets for the exclusive offering recipe; exact ingredients and opening hour remain unconfirmed.', 'Fantasy Resonance 延至11月26日更新后，按各服当地时间截止。按实际任务取得专属供奉配方，准确材料与开场时刻仍待确认。', 'Fantasy Resonance 延至11月26日更新後，按各服當地時間截止。按實際任務取得專屬供奉配方，準確材料與開場時刻仍待確認。'),
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
