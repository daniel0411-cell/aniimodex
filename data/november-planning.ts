/** Announced server-clock milestones; this is a dated plan, not live availability. */
export function getNovemberPlanningCards(locale: string) {
  const t = (en: string, hans: string, hant: string) => locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
  return [
    {
      date: '11/16 · 03:59 → 04:00',
      title: 'Prismana Snapshots · Student II',
      action: t('Phase 1 ends, then phase 2 starts. Check missing regular types and the separate special reward before switching to the new phase target.', '第一期结束后进入第二期。切换目标前，核对缺少的普通类型与独立的特殊奖励。', '第一期結束後進入第二期。切換目標前，核對缺少的普通類型與獨立的特殊獎勵。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
    {
      date: '11/19 · 10:00',
      title: 'Gullcove Cliffs · Lv.40',
      action: t('Check the track opening before queuing. Solo is all day; multiplayer has a separate daily window. Set your party and buffs before racing.', '排队前核对赛道开放。单人全天，多人另有每日时段；开赛前准备队伍与增益。', '排隊前核對賽道開放。單人全天，多人另有每日時段；開賽前準備隊伍與增益。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
    {
      date: '11/20 · 04:00',
      title: 'Fantasy Resonance · Student I',
      action: t('Follow the Jaguaraun photo, skill and catching quests. The exclusive offering recipe requires all event quests; ingredients are not yet verified here.', '按 Jaguaraun 活动要求完成摄影、技能与捕获任务。专属供奉配方要求全部活动任务；本站尚未核验配方材料。', '按 Jaguaraun 活動要求完成攝影、技能與捕獲任務。專屬供奉配方要求全部活動任務；本站尚未核驗配方材料。'),
      href: '/guide/aniimo-prismana-event-tracker',
    },
    {
      date: '11/27 · 04:00',
      title: t('Whirlbite reset deadline', 'Whirlbite 重置截止', 'Whirlbite 重置截止'),
      action: t('Only pre-balance Basic/Prismana individuals are named. Compare the refunded resources with the progression being removed before choosing to reset.', '仅点名平衡调整前获得的基础／Prismana 个体。决定重置前，对照返还资源与将撤销的成长效果。', '僅點名平衡調整前獲得的基礎／Prismana 個體。決定重置前，對照返還資源與將撤銷的成長效果。'),
      href: '/guide/aniimo-launch-checklist-known-issues',
    },
  ];
}
