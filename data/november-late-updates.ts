import type { LaunchGuideBlock } from '@/data/launch-guides';

const copy = (locale: string) => (en: string, hans: string, hant: string) => locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
const log = 'https://www.aniimo.com/newslist/detail/100275';

export function getLateNovemberEggBlocks(locale: string): LaunchGuideBlock[] {
  const t = copy(locale);
  return [
    { t: 'h', c: t('November 17 rewards: collectible choice or blind box?', '11月17日奖励：自选收藏品还是盲盒？', '11月17日獎勵：自選收藏品還是盲盒？') },
    { t: 'table', head: [t('Reward', '奖励', '獎勵'), t('Published requirement', '已公布条件', '已公布條件'), t('Before you claim or buy', '领取或购买前', '領取或購買前')], rows: [
      ['Departure with the Wind: Collectible Gift Box', 'Egg Emperor · 200 stars', t('Rank reward: choose one collectible from this season. Compare your missing collection entries before choosing; this is distinct from the shop blind box.', '段位奖励，可选择本赛季一种收藏品。先对照收藏缺项再选；它与商店盲盒不同。', '段位獎勵，可選擇本賽季一種收藏品。先對照收藏缺項再選；它與商店盲盒不同。')],
      ['Departure with the Wind: Collectible Blind Box', 'Egg Emperor', t('Shop purchase, limited each week. Check the displayed price and remaining quota before spending. The notice gives neither a price, exact weekly quantity nor item probabilities; it does not promise a missing collectible.', '商店购买，每周限量。消耗前查看实际价格和剩余额度；公告未给出价格、每周具体数量或物品概率，也不保证获得缺少的收藏品。', '商店購買，每週限量。消耗前查看實際價格和剩餘額度；公告未給出價格、每週具體數量或物品機率，也不保證獲得缺少的收藏品。')],
    ] },
    { t: 'p', c: t('If your goal is one specific missing collectible, inspect the choice reward first. Reaching Egg Emperor alone is not the stated 200-star gift-box requirement. We have not verified the claim menu or the shop’s reset hour.', '若目标是某一种缺少的收藏品，先核对自选奖励。仅达到 Egg Emperor 不等于满足自选箱的200星条件。本站尚未核验领取菜单或商店重置时刻。', '若目標是某一種缺少的收藏品，先核對自選獎勵。僅達到 Egg Emperor 不等於滿足自選箱的200星條件。本站尚未核驗領取選單或商店重置時刻。') },
    { t: 'h', c: t('Giga-Egg handling: separate delivered changes from plans', 'Giga-Egg 操作：区分已列调整与后续计划', 'Giga-Egg 操作：區分已列調整與後續計畫') },
    { t: 'p', c: t('November 17 limits Giga-Egg jumping and makes attacks knock it back slightly. Recheck your landing position and control after being hit rather than relying on an older jump route. Reducing interference from trees and other battlefield objects remains a future plan; the mode is still in testing. November 13 separately lists the minimap-shaking fix when Twining with an egg.', '11月17日限制 Giga-Egg 跳跃能力，受到攻击会轻微击退。不要直接沿用旧跳跃路线，受击后重新确认落点与操控。减少树木和其他战场物体干扰仍是后续计划，模式仍在测试。11月13日另列出 Twine 蛋时小地图抖动的修复。', '11月17日限制 Giga-Egg 跳躍能力，受到攻擊會輕微擊退。不要直接沿用舊跳躍路線，受擊後重新確認落點與操控。減少樹木和其他戰場物體干擾仍是後續計畫，模式仍在測試。11月13日另列出 Twine 蛋時小地圖抖動的修正。') },
    { t: 'p', c: t('Playing with lower-rank friends? Entry permission, rank points, ticket costs and other rewards are separate questions. Check the selected difficulty’s rules before queuing and the result breakdown afterward. The November 17 notice does not settle cross-rank scoring, so no guaranteed gain or loss is asserted here.', '与低段位朋友组队时，能否进入、段位积分、门票消耗和其他奖励是不同问题。排队前查看所选难度规则，结束后核对结算明细。11月17日公告没有解释跨段位计分，本站不承诺必定加分或扣分。', '與低段位朋友組隊時，能否進入、段位積分、門票消耗和其他獎勵是不同問題。排隊前查看所選難度規則，結束後核對結算明細。11月17日公告沒有解釋跨段位計分，本站不承諾必定加分或扣分。') },
    { t: 'link', href: log, c: t('Official rolling log: November 13 and 17 entries, read November 23', '官方滚动日志：11月13、17日条目，11月23日核验', '官方滾動日誌：11月13、17日條目，11月23日核驗') },
  ];
}

export function getLateNovemberHomeBlocks(locale: string): LaunchGuideBlock[] {
  const t = copy(locale);
  return [
    { t: 'h', c: t('Nighttime Gathering stuck? Match the November 13 fix', 'Nighttime Gathering 卡住？先匹配11月13日修复', 'Nighttime Gathering 卡住？先符合11月13日修正') },
    { t: 'p', c: t('These are announced fixes, checked November 23, not live-client tests. Update and restart, then retry the specific failed action once. Keep before/after screenshots if it persists; repeated paid refreshes are not a diagnostic shortcut.', '以下是11月23日核验的公告修复，不是客户端实测。更新并重启后复测一次具体失败操作；仍复现则保留前后截图，不要用连续付费刷新来排查。', '以下是11月23日核驗的公告修正，不是客戶端實測。更新並重啟後複測一次具體失敗操作；仍重現則保留前後截圖，不要用連續付費重新整理來排查。') },
    { t: 'table', head: [t('Symptom / official scope', '症状／官方范围', '症狀／官方範圍'), t('Useful next check', '下一步核对', '下一步核對')], rows: [
      ['Premium Gemstone Dust', t('Turn-in failure is listed as fixed. Compare the named quest, required item and turn-in message; save all three if delivery still fails.', '无法交付列为已修复。核对任务名称、要求物品与交付提示；仍失败则保留这三项信息。', '無法交付列為已修正。核對任務名稱、要求物品與交付提示；仍失敗則保留這三項資訊。')],
      [t('Points lost after moving out of a Park', '搬离 Park 后积分丢失', '搬離 Park 後積分遺失'), t('The fix names Personal Cumulative Co-building Points earned by submitting items. Compare the same points category before/after; it does not establish restoration of every historical balance.', '修复点名提交物品所得 Personal Cumulative Co-building Points。前后对照同一积分类别，不能推断所有历史余额已恢复。', '修正點名提交物品所得 Personal Cumulative Co-building Points。前後對照同一積分類別，不能推斷所有歷史餘額已恢復。')],
      [t('Quest accepted before 04:00 immediately refreshes', '04:00前接取任务后立即刷新', '04:00前接取任務後立即重新整理'), t('This exact trigger is listed as fixed. Record server, acceptance time and refresh time if it recurs; do not infer a new universal reset time from it.', '该触发情况列为已修复。再次发生时记录服务器、接取时间和刷新时间；不能据此推导新的通用重置时间。', '該觸發情況列為已修正。再次發生時記錄伺服器、接取時間和重新整理時間；不能據此推導新的通用重置時間。')],
      [t('Home Coins spent but no refresh / delivery refresh error', '消耗 Home Coins 却未刷新／交付任务刷新报错', '消耗 Home Coins 卻未重新整理／交付任務重新整理報錯'), t('The coin-spend failure after accepting a delivery quest and the delivery-refresh error are both listed. Record the coin balance, quest, message and result. Stop spending if it repeats; the notice does not promise coin reimbursement.', '点名接取物品交付任务后的相关故障。记录金币余额、任务、提示和结果；再次复现就停止继续消耗，公告没有承诺退还金币。', '點名接取物品交付任務後的相關故障。記錄金幣餘額、任務、提示和結果；再次重現就停止繼續消耗，公告沒有承諾退還金幣。')],
      [t('Same delivery quest / missing animation', '刷新到同一交付任务／无动画', '重新整理到同一交付任務／無動畫'), t('The missing animation is fixed; this does not mean a refresh must produce a different quest. Refresh duration was also adjusted without a published new duration.', '修复的是无动画，不代表每次刷新必须换成不同任务。刷新时长也有调整，但未公布新时长。', '修正的是無動畫，不代表每次重新整理必須換成不同任務。重新整理時長也有調整，但未公布新時長。')],
      [t('Missing RV Park furniture', 'RV Park 家具丢失', 'RV Park 家具遺失'), t('The loss bug is listed as fixed, with reissue promised later. Keep furniture names, Park and loss time; a fix announcement is not proof that your items have already arrived.', '丢失问题列为已修复，缺失家具将后续补发。保留家具名称、Park 与丢失时间；修复公告不能证明物品已经到账。', '遺失問題列為已修正，缺失家具將後續補發。保留家具名稱、Park 與遺失時間；修正公告不能證明物品已經到帳。')],
    ] },
    { t: 'p', c: t('The same update also lists disappearing Season Orders, the Voxel Coin cap issue and Growth Tonic interaction focus as fixed, plus reduced Home lag. No numeric Voxel Coin cap or universal performance result is published. For unresolved reports include server, UID, platform, client version, time and reproduction steps in in-game Support.', '同次更新还列出 Season Orders 消失、Voxel Coin 上限问题与 Growth Tonic 后交互焦点错误的修复，并优化家园卡顿；未公布 Voxel Coin 上限数值或通用性能结果。仍有问题时，向游戏内 Support 提交服务器、UID、平台、客户端版本、时间和复现步骤。', '同次更新還列出 Season Orders 消失、Voxel Coin 上限問題與 Growth Tonic 後互動焦點錯誤的修正，並改善家園卡頓；未公布 Voxel Coin 上限數值或通用效能結果。仍有問題時，向遊戲內 Support 提交伺服器、UID、平台、客戶端版本、時間和重現步驟。') },
    { t: 'link', href: log, c: t('Official November 13 Home fixes, read November 23', '官方11月13日家园修复，11月23日核验', '官方11月13日家園修正，11月23日核驗') },
  ];
}

export function getLateNovemberIssueBlocks(locale: string): LaunchGuideBlock[] {
  const t = copy(locale);
  return [
    { t: 'h', c: t('November 23 check: fixed symptoms and issues still listed', '11月23日核对：已列修复与仍列已知问题', '11月23日核對：已列修正與仍列已知問題') },
    { t: 'table', head: [t('Situation', '情况', '情況'), t('Status and next action', '状态与下一步', '狀態與下一步')], rows: [
      ['Aniimo Dash · Thundercloud / Magmarex', t('November 13 fixes inability to move AFTER Thundercloud transformation and some Magmarex body/movement issues. Failed transformation with a disappearing Party and incorrect Smoke Bomb display remain in the known-issue list. Record which trigger happened; the movement fix does not resolve every transformation symptom.', '11月13日修复变为 Thundercloud 后无法移动及部分 Magmarex 体型／移动问题。变形失败导致 Party 消失、Smoke Bomb 显示异常仍列为已知问题。记录发生在哪一步，不能把移动修复视为所有变形问题均已解决。', '11月13日修正變為 Thundercloud 後無法移動及部分 Magmarex 體型／移動問題。變形失敗導致 Party 消失、Smoke Bomb 顯示異常仍列為已知問題。記錄發生在哪一步，不能把移動修正視為所有變形問題均已解決。')],
      ['Holo-Battle Interlink', t('Early result tally and a jumping start countdown remain listed. Record the visible timer and result separately; the older manual star-reward claim fix addresses a different action.', '提前结算、开场倒计时跳回仍在列表中。分别记录显示计时与结算结果；此前手动领取星级奖励修复针对不同操作。', '提前結算、開場倒數跳回仍在清單中。分別記錄顯示計時與結算結果；此前手動領取星級獎勵修正針對不同操作。')],
      [t('Other displayed known issues', '其他仍列已知问题', '其他仍列已知問題'), t('Ultimate displayed cooldown longer than actual, controller right-stick map-marker behavior, Lunara skill effects and invisible Aniimo in crowded Astra are still listed. Crowded-Astra visibility also appears in the November 12 fixes: this source is internally overlapping, so confirm the current symptom rather than calling it universally resolved.', '仍列出 Ultimate 显示冷却略长、手柄右摇杆查看地图标记异常、Lunara 技能特效缺失，以及 Astra 人多时他人伊莫不可见。Astra 可见性也出现于11月12日修复项，来源状态存在重叠，应核对当前症状，不能宣称全部解决。', '仍列出 Ultimate 顯示冷卻略長、手柄右搖桿查看地圖標記異常、Lunara 技能特效缺失，以及 Astra 人多時他人伊莫不可見。Astra 可見性也出現於11月12日修正項，來源狀態存在重疊，應核對目前症狀，不能宣稱全部解決。')],
    ] },
    { t: 'link', href: '/guide/aniimo-rv-homeland-guide', c: t('Home: turn-in, refresh, points and missing-furniture checks', '家园：交付、刷新、积分与家具丢失检查', '家園：交付、重新整理、積分與家具遺失檢查') },
    { t: 'link', href: '/guide/aniimo-egg-heist', c: t('Egg Heist: November 17 collectible rewards and Giga-Egg changes', 'Egg Heist：11月17日收藏奖励与 Giga-Egg 调整', 'Egg Heist：11月17日收藏獎勵與 Giga-Egg 調整') },
    { t: 'link', href: log, c: t('Official rolling log, read November 23; latest dated entry November 17', '官方滚动日志，11月23日核验；最新条目为11月17日', '官方滾動日誌，11月23日核驗；最新條目為11月17日') },
  ];
}
