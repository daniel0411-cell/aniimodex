// Rendered official probability disclosure checked October 27, 2026.
// The September model remains in Git history, not in the current calculator.
export const CATCH_FORMULA_SOURCE = {
  url: 'https://www.aniimo.com/zh-tw/formula-multipliers',
  title: 'Aniimo Official Probability Disclosure',
  accessedAt: '2026-10-27',
} as const;

export type CatchScenario = 'field' | 'battle' | 'boss';
export const CATCH_SCENARIOS: CatchScenario[] = ['field', 'battle', 'boss'];
export type RegionId = 'standard' | 'earlyMid' | 'mid' | 'midLate' | 'late';
export const REGION_RATES: { id: RegionId; rates: [number, number, number] }[] = [
  { id: 'standard', rates: [0.56, 0.42, 0.28] },
  { id: 'earlyMid', rates: [0.5, 0.38, 0.25] },
  { id: 'mid', rates: [0.44, 0.33, 0.22] },
  { id: 'midLate', rates: [0.38, 0.29, 0.19] },
  { id: 'late', rates: [0.32, 0.24, 0.16] },
];
export type TargetStage = 1 | 2 | 3;
export const TARGET_STAGES: TargetStage[] = [1, 2, 3];
export const LEVEL_COEFFICIENTS = [
  { minDiff: 15, coefficient: 0.1 },
  { minDiff: 14, coefficient: 0.2 },
  { minDiff: 13, coefficient: 0.4 },
  { minDiff: 12, coefficient: 0.6 },
  { minDiff: 11, coefficient: 0.8 },
];
export type CubeId =
  | 'standard'
  | 'advanced'
  | 'fast'
  | 'super'
  | 'remote'
  | 'remoteMass'
  | 'ultimate'
  | 'sparkling'
  | 'legendary';
export const CUBES: {
  id: CubeId;
  coefficient: number | 'guaranteed';
  allowsBackstrike: boolean;
}[] = [
  { id: 'standard', coefficient: 1, allowsBackstrike: true },
  { id: 'advanced', coefficient: 1.5, allowsBackstrike: true },
  { id: 'fast', coefficient: 2, allowsBackstrike: true },
  { id: 'super', coefficient: 2, allowsBackstrike: true },
  { id: 'remote', coefficient: 2, allowsBackstrike: false },
  { id: 'remoteMass', coefficient: 6, allowsBackstrike: false },
  { id: 'ultimate', coefficient: 'guaranteed', allowsBackstrike: true },
  { id: 'sparkling', coefficient: 'guaranteed', allowsBackstrike: true },
  { id: 'legendary', coefficient: 'guaranteed', allowsBackstrike: true },
];
export const HP_COEFFICIENTS = [
  { hpPercent: 0, coefficient: 2 },
  { hpPercent: 5, coefficient: 1.65 },
  { hpPercent: 10, coefficient: 1.26 },
  { hpPercent: 50, coefficient: 1.1 },
  { hpPercent: 80, coefficient: 1 },
  { hpPercent: 90, coefficient: 0.9 },
  { hpPercent: 100, coefficient: 0.8 },
];
export const BACKSTRIKE_COEFFICIENT = 1.5;
export const BOSS_BASE_RATE = 0.06;

export interface CatchInput {
  scenario: CatchScenario;
  regionId: RegionId;
  targetStage: TargetStage;
  useRegionRate: boolean;
  playerLevel: number;
  aniimoLevel: number;
  playerBonus: number | null;
  cubeId: CubeId;
  hpPercent: number;
  backstrike: boolean;
  statusMode: 'unknown' | 'none';
  eligible: boolean;
}
export interface CatchBreakdownEntry {
  key: 'base' | 'level' | 'cube' | 'hp' | 'backstrike' | 'status';
  coefficient: number | null;
}
export interface CatchResult {
  finalRate: number | null;
  guaranteed: boolean;
  missing: ('eligibility' | 'base' | 'status' | 'input')[];
  breakdown: CatchBreakdownEntry[];
}

export function levelCoefficient(levelDiff: number): number {
  return LEVEL_COEFFICIENTS.find((row) => levelDiff >= row.minDiff)?.coefficient ?? 1;
}

/** Unknown effects cannot silently become neutral or a historic numeric value. */
export function resolveStatusCoefficient(values: (number | null)[]): number | null {
  if (values.some((value) => value === null || !Number.isFinite(value) || value < 0)) return null;
  const known = values as number[];
  if (!known.length) return 1;
  return known.some((value) => value < 1) ? Math.min(...known) : Math.max(...known);
}

export function baseCatchRate(
  input: Pick<CatchInput, 'regionId' | 'targetStage' | 'playerBonus' | 'useRegionRate'>
): number | null {
  const row = REGION_RATES.find((item) => item.id === input.regionId);
  if (
    !input.useRegionRate ||
    !row ||
    !TARGET_STAGES.includes(input.targetStage) ||
    input.playerBonus === null ||
    !Number.isFinite(input.playerBonus) ||
    input.playerBonus < 0
  )
    return null;
  const rate = row.rates[input.targetStage - 1] * (1 + input.playerBonus);
  return Number.isFinite(rate) ? rate : null;
}

export function calculateCatchRate(input: CatchInput): CatchResult {
  const missing: CatchResult['missing'] = [];
  const breakdown: CatchBreakdownEntry[] = [];
  const cube = CUBES.find((item) => item.id === input.cubeId);
  if (!input.eligible) missing.push('eligibility');
  if (!cube || !CATCH_SCENARIOS.includes(input.scenario))
    return { finalRate: null, guaranteed: false, missing: [...missing, 'input'], breakdown };
  // Guaranteed cubes still require confirmed eligibility and no story override.
  if (cube.coefficient === 'guaranteed')
    return {
      finalRate: missing.length ? null : 1,
      guaranteed: !missing.length,
      missing,
      breakdown,
    };

  const boss = input.scenario === 'boss';
  const base = boss ? BOSS_BASE_RATE : baseCatchRate(input);
  if (base === null) missing.push('base');
  breakdown.push(
    { key: 'base', coefficient: base },
    { key: 'cube', coefficient: cube.coefficient }
  );
  if (!boss) {
    const validLevels = [input.playerLevel, input.aniimoLevel].every(
      (value) => Number.isSafeInteger(value) && value >= 1
    );
    if (!validLevels) missing.push('input');
    breakdown.push({
      key: 'level',
      coefficient: validLevels ? levelCoefficient(input.aniimoLevel - input.playerLevel) : null,
    });
    if (input.scenario === 'battle') {
      const hp =
        HP_COEFFICIENTS.find((row) => row.hpPercent === input.hpPercent)?.coefficient ?? null;
      if (hp === null && !missing.includes('input')) missing.push('input');
      breakdown.push({ key: 'hp', coefficient: hp });
    } else {
      breakdown.push({
        key: 'backstrike',
        coefficient: input.backstrike && cube.allowsBackstrike ? BACKSTRIKE_COEFFICIENT : 1,
      });
    }
    const status = input.statusMode === 'none' ? resolveStatusCoefficient([]) : null;
    if (status === null) missing.push('status');
    breakdown.push({ key: 'status', coefficient: status });
  }
  const raw = breakdown.reduce((rate, entry) => rate * (entry.coefficient ?? 1), 1);
  if (!Number.isFinite(raw) && !missing.includes('input')) missing.push('input');
  return {
    finalRate: missing.length ? null : Math.min(1, raw),
    guaranteed: false,
    missing,
    breakdown,
  };
}
