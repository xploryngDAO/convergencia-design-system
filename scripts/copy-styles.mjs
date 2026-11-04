import { copyFileSync } from 'node:fs';
for (const file of ['styles.css', 'tokens.css', 'legacy.css'])
  copyFileSync(`src/${file}`, `dist/${file}`);
