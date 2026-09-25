// Lists what `pnpm pack` would publish and fails if the tarball is missing
// JS, type declarations, CSS or fonts. Run `pnpm build` first.
import { execFileSync } from 'node:child_process';

const output = execFileSync('pnpm', ['pack', '--dry-run', '--json'], { encoding: 'utf8' });
const { files } = JSON.parse(output);
const paths = files.map((file) => file.path).sort();

for (const path of paths) {
  console.log(path);
}

const required = {
  JS: /^dist\/.*\.js$/,
  'type declarations': /^dist\/.*\.d\.ts$/,
  CSS: /^dist\/styles\/styles\.css$/,
  fonts: /^dist\/.*\.woff2$/
};
const missing = Object.entries(required)
  .filter(([, pattern]) => !paths.some((path) => pattern.test(path)))
  .map(([kind]) => kind);

if (missing.length > 0) {
  console.error(`\nTarball is missing: ${missing.join(', ')}`);
  process.exit(1);
}
console.log(`\n${paths.length} files, including JS, type declarations, CSS and fonts`);
