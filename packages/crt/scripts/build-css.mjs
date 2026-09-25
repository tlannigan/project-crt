// Emits the library's CSS next to the JS that tsc wrote to dist/:
// - dist/styles/base.css: theme tokens plus every Tailwind utility the components use
// - dist/components/*/*.css: each component's own stylesheet, copied as-is
// - dist/styles/styles.css: all of the above in one file, for the `./styles.css` export
// - dist/styles/fonts/: the font files base.css points at
import { execFileSync } from 'node:child_process';
import { cpSync, globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = join(import.meta.dirname, '..');
const src = join(root, 'src');
const dist = join(root, 'dist');

execFileSync(
  'tailwindcss',
  ['-i', join(src, 'styles/base.css'), '-o', join(dist, 'styles/base.css')],
  { cwd: root, stdio: 'inherit' }
);

cpSync(join(src, 'styles/fonts'), join(dist, 'styles/fonts'), { recursive: true });

const componentCss = globSync('components/**/*.css', { cwd: src }).sort();
for (const file of componentCss) {
  mkdirSync(dirname(join(dist, file)), { recursive: true });
  cpSync(join(src, file), join(dist, file));
}

const standalone = ['styles/base.css', ...componentCss]
  .map((file) => `/* ${file} */\n${readFileSync(join(dist, file), 'utf8')}`)
  .join('\n');
writeFileSync(join(dist, 'styles/styles.css'), standalone);
