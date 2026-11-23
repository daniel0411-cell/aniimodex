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
      action: t('Check the new panel targets and forms. Existing album photos can serve Who’s That Aniimo; duplicate ecological targets do not add progress. Fantasy Resonance is postponed to after the November 26 update, ending December 17 03:59 local server time.', '核对新面板目标及形态。Who’s That Aniimo 可用旧相册照片，生态调查重复目标不增加进度；Fantasy Resonance 延至11月26日更新后，12月17日各服当地时间03:59截止。', '核對新面板目標及形態。Who’s That Aniimo 可用舊相簿照片，生態調查重複目標不增加進度；Fantasy Resonance 延至11月26日更新後，12月17日各服當地時間03:59截止。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
  ];
}
