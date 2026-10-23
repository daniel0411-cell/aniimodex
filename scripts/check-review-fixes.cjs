const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const ts = require('typescript');

function loadTs(path) {
  if (path.endsWith('.json')) return JSON.parse(readFileSync(resolve(__dirname, '..', path), 'utf8'));
  const source = readFileSync(resolve(__dirname, '..', path), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, esModuleInterop: true },
  });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', outputText)(
    (id) => {
      if (path === 'data/launch-guides.ts' && id === './access-guides') return loadTs('data/access-guides.ts');
      assert.ok(id.startsWith('@/'), `Unexpected import: ${id}`);
      return loadTs(`${id.slice(2)}${id.endsWith('.json') ? '' : '.ts'}`);
    },
    module,
    module.exports
  );
  return module.exports;
}

const { effectiveness, combinedEffectiveness, bestAttackers } = loadTs('lib/type-chart.ts');
assert.equal(effectiveness('Ice', 'Wind'), null);
assert.equal(combinedEffectiveness('Ice', ['Wind', 'Water']), null);
assert.equal(bestAttackers(['Wind', 'Water']).some((a) => a.element === 'Ice'), false);
assert.equal(effectiveness('Wind', 'Ice'), 1);
assert.equal(combinedEffectiveness('Fire', ['Grass', 'Water']), 1);
assert.equal(combinedEffectiveness('Water', ['Water']), 0.625);
assert.ok(Math.abs(combinedEffectiveness('Water', ['Fire', 'Earth']) - 2.56) < 1e-10);
assert.equal(bestAttackers(['Grass', 'Water']).find((a) => a.element === 'Fire').value, 1);

const { getLaunchGuide } = loadTs('data/launch-guides.ts');
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const farm = getLaunchGuide(locale, 'aniimo-harvest-gathering-farm-guide');
  assert.match(farm.lead, /has not opened|尚未开|尚未開/);
  assert.doesNotMatch(JSON.stringify(farm), /exactly 2 Round Tables|2张圆桌|2張圓桌/);
  const hardware = getLaunchGuide(locale, 'aniimo-controller-steam-deck-optimization');
  assert.match(hardware.subtitle, /untested|尚未实测|尚未實測/);
  const currency = getLaunchGuide(locale, 'aniimo-currencies-and-shops');
  assert.doesNotMatch(JSON.stringify(currency), /1%.*样式保底|1%.*樣式保底/);
}

console.log('Review fix checks passed: combined matchups and three-locale evidence boundaries.');
