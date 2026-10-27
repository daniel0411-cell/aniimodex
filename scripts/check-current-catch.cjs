const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const state = { exports: {} };
new Function(
  'module',
  'exports',
  ts.transpileModule(fs.readFileSync('data/catch-formula.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
)(state, state.exports);
const {
  calculateCatchRate: calc,
  resolveStatusCoefficient: status,
  CUBES,
  REGION_RATES,
  CATCH_SCENARIOS,
  levelCoefficient,
} = state.exports;
const input = {
  scenario: 'field',
  regionId: 'standard',
  targetStage: 3,
  useRegionRate: true,
  playerLevel: 1,
  aniimoLevel: 1,
  playerBonus: 0,
  cubeId: 'advanced',
  hpPercent: 100,
  backstrike: false,
  statusMode: 'none',
  eligible: true,
};
const rate = (change = {}) => calc({ ...input, ...change }).finalRate;
const near = (actual, expected) => {
  assert.notEqual(actual, null);
  assert(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`);
};
near(rate(), 0.42);
near(rate({ backstrike: true }), 0.63);
near(rate({ scenario: 'battle' }), 0.336);
near(rate({ scenario: 'battle', hpPercent: 50, backstrike: true }), 0.462);
near(rate({ cubeId: 'remote', backstrike: true }), 0.56);
near(rate({ cubeId: 'super' }), 0.56);
near(rate({ playerBonus: 0.2 }), 0.504);
near(rate({ cubeId: 'remoteMass', backstrike: true }), 1);
for (const [cubeId, expected] of [
  ['standard', 0.06],
  ['advanced', 0.09],
  ['remoteMass', 0.36],
]) {
  near(
    rate({
      scenario: 'boss',
      cubeId,
      regionId: 'invalid',
      playerBonus: null,
      playerLevel: NaN,
      hpPercent: 33,
      statusMode: 'unknown',
    }),
    expected
  );
}
for (const change of [
  { eligible: false },
  { useRegionRate: false },
  { playerBonus: null },
  { playerBonus: NaN },
  { playerBonus: -1 },
  { playerLevel: 0 },
  { aniimoLevel: 1.5 },
  { regionId: 'tower' },
  { targetStage: 4 },
  { cubeId: 'missing' },
  { scenario: 'defeated' },
  { scenario: 'battle', hpPercent: 20 },
  { statusMode: 'unknown' },
])
  assert.equal(rate(change), null, JSON.stringify(change));
for (const cubeId of ['ultimate', 'sparkling', 'legendary']) {
  near(rate({ cubeId, statusMode: 'unknown', playerBonus: null }), 1);
  assert.equal(rate({ cubeId, eligible: false }), null);
}
assert.equal(
  calc({
    ...input,
    useRegionRate: false,
    eligible: false,
    playerBonus: null,
    statusMode: 'unknown',
  }).finalRate,
  null
);
assert.deepEqual(
  [10, 11, 12, 13, 14, 15, 16].map(levelCoefficient),
  [1, 0.8, 0.6, 0.4, 0.2, 0.1, 0.1]
);
assert.equal(status([]), 1);
assert.equal(status([2, 4]), 4);
assert.equal(status([2, 0.5, 0.2]), 0.2);
for (const values of [[null], [2, null], [NaN], [-1], [Infinity]])
  assert.equal(status(values), null);
assert.equal(REGION_RATES.length, 5);
assert.equal(CUBES.length, 9);
assert.deepEqual(CATCH_SCENARIOS, ['field', 'battle', 'boss']);
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const { catchTool: t } = JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8'));
  for (const cube of CUBES) assert(t.current.cubes[cube.id]);
  for (const region of REGION_RATES) assert(t.current.regions[region.id]);
  assert(!('strategyStatus' in t));
}
console.log(
  'Current catch checks passed: explicit assumptions, unknown propagation, boss formula, cubes and invalid inputs.'
);
