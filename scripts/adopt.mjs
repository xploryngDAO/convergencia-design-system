import { existsSync, writeFileSync, realpathSync } from 'node:fs';
import { resolve, join } from 'node:path';
const args = process.argv.slice(2),
  target = args.find((a) => !a.startsWith('--'));
if (!target) throw new Error('Use: node scripts/adopt.mjs <project-directory> [--write]');
const root = realpathSync(resolve(target));
const output = join(root, 'design-system.config.json');
const config = {
  $schema:
    'https://raw.githubusercontent.com/xploryngDAO/convergencia-design-system/v0.1.0/docs/adoption.schema.json',
  system: 'convergencia',
  repository: 'https://github.com/xploryngDAO/convergencia-design-system',
  version: '0.1.0',
  status: 'planned',
  scope: [],
  notes: 'Registration only. Runtime migration must be reviewed separately.',
};
if (existsSync(output))
  throw new Error('Configuration already exists; inspect it instead of overwriting.');
console.log(
  JSON.stringify(
    { path: output, configuration: config, mode: args.includes('--write') ? 'write' : 'dry-run' },
    null,
    2,
  ),
);
if (args.includes('--write'))
  writeFileSync(output, JSON.stringify(config, null, 2) + '\n', { flag: 'wx' });
