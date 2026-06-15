# Tasks: Editor Import Foundation

## Review Workload Forecast

| Field                   | Value                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| Estimated changed lines | 850-1,150                                                                                |
| 400-line budget risk    | High                                                                                     |
| Chained PRs recommended | Yes                                                                                      |
| Suggested split         | PR 1 domain/import seam -> PR 2 editor state/UI -> PR 3 integration/styling/verification |
| Delivery strategy       | ask-always / ask-on-risk                                                                 |
| Chain strategy          | pending                                                                                  |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal                                                            | Likely PR | Notes                                   |
| ---- | --------------------------------------------------------------- | --------- | --------------------------------------- |
| 1    | Testable import domain, validation, decode and Object URL seams | PR 1      | Pure tests with code; no UI dependency. |
| 2    | Editor shell state, import interactions, states, metadata       | PR 2      | Component tests with implementation.    |
| 3    | Root integration, responsive/a11y styling, final verification   | PR 3      | Cleanup starter UI; quality gates.      |

Work-unit commits: keep tests with each behavior, commit by deliverable unit, and monitor changed lines before PR creation.

## Phase 1: Import Domain and Browser Seams

- [x] 1.1 RED: Add `src/app/features/blurchemy-editor/image-import.spec.ts` for accepted types, 20 MB limit, 6000 px dimension limit, ordered failures, metadata formatting, unreadable decode, and URL revoke calls.
- [x] 1.2 GREEN: Create `image-import.ts` with strict types, constants, validation helpers, metadata/result models, injectable decode seam, and Object URL lifecycle seam.
- [x] 1.3 REFACTOR: Keep helpers pure and browser-only; avoid `any`, persistence, network, telemetry, storage, upload, Playwright, Testing Library, visual regression, or coverage dependencies.

Slice 1b refactor note: the completed import seam was split from the temporary mixed-responsibility `image-import.ts` file into feature responsibility folders (`types`, `constants`, `validators`, `formatters`, `ports`, and `adapters`) without behavior changes.

## Phase 2: Editor Component State and Interactions

- [x] 2.1 RED: Add `editor.component.spec.ts` for initial shell, honest Processed placeholder, picker/drop validation start, importing/imported/error/empty states, metadata, replace/remove, live region, and focus behavior.
- [x] 2.2 GREEN: Create `editor.component.ts/html/css` with Signals for state, drag depth, metadata, errors, current URL, announcements, picker and drop handlers, and destroy cleanup.
- [x] 2.3 REFACTOR: Keep Canvas/ImageData work out of `computed`; use native control flow, `inject()`, host metadata if needed, and no NgModules or `standalone: true`.

## Phase 3: Accessible Two-Panel UI and Responsive Styling

- [ ] 3.1 RED: Extend component tests for WCAG-relevant DOM: semantic regions, keyboard-operable import, 44 px targets, non-color-only errors, polite live region, and reduced-motion class/style hooks.
- [ ] 3.2 GREEN: Implement top bar, Original checkerboard, Processed hatched later-release placeholder, status bar, empty/importing/imported/error copy, touch targets, focus rings, and metadata display.
- [ ] 3.3 GREEN: Update `src/styles.css` tokens from `DESIGN.md` for dark studio colors, cyan accent, typography variables, responsive breakpoint at 861 px, no horizontal scroll, and reduced motion.

## Phase 4: Root Integration and Cleanup

- [ ] 4.1 RED: Update `src/app/app.spec.ts` to expect the editor host and absence of Angular starter content.
- [ ] 4.2 GREEN: Modify `src/app/app.ts`, `src/app/app.html`, and `src/app/app.css` to host the editor and remove placeholder title/template styling.
- [ ] 4.3 REFACTOR: Confirm copy remains honest: no effects, presets, randomizer, export, backend, auth, database, storage, telemetry, external API, or upload assumptions.

## Phase 5: Final Verification

- [ ] 5.1 Run `pnpm run format:check`.
- [ ] 5.2 Run `pnpm run lint`.
- [ ] 5.3 Run `pnpm run test`.
- [ ] 5.4 Run `pnpm run typecheck`.
- [ ] 5.5 Run `pnpm run build`.
