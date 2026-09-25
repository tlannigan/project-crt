## Tristan Lannigan's Portfolio

A pnpm workspace (see `docs/adr/0001-pnpm-workspace-monorepo.md`):

- `packages/crt`: the `@tlannigan/crt` component library, its Storybook and its unit/story tests
- `apps/web`: the Next.js site, consuming the library via `workspace:*`

| Command | What it does |
| --- | --- |
| `pnpm dev` | Builds the library, then rebuilds it on change while the site runs on port 3000 |
| `pnpm storybook` | Storybook for the library on port 3100 |
| `pnpm build` / `lint` / `check-types` / `test` | Runs across every package |
| `pnpm --filter web test:e2e` | Builds and starts the site, then runs Playwright + axe |
| `pnpm --filter @tlannigan/crt test:storybook` | Runs every story as a browser test, including a11y |
| `pnpm --filter @tlannigan/crt pack:list` | Lists what `pnpm pack` would publish (run `build` first) |

The site reads the library's built `dist/`; `pnpm dev` keeps it current, otherwise run
`pnpm --filter @tlannigan/crt build` after changing a component. Playwright tests need `pnpm --filter web exec playwright install chromium` once.
