// ============================================================================
// Aniimo 种子数据（编号 001-020）
// 基于 CBT3 已知信息构建，未确认字段以 placeholder / '待确认' 标注。
// ============================================================================

import type {
  AniimoEntry,
  BaseStats,
  Element,
  Personality,
  PersonalityBonus,
  Role,
  TwineAbility,
} from '@/types/aniimo';

// ---------------------------------------------------------------------------
// 小工具：减少重复样板
// ---------------------------------------------------------------------------

/** 默认性格加成占位（所有性格暂时指向同一占位，数值待定） */
function defaultPersonality(stat: PersonalityBonus['stat'], multiplier = 1.0) {
  const base: Record<Personality, PersonalityBonus> = {
    Analyst: { stat, multiplier, note: '占位' },
    Diplomat: { stat, multiplier, note: '占位' },
    Sentinel: { stat, multiplier, note: '占位' },
    Explorer: { stat, multiplier, note: '占位' },
    Sage: { stat, multiplier, note: '占位' },
    Trickster: { stat, multiplier, note: '占位' },
  };
  return base;
}

type EntrySeed = Omit<AniimoEntry, 'personality' | 'flavorText' | 'shiny'> & {
  personalityStat?: PersonalityBonus['stat'];
  /** 英文图鉴简介（未提供时降级用 description） */
  flavorText?: string;
  /** 是否拥有闪亮形态（默认无） */
  shiny?: boolean;
};

/** 便捷构造器：personality 用同一占位，其余字段原样传递 */
function entry(seed: EntrySeed): AniimoEntry {
  const { personalityStat = 'atk', ...rest } = seed;
  return {
    ...rest,
    flavorText: seed.flavorText ?? seed.description,
    shiny: seed.shiny ?? false,
    personality: defaultPersonality(personalityStat),
  };
}

// ---------------------------------------------------------------------------
// 常量（减少魔法值重复）
// ---------------------------------------------------------------------------

const ELEMENTS = {
  Light: 'Light' as const,
  Fire: 'Fire' as const,
  Ice: 'Ice' as const,
  Dark: 'Dark' as const,
  Lightning: 'Lightning' as const,
  Grass: 'Grass' as const,
  Water: 'Water' as const,
  Earth: 'Earth' as const,
  Wind: 'Wind' as const,
};

const ROLES = {
  DPS: 'DPS' as const,
  Heal: 'Heal' as const,
  Support: 'Support' as const,
  Break: 'Break' as const,
  Regen: 'Regen' as const,
};

const TWINE = {
  Fly: '飞行' as const,
  Swim: '游泳' as const,
  Dig: '遁地' as const,
  Climb: '攀岩' as const,
  Ram: '冲撞' as const,
  None: '无' as const,
};

/** 便捷基础属性 */
const S = (hp: number, atk: number, def: number, spd: number, extra: Partial<BaseStats> = {}) => ({
  hp,
  atk,
  def,
  spd,
  ...extra,
});

// ---------------------------------------------------------------------------
// 种子数据（编号 001-020）
// ---------------------------------------------------------------------------

const aniimos: AniimoEntry[] = [
  // ---- 001-010：新手村 / 常见栖息地 ----
  entry({
    number: '001',
    name: '燃雀',
    enName: 'Emberling',
    description: '栖息在火山脚平原的小型伊莫，尾羽会随着情绪升温而发亮。',
    flavorText: 'A lively little Emberling that roams the volcano foothills; its tail plume glows brighter the more excited it gets.',
    shiny: false,
    element: ELEMENTS.Fire,
    role: ROLES.DPS,
    twineAbility: TWINE.None,
    stats: S(45, 55, 40, 60),
    potential: { Common: 70, Good: 25, Elite: 4, Perfect: 1 },
    evolution: {
      startStage: 'Lumin',
      branches: [
        {
          target: '002',
          stage: 'Gamma',
          prerequisites: [{ level: 18 }],
          note: 'CBT3 确认',
        },
      ],
    },
    spawn: {
      habitats: [{ region: '火山平原', detail: '草地与岩石交界处' }],
      weather: '晴',
      time: '昼',
    },
    forms: [{ name: '普通', element: ELEMENTS.Fire, role: ROLES.DPS, stats: S(45, 55, 40, 60), twineAbility: TWINE.None }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '002',
    name: '燃翼',
    enName: 'Pyreagle',
    description: '燃雀进化体，双翼燃起赤红火焰，可短暂滑翔。',
    flavorText: 'The evolved Pyreagle carries crimson flames on its wings and can glide on rising thermals over the plains.',
    shiny: true,
    element: ELEMENTS.Fire,
    role: ROLES.DPS,
    twineAbility: TWINE.Fly,
    stats: S(65, 82, 55, 85),
    potential: { Common: 50, Good: 35, Elite: 12, Perfect: 3 },
    evolution: {
      startStage: 'Gamma',
      branches: [
        {
          target: '003',
          stage: 'Nova',
          prerequisites: [{ level: 36 }, { item: '火焰之羽（占位）' }],
          note: '最终进化条件待确认',
        },
      ],
    },
    spawn: {
      habitats: [{ region: '火山峭壁' }],
      weather: '晴转多云',
      time: '昼',
    },
    forms: [{ name: '普通', element: ELEMENTS.Fire, role: ROLES.DPS, stats: S(65, 82, 55, 85), twineAbility: TWINE.Fly }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '003',
    name: '炽凰',
    enName: 'Inferna',
    description: '传说中的火焰之王，双翼展开可遮蔽天空。',
    flavorText: 'The legendary fire sovereign; its outstretched wings are said to veil the entire sky in living flame.',
    shiny: true,
    element: ELEMENTS.Fire,
    role: ROLES.DPS,
    twineAbility: TWINE.Fly,
    stats: S(85, 110, 75, 100),
    potential: { Common: 30, Good: 40, Elite: 22, Perfect: 8 },
    evolution: {
      startStage: 'Nova',
      branches: [],
    },
    spawn: {
      habitats: [{ region: '熔岩核心' }],
      weather: '雷暴',
      time: '夜',
      phenomenon: { name: '火山喷发', description: '喷发时才有极低概率出现' },
    },
    forms: [{ name: '普通', element: ELEMENTS.Fire, role: ROLES.DPS, stats: S(85, 110, 75, 100), twineAbility: TWINE.Fly }],
    dataSource: 'placeholder',
    note: '最终形态数值为占位，待 CBT3 进一步确认',
  }),
  entry({
    number: '004',
    name: '水兔',
    enName: 'Aquabun',
    description: '河边的活泼伊莫，耳朵能感知水流方向。',
    flavorText: 'A cheerful river dweller whose long ears sense the flow and direction of the water around it.',
    shiny: false,
    element: ELEMENTS.Water,
    role: ROLES.Support,
    twineAbility: TWINE.Swim,
    stats: S(50, 40, 50, 55),
    potential: { Common: 65, Good: 28, Elite: 6, Perfect: 1 },
    evolution: {
      startStage: 'Lumin',
      branches: [{ target: '005', stage: 'Gamma', prerequisites: [{ level: 16 }], note: 'CBT3 确认' }],
    },
    spawn: {
      habitats: [{ region: '溪流平原', detail: '淡水河岸' }],
      weather: '雨',
      time: '全天',
    },
    forms: [{ name: '普通', element: ELEMENTS.Water, role: ROLES.Support, stats: S(50, 40, 50, 55), twineAbility: TWINE.Swim }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '005',
    name: '涛鹿',
    enName: 'Tidefawn',
    description: '水兔进化体，能操控水流形成护盾。',
    flavorText: 'The evolved Tidefawn commands flowing water to weave shields for its pack along the lakeshore.',
    shiny: true,
    element: ELEMENTS.Water,
    role: ROLES.Support,
    twineAbility: TWINE.Swim,
    stats: S(70, 55, 75, 70),
    potential: { Common: 45, Good: 38, Elite: 14, Perfect: 3 },
    evolution: {
      startStage: 'Gamma',
      branches: [{ target: '006', stage: 'Nova', prerequisites: [{ level: 32 }, { weather: '雨' }], note: '雨天进化待确认' }],
    },
    spawn: {
      habitats: [{ region: '大湖泊' }],
      weather: '雨',
      time: '全天',
    },
    forms: [{ name: '普通', element: ELEMENTS.Water, role: ROLES.Support, stats: S(70, 55, 75, 70), twineAbility: TWINE.Swim }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '006',
    name: '沧渊鲸',
    enName: 'Abysswhale',
    description: '深海的守护者，体型庞大而温和。',
    flavorText: 'A gentle guardian of the deep abyss, so vast and mild that small Aniimo nest in its wake.',
    shiny: true,
    element: ELEMENTS.Water,
    role: ROLES.Heal,
    twineAbility: TWINE.Swim,
    stats: S(120, 70, 90, 45),
    potential: { Common: 25, Good: 40, Elite: 25, Perfect: 10 },
    evolution: {
      startStage: 'Nova',
      branches: [],
    },
    spawn: {
      habitats: [{ region: '深海渊谷' }],
      weather: '大雾',
      time: '夜',
      phenomenon: { name: '月相盈满', description: '满月之夜概率提升' },
    },
    forms: [{ name: '普通', element: ELEMENTS.Water, role: ROLES.Heal, stats: S(120, 70, 90, 45), twineAbility: TWINE.Swim }],
    dataSource: 'placeholder',
    note: '高 HP 治愈定位，具体技能数值占位',
  }),
  entry({
    number: '007',
    name: '芽龙',
    enName: 'Sproutling',
    description: '森林中的幼小伊莫，背芽会吸收晨露。',
    flavorText: 'A tiny forest sprite whose back-bud drinks in the morning dew, unfurling as the day warms.',
    shiny: false,
    element: ELEMENTS.Grass,
    role: ROLES.Regen,
    twineAbility: TWINE.Climb,
    stats: S(55, 45, 55, 40),
    potential: { Common: 68, Good: 26, Elite: 5, Perfect: 1 },
    evolution: {
      startStage: 'Lumin',
      branches: [{ target: '008', stage: 'Gamma', prerequisites: [{ level: 17 }], note: 'CBT3 确认' }],
    },
    spawn: {
      habitats: [{ region: '晨曦森林' }],
      weather: '晴',
      time: '黎明',
    },
    forms: [{ name: '普通', element: ELEMENTS.Grass, role: ROLES.Regen, stats: S(55, 45, 55, 40), twineAbility: TWINE.Climb }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '008',
    name: '藤林猿',
    enName: 'Vineape',
    description: '芽龙进化体，藤蔓手臂可抓取远距离目标。',
    flavorText: 'The evolved Vineape swings vine-laced arms to snatch distant prey and leap between treetops.',
    shiny: true,
    element: ELEMENTS.Grass,
    role: ROLES.Regen,
    twineAbility: TWINE.Climb,
    stats: S(75, 70, 70, 65),
    potential: { Common: 45, Good: 37, Elite: 15, Perfect: 3 },
    evolution: {
      startStage: 'Gamma',
      branches: [{ target: '009', stage: 'Nova', prerequisites: [{ level: 34 }, { item: '生命藤种（占位）' }], note: '待确认' }],
    },
    spawn: {
      habitats: [{ region: '古木丛林' }],
      weather: '晴转多云',
      time: '昼',
    },
    forms: [{ name: '普通', element: ELEMENTS.Grass, role: ROLES.Regen, stats: S(75, 70, 70, 65), twineAbility: TWINE.Climb }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '009',
    name: '古树王',
    enName: 'Arborux',
    description: '千年古树化身的伊莫，能滋养整片森林。',
    flavorText: 'An ancient tree given life; with every breath it nourishes the whole forest around it.',
    shiny: true,
    element: ELEMENTS.Grass,
    role: ROLES.Heal,
    twineAbility: TWINE.Climb,
    stats: S(110, 60, 100, 40),
    potential: { Common: 20, Good: 42, Elite: 28, Perfect: 10 },
    evolution: {
      startStage: 'Nova',
      branches: [],
    },
    spawn: {
      habitats: [{ region: '圣木之心' }],
      weather: '大雾',
      time: '黎明',
    },
    forms: [{ name: '普通', element: ELEMENTS.Grass, role: ROLES.Heal, stats: S(110, 60, 100, 40), twineAbility: TWINE.Climb }],
    dataSource: 'placeholder',
  }),
  entry({
    number: '010',
    name: '石甲兽',
    enName: 'Stonetusk',
    description: '山地常见的坚实伊莫，以岩石为食。',
    flavorText: 'A sturdy highland commoner that grazes on stone and shrugs off the mountain winds.',
    shiny: false,
    element: ELEMENTS.Earth,
    role: ROLES.Break,
    twineAbility: TWINE.Dig,
    stats: S(70, 60, 90, 35),
    potential: { Common: 60, Good: 32, Elite: 7, Perfect: 1 },
    evolution: {
      startStage: 'Lumin',
      branches: [{ target: '011', stage: 'Gamma', prerequisites: [{ level: 19 }], note: 'CBT3 确认' }],
    },
    spawn: {
      habitats: [{ region: '磐岩山脉' }],
      weather: '晴',
      time: '昼',
    },
    forms: [{ name: '普通', element: ELEMENTS.Earth, role: ROLES.Break, stats: S(70, 60, 90, 35), twineAbility: TWINE.Dig }],
    dataSource: 'confirmed',
  }),
  // ---- 011-020：进阶 / 特殊栖息地 ----
  entry({
    number: '011',
    name: '岩岳犀',
    enName: 'Mountainhorn',
    description: '石甲兽进化体，冲锋时能撞碎巨石。',
    flavorText: 'The evolved Mountainhorn shatters boulders with a single charge and rumbles across ridgelines.',
    shiny: true,
    element: ELEMENTS.Earth,
    role: ROLES.Break,
    twineAbility: TWINE.Ram,
    stats: S(95, 85, 120, 40),
    potential: { Common: 40, Good: 38, Elite: 18, Perfect: 4 },
    evolution: {
      startStage: 'Gamma',
      branches: [{ target: '012', stage: 'Nova', prerequisites: [{ level: 38 }, { weather: '雷暴' }], note: '待确认' }],
    },
    spawn: {
      habitats: [{ region: '岩巅' }],
      weather: '雷暴',
      time: '夜',
    },
    forms: [{ name: '普通', element: ELEMENTS.Earth, role: ROLES.Break, stats: S(95, 85, 120, 40), twineAbility: TWINE.Ram }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '012',
    name: '大地之王',
    enName: 'Terratyrant',
    description: '撼动大地的传说伊莫，跺脚即引发地震。',
    flavorText: 'A titan that shakes the very earth; one stomp of its foot is enough to trigger a tremor.',
    shiny: true,
    element: ELEMENTS.Earth,
    role: ROLES.Break,
    twineAbility: TWINE.Ram,
    stats: S(130, 100, 140, 30),
    potential: { Common: 15, Good: 40, Elite: 32, Perfect: 13 },
    evolution: {
      startStage: 'Nova',
      branches: [],
    },
    spawn: {
      habitats: [{ region: '地心裂谷' }],
      weather: '夜晚',
      time: '夜',
      phenomenon: { name: '大地震', description: '地震时低概率出现' },
    },
    forms: [{ name: '普通', element: ELEMENTS.Earth, role: ROLES.Break, stats: S(130, 100, 140, 30), twineAbility: TWINE.Ram }],
    dataSource: 'placeholder',
  }),
  entry({
    number: '013',
    name: '云雀',
    enName: 'Cloudlark',
    description: '轻盈的空中伊莫，在云端筑巢。',
    flavorText: 'A featherlight skydweller that nests among the clouds and rides high air currents.',
    shiny: false,
    element: ELEMENTS.Wind,
    role: ROLES.DPS,
    twineAbility: TWINE.Fly,
    stats: S(40, 50, 35, 85),
    potential: { Common: 62, Good: 30, Elite: 7, Perfect: 1 },
    evolution: {
      startStage: 'Lumin',
      branches: [{ target: '014', stage: 'Gamma', prerequisites: [{ level: 15 }], note: 'CBT3 确认' }],
    },
    spawn: {
      habitats: [{ region: '苍穹高原', detail: '高空气流带' }],
      weather: '晴',
      time: '昼',
    },
    forms: [{ name: '普通', element: ELEMENTS.Wind, role: ROLES.DPS, stats: S(40, 50, 35, 85), twineAbility: TWINE.Fly }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '014',
    name: '疾风隼',
    enName: 'Galehawk',
    description: '云雀进化体，速度极快，可制造风暴。',
    flavorText: 'The evolved Galehawk is blindingly fast and can whip up a storm with a single dive.',
    shiny: true,
    element: ELEMENTS.Wind,
    role: ROLES.DPS,
    twineAbility: TWINE.Fly,
    stats: S(60, 75, 50, 120),
    potential: { Common: 42, Good: 38, Elite: 16, Perfect: 4 },
    evolution: {
      startStage: 'Gamma',
      branches: [{ target: '015', stage: 'Nova', prerequisites: [{ level: 35 }], note: '待确认' }],
    },
    spawn: {
      habitats: [{ region: '风暴之巅' }],
      weather: '雷暴',
      time: '昼',
    },
    forms: [{ name: '普通', element: ELEMENTS.Wind, role: ROLES.DPS, stats: S(60, 75, 50, 120), twineAbility: TWINE.Fly }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '015',
    name: '暴风龙',
    enName: 'Tornadrax',
    description: '能掀起台风的传说伊莫。',
    flavorText: 'A legendary Aniimo that can summon a typhoon, its wings stirring storms across the horizon.',
    shiny: true,
    element: ELEMENTS.Wind,
    role: ROLES.DPS,
    twineAbility: TWINE.Fly,
    stats: S(80, 100, 70, 140),
    potential: { Common: 20, Good: 42, Elite: 28, Perfect: 10 },
    evolution: {
      startStage: 'Nova',
      branches: [],
    },
    spawn: {
      habitats: [{ region: '风暴眼' }],
      weather: '雷暴',
      time: '黄昏',
    },
    forms: [{ name: '普通', element: ELEMENTS.Wind, role: ROLES.DPS, stats: S(80, 100, 70, 140), twineAbility: TWINE.Fly }],
    dataSource: 'placeholder',
  }),
  entry({
    number: '016',
    name: '雷喵',
    enName: 'Voltcat',
    description: '带着静电的活泼伊莫，雨天时毛发光亮。',
    flavorText: 'A playful Aniimo crackling with static, its coat shining bright in the rain.',
    shiny: false,
    element: ELEMENTS.Lightning,
    role: ROLES.DPS,
    twineAbility: TWINE.Ram,
    stats: S(48, 58, 42, 78),
    potential: { Common: 60, Good: 32, Elite: 7, Perfect: 1 },
    evolution: {
      startStage: 'Lumin',
      branches: [{ target: '017', stage: 'Gamma', prerequisites: [{ level: 20 }, { weather: '雷暴' }], note: '雷雨天进化待确认' }],
    },
    spawn: {
      habitats: [{ region: '雷鸣山丘' }],
      weather: '雷暴',
      time: '夜',
    },
    forms: [{ name: '普通', element: ELEMENTS.Lightning, role: ROLES.DPS, stats: S(48, 58, 42, 78), twineAbility: TWINE.Ram }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '017',
    name: '雷豹',
    enName: 'Thundrpard',
    description: '雷喵进化体，奔袭时身披电光。',
    flavorText: 'The evolved Thundrpard dashes cloaked in lightning, leaving sparks in its trail.',
    shiny: true,
    element: ELEMENTS.Lightning,
    role: ROLES.DPS,
    twineAbility: TWINE.Ram,
    stats: S(70, 88, 60, 110),
    potential: { Common: 40, Good: 38, Elite: 18, Perfect: 4 },
    evolution: {
      startStage: 'Gamma',
      branches: [{ target: '018', stage: 'Nova', prerequisites: [{ level: 40 }, { item: '雷核（占位）' }], note: '待确认' }],
    },
    spawn: {
      habitats: [{ region: '雷云峡谷' }],
      weather: '雷暴',
      time: '夜',
    },
    forms: [{ name: '普通', element: ELEMENTS.Lightning, role: ROLES.DPS, stats: S(70, 88, 60, 110), twineAbility: TWINE.Ram }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '018',
    name: '雷帝',
    enName: 'Stormlord',
    description: '执掌雷电的神明级伊莫。',
    flavorText: 'A godlike Aniimo that commands thunder itself, calling down storms at a whim.',
    shiny: true,
    element: ELEMENTS.Lightning,
    role: ROLES.DPS,
    twineAbility: TWINE.Fly,
    stats: S(90, 115, 80, 130),
    potential: { Common: 15, Good: 40, Elite: 32, Perfect: 13 },
    evolution: {
      startStage: 'Nova',
      branches: [],
    },
    spawn: {
      habitats: [{ region: '雷霆神殿' }],
      weather: '雷暴',
      time: '夜',
      phenomenon: { name: '落雷', description: '连续落雷时有极低概率现身' },
    },
    forms: [{ name: '普通', element: ELEMENTS.Lightning, role: ROLES.DPS, stats: S(90, 115, 80, 130), twineAbility: TWINE.Fly }],
    dataSource: 'placeholder',
  }),
  entry({
    number: '019',
    name: '寒貂',
    enName: 'Glaceweasel',
    description: '冰雪之地的迅捷伊莫，吐息能冻结水汽。',
    flavorText: 'A swift Aniimo of the frozen wilds whose breath freezes mist into glittering crystals.',
    shiny: false,
    element: ELEMENTS.Ice,
    role: ROLES.Support,
    twineAbility: TWINE.Climb,
    stats: S(55, 52, 55, 80),
    potential: { Common: 58, Good: 33, Elite: 8, Perfect: 1 },
    evolution: {
      startStage: 'Lumin',
      branches: [{ target: '020', stage: 'Gamma', prerequisites: [{ level: 22 }, { weather: '雪' }], note: '雪天进化待确认' }],
    },
    spawn: {
      habitats: [{ region: '霜冻冰原' }],
      weather: '雪',
      time: '昼',
    },
    forms: [{ name: '普通', element: ELEMENTS.Ice, role: ROLES.Support, stats: S(55, 52, 55, 80), twineAbility: TWINE.Climb }],
    dataSource: 'confirmed',
  }),
  entry({
    number: '020',
    name: '冰原狼',
    enName: 'Frostfang',
    description: '寒貂进化体，冰爪锋利，可破冰而行。',
    flavorText: 'The evolved Frostfang cuts through solid ice with razor claws and prowls the eternal snows.',
    shiny: true,
    element: ELEMENTS.Ice,
    role: ROLES.Break,
    twineAbility: TWINE.Dig,
    stats: S(80, 78, 72, 100),
    potential: { Common: 40, Good: 38, Elite: 18, Perfect: 4 },
    evolution: {
      startStage: 'Gamma',
      branches: [],
    },
    spawn: {
      habitats: [{ region: '永冻雪岭' }],
      weather: '雪',
      time: '夜',
    },
    forms: [{ name: '普通', element: ELEMENTS.Ice, role: ROLES.Break, stats: S(80, 78, 72, 100), twineAbility: TWINE.Dig }],
    dataSource: 'confirmed',
  }),
];

export default aniimos;
