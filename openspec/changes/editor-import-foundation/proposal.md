# Proposal: Editor Import Foundation

## Intent

Build Blurchemy's first usable editor slice: a private, browser-only workspace where a user can import one local image safely and understand the future before/after model without fake processing. User value is immediacy and trust: drop or choose an image, see why it was accepted or rejected, and know it never leaves the browser.

## Scope

### In Scope for Spec 1

- Editor shell with dark creative workspace, cyan accent, top bar, two-panel stage, and status bar.
- Two panels from first load: **Original** and **Processed**. Processed is an honest placeholder until the pipeline exists.
- Local import through drag-and-drop and file picker.
- Local validation for file type, file size, and pixel dimensions: JPEG, PNG, WebP; max 20 MB; max 6000 × 6000 px per side.
- Empty, importing/validating, imported, and error states with metadata, specific errors, **Replace image** primary action, and **Remove** secondary action.
- WCAG AA, large touch targets, visible focus, live announcements, responsive layout, and reduced-motion support.
- Privacy hygiene: no upload, no persistence, no network calls, no telemetry, and Object URLs revoked on replace/remove/unmount.

### Out of Scope / Non-goals

- Image effects, Canvas/ImageData processing, processed output, presets, randomizer, export/download, multi-image or batch workflows.
- Backend, authentication, database, storage, cloud sync, external APIs, analytics, or upload flows.
- New E2E, visual regression, coverage, or Testing Library dependencies unless a later spec/design expands scope.

## Capabilities

### New Capabilities

- `editor-import-foundation`: editor shell, local import, validation, preview states, privacy guarantees, accessibility, and responsive behavior for Spec 1.

### Modified Capabilities

- None. No existing OpenSpec capabilities are present.

## Approach

Use a lean Angular feature surface hosted by the root app, with Signals for lightweight UI state and a minimal browser-only import/validation boundary where it improves TestBed/Vitest coverage. Keep processing-ready structure without implementing processing. Current dependencies are sufficient for Spec 1.

## Affected Areas

| Area                                               | Impact   | Description                                                                            |
| -------------------------------------------------- | -------- | -------------------------------------------------------------------------------------- |
| `src/app/*`                                        | Modified | Replace starter shell with editor/import foundation during implementation.             |
| `src/styles.css`                                   | Modified | Establish workspace tokens, layout, focus, responsive, and reduced-motion foundations. |
| `openspec/changes/editor-import-foundation/specs/` | New      | Next phase delta/full spec for the new capability.                                     |

## Risks

| Risk                                       | Likelihood | Mitigation                                                                         |
| ------------------------------------------ | ---------: | ---------------------------------------------------------------------------------- |
| Processed placeholder implies real effects |        Med | Require honest copy and no processed image in Spec 1.                              |
| Object URL leaks                           |        Med | Specify revoke lifecycle and test replace/remove cleanup seams.                    |
| jsdom drag/drop and decode gaps            |        Med | Keep browser boundaries small; test deterministic validation with current tooling. |
| Large images freeze future processing      |        Low | Enforce 20 MB and 6000 px per-side limits before pipeline work.                    |

## Rollback / Ship Considerations

Ship only after local import, validation errors, keyboard access, announcements, responsive layout, and privacy claims are verified. Roll back by reverting the editor/import feature files and returning to the previous root shell; no data migration exists because Spec 1 has no persistence.

## Success Criteria

- [ ] Valid JPEG, PNG, and WebP files import locally through drop and picker.
- [ ] Invalid type, size, dimension, and unreadable files produce specific errors.
- [ ] Original displays the image; Processed remains an honest placeholder.
- [ ] No image upload, persistence, network, telemetry, or Object URL leak is introduced.

## Next Step

After proposal review, `sdd-spec` and `sdd-design` can proceed.
