import type { LaunchGuideBlock } from './launch-guides';

/** November 25 editorial decision aids. Announcement scope, not client tests. */
export const november26Topics: Record<string, string[]> = {
  'getting-started': ['progression', 'returning'],
  'aniimo-version-1-1-update': ['maintenance', 'progression', 'levels'],
  'aniimo-multiplayer': ['fair', 'returning'],
  'aniimo-team-composition': ['fair'],
  'aniimo-egg-heist': ['collectibles', 'fair'],
  'aniimo-prismana-event-tracker': ['maintenance', 'jaguaraun', 'carnival', 'dash'],
  'is-aniimo-free-to-play': ['carnival', 'credits'],
  'aniimo-forms-explained': ['pigment'],
  'aniimo-prismana-potential-breeding-guide': ['pigment'],
  'aniimo-launch-checklist-known-issues': ['maintenance', 'reset', 'platform'],
  'aniimo-rv-homeland-guide': ['home'],
  'aniimo-harvest-gathering-farm-guide': ['home'],
  'aniimo-choose-by-mobility-role': ['mobility'],
  'aniimo-catching-guide': ['credits'],
  'aniimo-mobile': ['platform'],
  'aniimo-platforms': ['platform'],
};

export function getNovember26Blocks(locale: string, slug: string): LaunchGuideBlock[] {
  const topics = november26Topics[slug];
  if (!topics) return [];
  const t = (en: string, hans: string, hant: string) => locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
  const h = (en: string, hans: string, hant: string): LaunchGuideBlock => ({t:'h', c:t(en,hans,hant)});
  const p = (en: string, hans: string, hant: string): LaunchGuideBlock => ({t:'p', c:t(en,hans,hant)});
  const table = (head: string[], rows: string[][]): LaunchGuideBlock => ({t:'table', head, rows});
  const sections: Record<string, LaunchGuideBlock[]> = {
    maintenance: [
      h("November 26 maintenance: use the right clock", "11月26日维护：先核对时钟", "11月26日維護：先核對時鐘"),
      p("Announced November 23, checked November 25: planned maintenance is November 26, Europe 06:00–11:00 UTC+0 / Americas 02:00–07:00 UTC-4 / Apac 14:00–19:00 UTC+8. These are the same window (Beijing 14:00–19:00), not three separate openings. Maintenance can finish early or late; restart the client after completion. Glimmer ×500 compensation is announced for accounts registered before S2; check the mail eligibility.", "11月23日公告、11月25日核对：计划11月26日维护，欧洲06:00–11:00 UTC+0／美洲02:00–07:00 UTC-4／亚太14:00–19:00 UTC+8。这是同一时段（北京时间14:00–19:00），不是三次开放。维护可能提前或延后，结束后重启客户端；公告列出 S2 前注册账号的 Glimmer ×500 补偿，请核对邮件资格。", "11月23日公告、11月25日核對：計畫11月26日維護，歐洲06:00–11:00 UTC+0／美洲02:00–07:00 UTC-4／亞太14:00–19:00 UTC+8。這是同一時段（北京時間14:00–19:00），不是三次開放。維護可能提前或延後，結束後重啟用戶端；公告列出 S2 前註冊帳號的 Glimmer ×500 補償，請核對郵件資格。"),
      p("The dates below are announced schedules, not confirmation of live access. Carnival, Home shop and collectible boost use their own server-clock deadlines; Gracewing reset instead ends at one shared global instant.", "以下为公告排期，不代表已实测开放。嘉年华、家园商店和藏品加成各有服务器时钟截止；Gracewing 重置则在全球同一瞬间结束。", "以下為公告排期，不代表已實測開放。嘉年華、家園商店和藏品加成各有伺服器時鐘截止；Gracewing 重置則在全球同一瞬間結束。"),
    ],
    progression: [
      h("Stuck at a quest or title? November 26 progression checklist", "卡在任务还是称号？11月26日成长检查表", "卡在任務還是稱號？11月26日成長檢查表"),
      table([t("Goal", "目标", "目標"), t("Announced requirement / next action", "公告条件／下一步", "公告條件／下一步")], [
        [t("Rainbow of the Ground", "Rainbow of the Ground", "Rainbow of the Ground"), t("Final Breezy quest: Lv.45 + Wayfarer II.", "Breezy 最终主线：45级＋Wayfarer II。", "Breezy 最終主線：45級＋Wayfarer II。")],
        [t("A Tale of Tide and Song", "A Tale of Tide and Song", "A Tale of Tide and Song"), t("Whisperwake story: Lv.50 + Wayfarer III; finish Breezy “A New Journey” to automatically receive “A Song from the Sea”. These quest names refer to different steps.", "Whisperwake 主线：50级＋Wayfarer III；完成 Breezy 的 A New Journey 后自动接取 A Song from the Sea。这几个任务名对应不同步骤。", "Whisperwake 主線：50級＋Wayfarer III；完成 Breezy 的 A New Journey 後自動接取 A Song from the Sea。這幾個任務名對應不同步驟。")],
        [t("Elite Training handoff", "Elite Training 章节交接", "Elite Training 章節交接"), t("From Breezy Chapter 6, continue the story to the islands to unlock Whisperwake Chapter. After Whisperwake Chapter 1, return to Breezy 6 for title promotion; resume Whisperwake promotions at Grade I Trailblazer.", "Breezy 第6章可继续推进岛屿剧情，抵达后解锁 Whisperwake 章节；完成 Whisperwake 第1章后返回 Breezy 第6章晋升称号，到 Grade I Trailblazer 再继续 Whisperwake 晋升。", "Breezy 第6章可繼續推進島嶼劇情，抵達後解鎖 Whisperwake 章節；完成 Whisperwake 第1章後返回 Breezy 第6章晉升稱號，到 Grade I Trailblazer 再繼續 Whisperwake 晉升。")],
      ]),
      p("Diagnose story access, title promotion and the Aniimo level cap separately. The update reduces Safari requirements at Lv.41–54 and announces mail compensation for affected players, without a verified amount. Ascension alone does not remove the title gates for 60→65 and 65→70 in the growth guide.", "分别排查剧情入口、称号晋升和伊莫等级上限。更新计划减少41–54级所需 Safari 次数，并向受影响玩家邮件补偿，未核验具体数量。仅完成 Ascension 不能跳过成长攻略中60→65、65→70的称号要求。", "分別排查劇情入口、稱號晉升和伊莫等級上限。更新計畫減少41–54級所需 Safari 次數，並向受影響玩家郵件補償，未核驗具體數量。僅完成 Ascension 不能跳過成長攻略中60→65、65→70的稱號要求。"),
    ],
    levels: [
      h("Whisperwake starting levels: compare before entering", "Whisperwake 起始等级：进区前对照", "Whisperwake 起始等級：進區前對照"),
      table([t("Region", "地区", "地區"), t("Announced starting range", "公告起始区间", "公告起始區間")], [
        [t("Tideblossom Coast", "Tideblossom Coast", "Tideblossom Coast"), t("52–57", "52–57", "52–57")],
        [t("Crescent Bay", "Crescent Bay", "Crescent Bay"), t("50–55", "50–55", "50–55")],
        [t("Rosy Mirelands", "Rosy Mirelands", "Rosy Mirelands"), t("56–58", "56–58", "56–58")],
        [t("Wildwater Gorge", "Wildwater Gorge", "Wildwater Gorge"), t("57–59", "57–59", "57–59")],
        [t("Cloudreach Falls", "Cloudreach Falls", "Cloudreach Falls"), t("58–60", "58–60", "58–60")],
      ]),
      p("Named starting boss levels: Infergon Omega 48; Luminelle Alpha 57; Glameep Alpha 55; Sugartini Alpha 58; Jabster Alpha 59; Jeburst Omega 60. These are the announced starting levels, not a claim about every spawn or a tested difficulty ranking. Use the regional range for your next destination and check the actual encounter before committing resources.", "点名首领起始等级：Infergon Omega 48、Luminelle Alpha 57、Glameep Alpha 55、Sugartini Alpha 58、Jabster Alpha 59、Jeburst Omega 60。这是公告起始等级，不代表所有刷新个体，也不是实测难度排名。先按地区区间选择目的地，投入资源前核对实际遭遇。", "點名首領起始等級：Infergon Omega 48、Luminelle Alpha 57、Glameep Alpha 55、Sugartini Alpha 58、Jabster Alpha 59、Jeburst Omega 60。這是公告起始等級，不代表所有重新整理個體，也不是實測難度排名。先按地區區間選擇目的地，投入資源前核對實際遭遇。"),
    ],
    fair: [
      h("Fair PVP: which equipment effects still matter?", "公平 PVP：哪些装备效果仍然生效？", "公平 PVP：哪些裝備效果仍然生效？"),
      table([t("Property", "项目", "項目"), t("November 25 developer clarification", "11月25日开发者说明", "11月25日開發者說明")], [
        [t("Retained", "保留", "保留"), t("Species, form, appearance and skill set. Choose the actual form and skill interactions you need.", "种类、形态、外观与技能组；按实际形态与技能联动选择。", "種類、形態、外觀與技能組；按實際形態與技能連動選擇。")],
        [t("Standardized", "统一", "統一"), t("Level, personality, acquired Potential, Resonance and Capability; species-specific adjustments can apply. Investment outside the mode is not a direct stat advantage.", "等级、性格、后天潜能、Resonance 与 Capability 统一，并有物种专项调整；模式外养成不能直接等同数值优势。", "等級、性格、後天潛能、Resonance 與 Capability 統一，並有物種專項調整；模式外養成不能直接等同數值優勢。")],
        [t("Held Items", "Held Items 携带装备", "Held Items 攜帶裝備"), t("Retained at uniform level and base stats; core and advanced effects remain active. Compare effect choices, not just your item level.", "保留，等级及基础属性统一；核心与进阶效果仍生效。比较效果选择，不能只看装备等级。", "保留，等級及基礎屬性統一；核心與進階效果仍生效。比較效果選擇，不能只看裝備等級。")],
        [t("Disabled", "禁用", "停用"), t("Core skill enhancements. This is different from disabling every Held Item effect.", "核心技能强化；这与关闭全部 Held Items 效果不同。", "核心技能強化；這與關閉全部 Held Items 效果不同。")],
      ]),
      p("Bag consumables and Held Items are different categories. The earlier “no equipment loadout” wording was too broad and has been corrected. Future healing, survivability and respawn-protection adjustments are announced plans without verified release numbers; do not use them as current build statistics.", "背包消耗品与 Held Items 是不同类别。此前“不允许配置装备”的概括过宽，现已纠正。治疗、生存与复活保护调整属于后续计划，未核验版本或数值，不能拿来计算当前配装。", "背包消耗品與 Held Items 是不同類別。此前「不允許配置裝備」的概括過寬，現已更正。治療、生存與復活保護調整屬於後續計畫，未核驗版本或數值，不能拿來計算目前配裝。"),
    ],
    collectibles: [
      h("Missing collectibles: rate-up, selection and random boxes", "藏品缺项：加成、自选与随机箱怎么选", "藏品缺項：加成、自選與隨機箱怎麼選"),
      p("Announced after the November 26 update through December 9, 23:59 on each server clock: Team Mode, all difficulties, common/prized collectible drop rates from chests and defeated Umbrals increase by 100%. This doubles the specified rates, not every reward quantity; it does not guarantee a missing Evercrystal or any particular collectible. Prismatic Iris · Dark is also announced for Chaos.", "公告计划11月26日更新后至12月9日各服23:59：Team Mode 全难度中，宝箱及击败 Umbral 的普通／珍贵藏品掉率提高100%。翻倍的是指定掉率，不是所有奖励数量；不保证补出 Evercrystal 或任意指定缺项。混沌同时计划加入 Prismatic Iris · Dark 藏品。", "公告計畫11月26日更新後至12月9日各服23:59：Team Mode 全難度中，寶箱及擊敗 Umbral 的普通／珍貴藏品掉率提高100%。翻倍的是指定掉率，不是所有獎勵數量；不保證補出 Evercrystal 或任意指定缺項。混沌同時計畫加入 Prismatic Iris · Dark 藏品。"),
      table([t("Choice", "选择", "選擇"), t("Decision before spending time or currency", "投入时间／货币前的判断", "投入時間／貨幣前的判斷")], [
        [t("Egg Emperor · 200 stars", "Egg Emperor · 200星", "Egg Emperor · 200星"), t("Selection reward can target a missing collectible. Check your claimed status and the actual selection list first.", "自选奖励可针对缺少藏品；先查是否已领及真实可选清单。", "自選獎勵可針對缺少藏品；先查是否已領及真實可選清單。")],
        [t("Weekly shop box", "周商店随机箱", "週商店隨機箱"), t("Random collectible, not a missing-item guarantee. Inspect the price and weekly limit in the shop.", "随机藏品，不保证补缺；价格与周限购以商店面板为准。", "隨機藏品，不保證補缺；價格與週限購以商店面板為準。")],
        [t("S1 reruns / S2 plans", "S1 返场／S2 计划", "S1 返場／S2 計畫"), t("Developers promise later S1 collectible reruns and more S2 opportunities/duplicate uses, without exact dates. This does not establish ticket, currency or inventory carryover.", "开发者承诺后续返场 S1 藏品，并计划增加 S2 获取机会及重复品用途，未给准确日期；这不能证明票券、货币或库存跨季继承。", "開發者承諾後續返場 S1 藏品，並計畫增加 S2 取得機會及重複品用途，未給準確日期；這不能證明票券、貨幣或庫存跨季繼承。")],
      ]),
    ],
    jaguaraun: [
      h("Jaguaraun: daily reset → investigation → recipe or token", "Jaguaraun：每日刷新→调查→配方与代币", "Jaguaraun：每日重新整理→調查→配方與代幣"),
      p("Fantasy Resonance is announced after the November 26 update until December 17, 03:59 on each server clock, Student I. Jaguaraun appearances refresh daily at 04:00. In Companion Mode, friends’ catches count toward the relevant catch tasks. Check the exact task and form before repeating catches.", "Fantasy Resonance 计划11月26日更新后至12月17日各服03:59，要求 Student I。Jaguaraun 每日04:00刷新出现；Companion Mode 中朋友的捕获可计入相关捕获任务。重复捕获前先核对任务和指定形态。", "Fantasy Resonance 計畫11月26日更新後至12月17日各服03:59，要求 Student I。Jaguaraun 每日04:00重新整理出現；Companion Mode 中朋友的捕獲可計入相關捕獲任務。重複捕獲前先核對任務和指定形態。"),
      p("Complete all Fantasy Investigation tasks for the Offering Recipe. The designated task in each round grants one Fantasy Token; the Event Vendor exchanges one token for one past Offering Recipe. Before exchanging, compare recipes already owned with the vendor’s actual stock. Exact task sequences, offering ingredients and tested routes remain unverified; a recipe is not a direct Aniimo grant.", "完成全部 Fantasy Investigation 任务获得供奉配方；每轮指定任务奖励1枚 Fantasy Token，活动商人可用1枚兑换1份往期供奉配方。兑换前对照已拥有配方与商人实际库存。完整任务顺序、准确材料和实测路线仍未核验；配方不是直接发放伊莫。", "完成全部 Fantasy Investigation 任務取得供奉配方；每輪指定任務獎勵1枚 Fantasy Token，活動商人可用1枚兌換1份往期供奉配方。兌換前對照已擁有配方與商人實際庫存。完整任務順序、準確材料和實測路線仍未核驗；配方不是直接發放伊莫。"),
    ],
    carnival: [
      h("November 27 Carnival: claim free rewards before comparing spending tiers", "11月27日嘉年华：先领免费，再看消费档位", "11月27日嘉年華：先領免費，再看消費檔位"),
      p("Annual Carnival and Starlight Echoes are scheduled November 27, 10:00–December 1, 12:00 on each server clock, Student I, with a November 26 preview. Claim daily rewards and check Shop > Pack for the free Aniimo Gratitude Gift Box: Collectible Blind Box ×1, Wonder Sugar Crystal ×100 and Vein Essence ×5. A blind box does not promise a missing collectible.", "Annual Carnival 与 Starlight Echoes 计划11月27日10:00至12月1日12:00，各服时钟，要求 Student I；11月26日预告。每日领取奖励，并到 Shop > Pack 查找免费 Aniimo Gratitude Gift Box：藏品盲盒×1、Wonder Sugar Crystal×100、Vein Essence×5。盲盒不保证补缺。", "Annual Carnival 與 Starlight Echoes 計畫11月27日10:00至12月1日12:00，各服時鐘，要求 Student I；11月26日預告。每日領取獎勵，並到 Shop > Pack 查找免費 Aniimo Gratitude Gift Box：藏品盲盒×1、Wonder Sugar Crystal×100、Vein Essence×5。盲盒不保證補缺。"),
      p("Keep the free pack separate from paid bundles. Starlight Echoes counts cumulative Lumin Crystals spent, not simply topped up. Inspect the actual tiers, eligible spending and bundle contents before purchasing; no verified price comparison or recommended spend is available here.", "免费礼包与付费礼包分开看。Starlight Echoes 按累计消耗 Lumin Crystals 计算，不能把充值直接当消费进度。购买前核对真实档位、计入范围及礼包内容；本站没有已核验的价格对比或推荐消费额。", "免費禮包與付費禮包分開看。Starlight Echoes 按累計消耗 Lumin Crystals 計算，不能把儲值直接當消費進度。購買前核對真實檔位、計入範圍及禮包內容；本站沒有已核驗的價格對比或推薦消費額。"),
    ],
    pigment: [
      h("Renewal Pigment: avoid confusing a missing color with a missing form", "Renewal Pigment：缺少颜色与缺少形态分开判断", "Renewal Pigment：缺少顏色與缺少形態分開判斷"),
      p("The November 26 announcement introduces Renewal Pigment: it guarantees one Sparkling Pigment not already owned, excluding Shadow and Dazzling. If your goal is a missing regular Sparkling color, inspect the eligible pool and your owned pigments before using it. It is not evidence that a new species, Prismana form, Shadow or Dazzling can be guaranteed.", "11月26日更新公告引入 Renewal Pigment：保证获得1种未拥有的 Sparkling Pigment，排除 Shadow 与 Dazzling。若目标是补普通 Sparkling 颜色，使用前对照适用池与已拥有颜料；不能由此推定必得新物种、Prismana 形态、Shadow 或 Dazzling。", "11月26日更新公告引入 Renewal Pigment：保證取得1種未擁有的 Sparkling Pigment，排除 Shadow 與 Dazzling。若目標是補普通 Sparkling 顏色，使用前對照適用池與已擁有顏料；不能由此推定必得新物種、Prismana 形態、Shadow 或 Dazzling。"),
      p("Use this guarantee to compare with a random pigment option, then check the actual item tooltip for eligibility, stock and price. Those details and full-inventory behavior are not verified; the announcement does not make this guarantee universal for every pigment item.", "用这个保底与随机颜料选项比较，再看实际道具说明中的适用范围、库存和价格。这些细节及全收集后的行为未核验；公告不能让所有颜料道具自动拥有同样保底。", "用這個保底與隨機顏料選項比較，再看實際道具說明中的適用範圍、庫存和價格。這些細節及全收集後的行為未核驗；公告不能讓所有顏料道具自動擁有同樣保底。"),
    ],
    reset: [
      h("Gracewing reset: eligibility, refunds and one global deadline", "Gracewing 重置：资格、返还与全球统一截止", "Gracewing 重置：資格、返還與全球統一截止"),
      p("The November 26 balance reset names Gracewing obtained before the adjustment: Basic, Sea of Flowers, Nighttime and Mountain Woods forms. Deadline: Europe December 10, 20:00 UTC+0 = Americas December 10, 16:00 UTC-4 = Apac December 11, 04:00 UTC+8. This is one instant; do not substitute Whirlbite’s separate server-local 04:00 deadline.", "11月26日平衡重置点名调整前获得的 Gracewing：Basic、Sea of Flowers、Nighttime、Mountain Woods 形态。截止：欧洲12月10日20:00 UTC+0＝美洲12月10日16:00 UTC-4＝亚太12月11日04:00 UTC+8。这是同一瞬间，不能套用 Whirlbite 另一个各服04:00截止。", "11月26日平衡重置點名調整前取得的 Gracewing：Basic、Sea of Flowers、Nighttime、Mountain Woods 形態。截止：歐洲12月10日20:00 UTC+0＝美洲12月10日16:00 UTC-4＝亞太12月11日04:00 UTC+8。這是同一瞬間，不能套用 Whirlbite 另一個各服04:00截止。"),
      table([t("Before confirming", "确认前核对", "確認前核對"), t("Refund and removed progress", "返还与撤销的成长", "返還與撤銷的成長")], [
        [t("EXP", "EXP", "EXP"), t("EXP items refunded; corresponding EXP removed.", "返还经验道具并移除对应经验。", "返還經驗道具並移除對應經驗。")],
        [t("Star Up / Capability Awakening", "Star Up／Capability Awakening", "Star Up／Capability Awakening"), t("Reset and refund materials.", "重置并返还材料。", "重置並返還材料。")],
        [t("Capafruit", "Capafruit", "Capafruit"), t("Refund consumed fruit, restore uses and remove its effects.", "返还已消耗果实、恢复使用次数并移除效果。", "返還已消耗果實、恢復使用次數並移除效果。")],
      ]),
      p("Check the individual’s acquisition eligibility, record its current investment and read the reset preview. Compare the recovered resources with the progression you still need; a refund is not a recommendation to reset every Gracewing. No numerical balance verdict or tested replacement build is established here.", "核对该个体取得时间与资格，记录现有投入，再阅读重置预览。对照回收资源与仍需使用的成长，不必因可返还就重置所有 Gracewing。本站未据此得出数值强度结论或实测替代配装。", "核對該個體取得時間與資格，記錄現有投入，再閱讀重置預覽。對照回收資源與仍需使用的成長，不必因可返還就重置所有 Gracewing。本站未據此得出數值強度結論或實測替代配裝。"),
    ],
    dash: [
      h("Dash weeklies: two solo tasks, two Group Race tasks", "Dash 周常：两项单人、两项组队", "Dash 週常：兩項單人、兩項組隊"),
      table([t("Mode", "模式", "模式"), t("Announced November 26 tasks", "11月26日计划任务", "11月26日計畫任務")], [
        [t("Group Race", "Group Race", "Group Race"), t("Give 10 likes; use 10 items.", "点赞10次；使用道具10次。", "按讚10次；使用道具10次。")],
        [t("Solo", "单人", "單人"), t("Complete one race; earn A grade or above once.", "完成1次；取得1次 A 级及以上成绩。", "完成1次；取得1次 A 級及以上成績。")],
      ]),
      p("Solo players can plan for the last two tasks rather than all four. Developer feedback identifies solo weeklies as a Racing Coin source but gives no verified quantity. The shop adds Prismana Eggs; check the actual price and limit before planning a purchase. Group best-placement records start after the update. Redrock’s opening does not provide a tested route or guarantee an A grade.", "单人玩家可安排后两项，不要把四项都当单人可做。开发者说明单人周常可获得 Racing Coins，但未核验数量；商店新增 Prismana Eggs，规划兑换前看实际价格与限购。组队最佳名次从更新后开始记录。Redrock 开放不代表已有实测路线或保证 A 级。", "單人玩家可安排後兩項，不要把四項都當單人可做。開發者說明單人週常可取得 Racing Coins，但未核驗數量；商店新增 Prismana Eggs，規劃兌換前看實際價格與限購。組隊最佳名次從更新後開始記錄。Redrock 開放不代表已有實測路線或保證 A 級。"),
    ],
    returning: [
      h("Return to Idyll: check all three eligibility conditions", "Return to Idyll：回归资格要同时满足三项", "Return to Idyll：回歸資格要同時滿足三項"),
      p("Announced for the November 26 update: Student I, at least 14 consecutive days absent, and at least 42 days since the previous activation. The event starts on eligible login and ends at 04:00 on its 15th day; login rewards have 14-day/30-day absence tiers. Inspect your actual return panel before using another player’s dates. Reunion Tokens ×1350 exchange for one Prismana Egg of Choice.", "11月26日更新公告要求：Student I、连续离线至少14天、距离上次激活至少42天，三项同时满足。符合条件登录后开启，到第15天04:00结束；登录奖励按离线14天／30天分档。先看自己的回归面板，不套别人的日期。1350枚 Reunion Tokens 可兑换1枚 Prismana Egg of Choice。", "11月26日更新公告要求：Student I、連續離線至少14天、距離上次啟用至少42天，三項同時滿足。符合條件登入後開啟，到第15天04:00結束；登入獎勵按離線14天／30天分檔。先看自己的回歸面板，不套別人的日期。1350枚 Reunion Tokens 可兌換1枚 Prismana Egg of Choice。"),
      p("Announced team benefits are Friends Companion Report rewards +20%, shared Prismatic Energy rewards +20%, and Companion catch chance +10%. Multiple returners, or new-player plus returner benefits, do not stack. The +10% formula is unspecified: do not treat it as +10 percentage points or enter it as a confirmed catch-calculator multiplier.", "组队公告增益为 Friends Companion Report 奖励＋20%、共享 Prismatic Energy 奖励＋20%、Companion 捕获概率＋10%。多个回归玩家、或新玩家与回归玩家增益不叠加。＋10%的计算公式未公布，不能解释为加10个百分点或作为确定乘数填入捕获计算器。", "組隊公告增益為 Friends Companion Report 獎勵＋20%、共享 Prismatic Energy 獎勵＋20%、Companion 捕獲機率＋10%。多個回歸玩家、或新玩家與回歸玩家增益不疊加。＋10%的計算公式未公布，不能解釋為加10個百分點或作為確定乘數填入捕獲計算器。"),
    ],
    home: [
      h("Home chores and Contribution: November 26 changes versus future plans", "家园日常与贡献：11月26日调整及后续计划", "家園日常與貢獻：11月26日調整及後續計畫"),
      table([t("Task", "任务", "任務"), t("What to check", "核对与操作", "核對與操作")], [
        [t("RV unlock", "RV 解锁", "RV 解鎖"), t("Largest RV and RV skin changes unlock at Lv.16 in the announcement. Recheck the updated menu before treating the old level gate as a bug.", "公告将最大 RV 与 RV 换肤解锁调整为16级；先查更新后的菜单，再判断旧门槛是否仍适用。", "公告將最大 RV 與 RV 換膚解鎖調整為16級；先查更新後的選單，再判斷舊門檻是否仍適用。")],
        [t("Watering / placement", "浇水／摆放", "澆水／擺放"), t("Rain automatically waters crops without an action; furniture gains floor-height snapping. Check weather and placement before repeating chores.", "雨天自动浇水，无需操作；家具支持楼层高度吸附。重复劳动前先看天气与摆放结果。", "雨天自動澆水，無需操作；家具支援樓層高度吸附。重複勞動前先看天氣與擺放結果。")],
        [t("Resource Exchange", "Resource Exchange", "Resource Exchange"), t("Limited stock November 27, 04:00–December 2, 03:59 each server. Check prices, stock and your shortage before buying.", "各服11月27日04:00至12月2日03:59限量商品；购买前看价格、库存与实际缺口。", "各服11月27日04:00至12月2日03:59限量商品；購買前看價格、庫存與實際缺口。")],
        [t("Season furniture", "赛季家具", "賽季家具"), t("Dev Feedback: Comfort converts to Contribution at 3×. This is not currency-to-Contribution or production output ×3. Compare Comfort, not item price alone.", "开发者答疑：Comfort 转为 Contribution 的倍率为3倍，不是货币换贡献或产量翻三倍。比较 Comfort，不能只看价格。", "開發者答疑：Comfort 轉為 Contribution 的倍率為3倍，不是貨幣換貢獻或產量翻三倍。比較 Comfort，不能只看價格。")],
        [t("Nighttime Gathering", "Nighttime Gathering", "Nighttime Gathering"), t("RV skin is on the personal track; core rewards can be earned solo. Window extended from two to four weeks. Check your personal progress.", "RV 皮肤属于个人进度，核心奖励可单人取得；窗口由2周延至4周，先核对个人进度。", "RV 造型屬於個人進度，核心獎勵可單人取得；窗口由2週延至4週，先核對個人進度。")],
      ]),
      p("Submitting Park orders from Home is expected in version 1.1.2, according to November 25 feedback. Confirm your client version and the actual control before treating it as available. The announced item-lock display/unlock in use panels, teammate-map teleport and Function Menu network status are separate quality-of-life changes, not proof that a stuck order has been fixed.", "11月25日答疑预计1.1.2支持在家园提交 Park 订单，先确认客户端版本和真实入口，再视为可用。道具使用面板显示锁定并解锁、地图队友位置传送、Function Menu 网络状态是另列的便利调整，不能作为卡单已修好的证据。", "11月25日答疑預計1.1.2支援在家園提交 Park 訂單，先確認用戶端版本和真實入口，再視為可用。道具使用面板顯示鎖定並解鎖、地圖隊友位置傳送、Function Menu 網路狀態是另列的便利調整，不能作為卡單已修好的證據。"),
    ],
    mobility: [
      h("Planned flight upgrade: Prismana Hypnyto and Prismana Ekrim", "计划飞行升级：Prismana Hypnyto 与 Prismana Ekrim", "計畫飛行升級：Prismana Hypnyto 與 Prismana Ekrim"),
      p("November 25 Dev Feedback plans flight level 3 for Prismana Hypnyto and Prismana Ekrim in an upcoming version, without an exact release version. Keep this as a future comparison candidate and confirm the live ability panel before replacing a current travel slot. This does not update the Basic Form snapshot below, include Jeburst, or establish a tested Redrock route.", "11月25日开发者答疑计划在后续版本将 Prismana Hypnyto 与 Prismana Ekrim 飞行升至3级，未明确版本。可先列入未来候选，实际换跑图位前核对游戏能力面板；这不修改下方基础形态快照，不包含 Jeburst，也不能证明 Redrock 实测路线。", "11月25日開發者答疑計畫在後續版本將 Prismana Hypnyto 與 Prismana Ekrim 飛行升至3級，未明確版本。可先列入未來候選，實際換跑圖位前核對遊戲能力面板；這不修改下方基礎形態快照，不包含 Jeburst，也不能證明 Redrock 實測路線。"),
    ],
    credits: [
      h("Capture report Credits: announced 1,200 → 1,600, effective date unconfirmed", "捕获报告 Credits：公告1200→1600，生效日期待确认", "捕獲報告 Credits：公告1200→1600，生效日期待確認"),
      p("November 25 Dev Feedback announces base report Credits rising from 1,200 to 1,600 without a precise effective version. Before budgeting, record the actual report type and settlement amount in your client. This does not mean every capture pays 1,600, every reward rises by one third, or a first-catch bonus returns. We have not changed the catch calculator or presented this as a live universal payout.", "11月25日开发者答疑宣布报告基础 Credits 从1200提高到1600，未给准确生效版本。做预算前记录实际报告类型与客户端结算金额；不能推定每次捕获都给1600、所有奖励涨三分之一，或首次捕获奖励恢复。本次未据此改动捕获计算器，也不作为已上线的通用收益。", "11月25日開發者答疑宣布報告基礎 Credits 從1200提高到1600，未給準確生效版本。做預算前記錄實際報告類型與用戶端結算金額；不能推定每次捕獲都給1600、所有獎勵漲三分之一，或首次捕獲獎勵恢復。本次未據此改動捕獲計算器，也不作為已上線的通用收益。"),
    ],
    platform: [
      h("After the November 26 update: match your symptom to the announced fix", "11月26日更新后：按具体症状复查", "11月26日更新後：按具體症狀複查"),
      table([t("Platform / symptom", "平台／症状", "平台／症狀"), t("Useful retry and report", "复测与记录", "複測與記錄")], [
        [t("PS5 / Xbox", "PS5／Xbox", "PS5／Xbox"), t("RV-entry black screen and warehouse/batch/sort/release/racing stutter are named in the fix announcement. Retry the same failed action after updating; record which action, platform and client version still fail.", "公告点名 RV 进入黑屏及仓库／批量／排序／放生／竞速卡顿。更新后复测原失败操作，记录仍失败的具体动作、平台和版本。", "公告點名 RV 進入黑畫面及倉庫／批次／排序／放生／競速卡頓。更新後複測原失敗操作，記錄仍失敗的具體動作、平台和版本。")],
        [t("Galaxy S25 Ultra / Android", "Galaxy S25 Ultra／Android", "Galaxy S25 Ultra／Android"), t("S25 Ultra stutter and Android background-download restarts are separately named. Record device, foreground/background transition and download progress; do not assume all Android performance issues share one cause.", "分别点名 S25 Ultra 卡顿与 Android 后台下载重启；记录设备、前后台切换和下载进度，不把所有安卓性能问题归为同一原因。", "分別點名 S25 Ultra 卡頓與 Android 背景下載重啟；記錄裝置、前背景切換和下載進度，不把所有安卓效能問題歸為同一原因。")],
      ]),
      p("These are announced fixes, not our hardware tests or a universal performance guarantee. For combo import failures, save the code source, error message and version; for Steam Deck touchpad changes, record Steam Input layout and controller mapping. No reproduced workaround is verified here, so do not treat an untested remap or reinstall as a confirmed fix.", "以上是公告修复范围，不是本站硬件实测或全设备性能保证。组合码导入失败请保留码来源、报错与版本；Steam Deck 触控板变化请记录 Steam Input 布局和手柄映射。本站尚未复现有效绕过方法，不能把未测的重映射或重装当确定修复。", "以上是公告修正範圍，不是本站硬體實測或全裝置效能保證。組合碼匯入失敗請保留碼來源、錯誤與版本；Steam Deck 觸控板變化請記錄 Steam Input 配置和手把映射。本站尚未重現有效繞過方法，不能把未測的重新映射或重裝當確定修正。"),
    ],
  };
  const result = topics.flatMap(topic => sections[topic] ?? []);
  if (topics.includes('progression') && slug !== 'aniimo-version-1-1-update') result.push({t:'link', href:'/guide/aniimo-version-1-1-update', c:t('Check title gates and level caps', '查看称号门槛与等级上限', '查看稱號門檻與等級上限')});
  if (topics.some(topic => !['fair','mobility','credits'].includes(topic))) result.push({t:'link', href:'https://www.aniimo.com/newslist/detail/100312', c:t('Source: November 26 update announcement (November 23); read November 25', '来源：11月26日更新公告（11月23日发布），11月25日核对', '來源：11月26日更新公告（11月23日發布），11月25日核對')});
  if (topics.some(topic => ['fair','collectibles','home','mobility','credits','dash'].includes(topic))) result.push({t:'link', href:'https://x.com/Aniimo_EN/status/2125409675294494977', c:t('Source: November 25 Dev Feedback; read November 25', '来源：11月25日开发者答疑，当日核对', '來源：11月25日開發者答疑，當日核對')});
  return result;
}
