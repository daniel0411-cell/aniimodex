// Curated interpretations of the October 23 Basic Form snapshot, not gameplay tests.
type ReadingNote = { question: string; answer: string; section: 'skills' | 'traits' | 'evolution' | 'mobility' };
export const dexReadingNotes: Record<string, Record<string, ReadingNote[]>> = {
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
