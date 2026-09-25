# Landing page design

The Calibrated design of `/`, decided in #3. #4 builds it, and #7 designs the Uncalibrated values against it. Terms in **bold** are defined in [`CONTEXT.md`](../CONTEXT.md), and the rules behind them are in [`landing-page-spec.md`](./landing-page-spec.md).

## Settings

Every Setting has a designed value, which Calibrate sets. Its Uncalibrated value is decided in #7.

Continuous CRT Settings run from 0 to 1, where 0 means the effect is absent. How that range maps to CSS is up to the implementation, with one constraint: the designed value must reproduce today's `CrtMonitor` default look. Bloom and grain need room above their designed value, so the Uncalibrated page can overdo them.

### Global Settings

| Setting | Values | Designed |
|---|---|---|
| Theme | `green` \| `orange` | `green` |
| Font family | `vga` \| `plex` | `vga` |
| Base font size | px | 16 |
| Brightness | 0–1 | 1 |
| Contrast | 0–1, where 1 is today's black background and lower values lift it toward the phosphor colour | 1 |
| Focus | 0–1 blur, 0 is sharp | 0 |
| Convergence | 0–1 red/blue fringe offset, 0 is aligned | 0 |
| Bloom | 0–1 glow strength (replaces `hasBloom`) | today's glow |
| Grain | 0–1 noise strength (replaces `hasGrain`) | today's grain |
| Scanline count | 16–1000 | 240 |
| Scanlines, flicker, hum bar, phosphor mask, edge shadow, corner reflection | on \| off | on |

### Landing Settings

| Setting | Values | Designed |
|---|---|---|
| Spacing | gap between pieces | tuned in #4 |
| Alignment | text alignment inside every piece: `left` \| `center` \| `right` | `center` |
| Skew | angle | 0 |
| Instrument sizing | scale of each Instrument and Readout | 1 |
| H size, V size | scale of the whole board on each axis | 1, 1 |
| Graticule | 0–1 visibility of a grid behind the board | faint, tuned in #4 |
| Calibrate Prompt position | `{ x, y }` within the viewport | bottom-right corner |

## Instruments

Every Setting except the on/off effects has exactly one Instrument on desktop. The on/off effects are set only by Calibrate: most of them are subtle enough that a switch for them would seem to do nothing.

| Instrument | Component | Value | Binding |
|---|---|---|---|
| PHOSPHOR | Switch | `'green' \| 'orange'` | Theme |
| FONT | Switch | `'vga' \| 'plex'` | Font family |
| SIZE | Knob | px | Base font size |
| BRIGHT | Knob | 0–1 | Brightness |
| CONTRAST | Knob | 0–1 | Contrast |
| FOCUS | Knob | 0–1 | Focus |
| CONV | Knob | 0–1 | Convergence |
| BLOOM | Slider | 0–1 | Bloom |
| GRAIN | Slider | 0–1 | Grain |
| SCANLINES | Knob | 16–1000 | Scanline count |
| H SIZE | Knob | scale | H size |
| V SIZE | Knob | scale | V size |
| SKEW | Knob | angle | Skew |
| SPACING | Slider | gap | Spacing |
| INST SIZE | Slider | scale | Instrument sizing |
| GRATICULE | Slider | 0–1 | Graticule |
| ALIGN | Rotary selector | `'left' \| 'center' \| 'right'` | Alignment |
| PROMPT | Joystick | `{ x, y }`, each −1 to 1 | x and y → Calibrate Prompt position |

The joystick is a position control: where the stick points is where the Prompt goes, so full down-right is the bottom-right corner, and a Calibrated stick rests there.

## Readouts

| Readout | Component | Value | Data |
|---|---|---|---|
| Scanline counter | 7-segment display | digits | Setting: Scanline count |
| Clock | 7-segment display | `HH:MM` | self-driven: local time |
| Warning lights | Warning light, one per Setting below | lit or not | Setting: lit while outside its readable range |
| Status line | Terminal line | `UNCALIBRATED` → `CALIBRATING` → `CALIBRATED` | visitor activity: Calibrate |
| Radar | Radar | `{ x, y }` blip | Setting: Calibrate Prompt position |
| Odometer | Odometer | distance | visitor activity: cursor travel |
| SIGNAL | ProgressBar (exists) | 0–100 | Settings: 100 when every Setting is at its designed value |

The warning lights are BRIGHT LOW, CONTRAST LOW, FOCUS, CONV, BLOOM HIGH and TEXT SMALL. Each Setting's readable range is set in #4. All the lights are lit while Uncalibrated and clear during Calibrate's first stage.

## Layout

Key: `(x)` knob, `|x|` slider, `[x]` switch or rotary selector, `■` warning light, `[8.8.8]` 7-segment display.

### Desktop

A cockpit in three columns that fits one 1280×800 screen without scrolling. The Monitor panel holds the Global Instruments, the centre column holds the Readouts with the radar as its centrepiece, and the Geometry panel holds the Landing Instruments. The Calibrate Prompt floats in the bottom-right corner, and the Geometry panel leaves that corner empty.

```
┌────────────────────────────────────────────────────────────┐
│ TRISTAN LANNIGAN · frontend developer  [PROJECTS] [CONTACT]│
├───────────────┬────────────────────────────┬───────────────┤
│ MONITOR       │ > CALIBRATED_        12:34 │ GEOMETRY      │
│ [PHOS] [FONT] │                            │ (H) (V)       │
│ (SIZE) (BRT)  │       .   RADAR   .        │ (SKEW) [ALGN] │
│ (CON)  (FOC)  │     .       +       .      │ |SPC| |INS|   │
│ (CONV) (SCAN) │       .           .        │ |GRT|         │
│ |BLM|  |GRN|  │                            │               │
│ [8.8.8] SCAN  │ ■ ■ ■ ■ ■ ■     ODO 004213 │    (o) JOY    │
│               │ SIGNAL ██████████░░        │ ┌───────────┐ │
│               │                            │ │ PROMPT    │ │
│               │                            │ └───────────┘ │
└───────────────┴────────────────────────────┴───────────────┘
```

### Mobile

One column with only the Monitor panel's Instruments, whose Settings follow the visitor to other pages. The Geometry panel is left out, because skew and H/V size easily cause sideways scrolling on a narrow screen. The radar and odometer are left out too, since there is no joystick to move the Prompt and no cursor to count. The Calibrate Prompt is a bottom bar, and the page leaves room above it so it never covers the last row.

```
┌──────────────────────────────┐
│ TRISTAN LANNIGAN             │
│ frontend developer           │
│ [PROJECTS] [CONTACT]         │
├──────────────────────────────┤
│ MONITOR                      │
│ [PHOS] [FONT]  (SIZE)        │
│ (BRT)  (CON)   (FOC)         │
│ (CONV) (SCAN)  [8.8.8] SCAN  │
│ |BLOOM|  |GRAIN|             │
├──────────────────────────────┤
│ > CALIBRATED_        12:34   │
│ ■ ■ ■ ■ ■ ■                  │
│ SIGNAL ██████████░░          │
├──────────────────────────────┤
│ PROMPT (bottom bar)          │
└──────────────────────────────┘
```

### Reading and tab order

DOM order follows the desktop reading order, and mobile keeps it (the pieces it leaves out are simply not shown):

1. Skip to calibrated
2. Header (`<header>`): name as the `<h1>`, role, and nav to `/projects` and `/contact`
3. Monitor panel (`<section>` headed MONITOR), Instruments left to right, top to bottom
4. Readouts column (`<section>` headed TELEMETRY): status line, clock, radar, warning lights, odometer, SIGNAL
5. Geometry panel (`<section>` headed GEOMETRY), ending with the joystick
6. Calibrate Prompt (`<aside>`)

### Designed values set by the layout

- Alignment: `center`, since cockpit labels sit centred under their controls.
- Spacing and Graticule: tuned by eye in #4, with owner sign-off. Graticule should stay faint enough that it never competes with the Readouts.
