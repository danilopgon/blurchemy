## Exploration: editor-import-foundation

### Current State
Blurchemy is currently a clean Angular CLI 22 standalone application foundation. The app still renders the generated Angular placeholder template from `src/app/app.html`, with a minimal root component in `src/app/app.ts` and baseline TestBed coverage in `src/app/app.spec.ts`.

Project documentation already defines Blurchemy as a browser-only creative image-processing app where imported images remain local to the browser. The documented three-spec plan identifies this first slice as the editor shell and safe local image import foundation, before any creative processing, presets, randomizer, or export work.

OpenSpec is initialized with Strict TDD enabled. The active test stack is Vitest through Angular's unit-test builder, Angular Testing utilities/TestBed, strict type checking, linting, formatting, and production build verification. Playwright, visual regression tooling, coverage thresholds, and Angular Testing Library are documented as future or optional layers, not active dependencies.

Impeccable design context files (`PRODUCT.md`, `DESIGN.md`, and `.impeccable.md`) are now present in the project root. They define the first-slice product decisions and the dark creative workspace direction for the SDD proposal.

### Affected Areas
- `src/app/app.ts` — root application component currently owns only the generated title signal and will need to host or route to the editor shell for the first slice.
- `src/app/app.html` — generated Angular starter content should be replaced by the editor/import foundation UI during implementation.
- `src/app/app.css` and `src/styles.css` — currently empty/minimal styling entry points; first slice should establish responsive editor layout styling without premature design-system extraction.
- `src/app/app.spec.ts` — current placeholder assertions must evolve into tests for rendering the editor shell, initial state, import controls, and accessible error/status output.
- `docs/sdd-spec-plan.md` — defines the intended first-spec scope and non-goals.
- `docs/architecture.md` — defines the browser-only boundary, future feature layer, Signals state approach, and processing isolation requirement.
- `docs/image-processing-pipeline.md`, `docs/presets.md`, `docs/export.md` — clarify future areas that must remain out of scope for this first spec.
- `openspec/config.yaml` — defines Strict TDD, active testing layers, quality commands, and project-specific SDD constraints.

### Approaches
1. **Root-hosted editor foundation** — Replace the generated root template with the first editor shell directly in the root application component, with small local helpers or models as needed.
   - Pros: Smallest first slice, minimal routing or feature-structure overhead, easy to verify with existing TestBed/Vitest setup.
   - Cons: Can become crowded if import state, validation, and preview orchestration grow in the root component.
   - Effort: Low

2. **Feature-folder editor component** — Create a focused `features/blurchemy-editor` surface and let the root component host it.
   - Pros: Aligns with the documented architecture, gives the editor shell a clear home, keeps the root component thin, and prepares future controls/pipeline work without adding backend or storage assumptions.
   - Cons: Slightly more structure for the first slice; proposal/design must keep it lean to avoid premature abstraction.
   - Effort: Medium

3. **Full import service boundary now** — Define a browser-only image import/validation service plus editor component state in the first spec.
   - Pros: Testable seam for file validation, object URL lifecycle, and future image decoding behavior; keeps file handling out of templates.
   - Cons: Risk of over-designing before actual processing exists; must avoid implementing algorithmic processing, persistence, export, or worker concerns.
   - Effort: Medium

### Recommendation
Use a lean feature-folder editor component hosted by the root application, plus a minimal browser-only import boundary only where it improves testability. The first spec should cover the editor shell, local drag-and-drop and file-picker affordances, accepted type validation for JPG/JPEG/PNG/WebP, preview-area states, accessible status/error messaging, responsive layout behavior, and object URL cleanup expectations.

The proposal should explicitly keep image effect algorithms, processed rendering quality, presets/randomizer, export, backend, authentication, database, storage, telemetry, and external APIs out of scope. The processed preview region should exist as an honest placeholder in the two-panel layout and must not imply completed processing.

Testing should start with the existing dependency set. The first spec does not need Playwright, visual regression, coverage tooling, or Angular Testing Library unless the proposal intentionally requires richer user-centric interaction ergonomics than TestBed can reasonably provide. Recommended verification layers are TestBed/Vitest component tests for shell/import states and pure utility/service tests for validation and browser-boundary behavior. E2E can wait until there is a meaningful flow such as import image, apply effect, export.

### First-Spec Scope Inputs
- App/editor shell with clear product identity and first-run guidance.
- Local image import through file picker and drag-and-drop.
- File type validation for JPEG, PNG, and WebP, plus file size and pixel-dimension limits.
- Initial editor state, selected-image state, validation-error state, and reset/retry path.
- Preview area foundations for original and future processed preview regions.
- Accessibility foundations: keyboard-reachable import control, visible focus, screen-reader-friendly status/error messages, semantic headings/regions, and WCAG AA contrast.
- Responsive foundations for small screens and desktop workspace layouts.
- Strict TDD coverage using current Vitest/TestBed capabilities before implementation.

### Out of Scope for First Spec
- Blur, grain, gradient maps, bloom, chromatic aberration, vignette, color leak, edge dissolution, or any image effect algorithms.
- Preset data contracts, preset browser, randomizer, and named creative looks.
- PNG/WebP export, scale multipliers, export warnings, or downloaded output guarantees.
- Backend, authentication, database, cloud/local persisted storage, telemetry, external APIs, or image upload/transmission.
- Web Worker, WebGPU, OffscreenCanvas, visual regression baselines, and E2E automation unless a later design proves they are needed.

### Product Decisions for Proposal
1. Show both Original and Processed panels from the first slice; the Processed panel is an honest placeholder until the pipeline is implemented.
2. Validate file type, file size, and pixel dimensions locally.
3. Use **Replace image** as the primary post-import action, with **Remove** as secondary.
4. Use a dark creative workspace direction with a restrained cyan accent.
5. Target WCAG AA, large touch targets, screen-reader live announcements, and reduced-motion support.

### Risks
- `PRODUCT.md` and `DESIGN.md` are now available as handoff inputs; proposal work should keep them aligned with OpenSpec artifacts so product/design guidance does not drift.
- Drag-and-drop and file input behavior can be hard to test completely in jsdom; keep browser-boundary logic small and test deterministic validation separately.
- Object URLs and image decoding can leak memory or create flaky behavior if lifecycle cleanup is not specified.
- A processed-preview placeholder could mislead users or docs into implying effects are implemented; copy must be explicit.

### Ready for Proposal
Yes. The next proposal round should use this exploration plus `PRODUCT.md`, `DESIGN.md`, and `.impeccable.md` to define a tight first slice, and state that the existing dependency set is sufficient unless the accepted proposal expands into E2E, visual regression, or Testing Library-specific ergonomics.
