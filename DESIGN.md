# DESIGN.md — Blurchemy

> **Scope.** Visual and interaction design target for **`editor-import-foundation`** (Spec 1). It documents the intended dark studio shell, the two-panel workspace, the four import states, and the system tokens behind them as handoff guidance for the SDD proposal. Effects, presets, and export are out of scope (see PRODUCT.md). Where a value is given, treat it as a reference target for implementation.

---

## 1. Design principles

1. **The canvas is the subject.** UI chrome is quiet and dark so the imported image is the brightest thing on screen. No decorative gradients competing with content.
2. **Honesty over hype.** Nothing fakes a capability that isn't built. The Processed panel openly says effects come later; no disabled buttons tease Spec 2.
3. **Technical truth, legibly.** File facts (format, dimensions, size) are shown in monospace, treated as data — precise, never decorative.
4. **Every state is designed.** Empty, importing, imported, and error are first-class compositions, not afterthoughts. The error state names the exact rule that failed.
5. **Calm, tactile, darkroom.** Warm-neutral darks, a single cool accent, restraint with motion. The tool should feel like a focused workspace, not a marketing page.

## 2. Visual direction

A **dark creative workspace**. Warm-neutral near-blacks for the shell, panels floating on a subtly lit background, a transparency checkerboard inside each panel to read the image as a real asset. One **cyan** accent carries brand, focus, primary action, and active states — used sparingly so it always means "this matters." A light theme is provided as a toggle but dark is the default and the canonical look.

## 3. Color tokens

All colors are authored in **oklch** for perceptual consistency; the accent is stored as hex (chosen via Tweaks) and its press/ink derivatives are computed from it.

### Dark theme (default)

| Token                       | Value                             | Role                                         |
| --------------------------- | --------------------------------- | -------------------------------------------- |
| `--bg`                      | `oklch(0.16 0.004 70)`            | App background base                          |
| `--bg-grad`                 | `oklch(0.19 0.005 70)`            | Soft radial lift behind the top of the stage |
| `--surface`                 | `oklch(0.205 0.005 70)`           | Panel surface, top bar, status bar           |
| `--surface-2`               | `oklch(0.245 0.006 70)`           | Raised chips, icon wells, panel headers      |
| `--surface-3`               | `oklch(0.285 0.007 70)`           | Highest raised surface                       |
| `--border`                  | `oklch(0.32 0.006 70)`            | Default hairline borders                     |
| `--border-strong`           | `oklch(0.42 0.007 70)`            | Emphasized borders, dividers                 |
| `--text`                    | `oklch(0.96 0.003 80)`            | Primary text                                 |
| `--text-dim`                | `oklch(0.74 0.005 80)`            | Secondary text, labels                       |
| `--text-faint`              | `oklch(0.56 0.006 80)`            | Tertiary / metadata captions                 |
| `--checker` / `--checker-2` | `oklch(0.24 …)` / `oklch(0.21 …)` | Transparency checkerboard inside panels      |

### Accent (cyan — locked) & semantic

| Token              | Value                      | Role                                                      |
| ------------------ | -------------------------- | --------------------------------------------------------- |
| `--accent`         | `#46c8d8`                  | Brand mark, primary button, focus ring, active drop state |
| `--accent-press`   | derived (≈ −12% lightness) | Pressed/hover state of primary action                     |
| `--accent-ink`     | derived (dark ink on cyan) | Text/icon **on** the accent fill                          |
| `--danger`         | `oklch(0.70 0.17 25)`      | Error text and error iconography                          |
| `--danger-surface` | `oklch(0.30 0.07 25)`      | Error-state panel wash                                    |
| `--danger-border`  | `oklch(0.45 0.12 25)`      | Error icon well border                                    |
| `--warn`           | `oklch(0.80 0.13 85)`      | Reserved for soft warnings                                |

**Accent usage rule:** cyan appears at most a few times per screen — the brand dot, the primary action, the focus ring, the active dropzone glow, and the imported status dot. It is never used for body text or large fills.

**Light theme** mirrors the same roles with inverted lightness (`--bg ≈ oklch(0.95 …)`, `--surface ≈ oklch(0.995 …)`, text in the `0.24–0.60` range) and a slightly deepened accent (`oklch(0.58 0.15 …)`-class) so contrast stays AA on light fills.

## 4. Typography

| Family                  | Use                                                                                     | Notes                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Archivo** (grotesque) | All UI text — brand, buttons, titles, body copy                                         | Weights 400/500/600/700/800. Tight tracking on headings (`-0.01em`/`-0.02em`). |
| **JetBrains Mono**      | Technical data — metadata read-out, panel labels, version chip, spec pills, error codes | Weights 400/500/600. This is the "data is true" signal.                        |

**Scale (Spec 1 surfaces):**

| Element                               | Size / weight                                              |
| ------------------------------------- | ---------------------------------------------------------- |
| Brand name                            | 18px / 800                                                 |
| State title (empty, error, importing) | 19px / 700                                                 |
| Processed placeholder title           | 16px / 700                                                 |
| Body copy                             | 13.5–14px / 400, `line-height ≈ 1.55`, `text-wrap: pretty` |
| Primary button                        | 14.5px / 700                                               |
| Panel label (mono, uppercase)         | 11.5px / 600, `letter-spacing 0.14em`                      |
| Metadata value (mono)                 | 11.5px / 500                                               |
| Metadata key (mono, uppercase)        | 10px / 600, `letter-spacing 0.1em`                         |
| Captions / pills (mono)               | 10.5–11px                                                  |

Minimum on-screen text is ~10px and reserved for mono micro-labels (keys, pills); all reading copy is ≥ 13.5px.

## 5. Layout & space

- **Shell grid:** three rows — top bar (64px), workspace stage (fills), status bar (42px) — locked to `100vh` with no page scroll.
- **Workspace split:** two equal-structure panels with a **40 / 60** default ratio (Original / Processed), giving the eventual result the larger stage. Tweakable to 50/50 or 60/40. Gap between panels: 22px. Stage padding: 22px.
- **Responsive:** at ≤ 860px the split stacks vertically (Original above Processed); panel canvases switch to a viewport-relative height so both remain usable; no horizontal scroll.
- **Radii:** panels `14px` (`--radius`), controls `11px`, small chips `6–9px`.
- **Elevation:** panels use a subtle inset top-highlight plus a soft drop shadow (`--shadow`); the imported image gets its own deeper contact shadow to lift it off the checkerboard.

## 6. The two panels

**Original** — the working panel. Header shows the mono label `ORIGINAL` and, once imported, the pixel dimensions. The body is the canvas: a transparency checkerboard hosting the empty/importing/imported/error states.

**Processed** — the honest placeholder. Header shows `PROCESSED` plus a `🔒 later release` chip. The body is a distinct diagonal-hatch surface (visually "not active yet") with a centered message explaining that processed output will render here once the pipeline is implemented, and a mono line `// pipeline: not yet implemented`. It never renders an image in Spec 1.

## 7. Component states

### Empty / dropzone (Original)

Centered composition: a rounded icon well (upload glyph, cyan), title _"Drop an image to begin,"_ a one-line instruction with an inline **browse your device** text button, a row of format pills (`JPEG` `PNG` `WebP`) and limits (`up to 20 MB`, `max 6000 × 6000 px`), and a privacy note: _"Images never leave your browser. Nothing is uploaded."_ The whole panel is the drop target and is keyboard-focusable.

### Drag-over

The canvas shows an inset cyan ring and a soft cyan inner glow; the icon well scales up slightly and tints cyan; the title switches to _"Drop to import."_ Depth-counted enter/leave so child elements don't cause flicker.

### Importing / validating

Cyan spinner, title _"Reading image…,"_ subtitle _"Validating format, size and dimensions locally."_ Brief; covers the decode.

### Imported

The image is rendered `object-fit: contain` within the panel on the checkerboard, with a contact shadow. Header gains dimensions; status bar fills with metadata; primary action becomes **Replace image**, with **Remove** secondary.

### Error

The canvas turns to the danger wash, a danger-tinted alert icon well, a danger-colored title naming the failure (_Unsupported format_ / _File is too large_ / _Dimensions too large_ / _Couldn't read that image_), a plain-language detail line, a mono `rejected: …` code line, and a **Try another image** action.

## 8. Iconography

Simple geometric line glyphs, `1.7–1.8` stroke, `currentColor`, round caps/joins: **upload**, **swap** (replace), **lock** (later release), **alert** (error), **spark** (processed placeholder), **close**. No filled or multicolor icons; they inherit text/accent color by context.

## 9. Brand mark

A solid cyan dot with a second, blurred, offset cyan dot behind it — a literal "blur + alchemy" glyph. Small (30px), paired with the wordmark "Blurchemy" (800) and a mono tagline _"image studio · local-only."_

## 10. Motion

- Transitions are short (`.18s ease`) and limited to: dropzone ring/glow, icon-well scale on drag-over, background-color shifts between states, button press.
- One looping animation only: the import spinner (`0.8s linear`).
- No entrance/parallax/decorative motion.
- `prefers-reduced-motion: reduce` collapses all transitions/animations to ~0ms (the spinner still indicates progress but without spin reliance for meaning — state is also announced via live region).

## 11. Accessibility

- **Target:** WCAG AA, extended with large touch targets and careful screen-reader support.
- **Contrast:** all text and meaningful UI meets AA on its surface in both themes; the cyan primary uses computed dark **ink** so label contrast holds on the accent fill.
- **Keyboard:** the dropzone is a focusable control (Enter/Space opens the picker); all actions are reachable in a logical tab order; focus ring is a 2.5px cyan outline with offset, never suppressed.
- **Touch targets:** interactive controls are ≥ 44 × 44px.
- **Screen readers:** a polite `aria-live` region announces each state transition — importing, imported (with filename, dimensions, size), and the specific error. The hidden file input is excluded from the tab order and labelled via the visible control.
- **Focus integrity:** state changes keep focus sensible (e.g. error state surfaces an actionable retry control).

## 12. Tokens & theming summary

The design target is fully tokenized (color, radius, shadow, font) on `:root`, with a `[data-theme="light"]` override block. The **accent** is the one runtime-variable token: selecting a swatch in Tweaks sets `--accent` and recomputes `--accent-press` and `--accent-ink` so contrast and press states stay coherent for any accent. **Cyan `#46c8d8` is the intended default.**

**Reference-only Tweaks** (design controls, not product features): theme (dark/light), accent swatch (cyan default), panel split ratio (40/60 default), and primary CTA copy. These exist to explore the design direction; they are not part of the Spec 1 product surface.

## 13. Fidelity note

This document describes the intended Spec 1 design direction for `editor-import-foundation`. Treat it as a handoff reference for spacing, behavior, rationale, and token decisions during SDD proposal and implementation work. Any interactive behavior described here still needs to be implemented and verified in the Angular application before it can be treated as shipped behavior.
