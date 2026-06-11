# SDD Spec Plan

Blurchemy should be implemented through three focused SDD specs. The app is intentionally small enough to avoid excessive ceremony, but the responsibilities are different enough that one large spec would hide architectural decisions.

## Spec 1: Editor Foundation and Image Import

Purpose: establish the editor shell and safe local image input without implementing the full creative pipeline.

Scope:

- Editor layout foundation.
- Drag-and-drop and file picker input.
- JPG, JPEG, PNG, and WebP validation.
- Original and processed preview regions.
- Initial Signals-based editor state.
- Browser-only image handling boundaries.
- Clear separation between UI orchestration and future processing logic.

Non-goals:

- Full processing effects.
- Preset system.
- Export workflow.

## Spec 2: Processing Pipeline and Creative Controls

Purpose: introduce the browser-local rendering pipeline and the main creative controls.

Scope:

- Processing pipeline contracts and execution flow.
- Gaussian blur, motion blur, and zoom blur controls.
- Gradient mapping with editable color stops.
- Film, digital, and dust grain modes.
- Edge dissolution.
- Bloom, chromatic aberration, vignette, and color leak.
- Render performance boundaries, including avoiding expensive pixel work inside `computed` Signals.
- Testable pure utilities and service boundaries for Canvas/ImageData behavior.

Non-goals:

- Final export guarantees.
- Preset browsing polish.
- Web Worker or WebGPU acceleration unless needed to keep the first implementation usable.

## Spec 3: Presets, Randomizer, and Export

Purpose: turn the editor into a usable creative instrument with reusable looks and output.

Scope:

- Preset data contracts and preset browser.
- Dream, Dune, Blade Runner, Noir, and Hotel Sur presets.
- Hotel Sur accent-color constraints for `#f55033`.
- `Ruin My Image` randomizer with visually safe ranges.
- PNG and WebP export.
- 1x, 2x, and 4x resolution multipliers.
- Preserve aspect ratio.
- Export the processed image as previewed.

Non-goals:

- Animated exports.
- MP4 or GIF export.
- Preset marketplace, cloud storage, account sync, or external APIs.

## Delivery Guidance

- Use one technical design across the three specs so the architecture remains coherent.
- Implement by vertical slices, not by file type.
- Keep each pull request reviewable; future feature work uses the 800-line review budget and asks before exceeding it.
- Do not introduce backend, authentication, telemetry, storage, or external API assumptions.
- Keep generated artifacts and product documentation in professional English.
