import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
const manifest = JSON.parse(readFileSync('package.json', 'utf8'));
const archive = resolve(`xploryng-convergencia-${manifest.version}.tgz`);
const target = mkdtempSync(join(tmpdir(), 'convergencia-consumer-'));
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Run with npm run test:package');
writeFileSync(
  join(target, 'package.json'),
  JSON.stringify({
    name: 'convergencia-consumer-smoke',
    private: true,
    type: 'module',
    dependencies: {
      '@xploryng/convergencia': `file:${archive}`,
      react: manifest.devDependencies.react,
      'react-dom': manifest.devDependencies['react-dom'],
    },
  }),
);
const install = spawnSync(
  process.execPath,
  [npmCli, 'install', '--ignore-scripts', '--no-audit', '--no-fund'],
  { cwd: target, stdio: 'inherit' },
);
if (install.status !== 0) process.exit(install.status || 1);
writeFileSync(
  join(target, 'verify.mjs'),
  `import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
import * as DS from '@xploryng/convergencia';
import {nativeTokens} from '@xploryng/convergencia/native';
import {tokens} from '@xploryng/convergencia/tokens';
const names=${JSON.stringify(JSON.parse(readFileSync('component-registry.json', 'utf8')).components.map((c) => c.name))};
for(const name of names)assert.ok(DS[name],name);
const html=renderToString(React.createElement(DS.DesignSystemProvider,null,React.createElement(DS.Card,null,React.createElement(DS.Button,{variant:'primary'},'Continuar'))));
assert.ok(html.includes('cv-button--primary'));
assert.equal(typeof nativeTokens['space.s16'],'number');
assert.equal(nativeTokens['color.accent'],'#6367c9');
assert.ok(tokens['color.accent']);
for(const file of ['styles.css','tokens.css','legacy.css'])assert.ok(readFileSync(new URL('./node_modules/@xploryng/convergencia/dist/'+file,import.meta.url),'utf8').length);
console.log('Package verified: all 60 public components, React SSR, native tokens, CSS and exports.');
`,
);
const verify = spawnSync(process.execPath, ['verify.mjs'], { cwd: target, stdio: 'inherit' });
process.exit(verify.status || 0);
