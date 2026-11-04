import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, basename, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import postcss from 'postcss';
const root = resolve(process.argv[2] || '..');
const entry = readFileSync(resolve(root, 'mockups/convergencia/index.html'), 'utf8');
const links = [...entry.matchAll(/href="([^"?]+\.css)(?:\?[^" ]*)?"/g)].map((m) => m[1]);
const files = [],
  selectors = [],
  variables = [],
  media = new Set();
for (const [order, file] of links.entries()) {
  const path = resolve(root, 'mockups/convergencia', file),
    bytes = readFileSync(path),
    css = postcss.parse(bytes.toString(), { from: file });
  let rules = 0;
  css.walkRules((rule) => {
    rules++;
    const contexts = [];
    for (let p = rule.parent; p && p.type !== 'root'; p = p.parent)
      if (p.type === 'atrule') contexts.unshift(`@${p.name} ${p.params}`);
    selectors.push({
      file,
      order,
      line: rule.source.start.line,
      selector: rule.selector,
      contexts,
      declarations: rule.nodes
        .filter((n) => n.type === 'decl')
        .map((n) => ({ property: n.prop, value: n.value, important: !!n.important })),
    });
  });
  css.walkDecls(/^--/, (d) =>
    variables.push({
      file,
      selector: d.parent.selector,
      name: d.prop,
      value: d.value,
      line: d.source.start.line,
    }),
  );
  css.walkAtRules('media', (r) => media.add(r.params));
  files.push({
    path: `mockups/convergencia/${file}`,
    order,
    sha256: createHash('sha256').update(bytes).digest('hex'),
    bytes: bytes.length,
    rules,
  });
}
mkdirSync('docs/reference', { recursive: true });
const inventory = {
  captured: '2026-11-04',
  source: 'https://github.com/xploryngDAO/SuperJarvis',
  head: execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  workingTree:
    'local modifications included; hashes identify actual input, not a published release',
  entry: 'mockups/convergencia/index.html',
  files,
  variables,
  media: [...media],
  selectors,
};
writeFileSync('docs/reference/source-inventory.json', JSON.stringify(inventory, null, 2) + '\n');
const app = readFileSync(resolve(root, 'mockups/convergencia/app.js'), 'utf8');
const literal = app.match(/const paths=\{([\s\S]*?)\};/)[1];
const icons = Object.fromEntries(
  [...literal.matchAll(/(?:^|,)\s*(\w+):'([^']*)'/g)].map((m) => [m[1], m[2]]),
);
mkdirSync('src/icons', { recursive: true });
writeFileSync(
  'src/icons/paths.ts',
  `/** SVG paths extracted from SuperJarvis app.js. See provenance. */\nexport const iconPaths = ${JSON.stringify(icons, null, 2)} as const;\nexport type IconName = keyof typeof iconPaths;\n`,
);
console.log(
  JSON.stringify({
    files: files.length,
    rules: selectors.length,
    variables: variables.length,
    media: media.size,
    icons: Object.keys(icons).length,
  }),
);
