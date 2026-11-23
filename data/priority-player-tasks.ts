import type { LaunchGuideBlock } from '@/data/launch-guides';

const copy = (locale: string) => (en: string, hans: string, hant: string) => locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
const partTwo = 'https://www.aniimo.com/newslist/detail/100244';

export function getWeeklyRewardBlocks(locale: string): LaunchGuideBlock[] {
  const t = copy(locale);
  return [
    { t: 'h', c: t('Holo-Battle Sim: which reward are you missing?', 'Holo-Battle Sim：你缺的是哪类奖励？', 'Holo-Battle Sim：你缺的是哪類獎勵？') },
    { t: 'p', c: t('Sim is permanently open after the Part 2 update at Trailblazer I. Interlink has a separate weekly entry window below. Start by identifying the reward category: an already completed first clear is not evidence that you claimed this week’s reward.', '后半段更新后，Sim 在达到 Trailblazer I 后常驻开放；Interlink 则使用下文独立的每周入场窗口。先判断奖励类别：首通已完成，不能证明本周奖励已领取。', '後半段更新後，Sim 在達到 Trailblazer I 後常駐開放；Interlink 則使用下文獨立的每週入場視窗。先判斷獎勵類別：首通已完成，不能證明本週獎勵已領取。') },
    { t: 'table', head: [t('Reward category', '奖励类别', '獎勵類別'), t('What the announcement confirms', '公告确认内容', '公告確認內容'), t('What to compare on your account', '账号核对项', '帳號核對項')], rows: [
      [t('Stage first clear', '关卡首通', '關卡首通'), t('New Dark, Earth and Lightning stages each have new first-clear rewards.', '新增 Dark、Earth、Lightning 属性关卡，各有新增首通奖励。', '新增 Dark、Earth、Lightning 屬性關卡，各有新增首通獎勵。'), t('Check each new element separately; a clear of a different element does not establish this stage’s reward state.', '逐个查看新增属性；其他属性通关不能证明该关卡已领奖。', '逐個查看新增屬性；其他屬性通關不能證明該關卡已領獎。')],
      [t('Trial first clear', 'Trial 首通', 'Trial 首通'), t('Every stage adds Trial difficulty with a first-clear reward.', '每个关卡新增 Trial 难度及对应首通奖励。', '每個關卡新增 Trial 難度及對應首通獎勵。'), t('Match both element and difficulty. Do not treat a lower-difficulty clear as a Trial clear.', '同时匹配属性和难度，不把较低难度通关当作 Trial 通关。', '同時符合屬性和難度，不把較低難度通關當作 Trial 通關。')],
      [t('Trial weekly reward', 'Trial 每周奖励', 'Trial 每週獎勵'), t('Trial also has a separate weekly reward category.', 'Trial 另有每周奖励类别。', 'Trial 另有每週獎勵類別。'), t('For each element you can clear, compare this week’s completion, claim state and reward balance. Read the Sim panel’s own reset countdown.', '对能完成的每种属性，核对本周完成、领取状态与奖励余额；刷新时间看 Sim 自己的面板倒计时。', '對能完成的每種屬性，核對本週完成、領取狀態與獎勵餘額；重新整理時間看 Sim 自己的面板倒數。')],
      ['Training Index', t('Index rewards come from collecting Gizmos, random events and Alpha transformations.', '收集 Gizmos、随机事件及 Alpha 变身可获得 Index 奖励。', '收集 Gizmos、隨機事件及 Alpha 變身可獲得 Index 獎勵。'), t('Inspect the missing Index entry. Repeating a weekly clear is not proof that you collected it.', '查看缺少的 Index 条目；重复完成周常不能证明该条目已收集。', '查看缺少的 Index 條目；重複完成週常不能證明該條目已收集。')],
    ] },
    { t: 'p', c: t('Does one Trial clear award every lower difficulty too? A November 23 community report says yes, but the official notice does not explain that claim rule. After a clear, compare the lower-tier reward states and settlement before repeating a lower difficulty. No fixed weekly payout, automatic claim or reset hour is confirmed here.', '一次 Trial 是否同时结算全部低难度？11月23日社区有此反馈，但官方公告没有解释这条领取规则。完成后先对照低难度奖励状态和结算，再决定是否重打较低难度；本站不据此承诺固定周收益、自动领取或具体刷新时刻。', '一次 Trial 是否同時結算全部低難度？11月23日社群有此回饋，但官方公告沒有解釋這條領取規則。完成後先對照低難度獎勵狀態和結算，再決定是否重打較低難度；本站不據此承諾固定週收益、自動領取或具體重新整理時刻。') },
    { t: 'link', href: partTwo, c: t('Official Sim / Interlink rules: October 27 notice, read November 23', '官方 Sim／Interlink 规则：10月27日公告，11月23日查阅', '官方 Sim／Interlink 規則：10月27日公告，11月23日查閱') },
    { t: 'link', href: 'https://www.reddit.com/r/Aniimo/comments/1y3c2kc/holo_battle_sim_weekly_reward/', c: t('Community lower-tier reward report — unverified claim rule', '社区低难度奖励反馈——领取规则尚未验证', '社群低難度獎勵回饋——領取規則尚未驗證') },
  ];
}

export function getInterlinkTriageBlocks(locale: string): LaunchGuideBlock[] {
  const t = copy(locale);
  return [
    { t: 'h', c: t('Before another run: missing stars, an unclaimed reward or a timer issue?', '再打一局前：缺星、没领奖，还是计时异常？', '再打一局前：缺星、沒領獎，還是計時異常？') },
    { t: 'table', head: [t('Your panel shows', '面板状态', '面板狀態'), t('Next useful action', '下一步', '下一步')], rows: [
      [t('Below the next total-star milestone', '未到下一总星里程碑', '未到下一總星里程碑'), t('Record the current best for left / middle / right and the next milestone. Select a path whose best you can improve; replaying another path does not update this path’s independent record. Read its Alphas, environment and buffs before choosing a team.', '记录左／中／右路当前最高星与下一里程碑，选择能够提高最高星的路线；重打其他路不会改写该路独立记录。先看该路 Alpha、环境和增益，再选队伍。', '記錄左／中／右路目前最高星與下一里程碑，選擇能夠提高最高星的路線；重打其他路不會改寫該路獨立紀錄。先看該路 Alpha、環境和增益，再選隊伍。')],
      [t('Milestone reached, reward still unclaimed', '已达里程碑，奖励未领', '已達里程碑，獎勵未領'), t('Open the manual phase-reward claim panel first. Compare claim state and balance before spending time on another clear.', '先打开本期星级奖励手动领取面板，对照领取状态和余额，再决定是否重打。', '先開啟本期星級獎勵手動領取面板，對照領取狀態和餘額，再決定是否重打。')],
      [t('Result ends early / starting countdown jumps', '提前结算／开场倒计时跳回', '提前結算／開場倒數跳回'), t('The rolling official log still lists these symptoms when read November 23. Capture server, phase, path, timer and result; use the support guide below. The older manual-claim fix is a separate issue.', '11月23日查阅的官方滚动日志仍列这些症状。保留服务器、本期、路线、计时与结算画面，按下方支持指南反馈；此前手动领奖修复针对另一问题。', '11月23日查閱的官方滾動日誌仍列這些症狀。保留伺服器、本期、路線、計時與結算畫面，按下方支援指南回報；此前手動領獎修正針對另一問題。')],
    ] },
    { t: 'link', href: 'https://www.aniimo.com/newslist/detail/100275', c: t('Official rolling known-issues log, read November 23', '官方滚动已知问题日志，11月23日查阅', '官方滾動已知問題日誌，11月23日查閱') },
  ];
}

export function getEventPreparationBlocks(locale: string): LaunchGuideBlock[] {
  const t = copy(locale);
  return [
    { t: 'h', c: t('November 26–27 preparation: choose the task, then the requirement', '11月26—27日准备：按目标核对门槛', '11月26—27日準備：按目標核對門檻') },
    { t: 'table', head: [t('Your goal', '目标', '目標'), t('Prepare now', '现在可准备', '現在可準備'), t('Check after opening', '开放后核对', '開放後核對')], rows: [
      ['Jaguaraun · Student I', t('Check your title and the announced November 26 update opening. Review Jaguaraun’s documented skill conditions using the Dex link below.', '核对称号和11月26日更新后开放的公告；用下方图鉴链接了解 Jaguaraun 已公布技能条件。', '核對稱號和11月26日更新後開放的公告；用下方圖鑑連結了解 Jaguaraun 已公布技能條件。'), t('Read the actual photo / skill / catching targets and prerequisites. Finish the event quests for the exclusive offering recipe; inspect its ingredients before spending. A recipe is not a direct Aniimo grant.', '阅读实际摄影／技能／捕获目标与前置，完成活动任务取得专属供奉配方；消耗前再查真实材料。配方不是直接发放伊莫。', '閱讀實際攝影／技能／捕獲目標與前置，完成活動任務取得專屬供奉配方；消耗前再查真實材料。配方不是直接發放伊莫。')],
      ['Redrock Trail · Lv.40', t('Prepare a party and buffs before entering. Solo Full Throttle is the announced all-day practice option once the track unlocks; multiplayer Speed Showdown has its own daily window.', '入场前准备队伍和增益；赛道解锁后可用全天单人 Full Throttle 熟悉赛道，多人 Speed Showdown 另有每日时段。', '入場前準備隊伍和增益；賽道解鎖後可用全天單人 Full Throttle 熟悉賽道，多人 Speed Showdown 另有每日時段。'), t('Check track missions and required rating, then learn turns and item-box positions in solo. Do not build a multiplayer plan around special track events: Redrock multiplayer excludes them under the published rules. No shortcut or fastest roster has been tested here.', '查看赛道任务及要求评级，再在单人中熟悉转弯和道具箱位置；已公布规则排除 Redrock 多人特殊赛道事件，不围绕该机制配队。本站未测试捷径或最快阵容。', '查看賽道任務及要求評級，再在單人中熟悉轉彎和道具箱位置；已公布規則排除 Redrock 多人特殊賽道事件，不圍繞該機制配隊。本站未測試捷徑或最快陣容。')],
      [t('November 27 photo · Student II', '11月27日摄影 · Student II', '11月27日攝影 · Student II'), t('Keep existing album photos. Do not spend time retaking a guessed phase target.', '保留相册旧照片，不提前按猜测目标重复拍摄。', '保留相簿舊照片，不提前按猜測目標重複拍攝。'), t('Match the new silhouette’s exact form. Qualifying old album photos can serve Who’s That Aniimo. The new target list is not confirmed here.', '匹配新剪影的准确形态，合格旧照片可用于 Who’s That Aniimo。本站尚未确认新一期目标名单。', '符合新剪影的準確形態，合格舊照片可用於 Who’s That Aniimo。本站尚未確認新一期目標名單。')],
      [t('November 27 ecology · Student I', '11月27日生态调查 · Student I', '11月27日生態調查 · Student I'), t('Keep this separate from the Student II photo gate. Inspect your Index before choosing targets.', '与摄影的 Student II 门槛分开；先查看自己的 Index 收录情况。', '與攝影的 Student II 門檻分開；先查看自己的 Index 收錄情況。'), t('Catch the listed form, not just the species. Each target gives points once; an unrecorded Index target gives double first-survey points. If choosing between eligible targets, compare unrecorded entries first, then check the cumulative reward threshold and claim state.', '捕获名单指定形态，不只匹配物种。每个目标只给一次调查积分，Index 尚未收录目标的首次调查积分翻倍；在合格目标间选择时先比较未收录条目，再核对累计领奖门槛与领取状态。', '捕獲名單指定形態，不只符合物種。每個目標只給一次調查積分，Index 尚未收錄目標的首次調查積分翻倍；在合格目標間選擇時先比較未收錄條目，再核對累計領獎門檻與領取狀態。')],
    ] },
    { t: 'p', c: t('Use the separate schedules below: Redrock has no announced opening hour; Jaguaraun ends December 17 at 03:59 local server time; November 27 photo/ecology phase ends December 4 at 03:59. A shared update date does not give these activities one shared deadline.', '按下方各自排期执行：Redrock 未公布准确开放时刻；Jaguaraun 于12月17日各服当地时间03:59结束，11月27日摄影／生态阶段于12月4日03:59结束。不能因更新日相近而混用截止。', '按下方各自排期執行：Redrock 未公布準確開放時刻；Jaguaraun 於12月17日各服當地時間03:59結束，11月27日攝影／生態階段於12月4日03:59結束。不能因更新日相近而混用截止。') },
  ];
}

export function getCatchUpScopeBlocks(locale: string): LaunchGuideBlock[] {
  const t = copy(locale);
  return [
    { t: 'h', c: t('November 30 catch-up: four forms does not mean every spawn bonus repeats', '11月30日补赶：四种形态返场不等于全部刷新增益重播', '11月30日補趕：四種形態返場不等於全部重新整理增益重播') },
    { t: 'p', c: t('The announced window is November 30 04:00–December 7 03:59 on each server’s clock (Europe UTC+0, Americas UTC−4, Apac UTC+8). All four forms return in their respective regions; the server selector above helps interpret the window.', '公告窗口为11月30日04:00至12月7日03:59，各服按自身时钟（欧洲 UTC+0、美洲 UTC−4、亚太 UTC+8）。四种形态分别回到对应地区；可用上方服务器选择器查看窗口。', '公告視窗為11月30日04:00至12月7日03:59，各服按自身時鐘（歐洲 UTC+0、美洲 UTC−4、亞太 UTC+8）。四種形態分別回到對應地區；可用上方伺服器選擇器查看視窗。') },
    { t: 'table', head: [t('Missing Prismana form', '缺少的 Prismana 形态', '缺少的 Prismana 形態'), t('Announced catch-up regions', '公告补赶地区', '公告補趕地區')], rows: [
      ['Pouchwisp', 'Rosy Mirelands / Tideblossom Coast'],
      ['Royalby', 'Wildwater Gorge / Sea of Flowers'],
      ['Jeburst', 'Cloudreach Falls / Russet Highlands'],
      ['Glameep', 'Crescent Bay / Echoback Landing'],
    ] },
    { t: 'p', c: t('Choose a missing form first, then its region. The notice separately describes weekend first-three-Nurture Nova-stage boosts, +50% Veinfruit regional energy growth and concentrated appearances. The four-form return paragraph does not explicitly replay all concentrated spawns or reset those bonuses for every region. Check the current regional event panel before committing a large catch or Nurture session; no encounter count or guaranteed individual is established.', '先选缺少形态，再去对应地区。公告另述周末前三次 Nurture 的 Nova 阶段概率提升、Veinfruit 区域能量增长额外＋50%及集中出现；四形态返场段没有明确说所有集中刷新重播，或全部地区增益重新计次。安排大量捕获或 Nurture 前先核对当前地区活动面板；本站不保证遭遇数量或必得个体。', '先選缺少形態，再去對應地區。公告另述週末前三次 Nurture 的 Nova 階段機率提升、Veinfruit 區域能量增長額外＋50%及集中出現；四形態返場段沒有明確說所有集中重新整理重播，或全部地區增益重新計次。安排大量捕獲或 Nurture 前先核對目前地區活動面板；本站不保證遭遇數量或必得個體。') },
    { t: 'link', href: partTwo, c: t('Official four-form return and separate weekend bonuses — read November 23', '官方四形态返场与独立周末增益——11月23日查阅', '官方四形態返場與獨立週末增益——11月23日查閱') },
  ];
}

export function getEggGoalBlocks(locale: string): LaunchGuideBlock[] {
  const t = copy(locale);
  return [
    { t: 'h', c: t('Plan one run around one goal', '一局先确定一个主要目标', '一局先確定一個主要目標') },
    { t: 'table', head: [t('Main goal', '主要目标', '主要目標'), t('Before queuing', '排队前', '配對前'), t('Run / result decision', '局内／结算决策', '局內／結算決策')], rows: [
      [t('A particular Aniimo or egg', '指定伊莫或蛋', '指定伊莫或蛋'), t('Match the selected difficulty and displayed reward preview to the egg you want. The documented Whisperwake expansion covers specified newly obtained eggs, not every old egg or every species.', '用所选难度的奖励预览核对目标蛋。Whisperwake 扩池仅明确覆盖指定新获得蛋，不代表所有旧蛋或全部物种。', '用所選難度的獎勵預覽核對目標蛋。Whisperwake 擴池僅明確涵蓋指定新取得蛋，不代表所有舊蛋或全部物種。'), t('Use that ruleset’s completion/extraction requirements. Check Inventory Warehouse after settlement before another run; a successful run does not guarantee your target species.', '按该规则组的完成／撤离要求行动，结算后先查 Inventory Warehouse 再开下一局；成功一局不保证指定物种。', '按該規則組的完成／撤離要求行動，結算後先查 Inventory Warehouse 再開下一局；成功一局不保證指定物種。')],
      [t('A missing seasonal collectible', '缺少的赛季收藏品', '缺少的賽季收藏品'), t('List the missing entry. Inspect the Egg Emperor 200-star choice gift box separately from the weekly shop blind box below.', '先列缺少条目，区分下方 Egg Emperor 200星自选箱与每周商店盲盒。', '先列缺少條目，區分下方 Egg Emperor 200星自選箱與每週商店盲盒。'), t('Compare the actual choice list or shop preview before spending. Neither a Sanctum detour nor a blind-box purchase has a verified guaranteed missing-item outcome here.', '消耗前对照实际自选列表或商店预览；本站未确认绕行 Sanctum 或买盲盒必得缺项。', '消耗前對照實際自選清單或商店預覽；本站未確認繞行 Sanctum 或買盲盒必得缺項。')],
      [t('Rank / stars with friends', '与朋友冲段／星级', '與朋友衝段／星級'), t('Check everyone’s entry eligibility, selected difficulty and displayed ticket cost. Access permission does not establish the rank-point formula.', '核对每人入场资格、所选难度和显示门票消耗；允许进入不能证明段位积分公式。', '核對每人入場資格、所選難度和顯示門票消耗；允許進入不能證明段位積分公式。'), t('Compare rank/star changes with the result breakdown. Do not assume a cross-rank run pays the same points or that a loot-value target equals rank progress.', '结算时对照段位／星级变化与明细，不假设跨段局积分相同，也不把物资价值目标当作段位进度。', '結算時對照段位／星級變化與明細，不假設跨段局積分相同，也不把物資價值目標當作段位進度。')],
      [t('Learn Chaos safely within your resource budget', '在资源预算内熟悉 Chaos', '在資源預算內熟悉 Chaos'), t('Agree on the target, route knowledge, displayed time limit, keys and recovery resources you are willing to spend. Keep fair PVP’s restrictions separate.', '与队友约定目标、已知路线、显示时限，以及愿意消耗的钥匙和恢复资源；与公平 PVP 限制分开。', '與隊友約定目標、已知路線、顯示時限，以及願意消耗的鑰匙和恢復資源；與公平 PVP 限制分開。'), t('Before an optional room, compare the remaining timer, resources and required objective. If its reward is unknown, do not count it as guaranteed progress. No tested fastest outside/Sanctum route or universal loadout is supplied.', '进入可选房间前，对照剩余计时、资源与必须完成目标；未知奖励不计为必得进度。本站没有实测最快外围／Sanctum 路线或通用配装。', '進入可選房間前，對照剩餘計時、資源與必須完成目標；未知獎勵不計為必得進度。本站沒有實測最快外圍／Sanctum 路線或通用配裝。')],
    ] },
    { t: 'p', c: t('After a run, record the chosen difficulty, objective completed, resources spent and rewards received. Compare those results with your original goal before changing route or loadout; loot value alone cannot tell you whether a collection or rank objective was met.', '每局后记录所选难度、已完成目标、资源消耗与实际奖励；先与原目标对照，再决定换路线或配装。只看物资价值，无法判断收藏或段位目标是否完成。', '每局後記錄所選難度、已完成目標、資源消耗與實際獎勵；先與原目標對照，再決定換路線或配裝。只看物資價值，無法判斷收藏或段位目標是否完成。') },
  ];
}
