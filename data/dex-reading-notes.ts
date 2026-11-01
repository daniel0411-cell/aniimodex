// Curated interpretations of the October 23 Basic Form snapshot, not gameplay tests.
type ReadingNote = { question: string; answer: string; section: 'skills' | 'traits' | 'evolution' | 'mobility' };
export const dexReadingNotes: Record<string, Record<string, ReadingNote[]>> = {
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
