export type SparklingGoal = '' | 'swap' | 'original' | 'reroll' | 'pod' | 'potential';
export type Confirmation = 'unknown' | 'yes' | 'no';
export type PodSpecies = 'unknown' | 'other' | 'Irisalis' | 'Helion' | 'Lunara';

export function sparklingDecision(goal: SparklingGoal, sparkling: Confirmation, hue: Confirmation, species: PodSpecies) {
  if (!goal) return 'choose';
  if (goal === 'potential') return 'potential';
  if (goal === 'pod' && ['Irisalis', 'Helion', 'Lunara'].includes(species)) return 'excluded';
  if (sparkling !== 'yes') return 'checkSparkling';
  if (goal === 'original') return 'original';
  if (goal === 'reroll') return 'reroll';
  if (goal === 'pod') return species === 'unknown' ? 'checkSpecies' : 'pod';
  return hue === 'yes' ? 'swap' : hue === 'no' ? 'locked' : 'checkHue';
}

// Result wording follows the October 27 announcement, re-read November 3.
export const sparklingDecisionCopy = {
  choose: [
    'Choose the result you want',
    '选择你需要的结果',
    '選擇你需要的結果',
  ],
  checkSparkling: [
    'Verify that the target is Sparkling',
    '先核对目标是否为 Sparkling',
    '先核對目標是否為 Sparkling',
  ],
  checkHue: [
    'Inspect Hue Swap on this exact individual',
    '先看这个体的 Hue Swap 已解锁列表',
    '先看這個體的 Hue Swap 已解鎖清單',
  ],
  locked: [
    'Hue Swap cannot select a hue still locked on this individual',
    '不能用 Hue Swap 选择这个体尚未解锁的色彩',
    '不能用 Hue Swap 選擇這個體尚未解鎖的色彩',
  ],
  swap: ['Use Hue Swap for the unlocked hue', '已解锁色彩对应 Hue Swap', '已解鎖色彩對應 Hue Swap'],
  original: ['Preview Sparkling Original', '查看 Sparkling Original 预览', '查看 Sparkling Original 預覽'],
  reroll: ['Pigment produces a random result', 'Pigment 对应随机结果', 'Pigment 對應隨機結果'],
  checkSpecies: ['Verify the species before replacing the pod', '换球前先确认物种', '換球前先確認物種'],
  excluded: ['The Legendary Aniipod replacement excludes this species', '传奇 Aniipod 替换不适用于这个物种', '傳說 Aniipod 替換不適用於這個物種'],
  pod: ['The announced action replaces the bound pod', '公告中的操作是替换绑定球', '公告中的操作是替換綁定球'],
  potential: ['Replacing a Legendary Aniipod does not change Acquired Potential', '替换传奇 Aniipod 不改变 Acquired Potential', '替換傳說 Aniipod 不改變 Acquired Potential'],
} as const;

export const sparklingDecisionDetail: Record<keyof typeof sparklingDecisionCopy, readonly [string, string, string]> = {
  choose: [
    'A hue, a pod effect and Acquired Potential are different outcomes. Confirm the exact individual before spending a resource.',
    '色彩、球的专属效果与 Acquired Potential 是不同目标。消耗资源前先确认准确个体。',
    '色彩、球的專屬效果與 Acquired Potential 是不同目標。消耗資源前先確認準確個體。',
  ],
  checkSparkling: [
    'This workflow uses the announcement’s Sparkling Hue and Sparkling-target rules. Check the current target and available controls first; it does not establish how to turn a non-Sparkling Aniimo into a Sparkling one.',
    '此核对依据公告的 Sparkling Hue 与 Sparkling 目标规则。先看当前个体及可用按钮；这里不能据此确认非 Sparkling 伊莫的转化方式。',
    '此核對依據公告的 Sparkling Hue 與 Sparkling 目標規則。先看目前個體及可用按鈕；這裡不能據此確認非 Sparkling 伊莫的轉化方式。',
  ],
  checkHue: [
    'An unlock on another individual is not an unlock here, even for the same species. Check the target preview before using either Credits or Pigment.',
    '另一只个体解锁过，不代表当前个体也解锁，即使同物种也一样。先看目标预览，再决定消耗 Credits 还是 Pigment。',
    '另一隻個體解鎖過，不代表目前個體也解鎖，即使同物種也一樣。先看目標預覽，再決定消耗 Credits 還是 Pigment。',
  ],
  locked: [
    'The notice does not establish a guaranteed way to select that locked hue. Pigment is random and may repeat an unlocked result; a different individual’s unlock is not shared.',
    '公告没有确认必得这个未解锁色彩的方法。Pigment 是随机结果，也可能重复已解锁色；其他个体的解锁不共享。',
    '公告沒有確認必得這個未解鎖色彩的方法。Pigment 是隨機結果，也可能重複已解鎖色；其他個體的解鎖不共享。',
  ],
  swap: [
    'The announcement assigns Credits to switching among this individual’s unlocked hues. A Pigment reroll is not needed to select an already unlocked hue. Verify the displayed Credit cost and preview before confirming.',
    '公告说明，切换这个体已解锁色彩消耗 Credits。选择已有色彩不需要再用 Pigment 随机重洗。确认前核对界面的 Credits 数量和预览。',
    '公告說明，切換這個體已解鎖色彩消耗 Credits。選擇已有色彩不需要再用 Pigment 隨機重洗。確認前核對介面的 Credits 數量和預覽。',
  ],
  original: [
    'The notice says any Sparkling Aniimo automatically obtains Sparkling Original: the initial color scheme with Sparkling effects. Inspect it before spending Pigment on a random alternative; no fixed switch price is published here.',
    '公告说明任意 Sparkling 伊莫自动获得 Sparkling Original，即带闪光效果的初始配色。为随机替代色消耗 Pigment 前先看此预览；这里没有公布固定切换价格。',
    '公告說明任意 Sparkling 伊莫自動獲得 Sparkling Original，即帶閃光效果的初始配色。為隨機替代色消耗 Pigment 前先看此預覽；這裡沒有公布固定切換價格。',
  ],
  reroll: [
    'A duplicate unlocked hue returns 2 Sparkling Sigil. That is not a Pigment refund or a guaranteed new hue. The announcement gives no hue distribution or guarantee counter, so no number of rolls or spending budget can be promised.',
    '重复已解锁色彩返还2枚 Sparkling Sigil，不是返还 Pigment，也不是保证下一次出新色。公告未给色彩分布或保底计数，不能承诺次数或预算。',
    '重複已解鎖色彩返還2枚 Sparkling Sigil，不是返還 Pigment，也不是保證下一次出新色。公告未給色彩分布或保底計數，不能承諾次數或預算。',
  ],
  checkSpecies: [
    'The announcement expressly excludes Irisalis, Helion and Lunara. Confirm the actual species, then check that the current client offers Use Legendary Aniipod for the exact target and item.',
    '公告明确排除 Irisalis、Helion、Lunara。先确认实际物种，再核对客户端是否对准确目标和道具提供 Use Legendary Aniipod。',
    '公告明確排除 Irisalis、Helion、Lunara。先確認實際物種，再核對用戶端是否對準確目標和道具提供 Use Legendary Aniipod。',
  ],
  excluded: [
    'Irisalis, Helion and Lunara are explicitly excluded from Use Legendary Aniipod. This restriction is about replacement, not a statement about every other way those Aniimo may be obtained.',
    'Irisalis、Helion、Lunara 被明确排除在 Use Legendary Aniipod 之外。这是替换功能的限制，不代表这些伊莫的其他获取途径也被排除。',
    'Irisalis、Helion、Lunara 被明確排除在 Use Legendary Aniipod 之外。這是替換功能的限制，不代表這些伊莫的其他取得途徑也被排除。',
  ],
  pod: [
    'Use Legendary Aniipod replaces the bound pod and grants its corresponding exclusive Sparkling effect. It does not change Acquired Potential. Check the current item and target confirmation; this is not proof that every pod can be applied to every other species.',
    'Use Legendary Aniipod 替换绑定球并赋予对应专属闪光效果，不改变 Acquired Potential。确认当前道具和目标；这不能证明任意球都适用于任意其他物种。',
    'Use Legendary Aniipod 替換綁定球並賦予對應專屬閃光效果，不改變 Acquired Potential。確認目前道具和目標；這不能證明任意球都適用於任意其他物種。',
  ],
  potential: [
    'Do not choose Legendary Aniipod replacement to improve this field: the announcement explicitly says it stays unchanged. The adjusted Prismana Orb also retains Acquired Potential, Mutation and Personality. Neither rule supplies a guaranteed perfect-Potential recipe.',
    '如果目标是提升这一字段，不应选择传奇球替换：公告明确说它保持不变。调整后的 Prismana Orb 也保留 Acquired Potential、Mutation、Personality。两条规则都不是满潜配方。',
    '如果目標是提升這一欄位，不應選擇傳說球替換：公告明確說它保持不變。調整後的 Prismana Orb 也保留 Acquired Potential、Mutation、Personality。兩條規則都不是滿潛配方。',
  ],
};
