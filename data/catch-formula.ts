// ============================================================================
// Aniimo 官方捕获率公式与系数
// ----------------------------------------------------------------------------
// 来源：官方《機率公示》页面
//   URL        https://www.aniimo.com/zh-tw/formula-multipliers
//   抓取日期   2026-09-18
//   登记来源   data/sources.ts → 'aniimo-official-probabilities-2026-09-16'
//
// 本文件中的每一个数值都来自上述官方页面，逐项核对过两次抓取结果。
// 严禁在此文件里加入任何估算值、推测值或来自其他游戏的公式。
//
// 【必须如实说明的两点】
// 1. 官方原文：「具體使用係數由伊莫模板指定，不根據等級推算」。
//    即每种伊莫的模板基础率并未公开，因此本站只能按「区域阶段 × 进化阶段」
//    给出区间估算，不能声称是某个物种的确切捕获率。
// 2. 官方原文对等级差的描述为「不高於10級／高於11級／高於12級…」。
//    本文件按「等级差 ≥ 11 取 0.8、≥ 12 取 0.6 …」实现，
//    这是与该表 6 行区间唯一自洽的读法；原文措辞已保留在注释中以便追溯。
// ============================================================================

export const CATCH_FORMULA_SOURCE = {
  url: 'https://www.aniimo.com/zh-tw/formula-multipliers',
  title: 'Aniimo Official Probability Disclosure',
  accessedAt: '2026-09-18',
} as const;

/** 三个计算场景 */
export type CatchScenario = 'field' | 'battle' | 'defeated';

export const CATCH_SCENARIOS: CatchScenario[] = ['field', 'battle', 'defeated'];

/** 区域阶段 */
export type RegionId = 'standard' | 'earlyMid' | 'mid' | 'midLate' | 'late' | 'tower';

/**
 * 基础机率（机率组配置）＝ 区域阶段 × 进化阶段。
 * 官方原表为百分比；此处以 0–1 的小数存放。
 */
export const REGION_RATES: { id: RegionId; rates: [number, number, number] }[] = [
  { id: 'standard', rates: [0.56, 0.42, 0.28] },
  { id: 'earlyMid', rates: [0.5, 0.38, 0.25] },
  { id: 'mid', rates: [0.44, 0.33, 0.22] },
  { id: 'midLate', rates: [0.38, 0.29, 0.19] },
  { id: 'late', rates: [0.32, 0.24, 0.16] },
  { id: 'tower', rates: [0.4, 0.3, 0.18] },
];

/** 进化阶段（官方 1 阶 / 2 阶 / 3 阶） */
export type TargetStage = 1 | 2 | 3;

export const TARGET_STAGES: TargetStage[] = [1, 2, 3];

/**
 * 等级系数。等级差 = 伊莫等级 − 人物等级。
 * 人物等级高于伊莫时没有额外加成（系数固定为 1）。
 */
export const LEVEL_COEFFICIENTS: { minDiff: number; coefficient: number }[] = [
  { minDiff: 15, coefficient: 0.1 },
  { minDiff: 14, coefficient: 0.2 },
  { minDiff: 13, coefficient: 0.4 },
  { minDiff: 12, coefficient: 0.6 },
  { minDiff: 11, coefficient: 0.8 },
];

/** 等级差不高于该值时系数为 1 */
export const LEVEL_COEFFICIENT_NEUTRAL_DIFF = 10;

/** 谜立方类型 */
export type CubeId =
  'standard' | 'advanced' | 'fast' | 'remote' | 'remoteMass' | 'ultimate' | 'sparkling';

/**
 * 谜立方系数。'guaranteed' 表示只要目标可捕捉就必定成功。
 * allowsBackstrike：官方说明背袭只在「战斗外 + 普通谜立方 + 服务器确认」时生效。
 */
export const CUBES: {
  id: CubeId;
  coefficient: number | 'guaranteed';
  allowsBackstrike: boolean;
}[] = [
  { id: 'standard', coefficient: 1, allowsBackstrike: true },
  { id: 'advanced', coefficient: 1.5, allowsBackstrike: false },
  { id: 'fast', coefficient: 2, allowsBackstrike: false },
  { id: 'remote', coefficient: 2, allowsBackstrike: false },
  { id: 'remoteMass', coefficient: 6, allowsBackstrike: false },
  { id: 'ultimate', coefficient: 'guaranteed', allowsBackstrike: false },
  { id: 'sparkling', coefficient: 'guaranteed', allowsBackstrike: false },
];

/** 生命值系数（仅战斗中生效）。官方为离散档位，不做插值。 */
export const HP_COEFFICIENTS: { hpPercent: number; coefficient: number }[] = [
  { hpPercent: 0, coefficient: 2 },
  { hpPercent: 5, coefficient: 1.65 },
  { hpPercent: 10, coefficient: 1.26 },
  { hpPercent: 50, coefficient: 1.1 },
  { hpPercent: 80, coefficient: 1 },
  { hpPercent: 90, coefficient: 0.9 },
  { hpPercent: 100, coefficient: 0.8 },
];

/** 背袭系数（仅战斗外 + 普通谜立方 + 服务器确认时生效） */
export const BACKSTRIKE_COEFFICIENT = 1.5;

/** 目标死亡场景的死亡基础机率：普通头目死亡后 6%（普通首领不可捕捉） */
export const DEATH_BASE_RATE = 0.06;

/**
 * 特殊状态系数。
 * 同一档位的多个状态共用同一系数，因此按「系数档位」归并，不影响计算结果。
 */
export type StatusId =
  | 'break'
  | 'breakBonus'
  | 'common'
  | 'specialStun'
  | 'hundredX'
  | 'invisible'
  | 'alert'
  | 'leaving'
  | 'uncatchable';

export const STATUS_COEFFICIENTS: { id: StatusId; coefficient: number }[] = [
  { id: 'break', coefficient: 1.5 },
  { id: 'breakBonus', coefficient: 3 },
  { id: 'common', coefficient: 2 },
  { id: 'specialStun', coefficient: 4 },
  { id: 'hundredX', coefficient: 100 },
  { id: 'invisible', coefficient: 0.5 },
  { id: 'alert', coefficient: 0.9 },
  { id: 'leaving', coefficient: 0.8 },
  { id: 'uncatchable', coefficient: 0 },
];

// ---------------------------------------------------------------------------
// 计算
// ---------------------------------------------------------------------------

export interface CatchInput {
  scenario: CatchScenario;
  regionId: RegionId;
  targetStage: TargetStage;
  playerLevel: number;
  aniimoLevel: number;
  /** 人物基础捕捉加成，0.05 表示 +5% */
  playerBonus: number;
  cubeId: CubeId;
  /** 目标生命值百分比（仅战斗中生效） */
  hpPercent: number;
  /** 服务器确认的有效背袭 */
  backstrike: boolean;
  statusIds: StatusId[];
}

export interface CatchBreakdownEntry {
  key: 'base' | 'level' | 'cube' | 'hp' | 'backstrike' | 'status';
  coefficient: number;
}

export interface CatchResult {
  /** 最终机率，0–1 */
  finalRate: number;
  /** 官方标记为「必定成功」的立方 */
  guaranteed: boolean;
  /** 目标在当前状态下不可捕捉（系数为 0） */
  uncatchable: boolean;
  /** 官方对普通目标 + 谜立方采用两次 √ 判定 */
  doubleCheck: boolean;
  /** 特殊状态合并后的系数 */
  statusCoefficient: number;
  breakdown: CatchBreakdownEntry[];
}

/** 等级差 → 系数（人物等级高于伊莫时无额外加成） */
export function levelCoefficient(levelDiff: number): number {
  for (const row of LEVEL_COEFFICIENTS) {
    if (levelDiff >= row.minDiff) return row.coefficient;
  }
  return 1;
}

/**
 * 特殊状态合并系数。
 * 官方规则：存在小于 1 的系数时取最低值；全部不低于 1 时取最高值。
 * 空选择视为 1（无状态加成/减益）。
 */
export function resolveStatusCoefficient(statusIds: StatusId[]): number {
  if (statusIds.length === 0) return 1;
  const values = statusIds
    .map((id) => STATUS_COEFFICIENTS.find((row) => row.id === id)?.coefficient)
    .filter((value): value is number => value !== undefined);
  if (values.length === 0) return 1;
  const hasPenalty = values.some((value) => value < 1);
  return hasPenalty ? Math.min(...values) : Math.max(...values);
}

/** 基础机率：区域阶段 × 进化阶段 × (1 + 人物基础捕捉加成) */
export function baseCatchRate(
  input: Pick<CatchInput, 'regionId' | 'targetStage' | 'playerBonus'>
): number {
  const row = REGION_RATES.find((item) => item.id === input.regionId) ?? REGION_RATES[0];
  const stageRate = row.rates[input.targetStage - 1];
  return stageRate * (1 + input.playerBonus);
}

/**
 * 按官方公示公式计算最终捕获机率。
 * 战斗外：base × cube × level × backstrike × status
 * 战斗中：base × cube × level × hp × status
 * 目标死亡：deathBase × cube × status
 */
export function calculateCatchRate(input: CatchInput): CatchResult {
  const cube = CUBES.find((item) => item.id === input.cubeId) ?? CUBES[0];
  const statusCoefficient = resolveStatusCoefficient(input.statusIds);
  const breakdown: CatchBreakdownEntry[] = [];
  const doubleCheck = cube.id === 'standard' && input.scenario !== 'defeated';

  // 状态直接为 0（暴走 / 泡泡阻隔 / 魔化 / 已有主人）时，目标不可捕捉
  if (statusCoefficient === 0) {
    return {
      finalRate: 0,
      guaranteed: false,
      uncatchable: true,
      doubleCheck,
      statusCoefficient,
      breakdown: [{ key: 'status', coefficient: 0 }],
    };
  }

  // 必定成功的立方：只要目标可捕捉就直接判定成功
  if (cube.coefficient === 'guaranteed') {
    return {
      finalRate: 1,
      guaranteed: true,
      uncatchable: false,
      doubleCheck: false,
      statusCoefficient,
      breakdown: [{ key: 'cube', coefficient: 1 }],
    };
  }

  const base =
    input.scenario === 'defeated'
      ? DEATH_BASE_RATE
      : baseCatchRate({
          regionId: input.regionId,
          targetStage: input.targetStage,
          playerBonus: input.playerBonus,
        });

  breakdown.push({ key: 'base', coefficient: base });
  breakdown.push({ key: 'cube', coefficient: cube.coefficient });

  let rate = base * cube.coefficient;

  if (input.scenario !== 'defeated') {
    const levelDiff = input.aniimoLevel - input.playerLevel;
    const level = levelCoefficient(levelDiff);
    breakdown.push({ key: 'level', coefficient: level });
    rate *= level;
  }

  if (input.scenario === 'battle') {
    const hp = HP_COEFFICIENTS.find((row) => row.hpPercent === input.hpPercent)?.coefficient ?? 1;
    breakdown.push({ key: 'hp', coefficient: hp });
    rate *= hp;
  }

  if (input.scenario === 'field') {
    const backstrike = input.backstrike && cube.allowsBackstrike ? BACKSTRIKE_COEFFICIENT : 1;
    breakdown.push({ key: 'backstrike', coefficient: backstrike });
    rate *= backstrike;
  }

  breakdown.push({ key: 'status', coefficient: statusCoefficient });
  rate *= statusCoefficient;

  return {
    finalRate: Math.min(1, Math.max(0, rate)),
    guaranteed: false,
    uncatchable: false,
    doubleCheck,
    statusCoefficient,
    breakdown,
  };
}
