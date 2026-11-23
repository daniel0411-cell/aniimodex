import type { LaunchGuideBlock } from '@/data/launch-guides';
const copy = (locale: string) => (en: string, hans: string, hant: string) => locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
const notice = 'https://www.aniimo.com/newslist/detail/100244';

export function getHandbookBlocks(locale: string): LaunchGuideBlock[] {
  const t = copy(locale);
  return [
    { t: 'h', c: t('Hypnyto Companion Handbook: compare rewards before activating', 'Hypnyto 伙伴手册：激活前先对照奖励', 'Hypnyto 夥伴手冊：啟用前先對照獎勵') },
    { t: 'table', head: [t('Edition', '版本', '版本'), t('Selected announced rewards', '部分已公布奖励', '部分已公布獎勵'), t('Decision check', '选择前核对', '選擇前核對')], rows: [
      [t('Standard · free', '标准版 · 免费', '標準版 · 免費'), 'Hypnyto Egg ×1; Random Perfect Aniimo Egg ×1; Vein Essence; Sparkling Crystal', t('The normal Hypnyto egg and the Advanced Prismana egg are different rewards. Check the required reward level in-game.', '普通 Hypnyto 蛋与进阶版 Prismana 蛋是不同奖励；所需手册等级请查游戏内奖励轨道。', '普通 Hypnyto 蛋與進階版 Prismana 蛋是不同獎勵；所需手冊等級請查遊戲內獎勵軌道。')],
      [t('Advanced · additional activation', '进阶版 · 额外激活', '進階版 · 額外啟用'), 'Perfect Potential Prismana Hypnyto Egg ×1; Hypnyto Soul ×1; Sparkling Cube ×2; Glimmer ×680', t('Activation unlocks the reward track; the notice does not say every listed reward is immediately claimable. Check level, price and current progress.', '激活用于解锁奖励轨道，公告未说所有列出奖励立即可领；核对等级、价格与当前进度。', '啟用用於解鎖獎勵軌道，公告未說所有列出獎勵立即可領；核對等級、價格與目前進度。')],
      [t('Collector · benefits on top of Advanced', '典藏版 · 在进阶版基础上增加权益', '典藏版 · 在進階版基礎上增加權益'), t('Includes +10 handbook levels, additional items and cosmetics; not a second set of every Advanced reward.', '包括手册等级＋10、额外道具与装饰；不能理解为再领取一整套进阶奖励。', '包括手冊等級＋10、額外道具與裝飾；不能理解為再領取一整套進階獎勵。'), t('Compare the displayed next ten levels with your target reward. This is not a price/value ranking.', '对照当前往后10级是否覆盖目标奖励；此处不作价格性价比排名。', '對照目前往後10級是否涵蓋目標獎勵；此處不作價格性價比排名。')],
    ] },
    { t: 'h', c: t('Can you still reach the reward? Use this catch-up checklist', '现在还能拿到目标奖励吗？按这份清单核对', '現在還能拿到目標獎勵嗎？按這份清單核對') },
    { t: 'li', c: t('Record current handbook level, EXP to the next level and the target reward level shown in-game. Without the full EXP curve and your remaining tasks, a guaranteed finish date cannot be calculated.', '记录当前手册等级、升下一级所需经验和目标奖励等级；缺少完整经验曲线与个人剩余任务时，不能保证何时做满。', '記錄目前手冊等級、升下一級所需經驗和目標獎勵等級；缺少完整經驗曲線與個人剩餘任務時，不能保證何時做滿。') },
    { t: 'li', c: t('Weekly quests reset Monday 04:00 and their progress resets weekly. There is no weekly EXP cap; running out of available quests is different from hitting an EXP cap.', '周任务周一04:00刷新，进度按周重置；官方明确没有每周经验上限。暂时没有可做任务，不等于经验被周上限限制。', '週任務週一04:00重新整理，進度按週重設；官方明確沒有每週經驗上限。暫時沒有可做任務，不等於經驗被週上限限制。') },
    { t: 'li', c: t('Season quests are added over time and require earlier quests in their series. Check prerequisites and Institute Guide > Daily Activity EXP before assuming progress is blocked. Each quest completes once; all quests close when this handbook ends.', '赛季任务逐步加入，并要求先完成同系列前置。先查前置及 Institute Guide > Daily Activity 经验来源，再判断是否卡住；每项任务只能完成一次，手册结束时所有任务关闭。', '賽季任務逐步加入，並要求先完成同系列前置。先查前置及 Institute Guide > Daily Activity 經驗來源，再判斷是否卡住；每項任務只能完成一次，手冊結束時所有任務關閉。') },
    { t: 'table', head: [t('Server / fixed offset', '服务器／固定偏移', '伺服器／固定偏移'), t('Announced handbook end', '公告手册截止', '公告手冊截止')], rows: [
      ['Aniimo-Apac · UTC+8', '2026-12-10 07:59'], ['Aniimo-Europe · UTC+0', '2026-12-09 23:59'], ['Aniimo-Americas · UTC-4', '2026-12-09 19:59'],
    ] },
    { t: 'p', c: t('These three end times represent the same instant. Confirm the server countdown; the weekly-reset paragraph gives no explicit UTC offset. The notice promises this handbook’s Prismana egg will return through Home in Season 3, without a specific acquisition date or cost. It does not confirm a Fulmintis or Inferlupa rerun.', '三服截止对应同一时刻，请再核对所在服倒计时；周重置段落未明确 UTC 偏移。公告承诺本期手册 Prismana 蛋在 Season 3 通过家园返场，但未给出具体获取日期或消耗，也不能据此确认 Fulmintis、Inferlupa 返场。', '三服截止對應同一時刻，請再核對所在服倒數；週重設段落未明確 UTC 偏移。公告承諾本期手冊 Prismana 蛋在 Season 3 透過家園返場，但未給出具體取得日期或消耗，也不能據此確認 Fulmintis、Inferlupa 返場。') },
    { t: 'link', href: notice, c: t('Official handbook rules: published October 27, checked November 23', '官方手册规则：10月27日发布，11月23日核对', '官方手冊規則：10月27日發布，11月23日核對') },
  ];
}

export function getOrbBlocks(locale: string): LaunchGuideBlock[] {
  const t = copy(locale);
  return [
    { t: 'h', c: t('Prismana Orb: geographic scope is not an unlock guarantee', 'Prismana Orb：适用区域不等于保证解锁', 'Prismana Orb：適用區域不等於保證解鎖') },
    { t: 'table', head: [t('Notice item', '公告道具', '公告道具'), t('Confirmed scope', '已确认范围', '已確認範圍'), t('Before use', '使用前', '使用前')], rows: [
      [t('Existing Orb after adjustment', '原有 Orb 调整后', '原有 Orb 調整後'), t('Any Aniimo that has unlocked Prismana Form; retains original Acquired Potential, Mutation and Personality.', '适用于已解锁 Prismana 形态的伊莫；保留原 Acquired Potential、Mutation、Personality。', '適用於已解鎖 Prismana 形態的伊莫；保留原 Acquired Potential、Mutation、Personality。'), t('Check the form unlock and eligible target. A normal individual alone does not prove eligibility.', '核对形态解锁与适用目标；仅拥有普通个体不能证明符合条件。', '核對形態解鎖與適用目標；僅擁有普通個體不能證明符合條件。')],
      ['Prismana Orb: Whisperwake Isles', t('New variant announced for Whisperwake Isles Aniimo.', '新增用于 Whisperwake Isles 伊莫的区域版本。', '新增用於 Whisperwake Isles 伊莫的區域版本。'), t('The short announcement does not specify every unlock condition; check the exact item description and target preview.', '简短公告没有逐项列出解锁条件；核对准确道具说明与目标预览。', '簡短公告沒有逐項列出解鎖條件；核對準確道具說明與目標預覽。')],
      [t('New global Orb', '新增全区域 Orb', '新增全區域 Orb'), t('Announced geographic scope: Aniimo from anywhere in the world.', '公告区域范围：世界各地的伊莫。', '公告區域範圍：世界各地的伊莫。'), t('A broader area does not establish that an unowned event form can be unlocked. Similar names do not make the items interchangeable.', '范围更广不能证明可解锁未获得的活动形态；名称相近也不等于道具可互换。', '範圍更廣不能證明可解鎖未取得的活動形態；名稱相近也不等於道具可互換。')],
    ] },
    { t: 'p', c: t('If your goal is a missed limited form, confirm its current acquisition route separately. No complete current egg pool or universal rerun schedule is established here. Stop if the item or target description does not match.', '若目标是错过的限定形态，应另外确认当前获取渠道。本站未确认完整现行蛋池或通用返场排期；道具与目标说明不匹配时先不要消耗。', '若目標是錯過的限定形態，應另外確認目前取得管道。本站未確認完整現行蛋池或通用返場排期；道具與目標說明不符合時先不要消耗。') },
    { t: 'link', href: notice, c: t('Official Orb adjustments: published October 27, checked November 23', '官方转换球调整：10月27日发布，11月23日核对', '官方轉換球調整：10月27日發布，11月23日核對') },
  ];
}
