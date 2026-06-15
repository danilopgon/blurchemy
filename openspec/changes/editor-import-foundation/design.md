# Design: Editor Import Foundation

## Technical Approach

Implement Spec 1 as a lean Angular editor feature hosted by the root app. `App` stops owning generated starter UI and renders the editor surface only. The editor owns Signals for import state, metadata, current object URL, drag depth, error, and live-announcement text. A minimal browser-only import boundary handles validation, image dimension decode, metadata formatting, and URL lifecycle seams for tests.

No processing, persistence, backend, telemetry, export, routing, upload, or external API is introduced. The Processed panel remains an honest placeholder.

## Architecture Decisions

| Area            | Choice                                                          | Alternatives                                                       | Rationale                                                                |
| --------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Structure       | `src/app/features/blurchemy-editor/` component hosted by `App`. | Everything in `App`; router feature.                               | Thin root, ready for Spec 2, no route/module overhead.                   |
| Import boundary | Small browser-only service/utilities with typed results.        | Inline component logic; broad core service.                        | Testable File/URL/decode seam without premature processing architecture. |
| State           | Signals for source state and lightweight labels only.           | RxJS store; heavy `computed()` work.                               | Fits project standards and avoids hidden main-thread image work.         |
| Styling         | CSS variables for tokens plus feature CSS/Tailwind utilities.   | Full design system; all-inline utilities.                          | Preserves DESIGN.md without overbuilding.                                |
| Tests           | Vitest/TestBed and pure unit tests.                             | Playwright, Testing Library, visual regression, coverage provider. | Current stack is enough for Spec 1.                                      |

## Data Flow

```text
Drop / picker -> editor handler -> validate type -> size -> decode dimensions
  -> success: revoke previous URL, create object URL, set metadata
  -> failure: set specific error, keep/revoke URLs safely
  -> template: Original state, Processed placeholder, status, live region
```

On replace, remove, and component destroy, the current `blob:` URL MUST be revoked exactly once. Cleanup stays explicit, not garbage-collection dependent.

## File Changes

| File                                                      | Action | Description                                                        |
| --------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| `src/app/app.ts`                                          | Modify | Import and host editor; remove placeholder title state.            |
| `src/app/app.html`                                        | Modify | Replace Angular starter with editor host.                          |
| `src/app/app.spec.ts`                                     | Modify | Verify editor host replaces starter content.                       |
| `src/app/features/blurchemy-editor/editor.component.ts`   | Create | Signals, event orchestration, cleanup hook.                        |
| `src/app/features/blurchemy-editor/editor.component.html` | Create | Top bar, panels, file input, live region, status bar.              |
| `src/app/features/blurchemy-editor/editor.component.css`  | Create | Checkerboard, hatch placeholder, focus, responsive layout.         |
| `src/app/features/blurchemy-editor/image-import.*`        | Create | Limits, typed validation, decode/URL boundary.                     |
| `src/styles.css`                                          | Modify | Keep Tailwind import; add root tokens and reduced-motion baseline. |

## Interfaces / Contracts

- Accepted: JPEG, PNG, WebP; max 20 MB; max 6000 px per side.
- Validation order: type, size, dimensions; report the first failure only.
- UI states: `empty`, `validating`, `imported`, `error`.
- Metadata: name, format, width, height, human-readable size, object URL.
- Errors: stable code plus title/detail aligned with PRODUCT.md copy.

## Accessibility and DOM Strategy

Use semantic regions for shell, workspace, panels, and status. Prefer native `<button>` for browse, replace, remove, and retry. Keep the file input visually hidden and triggered by visible controls; it should not add an extra tab stop. The dropzone can be pointer-drop target while the visible browse button remains the guaranteed keyboard path.

Announce validating, imported, and error states through one polite live region. After error, focus retry/import; after remove, return focus to import. Maintain 44 px targets, visible cyan `:focus-visible`, AA contrast, non-color-only errors, and reduced motion for glow, scale, and spinner effects.

## Responsive and Visual Strategy

Follow DESIGN.md: dark studio shell, warm-neutral surfaces, restrained cyan accent, Archivo UI type, JetBrains Mono metadata, checkerboard Original, hatched Processed placeholder. Desktop uses two panels at 861 px and above; below that, stack Original then Processed with viewport-aware panel heights and no horizontal scroll. Do not ship theme or accent tweak controls.

## Testing Strategy

| Layer     | What                                                                               | Approach                                            |
| --------- | ---------------------------------------------------------------------------------- | --------------------------------------------------- |
| Pure      | Validation order, formatting, URL revoke calls.                                    | Vitest with stubbed decode/URL functions.           |
| Component | Initial shell, picker/drop orchestration, success/error, actions, live region DOM. | Angular TestBed importing the standalone component. |
| Root      | `App` hosts editor, not starter content.                                           | Existing TestBed pattern.                           |

## Migration / Rollout

No migration required. Implement in TDD order: import boundary, initial DOM, success/error states, cleanup, responsive/accessibility styling. Rollback is reverting feature files and root host changes.

## Risks

- Delta spec is being produced in parallel; reconcile if it diverges from PRODUCT.md acceptance criteria.
- jsdom cannot fully prove native drag/drop or image decode behavior; keep seams injectable.
- Privacy copy must stay literally true: no network, storage, telemetry, upload, or persistence.

## Open Questions

- None blocking.
