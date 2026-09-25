# @tlannigan/crt

Retro CRT-styled React components.

```tsx
import { Box, CrtMonitor } from '@tlannigan/crt';

<div className="green">
  <CrtMonitor>
    <Box title="Hello">Styled with no extra setup</Box>
  </CrtMonitor>
</div>;
```

Each component imports its own CSS, so a bundler that handles CSS imports (Next.js, Vite,
webpack) needs no Tailwind setup and no manual stylesheet import. Without one, include
`@tlannigan/crt/styles.css` yourself.

Wrap components in a Theme class (`green` or `orange`) to set `--foreground`.
