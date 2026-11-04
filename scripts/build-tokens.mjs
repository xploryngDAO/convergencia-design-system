import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
export function flatten(value, path = [], out = {}) {
  for (const [key, node] of Object.entries(value)) {
    if (key.startsWith('$')) continue;
    if ('$value' in node) out[[...path, key].join('.')] = node;
    else flatten(node, [...path, key], out);
  }
  return out;
}
export function cssValue(token, tokens, seen = new Set()) {
  const v = token.$value;
  if (typeof v === 'string' && /^\{.+\}$/.test(v)) {
    const key = v.slice(1, -1);
    if (!tokens[key] || seen.has(key)) throw new Error(`Invalid or cyclic alias ${key}`);
    return cssValue(tokens[key], tokens, new Set([...seen, key]));
  }
  if (token.$type === 'color')
    return `rgb(${v.components.map((n) => Math.round(n * 255)).join(' ')} / ${v.alpha ?? 1})`;
  if (token.$type === 'dimension') return `${v.value}${v.unit}`;
  if (token.$type === 'duration') return `${v.value}${v.unit}`;
  if (token.$type === 'fontFamily')
    return v.map((f) => (f.includes(' ') ? JSON.stringify(f) : f)).join(', ');
  if (token.$type === 'cubicBezier') return `cubic-bezier(${v.join(',')})`;
  if (token.$type === 'shadow')
    return `${v.offsetX.value}px ${v.offsetY.value}px ${v.blur.value}px ${v.spread.value}px ${cssValue({ $type: 'color', $value: v.color }, tokens)}`;
  return String(v);
}
const source = JSON.parse(readFileSync('tokens/tokens.json', 'utf8'));
const tokens = flatten(source);
const values = Object.fromEntries(Object.entries(tokens).map(([k, v]) => [k, cssValue(v, tokens)]));
const name = (k) => '--cv-' + k.replaceAll('.', '-');
const declarations = Object.entries(values)
  .filter(([k]) => !k.startsWith('dark.'))
  .map(([k, v]) => `  ${name(k)}: ${v};`)
  .join('\n');
const dark = Object.entries(values)
  .filter(([k]) => k.startsWith('dark.'))
  .map(([k, v]) => `  --cv-color-${k.slice(5)}: ${v};`)
  .join('\n');
mkdirSync('src/tokens', { recursive: true });
writeFileSync(
  'src/tokens.css',
  `/* Generated from tokens/tokens.json. Do not edit. */\n:root, .cv-root {\n${declarations}\n}\n.cv-root[data-theme="dark"], [data-theme="dark"] .cv-root {\n${dark}\n  color-scheme: dark;\n}\n`,
);
const resolved = {};
for (const [key, token] of Object.entries(tokens)) {
  let t = token;
  const visited = new Set();
  while (typeof t.$value === 'string' && /^\{.+\}$/.test(t.$value)) {
    if (visited.has(t.$value)) throw new Error('cycle');
    visited.add(t.$value);
    t = tokens[t.$value.slice(1, -1)];
  }
  resolved[key] =
    t.$type === 'dimension' || t.$type === 'duration'
      ? t.$value.value
      : t.$type === 'color'
        ? '#' +
          t.$value.components
            .map((c) =>
              Math.round(c * 255)
                .toString(16)
                .padStart(2, '0'),
            )
            .join('')
        : values[key];
}
writeFileSync(
  'src/tokens/index.ts',
  `/** Generated CSS values. Canonical source: tokens/tokens.json. */\nexport const tokens = ${JSON.stringify(values, null, 2)} as const;\nexport type TokenName = keyof typeof tokens;\n`,
);
writeFileSync(
  'src/tokens/native.ts',
  `/** Platform-neutral values: dimensions in logical pixels. Map fonts, safe areas, shadows and focus with native APIs; this is not a React Native component library. */\nexport const nativeTokens = ${JSON.stringify(resolved, null, 2)} as const;\n`,
);
const aliases = {
  bg: 'background',
  paper: 'surface',
  soft: 'surface-subtle',
  ink: 'text',
  muted: 'text-muted',
  line: 'border',
  accent: 'accent',
  'accent-soft': 'accent-soft',
  'accent-ink': 'accent-text',
};
writeFileSync(
  'src/legacy.css',
  `/* Opt in on a container: class="cv-root cv-legacy". Import tokens.css first. */\n.cv-legacy {\n${Object.entries(
    aliases,
  )
    .map(([k, v]) => `  --${k}: var(--cv-color-${v});`)
    .join('\n')}\n  --radius: var(--cv-radius-panel);\n  --shadow: var(--cv-shadow-card);\n}\n`,
);
console.log(
  `Generated ${Object.keys(tokens).length} tokens, CSS, native values and legacy aliases.`,
);
