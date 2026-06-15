# Apply Progress: Editor Import Foundation

## Completed Slice

Slice 1, stacked-to-main PR 1 boundary: import domain, validation helpers, image decode seam, metadata formatting, and Object URL lifecycle seam. No UI shell, component state, styling, root integration, image processing, persistence, upload, telemetry, backend, effects, export, presets, or new dependencies were added.

## Completed Tasks

- [x] 1.1 RED: Added `src/app/features/blurchemy-editor/image-import.spec.ts` for accepted formats, 20 MB limit, 6000 px dimension limit, ordered failures, metadata formatting, unreadable decode, and URL revoke calls.
- [x] 1.2 GREEN: Created `src/app/features/blurchemy-editor/image-import.ts` with strict types, constants, validation helpers, result models, injectable decode seam, and Object URL lifecycle seam.
- [x] 1.3 REFACTOR: Kept helpers pure/testable where practical, browser-only at the decode/Object URL boundary, and avoided `any`, persistence, network, telemetry, storage, upload, Playwright, Testing Library, visual regression, coverage dependencies, and new runtime dependencies.

## TDD Cycle Evidence

| Task | Test File                                                | Layer | Safety Net | RED                                                                                 | GREEN                                                                                                                      | TRIANGULATE                                                                                                                                   | REFACTOR                                                                                     |
| ---- | -------------------------------------------------------- | ----- | ---------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1.1  | `src/app/features/blurchemy-editor/image-import.spec.ts` | Unit  | N/A (new)  | ✅ Written first; focused Vitest run failed because `./image-import` did not exist  | ✅ Passed after implementation via `pnpm exec vitest run --globals src/app/features/blurchemy-editor/image-import.spec.ts` | ✅ 7 behavior cases: accepted formats, type order, size order, dimension rejection, unreadable decode, byte formatting, Object URL revocation | ✅ Tests formatted and kept behavior assertions concrete                                     |
| 1.2  | `src/app/features/blurchemy-editor/image-import.spec.ts` | Unit  | N/A (new)  | ✅ Covered by 1.1 tests before production file existed                              | ✅ `pnpm run test` passed with 9/9 total tests                                                                             | ✅ Different inputs and code paths forced real validation order and lifecycle logic                                                           | ✅ Strict exports, discriminated union result model, injectable ports, no `any`              |
| 1.3  | `src/app/features/blurchemy-editor/image-import.spec.ts` | Unit  | N/A (new)  | ✅ Refactor constraints were represented by existing tests and lint/typecheck gates | ✅ `pnpm run lint` and `pnpm run typecheck` passed                                                                         | ✅ URL seam idempotency and decode failure paths guard side-effect boundaries                                                                 | ✅ Browser-only decode fallback isolated; no persistence/network/telemetry/upload introduced |

## Files Changed

| File                                                          | Action  | Summary                                                                                                                                                |
| ------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/app/features/blurchemy-editor/image-import.spec.ts`      | Created | Unit tests for validation rules, ordered failures, metadata formatting, unreadable decode handling, and Object URL idempotent revocation.              |
| `src/app/features/blurchemy-editor/image-import.ts`           | Created | Domain/import contracts, limits, accepted format mapping, `readImageCandidate`, byte formatting, browser decode port, and Object URL lifecycle handle. |
| `openspec/changes/editor-import-foundation/tasks.md`          | Updated | Marked Phase 1 tasks 1.1, 1.2, and 1.3 complete only.                                                                                                  |
| `openspec/changes/editor-import-foundation/apply-progress.md` | Created | Captured slice summary, TDD evidence, verification, limitations, next slice, and rollback notes.                                                       |

## Tests and Checks Run

| Command                                                                                                                                   | Result        | Notes                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm exec vitest run src/app/features/blurchemy-editor/image-import.spec.ts`                                                             | Failed as RED | First failure: missing `./image-import`, confirming tests were written before production code. A later direct Vitest run without Angular builder globals failed on `describe is not defined`, so focused direct runs used `--globals`. |
| `pnpm exec vitest run --globals src/app/features/blurchemy-editor/image-import.spec.ts`                                                   | Passed        | 7/7 focused unit tests passed after GREEN and refactor.                                                                                                                                                                                |
| `pnpm run test`                                                                                                                           | Passed        | Angular unit-test builder passed 2 files, 9/9 tests.                                                                                                                                                                                   |
| `pnpm run lint`                                                                                                                           | Passed        | All files pass linting.                                                                                                                                                                                                                |
| `pnpm run typecheck`                                                                                                                      | Passed        | Development build/typecheck completed successfully.                                                                                                                                                                                    |
| `pnpm exec prettier --check "src/app/features/blurchemy-editor/image-import.ts" "src/app/features/blurchemy-editor/image-import.spec.ts"` | Passed        | Slice files use Prettier formatting.                                                                                                                                                                                                   |
| `pnpm run format:check`                                                                                                                   | Failed        | Pre-existing/unrelated documentation formatting warnings in `.atl/skill-registry.md`, `DESIGN.md`, `PRODUCT.md`, and existing OpenSpec docs. Slice files passed targeted Prettier check.                                               |

## Limitations

- This slice intentionally stops at the domain/browser seam. It does not render the editor, wire drag-and-drop, wire the picker, create previews, update root app hosting, or add responsive/a11y UI styling.
- Native browser decode behavior is represented through an injectable seam. jsdom cannot prove real image decoding for every file type in this slice.

## Slice 1b Refactor: Angular/Screaming Responsibility Folders

### Why

The user reviewed Slice 1 and requested a clearer Angular/Screaming Architecture structure instead of keeping constants, contracts, validators, formatters, ports, and browser adapters in one mixed-responsibility `image-import.ts` file. This refactor keeps the import foundation behavior unchanged while making each responsibility visible in the feature folder.

### Files Moved, Created, Modified, and Deleted

| File                                                                          | Action   | Summary                                                                                                           |
| ----------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/app/features/blurchemy-editor/types/image-import.type.ts`                | Created  | Closed domain contracts using `type` aliases for import results, errors, metadata, dimensions, and format labels. |
| `src/app/features/blurchemy-editor/constants/image-import.constants.ts`       | Created  | Import limits and accepted MIME-to-format mapping.                                                                |
| `src/app/features/blurchemy-editor/validators/image-import.validator.ts`      | Created  | `readImageCandidate` validation flow with unchanged type, size, decode, dimension, and metadata behavior.         |
| `src/app/features/blurchemy-editor/formatters/file-size.formatter.ts`         | Created  | Human-readable byte formatting helper.                                                                            |
| `src/app/features/blurchemy-editor/ports/image-decode.port.ts`                | Created  | Decode port contract as a type alias.                                                                             |
| `src/app/features/blurchemy-editor/ports/object-url.port.ts`                  | Created  | Object URL port and lifecycle handle contracts as type aliases.                                                   |
| `src/app/features/blurchemy-editor/adapters/browser-image-decoder.adapter.ts` | Created  | Browser image decoder adapter with `createImageBitmap` and `Image` fallback.                                      |
| `src/app/features/blurchemy-editor/adapters/object-url-handle.adapter.ts`     | Created  | Idempotent Object URL handle adapter.                                                                             |
| `src/app/features/blurchemy-editor/image-import.spec.ts`                      | Modified | Updated imports to the responsibility folders; assertions and scenarios stayed equivalent.                        |
| `src/app/features/blurchemy-editor/image-import.ts`                           | Deleted  | Removed the mixed-responsibility temporary file after splitting responsibilities.                                 |
| `eslint.config.js`                                                            | Modified | Aligned `@typescript-eslint/consistent-type-definitions` with the user preference for `type` aliases.             |
| `openspec/changes/editor-import-foundation/tasks.md`                          | Modified | Added this Slice 1b refactor note without marking new phase tasks complete.                                       |
| `openspec/changes/editor-import-foundation/apply-progress.md`                 | Modified | Recorded Slice 1b rationale, files, verification, behavior statement, and rollback notes.                         |

### Behavior Statement

Behavior is unchanged. The same seven import-domain tests still verify accepted formats, ordered failures, max file size, max dimensions, unreadable decode, metadata byte formatting, and idempotent Object URL revocation. No UI work, dependencies, backend, persistence, network, telemetry, storage, upload, effects, export, presets, Playwright, Testing Library, visual regression, or coverage tooling was added.

### TDD Cycle Evidence

| Task     | Test File                                                | Layer | Safety Net                                                                                                         | RED                                                                                                            | GREEN                                                     | TRIANGULATE                                                                                           | REFACTOR                                                                                            |
| -------- | -------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Slice 1b | `src/app/features/blurchemy-editor/image-import.spec.ts` | Unit  | ✅ `pnpm exec vitest run --globals src/app/features/blurchemy-editor/image-import.spec.ts` passed 7/7 before edits | ✅ Existing approval tests captured behavior before production refactor; no behavior-changing tests were added | ✅ Focused tests passed after responsibility-folder split | ✅ Existing seven behavior cases continued to exercise distinct validation, formatting, and URL paths | ✅ Split responsibilities, converted closed contracts/ports to `type` aliases, and kept tests green |

### Tests and Checks Run

| Command                                                                                                                                                   | Result | Notes                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------- |
| `pnpm exec vitest run --globals src/app/features/blurchemy-editor/image-import.spec.ts`                                                                   | Passed | Safety net before edits: 1 file, 7/7 tests passed.                    |
| `pnpm exec vitest run --globals src/app/features/blurchemy-editor/image-import.spec.ts`                                                                   | Passed | Focused post-refactor check: 1 file, 7/7 tests passed.                |
| `pnpm run test`                                                                                                                                           | Passed | Angular unit-test builder passed 2 files, 9/9 tests.                  |
| `pnpm run lint`                                                                                                                                           | Passed | All files pass after aligning ESLint type-definition style to `type`. |
| `pnpm run typecheck`                                                                                                                                      | Passed | Development build/typecheck completed successfully.                   |
| `pnpm run build`                                                                                                                                          | Passed | Production build completed successfully.                              |
| `pnpm exec prettier --check "eslint.config.js" "src/app/features/blurchemy-editor/**/*.ts" "openspec/changes/editor-import-foundation/apply-progress.md"` | Passed | Targeted formatting passed.                                           |
| `pnpm run format:check`                                                                                                                                   | Passed | Full repository Prettier check passed.                                |

### Rollback Notes

Rollback Slice 1b by restoring `src/app/features/blurchemy-editor/image-import.ts`, reverting `image-import.spec.ts` imports to `./image-import`, removing the new responsibility folders created under `src/app/features/blurchemy-editor/`, and reverting the ESLint `consistent-type-definitions` rule change if the project decides not to keep the type-alias convention. No data migration, persistence, network, backend, dependency, or generated asset rollback is required.

## Next Slice Recommendation

Implement stacked-to-main PR 2: Phase 2 tasks 2.1-2.3 for the editor component state and interactions. Start with component tests for initial shell, honest Processed placeholder, picker/drop validation start, importing/imported/error/empty states, metadata, replace/remove, live region, and focus behavior, then wire the component to the import seam from this slice.

## Rollback Notes

Rollback this slice by removing `src/app/features/blurchemy-editor/image-import.ts`, `src/app/features/blurchemy-editor/image-import.spec.ts`, this progress file, and reverting Phase 1 checkboxes in `openspec/changes/editor-import-foundation/tasks.md`. No persistence, data migration, network, backend, or dependency rollback is required.
