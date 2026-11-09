// Curated interpretations of dated Basic Form evidence, not gameplay tests.
type ReadingNote = { question: string; answer: string; section: 'skills' | 'traits' | 'evolution' | 'mobility' | 'habitats' };
export const dexReadingNotes: Record<string, Record<string, ReadingNote[]>> = {
  'wiki-1000-10007': {
    en: [
      { question: 'How do you reach Overcharge?', answer: 'Thunderstorm needs 20 stacks for a 10s Overcharge. Thunder Rush Claw grants 4 stacks on a hit; Thunder Rush Call grants 10. The combat skill Thundercloud Surge instead enables Basic Attack hits to grant 1 stack for 10s. Check current stacks and hit conditions; this is not a guaranteed rotation or time to fill.', section: 'traits' },
      { question: 'Are Overcharged Basic Attacks free?', answer: 'ATK lists Cost 0, but the trait separately charges 3 Energy for qualifying thundercloud explosions at 0.5s intervals during Overcharge. Do not treat the zero-cost ATK as free enhanced damage or turn the interval into guaranteed DPS. Check remaining Energy before planning the window.', section: 'skills' },
      { question: 'What changes when a skill is cast in Overcharge?', answer: 'Blink Strike adds 15s Lockdown on hit only when cast in Overcharge; Thunder Rush Claw is treated as Basic Attack Damage in that state. Check the state before the cast rather than ranking skills by Power alone. Neither condition establishes a universal best build.', section: 'skills' },
    ],
    'zh-Hans': [
      { question: '如何进入 Overcharge？', answer: 'Thunderstorm 满20层后进入持续10秒的 Overcharge。Thunder Rush Claw 命中获得4层，Thunder Rush Call 获得10层；战斗技能 Thundercloud Surge 则在10秒内让命中的普攻获得1层。先看当前层数与命中条件，不能据此认定必定按固定循环或时间蓄满。', section: 'traits' },
      { question: '强化普攻不消耗能量吗？', answer: 'ATK 标注 Cost 0，但特性另规定 Overcharge 期间符合条件的雷云爆炸按0.5秒间隔消耗3 Energy。不能把零消耗 ATK 等同于免费强化伤害，也不能把间隔换算成保证 DPS；安排强化窗口前先检查剩余能量。', section: 'skills' },
      { question: '强化状态下施技有什么变化？', answer: 'Blink Strike 仅在 Overcharge 状态施放时，对命中目标附加15秒 Lockdown；Thunder Rush Claw 在该状态下按普攻伤害处理。比较技能前应核对施放时状态，不能只按 Power 排名，也不能据此推出通用最优配装。', section: 'skills' },
    ],
    'zh-Hant': [
      { question: '如何進入 Overcharge？', answer: 'Thunderstorm 滿20層後進入持續10秒的 Overcharge。Thunder Rush Claw 命中獲得4層，Thunder Rush Call 獲得10層；戰鬥技能 Thundercloud Surge 則在10秒內讓命中的普攻獲得1層。先看目前層數與命中條件，不能據此認定必定按固定循環或時間蓄滿。', section: 'traits' },
      { question: '強化普攻不消耗能量嗎？', answer: 'ATK 標註 Cost 0，但特性另規定 Overcharge 期間符合條件的雷雲爆炸按0.5秒間隔消耗3 Energy。不能把零消耗 ATK 等同於免費強化傷害，也不能把間隔換算成保證 DPS；安排強化視窗前先檢查剩餘能量。', section: 'skills' },
      { question: '強化狀態下施技有什麼變化？', answer: 'Blink Strike 僅在 Overcharge 狀態施放時，對命中目標附加15秒 Lockdown；Thunder Rush Claw 在該狀態下按普攻傷害處理。比較技能前應核對施放時狀態，不能只按 Power 排名，也不能據此推出通用最優配裝。', section: 'skills' },
    ],
  },
  'wiki-300301-022': {
    en: [
      {question: 'Which allies benefit from the healing and domain?', answer: 'Queen’s Blessing names Wind-type allies and scales with 9% of the caster’s Max HP. Royal Pressure needs the switched-in Wind-type Aniimo to use a skill. Check your next ally’s element before planning this support; the text does not establish healing for every element.', section: 'skills'},
      {question: 'Does a 0.5s interval guarantee repeated damage?', answer: 'Royal Pressure lasts 20s and limits triggers to no more than one per 0.5s. That is a minimum interval between qualifying triggers, not automatic damage every 0.5s. The switch, skill and target-range conditions still matter; this alone cannot establish DPS.', section: 'skills'},
      {question: 'Is the listed habitat the whole Prismana event area?', answer: 'The Basic Form page lists Wildwater Gorge. The dated Prismana announcement separately lists Wildwater Gorge and Sea of Flowers for November 9–16 on each server clock. Use the event calendar for that form and window; neither source gives an exact spawn coordinate or encounter probability.', section: 'habitats'},
    ],
    'zh-Hans': [
      {question: '治疗和领域收益适用于哪些队友？', answer: 'Queen’s Blessing 指定风系队友，治疗量按施放者最大 HP 的9%计算；Royal Pressure 要求切入的风系伊莫使用技能。安排辅助前先核对下一位队友的元素，不能据此认为所有元素都能获得治疗。', section: 'skills'},
      {question: '0.5秒间隔代表自动连续伤害吗？', answer: 'Royal Pressure 持续20秒，触发间隔不少于0.5秒。这是符合条件的两次触发之间的最短间隔，不是每0.5秒自动造成伤害。切换、施技和目标范围条件仍需满足，仅凭这些文字不能计算 DPS。', section: 'skills'},
      {question: '基础栖息地等于整个 Prismana 活动区域吗？', answer: '基础形态页面列出 Wildwater Gorge；Prismana 公告另列11月9日至16日各服务器时钟下的 Wildwater Gorge 和 Sea of Flowers。查活动形态应使用活动日历；两份来源都没有给出精确坐标或遭遇概率。', section: 'habitats'},
    ],
    'zh-Hant': [
      {question: '治療和領域收益適用於哪些隊友？', answer: 'Queen’s Blessing 指定風系隊友，治療量按施放者最大 HP 的9%計算；Royal Pressure 要求切入的風系伊莫使用技能。安排輔助前先核對下一位隊友的元素，不能據此認為所有元素都能獲得治療。', section: 'skills'},
      {question: '0.5秒間隔代表自動連續傷害嗎？', answer: 'Royal Pressure 持續20秒，觸發間隔不少於0.5秒。這是符合條件的兩次觸發之間的最短間隔，不是每0.5秒自動造成傷害。切換、施技和目標範圍條件仍需滿足，僅憑這些文字不能計算 DPS。', section: 'skills'},
      {question: '基礎棲息地等於整個 Prismana 活動區域嗎？', answer: '基礎形態頁面列出 Wildwater Gorge；Prismana 公告另列11月9日至16日各伺服器時鐘下的 Wildwater Gorge 和 Sea of Flowers。查活動形態應使用活動日曆；兩份來源都沒有給出精確座標或遭遇機率。', section: 'habitats'},
    ],
  },
  'wiki-300301-008': {
    en: [
      {question: 'When does Coin Boost restore Energy?', answer: 'The mark lasts 20s. During that window, the marked target must enter Break or be defeated, then the mark transfers to another nearby target and restores 16 Energy to the applier. The trigger is limited to once every 15s. Check for a nearby transfer target; casting a zero-cost mark alone does not guarantee an immediate refund.', section: 'skills'},
      {question: 'How does party composition affect the trait?', answer: 'Each Dark-type party member raises the whole party’s Energy Regeneration Rate by 4% during battle. This is a rate benefit conditioned on party elements, not an immediate 4 Energy grant. Compare the intended party before assuming a maximum; the text does not specify a complete stacking model.', section: 'traits'},
      {question: 'Which control effect fits the encounter?', answer: 'Gold-Siphon Nali pulls targets in a frontal fan and slows them by 20% for 8s. High-Roller Toss instead applies Charm to nearby targets for 3s. Inspect range and control type before choosing; different Power values do not establish which is better for every encounter.', section: 'skills'},
    ],
    'zh-Hans': [
      {question: 'Coin Boost 什么时候回能？', answer: '标记持续20秒，期间被标记目标须进入 Break 或被击败，随后标记转移至附近另一目标，为施加者恢复16 Energy；最多每15秒触发一次。使用前应确认附近有可转移目标，零消耗施加标记本身不代表立即返能。', section: 'skills'},
      {question: '队伍构成如何影响特性？', answer: '战斗中每位暗系成员使全队 Energy 恢复速率提高4%。这是按队伍元素触发的速率收益，不是立即获得4 Energy。先对照计划中的队伍，不把假设的最大值当默认；文字也没有提供完整叠加模型。', section: 'traits'},
      {question: '哪种控制效果更符合当前遭遇？', answer: 'Gold-Siphon Nali 拉拢前方扇形内的目标并减速20%，持续8秒；High-Roller Toss 则对附近目标施加3秒 Charm。选择前先比较范围和控制类型，Power 不同不能证明某个技能在所有战斗中更好。', section: 'skills'},
    ],
    'zh-Hant': [
      {question: 'Coin Boost 什麼時候回能？', answer: '標記持續20秒，期間被標記目標須進入 Break 或被擊敗，隨後標記轉移至附近另一目標，為施加者恢復16 Energy；最多每15秒觸發一次。使用前應確認附近有可轉移目標，零消耗施加標記本身不代表立即返能。', section: 'skills'},
      {question: '隊伍構成如何影響特性？', answer: '戰鬥中每位暗系成員使全隊 Energy 恢復速率提高4%。這是按隊伍元素觸發的速率收益，不是立即獲得4 Energy。先對照計畫中的隊伍，不把假設的最大值當預設；文字也沒有提供完整疊加模型。', section: 'traits'},
      {question: '哪種控制效果更符合目前遭遇？', answer: 'Gold-Siphon Nali 拉攏前方扇形內的目標並減速20%，持續8秒；High-Roller Toss 則對附近目標施加3秒 Charm。選擇前先比較範圍和控制類型，Power 不同不能證明某個技能在所有戰鬥中更好。', section: 'skills'},
    ],
  },
  'wiki-300301-028': {
    en: [
      {question: 'What should follow a skill or Ultimate?', answer: 'Turbo Boost grants one stack after a skill or Ultimate and enhances the next Basic Attack with additional damage and BREAK. Only two stacks can exist. Check stored stacks before another cast; the entry does not prove that repeated skills without Basic Attacks preserve every potential benefit.', section: 'traits'},
      {question: 'Why compare the three spin skills beyond Power?', answer: 'All three list Cost 10 and Power 15, but Aqua Wing Spin reduces Water resistance by 15% for 20s, Gale-Wing Spin removes 5 Energy, and Darkwing Spin reduces healing received by 70% for 15s. Match the debuff to the encounter rather than ranking identical Power values.', section: 'skills'},
      {question: 'Does Jet Flight prove a traversal route?', answer: 'Skyward Torrent is an Innate combat skill: Jet Flight lasts up to 8s and also ends after 15 hits received. Pathfinding separately lists Fly Lv.2 and Swim Lv.2 without route or stamina details. Use those records for different questions; the combat state does not verify a waterfall route.', section: 'mobility'},
    ],
    'zh-Hans': [
      {question: '技能或终极技之后应关注什么？', answer: 'Turbo Boost 在技能或终极技后获得1层，强化下一次普攻的伤害与 BREAK，最多储存2层。继续施技前先检查层数；条目不能证明只连续用技能、不接普攻也能保留每次潜在收益。', section: 'traits'},
      {question: '三个旋转技能为什么不能只看 Power？', answer: '三者都列出消耗10、Power 15，但 Aqua Wing Spin 降低水抗15%持续20秒，Gale-Wing Spin 扣除5 Energy，Darkwing Spin 降低受治疗70%持续15秒。应按遭遇需要选择减益，不能用相同的 Power 排出高低。', section: 'skills'},
      {question: 'Jet Flight 能证明探索路线可行吗？', answer: 'Skyward Torrent 属于固有战斗技能：Jet Flight 最多持续8秒，受击15次也会结束。Pathfinding 另列 Fly Lv.2 和 Swim Lv.2，但没有路线或体力说明。两种记录回答不同问题，战斗状态不能验证瀑布通行路线。', section: 'mobility'},
    ],
    'zh-Hant': [
      {question: '技能或終極技之後應關注什麼？', answer: 'Turbo Boost 在技能或終極技後獲得1層，強化下一次普攻的傷害與 BREAK，最多儲存2層。繼續施技前先檢查層數；條目不能證明只連續用技能、不接普攻也能保留每次潛在收益。', section: 'traits'},
      {question: '三個旋轉技能為什麼不能只看 Power？', answer: '三者都列出消耗10、Power 15，但 Aqua Wing Spin 降低水抗15%持續20秒，Gale-Wing Spin 扣除5 Energy，Darkwing Spin 降低受治療70%持續15秒。應按遭遇需要選擇減益，不能用相同的 Power 排出高低。', section: 'skills'},
      {question: 'Jet Flight 能證明探索路線可行嗎？', answer: 'Skyward Torrent 屬於固有戰鬥技能：Jet Flight 最多持續8秒，受擊15次也會結束。Pathfinding 另列 Fly Lv.2 和 Swim Lv.2，但沒有路線或體力說明。兩種記錄回答不同問題，戰鬥狀態不能驗證瀑布通行路線。', section: 'mobility'},
    ],
  },
  '089': {
    en: [
      {question: 'When is the next skill enhanced?', answer: 'Bubble Energy gains 1 every 4s in battle and 3 when skills damage a target; 10 enters Energy Full and enhances the next skill. Check the current state before choosing a support cast. The text does not establish per-hit counting for multi-target attacks or a guaranteed time to fill.', section: 'traits'},
      {question: 'What changes between the two shield skills?', answer: 'Baa Bubble Wave grants allies along its path a 10s shield based on 7% of the caster’s Max HP, or 14% in Energy Full. Dark Tide Wave Assault instead siphons existing target shields at 50%, or 80% when enhanced. Inspect ally positioning versus enemy shields; the latter is not a guaranteed Max-HP shield.', section: 'skills'},
      {question: 'Can the healing be converted to healing per second?', answer: 'Ripples of Floating Duckweed lists 12% of the caster’s Max HP and 24% healing on Grass-type Aniimo in Energy Full, but the source ends the duration phrase with “over 6” without a unit. Keep that duration unresolved and do not calculate HPS. The Grass condition also means 24% is not the default for every ally.', section: 'skills'},
    ],
    'zh-Hans': [
      {question: '下一次技能什么时候会强化？', answer: '战斗中 Bubble Energy 每4秒获得1点，技能伤害目标时获得3点；积累10点进入 Energy Full，强化下一次技能。施放辅助前先确认当前状态；文字没有确认多目标攻击按每段计数，也不能得出必定蓄满的时间。', section: 'traits'},
      {question: '两种护盾技能有什么关键区别？', answer: 'Baa Bubble Wave 为路径上的队友提供持续10秒、相当于施放者最大 HP 7%的护盾，Energy Full 下为14%。Dark Tide Wave Assault 则吸取目标已有护盾的50%，强化后80%。前者要看队友站位，后者要看敌方已有护盾，不能把后者视为保底的最大 HP 护盾。', section: 'skills'},
      {question: '治疗数值能换算成每秒治疗量吗？', answer: 'Ripples of Floating Duckweed 列出施放者最大 HP 的12%，Energy Full 下对草系伊莫治疗提高至24%，但来源持续时间只写到“over 6”，缺少单位。因此持续时间保持未确认，不计算每秒治疗；24%也受草系条件限制，不是所有队友的默认收益。', section: 'skills'},
    ],
    'zh-Hant': [
      {question: '下一次技能什麼時候會強化？', answer: '戰鬥中 Bubble Energy 每4秒獲得1點，技能傷害目標時獲得3點；累積10點進入 Energy Full，強化下一次技能。施放輔助前先確認目前狀態；文字沒有確認多目標攻擊按每段計數，也不能得出必定蓄滿的時間。', section: 'traits'},
      {question: '兩種護盾技能有什麼關鍵區別？', answer: 'Baa Bubble Wave 為路徑上的隊友提供持續10秒、相當於施放者最大 HP 7%的護盾，Energy Full 下為14%。Dark Tide Wave Assault 則吸取目標已有護盾的50%，強化後80%。前者要看隊友站位，後者要看敵方已有護盾，不能把後者視為保底的最大 HP 護盾。', section: 'skills'},
      {question: '治療數值能換算成每秒治療量嗎？', answer: 'Ripples of Floating Duckweed 列出施放者最大 HP 的12%，Energy Full 下對草系伊莫治療提高至24%，但來源持續時間只寫到「over 6」，缺少單位。因此持續時間保持未確認，不計算每秒治療；24%也受草系條件限制，不是所有隊友的預設收益。', section: 'skills'},
    ],
  },
  '008': {
    en: [
      { question: 'Does Take Off make flight a safe default?', answer: 'Take Off enters a Flying state to evade attacks from ground enemies, but the same description says incoming damage increases while airborne. Check which attacks the encounter actually uses before staying aloft. This is not evidence of invulnerability, unlimited flight or a route that can cross every gap.', section: 'mobility' },
      { question: 'Who receives the Band Member EP benefit?', answer: 'On an Aniimo switch in battle, Band Member restores 20 EP to the next Chirpi family member switched in, at most once every 20s. The family condition matters: it is not a 20 EP refund to any teammate or on every skill cast. Check the intended next member before planning around the switch.', section: 'traits' },
      { question: 'Leaf Tornado, Tornado or Water Tornado?', answer: 'All three descriptions pull enemies toward a vortex. Leaf Tornado adds a puddle-absorption condition for extra damage; Water Tornado deducts 4 Energy per hit from the target. The plain Tornado description does not list either extra effect. Choose the effect to inspect rather than treating listed Power as proof of a better option or assuming a puddle is always present.', section: 'skills' },
    ],
    'zh-Hans': [
      { question: 'Take Off 能让空中状态一直安全吗？', answer: 'Take Off 进入 Flying 状态以躲避地面敌人的攻击，但同一描述也说明滞空时承受伤害增加。持续留在空中前，先核对当前遭遇实际使用哪些攻击；这不能证明无敌、无限飞行或所有地形都能通过。', section: 'mobility' },
      { question: 'Band Member 的 EP 收益给谁？', answer: '战斗中切换伊莫时，Band Member 为下一个切入的 Chirpi 家族成员恢复20 EP，最多每20秒触发一次。关键是家族与切换条件，不是任意队友都返还20 EP，也不是每次施放技能都触发。规划切换前，先核对下一位成员。', section: 'traits' },
      { question: 'Leaf Tornado、Tornado 和 Water Tornado 怎么比较？', answer: '三者都描述把敌人拉向漩涡中心。Leaf Tornado 的额外伤害要求吸收附近水洼；Water Tornado 则每次命中扣除目标4 Energy，普通 Tornado 没有列出这两种附加效果。先选择需要核对的功能，不能只按 Power 判断优劣，也不能假设场上必有水洼。', section: 'skills' },
    ],
    'zh-Hant': [
      { question: 'Take Off 能讓空中狀態一直安全嗎？', answer: 'Take Off 進入 Flying 狀態以躲避地面敵人的攻擊，但同一描述也說明滯空時承受傷害增加。持續留在空中前，先核對目前遭遇實際使用哪些攻擊；這不能證明無敵、無限飛行或所有地形都能通過。', section: 'mobility' },
      { question: 'Band Member 的 EP 收益給誰？', answer: '戰鬥中切換伊莫時，Band Member 為下一個切入的 Chirpi 家族成員恢復20 EP，最多每20秒觸發一次。關鍵是家族與切換條件，不是任意隊友都返還20 EP，也不是每次施放技能都觸發。規劃切換前，先核對下一位成員。', section: 'traits' },
      { question: 'Leaf Tornado、Tornado 和 Water Tornado 怎麼比較？', answer: '三者都描述把敵人拉向漩渦中心。Leaf Tornado 的額外傷害要求吸收附近水窪；Water Tornado 則每次命中扣除目標4 Energy，普通 Tornado 沒有列出這兩種附加效果。先選擇需要核對的功能，不能只按 Power 判斷優劣，也不能假設場上必有水窪。', section: 'skills' },
    ],
  },
  '019': {
    en: [
      { question: 'When is Shrouded in Mist available?', answer: 'The trait enters Shrouded in Mist after 4 basic attacks; casting a skill consumes the state to enhance that skill. Check whether the state is active before the intended cast. The wording does not establish that every cast is enhanced, that the counter survives switching, or that a timed rotation is guaranteed.', section: 'traits' },
      { question: 'What changes for Cloud Shield under Mist?', answer: 'The ordinary shield lists absorption up to 15% max HP and 15% lower stamina consumption for 20s. Under Shrouded in Mist, the description instead lists 18% absorption and 18% lower stamina consumption for 30s. This changes a defensive window, not a permanent HP increase; the snapshot does not establish stacking or refresh rules.', section: 'skills' },
      { question: 'Is Cloudwalk the same as Tromber’s Take Off?', answer: 'Cloudwalk says it floats freely among clouds. Take Off separately names a Flying state and increased incoming damage while airborne. Do not transfer that combat-state tradeoff to Cloudwalk from the animation or family name. Inspect the actual mobility description for your task; no flight duration, stamina budget or verified terrain route is supplied here.', section: 'mobility' },
    ],
    'zh-Hans': [
      { question: '什么时候能使用 Shrouded in Mist？', answer: '特性在4次普攻后进入 Shrouded in Mist，施放技能会消耗该状态来强化该技能。准备使用目标技能前，应先确认状态已生效；描述不能证明每次技能都强化、切换后计数保留或固定时间循环必定成立。', section: 'traits' },
      { question: 'Cloud Shield 在雾中状态下有什么变化？', answer: '普通护盾列出最多吸收15%最大 HP 的伤害，并降低15%体力消耗，持续20秒；Shrouded in Mist 下改为18%吸收、降低18%体力消耗，持续30秒。这是防护窗口变化，不是永久增加 HP；快照没有确认叠加或刷新规则。', section: 'skills' },
      { question: 'Cloudwalk 与 Tromber 的 Take Off 相同吗？', answer: 'Cloudwalk 只描述在云层间自由漂浮；Take Off 则明确列出 Flying 状态和滞空承伤增加。不能因为动作或家族名称就把后者的战斗状态代价套到 Cloudwalk。应按实际移动说明判断任务；这里没有确认飞行时长、体力预算或可复现的地形路线。', section: 'mobility' },
    ],
    'zh-Hant': [
      { question: '什麼時候能使用 Shrouded in Mist？', answer: '特性在4次普攻後進入 Shrouded in Mist，施放技能會消耗該狀態來強化該技能。準備使用目標技能前，應先確認狀態已生效；描述不能證明每次技能都強化、切換後計數保留或固定時間循環必定成立。', section: 'traits' },
      { question: 'Cloud Shield 在霧中狀態下有什麼變化？', answer: '普通護盾列出最多吸收15%最大 HP 的傷害，並降低15%體力消耗，持續20秒；Shrouded in Mist 下改為18%吸收、降低18%體力消耗，持續30秒。這是防護窗口變化，不是永久增加 HP；快照沒有確認疊加或刷新規則。', section: 'skills' },
      { question: 'Cloudwalk 與 Tromber 的 Take Off 相同嗎？', answer: 'Cloudwalk 只描述在雲層間自由漂浮；Take Off 則明確列出 Flying 狀態和滯空承傷增加。不能因為動作或家族名稱就把後者的戰鬥狀態代價套到 Cloudwalk。應按實際移動說明判斷任務；這裡沒有確認飛行時長、體力預算或可重現的地形路線。', section: 'mobility' },
    ],
  },
  '020': {
    en: [
      { question: 'Why are Nightmare duration and control duration different?', answer: 'Counting Sheep lets the next skill apply 1 Drowsiness stack every 10s; 3 stacks cause Nightmare for 20s. The same trait lists only 3s of movement/skill control and says damage removes the control effect. A 20s Nightmare label therefore does not establish a 20s stun, nor prove how other debuffs behave after the control breaks.', section: 'traits' },
      { question: 'What should I inspect before Nightmare Devourer?', answer: 'The skill first restores 5% HP to this Aniimo and nearby allies, then absorbs nearby Nightmare statuses. Each absorbed status increases healing by 2%, up to 3 stacks. Check whether suitable nearby statuses exist rather than treating the maximum as the default. A Support label alone would not establish this healing effect; the individual skill text does.', section: 'skills' },
      { question: 'Can I inherit Turbo’s mobility or location from the family?', answer: 'The Nimbi tree places Dreaple and Turbo on separate branches. Turbo lists Cloudwalk and Nimbus Fields; Dreaple lists neither mobility nor a habitat in this snapshot. The shared family confirms a relationship, not the same ability or a confirmed Dreaple spawn. Use the current official entry before committing to a location search.', section: 'evolution' },
    ],
    'zh-Hans': [
      { question: '为什么 Nightmare 持续时间不等于控制时间？', answer: 'Counting Sheep 每10秒让下一个技能施加1层 Drowsiness，3层触发持续20秒的 Nightmare。同一特性只列出3秒的移动与施技控制，并说明受到伤害会解除控制。因此20秒 Nightmare 不等于20秒眩晕，也不能由此确认控制解除后其他减益的行为。', section: 'traits' },
      { question: '使用 Nightmare Devourer 前该核对什么？', answer: '技能先为自身与附近队友恢复5% HP，再吸收附近的 Nightmare；每吸收一个状态提高2%治疗，最多3层。应先确认附近是否有符合条件的状态，不把上限当作默认治疗量。Support 标签本身不能证明治疗能力，具体技能描述才提供这项依据。', section: 'skills' },
      { question: '能从同家族推断 Turbo 的移动能力或地点吗？', answer: 'Nimbi 进化树把 Dreaple 与 Turbo 列为不同分支。Turbo 记载 Cloudwalk 与 Nimbus Fields，Dreaple 在此快照却没有移动能力或栖息地字段。共享家族只能确认关系，不能确认同能力或 Dreaple 出现点；投入地点搜索前先核对当前官方条目。', section: 'evolution' },
    ],
    'zh-Hant': [
      { question: '為什麼 Nightmare 持續時間不等於控制時間？', answer: 'Counting Sheep 每10秒讓下一個技能施加1層 Drowsiness，3層觸發持續20秒的 Nightmare。同一特性只列出3秒的移動與施技控制，並說明受到傷害會解除控制。因此20秒 Nightmare 不等於20秒暈眩，也不能由此確認控制解除後其他減益的行為。', section: 'traits' },
      { question: '使用 Nightmare Devourer 前該核對什麼？', answer: '技能先為自身與附近隊友恢復5% HP，再吸收附近的 Nightmare；每吸收一個狀態提高2%治療，最多3層。應先確認附近是否有符合條件的狀態，不把上限當作預設治療量。Support 標籤本身不能證明治療能力，具體技能描述才提供這項依據。', section: 'skills' },
      { question: '能從同家族推斷 Turbo 的移動能力或地點嗎？', answer: 'Nimbi 進化樹把 Dreaple 與 Turbo 列為不同分支。Turbo 記載 Cloudwalk 與 Nimbus Fields，Dreaple 在此快照卻沒有移動能力或棲息地欄位。共享家族只能確認關係，不能確認同能力或 Dreaple 出現點；投入地點搜尋前先核對目前官方條目。', section: 'evolution' },
    ],
  },
  '001': {
    en: [
      { question: 'Fire Kick or Pebble Kick: what changes after a dodge?', answer: 'Both descriptions condition their extra effect on successfully dodging an attack. Fire Kick lists a 20% damage increase for 20s; Pebble Kick instead applies Lockdown for 8s. Choose which effect you need to inspect, then confirm the dodge trigger in your client. Their listed Power values alone do not establish a better damage option.', section: 'skills' },
      { question: 'How is this different from Inferlupa?', answer: 'Emberpup ties Scorching Flames to elementally countered targets; Inferlupa ties Full Energy to 8 basic attacks before an enhanced skill. This is a matchup condition versus an attack-count condition, not a higher/lower strength ranking. The family tree connects them through Flameruff but does not supply evolution requirements.', section: 'traits' },
      { question: 'Does Hustle replace a traversal ability?', answer: 'Hustle increases movement speed by spending stamina. Its description does not establish gliding, swimming or unlimited sprinting. For a route requiring a specific traversal action, use the ability directory to find a record explicitly documenting that action rather than choosing on movement speed alone.', section: 'mobility' },
    ],
    'zh-Hans': [
      { question: 'Fire Kick 和 Pebble Kick：闪避后该看什么差异？', answer: '两段描述都把额外效果绑定到成功闪避攻击。Fire Kick 列出持续20秒的20%伤害提升，Pebble Kick 则施加8秒 Lockdown。先决定要核对哪种效果，再在客户端确认闪避触发；不能仅凭列出的 Power 数值判定哪个伤害更好。', section: 'skills' },
      { question: '它与 Inferlupa 的触发思路有什么不同？', answer: 'Emberpup 的 Scorching Flames 要求目标受到元素克制；Inferlupa 的 Full Energy 则要求先进行8次普攻再强化技能。这是对局条件与攻击计数条件的差异，不是强弱排名。进化树通过 Flameruff 连接两者，但没有给出进化所需条件。', section: 'traits' },
      { question: 'Hustle 能代替专项探索能力吗？', answer: 'Hustle 的说明是消耗体力提高移动速度，没有确认滑翔、游泳或无限冲刺。如果路线需要特定通行操作，应在能力目录寻找明确记载该操作的条目，而不是只按移动速度选择。', section: 'mobility' },
    ],
    'zh-Hant': [
      { question: 'Fire Kick 和 Pebble Kick：閃避後該看什麼差異？', answer: '兩段描述都把額外效果綁定到成功閃避攻擊。Fire Kick 列出持續20秒的20%傷害提升，Pebble Kick 則施加8秒 Lockdown。先決定要核對哪種效果，再於客戶端確認閃避觸發；不能僅憑列出的 Power 數值判定哪個傷害更好。', section: 'skills' },
      { question: '它與 Inferlupa 的觸發思路有何不同？', answer: 'Emberpup 的 Scorching Flames 要求目標受到元素剋制；Inferlupa 的 Full Energy 則要求先進行8次普攻再強化技能。這是對局條件與攻擊計數條件的差異，不是強弱排名。進化樹透過 Flameruff 連接兩者，但沒有給出進化所需條件。', section: 'traits' },
      { question: 'Hustle 能代替專項探索能力嗎？', answer: 'Hustle 的說明是消耗體力提高移動速度，沒有確認滑翔、游泳或無限衝刺。如果路線需要特定通行操作，應在能力目錄尋找明確記載該操作的條目，而不是只按移動速度選擇。', section: 'mobility' },
    ],
  },
  '004': {
    en: [
      { question: 'What should I check before spending Full Energy?', answer: 'The trait requires 8 basic attacks in battle and enhances the next skill, whose damage is treated as basic attack damage. The important check is whether Full Energy is active before that skill, not whether a skill has the largest listed Power. This snapshot does not establish counter persistence, reset behavior or a timed rotation.', section: 'traits' },
      { question: 'Which enhanced effect matches the task?', answer: 'Crossfire lists up to 9 hits and a 45% Might increase during Full Energy; Unbroken Flameruff Spirit changes from 5 to 7 ricochets and describes a stacking BREAK-efficiency effect. These answer different questions: repeated hits versus ricochets and BREAK support. Neither text proves that every hit lands or establishes DPS.', section: 'skills' },
      { question: 'Can the family tree tell me where to obtain it?', answer: 'The tree places Inferlupa and Scorchhowl on separate branches after Flameruff. It does not establish the item, level or quest for either branch. Inferlupa has no habitat listed in this snapshot, so do not reuse Emberpup locations as confirmed Inferlupa spawns.', section: 'evolution' },
    ],
    'zh-Hans': [
      { question: '消耗 Full Energy 前应该确认什么？', answer: '特性要求在战斗中进行8次普攻，随后强化下一个技能，并将该技能的伤害视作普攻伤害。关键是施放前是否已进入 Full Energy，而不是哪个技能列出的 Power 最大。当前快照没有确认计数保留、重置行为或按秒执行的循环。', section: 'traits' },
      { question: '哪种强化效果更符合当前任务？', answer: 'Crossfire 列出最多9段命中，并在 Full Energy 期间提升45% Might；Unbroken Flameruff Spirit 则从5次弹射变为7次，同时描述可叠加的 BREAK 效率效果。前者关注多段命中，后者关注弹射和 BREAK 辅助；两段说明都不能证明每段必定命中，也不能直接得出 DPS。', section: 'skills' },
      { question: '能从进化树推断获取地点吗？', answer: '进化树把 Inferlupa 与 Scorchhowl 列为 Flameruff 之后的不同分支，却没有给出分支所需道具、等级或任务。此快照没有列出 Inferlupa 的栖息地，不能把 Emberpup 的地点直接当作已确认的 Inferlupa 出现点。', section: 'evolution' },
    ],
    'zh-Hant': [
      { question: '消耗 Full Energy 前應該確認什麼？', answer: '特性要求在戰鬥中進行8次普攻，隨後強化下一個技能，並將該技能的傷害視作普攻傷害。關鍵是施放前是否已進入 Full Energy，而不是哪個技能列出的 Power 最大。目前快照沒有確認計數保留、重置行為或按秒執行的循環。', section: 'traits' },
      { question: '哪種強化效果更符合目前任務？', answer: 'Crossfire 列出最多9段命中，並在 Full Energy 期間提升45% Might；Unbroken Flameruff Spirit 則從5次彈射變為7次，同時描述可疊加的 BREAK 效率效果。前者關注多段命中，後者關注彈射和 BREAK 輔助；兩段說明都不能證明每段必定命中，也不能直接得出 DPS。', section: 'skills' },
      { question: '能從進化樹推斷取得地點嗎？', answer: '進化樹把 Inferlupa 與 Scorchhowl 列為 Flameruff 之後的不同分支，卻沒有給出分支所需道具、等級或任務。此快照沒有列出 Inferlupa 的棲息地，不能把 Emberpup 的地點直接當作已確認的 Inferlupa 出現點。', section: 'evolution' },
    ],
  },
  '005': {
    en: [
      { question: 'What is the useful window after a skill?', answer: 'Grand Sorcerer adds damage equal to 6 Might to basic attack hits for 5s after a skill. Inspect this as a skill-to-basic-attack window, not a permanent increase to the ATK attribute. The text does not establish how repeated skill uses stack or refresh it; confirm that behavior before planning a rotation.', section: 'traits' },
      { question: 'What must happen for Star Glide to improve EP recovery?', answer: 'The condition is hitting the same target 3 times, granting 10% increased EP recovery rate for 10s. Hitting three different targets is not the stated trigger, and recovery rate is not an immediate EP refund. Check repeated hits on one target rather than assuming every cast gives the recovery benefit.', section: 'skills' },
      { question: 'Does the word Glide confirm an exploration ability?', answer: 'Star Glide appears in the combat skill list. The mobility list is empty, so the combat animation does not establish an exploration glide. For crossing a gap, look for a documented mobility ability. Empty data is not proof that Celestis has no mobility in the live game.', section: 'mobility' },
    ],
    'zh-Hans': [
      { question: '施放技能后应关注哪个收益窗口？', answer: 'Grand Sorcerer 在使用技能后的5秒内，让普攻命中附加相当于6 Might 的伤害。应把它理解为技能后接普攻的时间窗口，而不是 ATK 属性永久增加。描述没有确认连续用技能时能否叠加或刷新，安排循环前需要在客户端核对。', section: 'traits' },
      { question: 'Star Glide 提升 EP 恢复需要什么条件？', answer: '条件是命中同一目标3次，随后 EP 恢复速率提高10%，持续10秒。命中三个不同目标不是文字记载的触发方式，恢复速率也不等于立即返还 EP。应确认同目标连续命中，而不是假设每次施放都有恢复收益。', section: 'skills' },
      { question: '技能名称里的 Glide 能证明探索滑翔吗？', answer: 'Star Glide 位于战斗技能列表，移动能力列表则为空，因此战斗动作不能证明具备探索滑翔。需要跨越地形时，应寻找有明确移动能力记载的候选；资料为空也不证明 Celestis 在当前游戏中完全没有移动能力。', section: 'mobility' },
    ],
    'zh-Hant': [
      { question: '施放技能後應關注哪個收益窗口？', answer: 'Grand Sorcerer 在使用技能後的5秒內，讓普攻命中附加相當於6 Might 的傷害。應把它理解為技能後接普攻的時間窗口，而不是 ATK 屬性永久增加。描述沒有確認連續用技能時能否疊加或刷新，安排循環前需要於客戶端核對。', section: 'traits' },
      { question: 'Star Glide 提升 EP 恢復需要什麼條件？', answer: '條件是命中同一目標3次，隨後 EP 恢復速率提高10%，持續10秒。命中三個不同目標不是文字記載的觸發方式，恢復速率也不等於立即返還 EP。應確認同目標連續命中，而不是假設每次施放都有恢復收益。', section: 'skills' },
      { question: '技能名稱裡的 Glide 能證明探索滑翔嗎？', answer: 'Star Glide 位於戰鬥技能列表，移動能力列表則為空，因此戰鬥動作不能證明具備探索滑翔。需要跨越地形時，應尋找有明確移動能力記載的候選；資料為空也不證明 Celestis 在目前遊戲中完全沒有移動能力。', section: 'mobility' },
    ],
  },
};
