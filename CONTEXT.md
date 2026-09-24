# Project CRT

A portfolio site viewed as if through a CRT monitor, plus a retro-instrument component library published alongside it. The landing page opens as a chaotic board of Instruments that the visitor can Calibrate into a well-designed page.

## Language

**Instrument**:
An interactive, retro-styled input on the landing page (knob, joystick, radar, 7-segment display) that drives one or more Settings. It never holds the state it drives.
_Avoid_: Widget, control, input (note: in real cockpits "instrument" means a display; here it means an input)

**Readout**:
A retro-styled, display-only piece (7-segment display, odometer, compass, radar) that shows information but never changes a Setting. What it shows is supplied from outside: a Setting's value, self-driven data (the time), or visitor activity (cursor distance travelled).
_Avoid_: Gauge, indicator, display, instrument

**Setting**:
One piece of the landing page's design, layout or theme state (phosphor colour, scanline count, font size) that Instruments drive. More than one Instrument can drive the same Setting.
_Avoid_: Option, preference, config

**Global Setting**:
A Setting that applies on every page for the session (phosphor colour, CRT effects, typography). Other pages use their designed values until the session is Calibrated, and the visitor's values after that.

**Theme**:
A named phosphor preset (currently green and orange) that sets the page's foreground colour. Choosing a Theme is a Global Setting; Themes are discrete choices, never a continuous range.
_Avoid_: Palette, colour scheme, hue

**Landing Setting**:
A Setting that only affects the landing page (spacing, alignment, skew, Instrument sizing).
_Avoid_: Board setting, local setting

**Boot Screen**:
The screen shown once per session, on the landing page only, before the Uncalibrated layout appears: the owner's name in ASCII art with a progress bar filling beneath it. It never replaces or hides the page's content from crawlers and agents; it only covers the page visually.
_Avoid_: Splash screen, loading screen, intro

**Uncalibrated**:
The chaotic state every new session starts in: everything on the landing page (Instruments, Readouts, name, nav) scattered and Settings at poor values, but still fully keyboard- and screen-reader-usable.
_Avoid_: Broken, ugly, scrambled

**Calibrated**:
The state of a session once Calibrate has run: the landing page has been brought to its designed, accessible look, and that session never returns to Uncalibrated. Instruments stay live, so the visitor can change Settings freely afterwards without the session becoming Uncalibrated again.
_Avoid_: Fixed, clean, final

**Calibrate**:
The action (and its animated transition) that moves the Instruments into their designed arrangement and sets every Setting to its designed value. It only ever moves toward Calibrated; running it again after Calibration is **Recalibrate**. It is the only thing that changes the Instruments' arrangement.
_Avoid_: Fix, reset, tidy, uncalibrate

**Binding**:
The mapping from one Instrument's value to the Setting(s) it drives, e.g. joystick x → hue, joystick y → bloom. Bindings belong to the site; Instruments know nothing about Settings.
_Avoid_: Wiring, connection

**Calibrate Prompt**:
The call to action in the bottom-right corner of the landing page, and the one thing exempt from Uncalibrated chaos. Before Calibration it invites the visitor to Calibrate; afterwards it says "Let's talk" (linking to contact) and offers Recalibrate. It can be minimised but never closed, and it is not a dialog.
_Avoid_: CTA, dialog, modal, popup

**Skip to calibrated**:
The first stop in the tab order. Hidden until the visitor starts keyboard navigation, it jumps straight to the Calibrated state.
