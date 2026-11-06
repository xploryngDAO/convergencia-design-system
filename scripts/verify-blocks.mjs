import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as designSystem from '../dist/index.js';

const registry = JSON.parse(readFileSync(resolve(import.meta.dirname, '..', 'component-registry.json'), 'utf8'));
const blocks = registry.blocks ?? [];
const errors = [];
const names = new Set();

if (blocks.length < 17) errors.push(`esperado ao menos 10 blocos, veio ${blocks.length}`);
for (const block of blocks) {
  if (names.has(block.name)) errors.push(`bloco duplicado: ${block.name}`);
  names.add(block.name);
  if (typeof designSystem[block.name] !== 'function') errors.push(`bloco não exportado no dist: ${block.name}`);
  if (!block.import.includes(block.name)) errors.push(`import incorreto: ${block.name}`);
}
for (const name of ['ApprovalGate', 'CostMeter', 'TrustBadge', 'ProvenanceTag', 'CompatMatrix', 'ScoreBadge', 'EvidencePanel', 'PackageReport', 'SurfaceFrame', 'AgentDock', 'WorkspaceFrame', 'PanelSection', 'StatStrip', 'QueueRow', 'MetaRow', 'SlaPill', 'ChannelBadge']) {
  if (!names.has(name)) errors.push(`bloco ausente no registry: ${name}`);
}

if (errors.length > 0) {
  console.error(errors.map((error) => `x ${error}`).join('\n'));
  process.exit(1);
}
console.log(`ok: ${blocks.length} blocos registrados e exportados`);
