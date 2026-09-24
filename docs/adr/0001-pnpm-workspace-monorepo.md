# Library and site live in one pnpm-workspace monorepo

The component library is published to npm as `@tlannigan/crt`, but the portfolio site consumes it from the workspace (`packages/crt`, `apps/web`) rather than from the registry. This way a component change and the site change that uses it land in one commit, with no publish-and-bump cycle, while keeping a hard package boundary that forces the library to stand on its own. Storybook lives in `packages/crt` because it documents the library, not the site.

## Consequences

The library ships its CSS as side-effect imports (with `sideEffects` set for `*.css`) plus a standalone stylesheet fallback, so consumers need no Tailwind setup and no manual CSS import.
