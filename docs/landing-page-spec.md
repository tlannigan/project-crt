# Landing page spec

The product and UX decisions behind the site, each with its reasoning. Terms in **bold** are defined in [`CONTEXT.md`](../CONTEXT.md); hard-to-reverse architecture lives in [`docs/adr/`](./adr/). Implementation work is tracked in GitHub Issues.

When an issue doesn't cover an edge case, decide in the spirit of the reasoning here. If a decision here turns out to be wrong, change this file in the same PR as the code.

## The concept

A portfolio viewed through a CRT monitor. The landing page opens **Uncalibrated**: a deliberately messy page of **Instruments** and **Readouts**, styled after fighter-jet HUDs, radar, synthesizers and old terminals. The **Calibrate Prompt** invites the visitor to **Calibrate**, which animates everything into a well-designed, accessible page. The joke is "look what a frontend developer can do for you".

## Pages

- **`/`** is the only page with Instruments. It is the showcase, not the portfolio content.
- **`/projects`** and **`/contact`** hold the portfolio content. They are separate pages so that a visitor who just wants the facts never has to go through the showcase.
- Projects are hard-coded TSX and contact is a list of links, to start with. A form means spam handling and a backend for little benefit, and MDX or a CMS isn't worth it for a handful of projects.

## Sessions

A session is one browser tab (sessionStorage).

- **Every new session starts Uncalibrated.** Calibrating is the experience, so it isn't remembered across visits.
- **Calibrated is one-way within a session.** There is no "uncalibrate". Reloading, or going to `/projects` and back, keeps the session Calibrated.
- **Setting values persist for the session**, so a round trip through `/projects` doesn't lose the visitor's tweaks.
- **Other pages use designed values until the session is Calibrated.** A visitor who deep-links to `/projects`, or leaves before calibrating, shouldn't have to solve the puzzle to read your work. After Calibration, **Global Settings** (Theme, CRT effects, typography) follow the visitor everywhere; **Landing Settings** only ever affect `/`.

## Boot Screen

- Shown **once per session, on `/` only**: the owner's name in ASCII art and a progress bar, about 1.5–2s, then a short CRT flash (under 300ms) into the Uncalibrated page. Deep links load immediately, because a recruiter opening `/projects` shouldn't wait for an intro.
- **Skippable**: Escape or Space, or a tap on touch screens. The skip hint only appears after the first keypress, pointer move or touch, so the screen stays clean at first. **Tab ends it and focuses Skip to calibrated**, because a keyboard user pressing Tab wants to navigate.
- The bar's fill is a **fixed-length animation, not real loading progress**. Real progress would make the timing unpredictable and be nearly instant on fast connections.
- **Not in the server-rendered HTML.** An inline `<head>` script turns it on before first paint. Crawlers and AI agents that don't run JavaScript get the real page. Googlebot, which does run JavaScript, may render the overlay, but the content stays in the DOM and is indexed as normal. There is no user-agent sniffing: it's fragile and gets close to cloaking.
- **Reduced motion**: the name and a full bar are shown briefly, with a hard cut. Screen readers hear the name once, from visually hidden text, and the ASCII art is hidden from them.

## Uncalibrated

- **Hand-authored, not randomised.** A fixed chaotic arrangement and fixed starting values guarantee the page stays usable and testable. Randomising would eventually produce a combination that hides something important.
- **Everything takes part**, including your name, role and the nav links. The only exception is the Calibrate Prompt.
- **The chaos is only visual.** DOM order, semantics and keyboard operation are the same as in the Calibrated page. Automated accessibility checks may fail only on an explicit allow-list of visual rules the chaos breaks on purpose (e.g. colour contrast), never on structural ones (names, roles, landmarks, focus).
- **Low readability comes from Settings like brightness, size and bloom, not colour**, because Themes are fixed presets (green, orange) rather than a colour range.
- **Skip to calibrated** is the first stop in the tab order, hidden until focused, the way Google shows "Skip to main content". It Calibrates instantly.
- **The arrangement is not a Setting.** Only Calibrate rearranges elements. An Instrument that moved other Instruments, or itself, would be disorienting and would break focus order. Landing Settings change how the page *feels* (spacing, alignment, sizing, skew), not where things sit.

## Calibrate Prompt and Calibrate

- The Calibrate Prompt is a **call to action in the bottom-right corner** (a bottom bar on mobile) with a witty line, not a plain "Calibrate" button. It is **always readable and never part of the chaos**, because if visitors can't find it, most of them never see the payoff.
- **Not a dialog**: a labelled `<aside>` with a real button, and no focus trap. A dialog would take over the page. The library component is `Window`, not `Dialog`, because a `Dialog` that isn't one would mislead the package's consumers; a real modal would get that name later.
- **Minimise, never close.** It never permanently covers Instruments on small screens, and it's always easy to bring back.
- **The Calibrate animation runs in three stages over about 2–3s**:
  1. A sequence led by the Readouts: counters, warning lights clearing, a "CALIBRATING" line. It avoids a progress bar because the Boot Screen already uses one.
  2. Settings sweep to their designed values.
  3. Elements move into the Calibrated arrangement.

  Settings go before layout so visitors can follow what's happening. With reduced motion on, it's instant.
- **After Calibration** the Prompt says "Nice, right? Let's talk ->", linking to `/contact`. That's the moment a visitor is most likely to get in touch. It also offers **Recalibrate**, the same animation from the current values, as a secondary button.
- **Instruments stay live after Calibration.** The visitor can keep adjusting the page however they like; Recalibrate is the way back.

## Instruments, Readouts and Bindings

- **Instruments take input and Readouts display information.** Purely decorative pieces (the tunnel, spinning ASCII art, bitmaps) are neither, and are just library components.
- **One Instrument can drive several Settings** (a joystick's two axes), and **several Instruments can drive the same Setting**. This works because Instruments are controlled (ADR-0002).
- **Readouts show one of three kinds of data**: a Setting's value (a tachometer showing scanline count), self-driven data (a clock), or visitor activity (an odometer counting cursor distance, a "CONTRAST LOW" light that clears on Calibrate, which makes the accessibility point without spelling it out). The page supplies the value; the Readout never fetches or calculates it.
- **Bindings live in the site**, as small value ↔ Settings mappings per Instrument. Instruments take their own typed value (the joystick takes `{ x, y }`), which keeps the library free of Settings and gives package consumers a familiar controlled-component API.
- **Components are added when a page needs them.** Each new Instrument or Readout gets an issue only once a page has a concrete job for it: value type, Binding, keyboard model. The rest of the inspiration list stays as ideas.

## Accessibility

- **Reduced motion is honoured on every page**: flicker, grain and the hum bar are off, and transitions are instant. The chaos stays, just without the motion. We don't start these visitors Calibrated, because that removes the joke without any real accessibility gain.
- Every Instrument can be operated by keyboard, with a standard ARIA pattern (e.g. a knob is a `role="slider"`).

## Mobile

**The same concept in a single scrollable column**, with fewer Instruments. The chaos comes from rotation, sizing and clashing Settings rather than overlapping elements. The joke is the mess, not its exact positions, so one design covers every screen size.

## Library boundary

`@tlannigan/crt` (see ADR-0001) contains `CrtMonitor`, every Instrument and Readout, the decorative components, `Window`, and the theme tokens. The site contains Settings, Bindings, Calibrate, session persistence and page layouts. Library CSS loads automatically when a component is imported, so consumers need no Tailwind setup.

## Verification

Acceptance criteria are written as runnable checks:
- Vitest for Settings and Binding logic
- Storybook story tests (with a11y) for components
- Playwright e2e tests with axe for pages, each test in a fresh browser context, which is also a fresh session

The MCP servers in `.mcp.json` support day-to-day iteration but don't replace tests. Screenshot comparison isn't used, because the CRT effects are animated.
