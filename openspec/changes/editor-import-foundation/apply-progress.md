# Apply Progress: Editor Import Foundation

## Completed Slices

- Slice 1 / stacked-to-main PR 1: import domain, validation helpers, image decode seam, metadata formatting, and Object URL lifecycle seam.
- Slice 1b refactor: split the temporary mixed-responsibility import seam into Angular/Screaming responsibility folders without behavior changes.
- Slice 2 / stacked-to-main PR 2: standalone editor component state and interactions around the existing import seam.

Root app hosting, final full styling pass, image processing, persistence, upload, telemetry, backend, effects, export, presets, and new dependencies remain out of scope.

## Completed Tasks

- [x] 1.1 RED: Added `src/app/features/blurchemy-editor/image-import.spec.ts` for accepted formats, 20 MB limit, 6000 px dimension limit, ordered failures, metadata formatting, unreadable decode, and URL revoke calls.
- [x] 1.2 GREEN: Created the import seam with strict types, constants, validation helpers, result models, injectable decode seam, and Object URL lifecycle seam.
- [x] 1.3 REFACTOR: Kept helpers pure/testable where practical, browser-only at the decode/Object URL boundary, and avoided `any`, persistence, network, telemetry, storage, upload, Playwright, Testing Library, visual regression, coverage dependencies, and new runtime dependencies.
- [x] Slice 1b: Refactored the import seam into feature responsibility folders (`types`, `constants`, `validators`, `formatters`, `ports`, and `adapters`) without changing behavior.
- [x] 2.1 RED: Added `editor.component.spec.ts` for initial shell, honest Processed placeholder, picker/drop validation start, importing/imported/error/empty states, metadata, replace/remove, live region, and focus behavior.
- [x] 2.2 GREEN: Created `editor.component.ts/html/css` with Signals for state, drag depth, metadata, errors, current URL, announcements, picker and drop handlers, and destroy cleanup.
- [x] 2.3 REFACTOR: Kept Canvas/ImageData work out of `computed`; used native control flow, `inject()`, no NgModules, and no `standalone: true`.

## Cumulative TDD Cycle Evidence

| Task     | Test File                                                    | Layer     | Safety Net                                                       | RED                                                                         | GREEN                                                                                          | TRIANGULATE                                                                                                   | REFACTOR                                                                                                 |
| -------- | ------------------------------------------------------------ | --------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1.1      | `src/app/features/blurchemy-editor/image-import.spec.ts`     | Unit      | N/A (new)                                                        | ✅ Written first; focused run failed because `./image-import` did not exist | ✅ Passed after implementation                                                                 | ✅ 7 behavior cases for accepted formats, ordered failures, unreadable decode, formatting, and URL revocation | ✅ Concrete behavior assertions, formatted                                                               |
| 1.2      | `src/app/features/blurchemy-editor/image-import.spec.ts`     | Unit      | N/A (new)                                                        | ✅ Covered by 1.1 tests before production file existed                      | ✅ `pnpm run test` passed 9/9 at Slice 1                                                       | ✅ Different inputs forced real validation order and lifecycle logic                                          | ✅ Strict exports, discriminated unions, injectable ports, no `any`                                      |
| 1.3      | `src/app/features/blurchemy-editor/image-import.spec.ts`     | Unit      | N/A (new)                                                        | ✅ Refactor constraints represented by tests and quality gates              | ✅ `pnpm run lint` and `pnpm run typecheck` passed                                             | ✅ URL idempotency and decode failure paths guarded side effects                                              | ✅ Browser-only decode fallback isolated; no persistence/network/telemetry/upload                        |
| Slice 1b | `src/app/features/blurchemy-editor/image-import.spec.ts`     | Unit      | ✅ Focused import seam tests passed 7/7 before edits             | ✅ Existing approval tests captured behavior before production refactor     | ✅ Focused tests passed after responsibility-folder split                                      | ✅ Existing seven behavior cases continued to exercise distinct paths                                         | ✅ Split responsibilities and converted closed contracts/ports to `type` aliases                         |
| 2.1      | `src/app/features/blurchemy-editor/editor.component.spec.ts` | Component | ✅ `pnpm run test` passed 2 files, 9/9 tests before editor edits | ✅ `pnpm run test` failed because `./editor.component` did not exist        | ✅ Passed after component implementation                                                       | ✅ 4 behavior tests: initial shell, picker success, drop error, replace/remove lifecycle and focus            | ✅ User-visible and semantic assertions; deterministic jsdom FileList/drop helpers                       |
| 2.2      | `src/app/features/blurchemy-editor/editor.component.spec.ts` | Component | ✅ Import seam tests stayed green before wiring                  | ✅ 2.1 tests defined component API and injection tokens first               | ✅ `pnpm run test` passed 3 files, 13/13 tests                                                 | ✅ Empty, importing, imported, error, replace, and remove paths forced real orchestration                     | ✅ Decode and Object URL work remains behind ports/adapters                                              |
| 2.3      | `src/app/features/blurchemy-editor/editor.component.spec.ts` | Component | ✅ Component tests stayed green before refactor/format pass      | ✅ Refactor constraints covered by tests and quality gates                  | ✅ `pnpm run lint`, `pnpm run typecheck`, `pnpm run build`, and `pnpm run format:check` passed | ✅ Lifecycle, focus, and live-region assertions guard cleanup behavior                                        | ✅ Native control flow, `inject()`, Signals, no NgModules, no `standalone: true`, no computed image work |

## Files Changed Across Completed Slices

| File                                                                          | Action               | Summary                                                                                                                                                                 |
| ----------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/features/blurchemy-editor/image-import.spec.ts`                      | Created/Modified     | Import-domain behavior tests, later updated to responsibility-folder imports.                                                                                           |
| `src/app/features/blurchemy-editor/types/image-import.type.ts`                | Created              | Closed domain contracts using `type` aliases.                                                                                                                           |
| `src/app/features/blurchemy-editor/constants/image-import.constants.ts`       | Created              | Import limits and accepted MIME-to-format mapping.                                                                                                                      |
| `src/app/features/blurchemy-editor/validators/image-import.validator.ts`      | Created              | Validation flow with type, size, decode, dimension, and metadata behavior.                                                                                              |
| `src/app/features/blurchemy-editor/formatters/file-size.formatter.ts`         | Created              | Human-readable byte formatting helper.                                                                                                                                  |
| `src/app/features/blurchemy-editor/ports/image-decode.port.ts`                | Created              | Decode port contract as a type alias.                                                                                                                                   |
| `src/app/features/blurchemy-editor/ports/object-url.port.ts`                  | Created              | Object URL port and lifecycle handle contracts as type aliases.                                                                                                         |
| `src/app/features/blurchemy-editor/adapters/browser-image-decoder.adapter.ts` | Created              | Browser image decoder adapter with `createImageBitmap` and `Image` fallback.                                                                                            |
| `src/app/features/blurchemy-editor/adapters/object-url-handle.adapter.ts`     | Created              | Idempotent Object URL handle adapter.                                                                                                                                   |
| `src/app/features/blurchemy-editor/editor.component.spec.ts`                  | Created              | Component tests for shell honesty, picker/drop import flows, success/error states, metadata, live announcements, Object URL replacement/removal, and focus restoration. |
| `src/app/features/blurchemy-editor/editor.component.ts`                       | Created              | Standalone editor component state and orchestration using Signals, injected ports, picker/drop handlers, live announcements, remove, and destroy cleanup.               |
| `src/app/features/blurchemy-editor/editor.component.html`                     | Created              | Editor shell template with top bar, Original/Processed panels, empty/importing/imported/error rendering, file input, status bar, and polite live region.                |
| `src/app/features/blurchemy-editor/editor.component.css`                      | Created              | Focused component styling for the shell, panels, checkerboard/hatch surfaces, focus rings, touch targets, responsive stacking, and reduced-motion handling.             |
| `eslint.config.js`                                                            | Modified in Slice 1b | Aligned `@typescript-eslint/consistent-type-definitions` with the project preference for `type` aliases.                                                                |
| `openspec/changes/editor-import-foundation/tasks.md`                          | Modified             | Marked Phase 1 and Phase 2 tasks complete; recorded Slice 1b note.                                                                                                      |
| `openspec/changes/editor-import-foundation/apply-progress.md`                 | Modified             | Merged cumulative apply progress, TDD evidence, verification, limitations, next slice, and rollback notes.                                                              |

## Slice 2 Behavior Statement

The editor component now supports empty, importing, imported, and error states around the existing local import seam. Valid picker/drop imports display the original image preview and metadata, invalid decodes show a specific error without a broken preview, replacements revoke the previous Object URL, remove revokes the current URL and restores focus to the import action, destroy cleanup revokes the current Object URL, and the Processed panel remains an honest later-release placeholder. No image processing, backend, persistence, telemetry, upload, external API, export, presets, or new dependencies were introduced.

## Tests and Checks Run

| Command                                                                                 | Result             | Notes                                                                                            |
| --------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| `pnpm exec vitest run --globals src/app/features/blurchemy-editor/image-import.spec.ts` | Passed             | Safety net before Slice 2 edits: 1 file, 7/7 tests passed.                                       |
| `pnpm run test`                                                                         | Passed             | Baseline before Slice 2 edits: 2 files, 9/9 tests passed.                                        |
| `pnpm run test`                                                                         | Failed as RED      | Failed on missing `./editor.component`, proving component tests preceded implementation.         |
| `pnpm run test`                                                                         | Passed             | Final Slice 2 test run: 3 files, 13/13 tests passed.                                             |
| `pnpm run format:check`                                                                 | Failed then Passed | Failed on newly created component files before formatting; passed after targeted Prettier write. |
| `pnpm run lint`                                                                         | Passed             | All files pass linting.                                                                          |
| `pnpm run typecheck`                                                                    | Passed             | Development build/typecheck completed successfully.                                              |
| `pnpm run build`                                                                        | Passed             | Production build completed successfully.                                                         |

## Limitations

- Slice 2 creates the editor component but intentionally does not update root app hosting; Phase 4 remains responsible for replacing the Angular starter shell.
- Slice 2 includes focused component styling needed for states and tests, but Phase 3 remains responsible for the fuller accessible two-panel UI and responsive token pass.
- Native browser decode behavior is represented through an injectable seam. jsdom cannot prove real image decoding or native drag/drop behavior for every browser.

## Next Slice Recommendation

Implement stacked-to-main PR 3: Phase 3 tasks 3.1-3.3 for the accessible two-panel UI and responsive styling. Start with RED component tests for semantic regions, keyboard-operable import affordances, 44 px targets, non-color-only errors, polite live region expectations, and reduced-motion hooks, then complete the visual/tokens pass without adding image processing, export, persistence, backend, telemetry, upload, external APIs, or new dependencies.

## Rollback Notes

- Rollback Slice 2 by deleting `src/app/features/blurchemy-editor/editor.component.ts`, `.html`, `.css`, and `.spec.ts`, reverting Phase 2 checkboxes in `tasks.md`, and removing Slice 2 content from this progress file.
- Rollback Slice 1b by restoring the temporary `image-import.ts`, reverting `image-import.spec.ts` imports, removing the responsibility folders, and reverting the ESLint type-definition override if the project abandons the type-alias convention.
- Rollback Slice 1 by removing the import-domain files and reverting Phase 1 checkboxes. No data migration, persistence, network, backend, dependency, or generated asset rollback is required.
