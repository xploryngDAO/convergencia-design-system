import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { flatten, cssValue } from '../scripts/build-tokens.mjs';
const json = (p) => JSON.parse(readFileSync(p, 'utf8'));
const tokens = flatten(json('tokens/tokens.json'));
const registry = json('component-registry.json');
function luminance(color) {
  return color.components
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
}
function contrast(a, b) {
  const aa = luminance(a),
    bb = luminance(b);
  return (Math.max(aa, bb) + 0.05) / (Math.min(aa, bb) + 0.05);
}
test('tokens are typed, described and resolve deterministically', () => {
  assert.equal(Object.keys(tokens).length, 101);
  for (const [k, t] of Object.entries(tokens)) {
    assert.ok(t.$description, k);
    assert.ok(t.$type, k);
    assert.ok(cssValue(t, tokens), k);
  }
});
test('semantic reading and action colors meet 4.5:1 in both themes', () => {
  for (const prefix of ['color', 'dark'])
    for (const [a, b] of [
      ['text', 'background'],
      ['text', 'surface'],
      ['text-muted', 'background'],
      ['text-muted', 'surface'],
      ['accent-text', 'accent-soft'],
      ['on-accent', 'accent'],
      ['success', 'success-soft'],
      ['warning', 'warning-soft'],
      ['danger', 'danger-soft'],
      ['rose', 'rose-soft'],
    ]) {
      const ratio = contrast(tokens[`${prefix}.${a}`].$value, tokens[`${prefix}.${b}`].$value);
      assert.ok(ratio >= 4.5, `${prefix} ${a}/${b}: ${ratio.toFixed(2)}`);
    }
});
test('every registered component has a story and a usable contract', () => {
  assert.equal(registry.components.length, 60);
  const names = new Set();
  for (const c of registry.components) {
    assert.ok(!names.has(c.name), c.name);
    names.add(c.name);
    assert.ok(existsSync(c.story), c.name);
    assert.ok(c.description.length > 30, c.name);
    assert.ok(c.anatomy.length, c.name);
    assert.ok(c.keyboard, c.name);
    assert.ok(c.source, c.name);
  }
});
test('source inventory covers every loaded style in source order', () => {
  const x = json('docs/reference/source-inventory.json');
  assert.equal(x.files.length, 26);
  assert.equal(
    x.selectors.length,
    x.files.reduce((n, f) => n + f.rules, 0),
  );
  assert.equal(new Set(x.files.map((f) => f.order)).size, x.files.length);
  for (const f of x.files) assert.match(f.sha256, /^[0-9a-f]{64}$/);
});
test('distribution exports and generated styles exist', () => {
  const p = json('package.json');
  for (const file of [
    'src/tokens.css',
    'src/legacy.css',
    'src/tokens/index.ts',
    'src/tokens/native.ts',
  ])
    assert.ok(existsSync(file));
  assert.ok(p.exports['./native']);
  assert.ok(p.exports['./styles.css']);
  assert.ok(p.peerDependencies.react);
});
test('aliases fail closed on missing and cyclic references', () => {
  assert.throws(() => cssValue({ $value: '{missing}' }, tokens));
  const cyc = { a: { $value: '{b}' }, b: { $value: '{a}' } };
  assert.throws(() => cssValue(cyc.a, cyc));
});
