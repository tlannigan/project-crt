<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `apps/web/node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Git branches

Name every branch `<type>/<issue>/<slug>`, where `<issue>` is the number of the GitHub issue the branch implements. A branch with no issue is `<type>/<slug>`.

Pick the type by the branch's main purpose:

- `feat/`: implements a new feature
- `fix/`: fixes a bug or issue
- `refactor/`: restructures code without changing behavior
- `test/`: adds or changes tests only
- `ci/`: changes CI or build pipeline config
- `chore/`: changes no application code, e.g. dependency bumps, docs, AI tooling files

The slug is 2–5 lowercase kebab-case words describing the change, e.g. `feat/7/dev-watch-rebuild`, `chore/bump-next`.

Every branch carries exactly one issue number. When an issue's work spans several branches, create a sub-issue per branch (see `docs/agents/issue-tracker.md`) and name each branch after its sub-issue.
