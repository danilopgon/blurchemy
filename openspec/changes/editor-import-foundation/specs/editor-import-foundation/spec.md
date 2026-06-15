# Editor Import Foundation Specification

## Requirements

### Requirement: Editor shell and honest panels

The system MUST show top bar, status, and Original/Processed panels. Processed MUST be a placeholder and MUST NOT imply effects, presets, export, processing, or output.

#### Scenario: Initial shell

- GIVEN no image is loaded
- WHEN the editor opens
- THEN both panels are visible
- AND status says no image loaded

#### Scenario: Placeholder honesty

- GIVEN any Spec 1 state
- WHEN Processed is shown
- THEN it is marked as later release
- AND no processed or fake-processed image appears

### Requirement: Local import paths

The system MUST import one local image through drag-and-drop and file picker. Controls MUST be keyboard operable.

#### Scenario: Drop import

- GIVEN Original is available
- WHEN a user drops one file
- THEN local validation starts

#### Scenario: Picker import

- GIVEN focus is on import
- WHEN the user activates it and selects a file
- THEN local validation starts

### Requirement: Validation rules and errors

The system MUST validate type, size, then dimensions. Types MUST be JPEG, PNG, or WebP. Files over 20 MB or images over 6000 px on either side MUST be rejected. Unreadable images MUST show an error.

#### Scenario: Ordered failure

- GIVEN a file violates multiple rules
- WHEN validation runs
- THEN only the first failed rule is reported

#### Scenario: Unreadable candidate

- GIVEN a valid type at or below 20 MB cannot decode
- WHEN dimensions are inspected
- THEN an unreadable error appears
- AND no broken preview appears

### Requirement: Preview and metadata

The system MUST render a valid image contained in Original with aspect ratio preserved. Metadata MUST show filename, format, dimensions, and size.

#### Scenario: Successful import

- GIVEN a valid image within limits
- WHEN validation succeeds
- THEN Original shows the contained preview
- AND metadata shows filename, format, dimensions, and size

### Requirement: Replace, remove, and URL lifecycle

The system MUST provide Replace image and Remove after import. Object URLs MUST be revoked on replace, remove, and unmount.

#### Scenario: Replace

- GIVEN an image is loaded
- WHEN another valid image replaces it
- THEN the previous Object URL is revoked
- AND the new image is displayed

#### Scenario: Remove or unmount

- GIVEN an image is loaded
- WHEN it is removed or the editor unmounts
- THEN the current Object URL is revoked
- AND remove restores the empty state

### Requirement: Privacy and local-only behavior

The system MUST keep image data local. It MUST NOT upload, transmit, persist, store, analyze remotely, or report images, and MUST NOT add backend, auth, database, storage, telemetry, external API, or upload assumptions.

#### Scenario: Local-only import

- GIVEN a user imports an image
- WHEN preview completes
- THEN no network request, persistent write, telemetry event, or upload is required

### Requirement: Accessibility and responsive behavior

The system MUST meet WCAG AA, show visible focus, use targets >= 44 × 44 px, announce importing/imported/error states politely, and respect reduced motion. Layout MUST be two columns at >= 861 px and stacked below, without horizontal scroll.

#### Scenario: State announcement

- GIVEN import, replace, remove, or error changes state
- WHEN the state changes
- THEN a polite announcement describes it

#### Scenario: Responsive layout

- GIVEN the viewport crosses 861 px
- WHEN layout updates
- THEN panels switch between two columns and stacked
- AND horizontal page scroll is absent

### Requirement: Verification scope

The system MUST be testable with current Vitest, Angular unit-test builder, and TestBed dependencies. This spec MUST NOT require Testing Library, E2E, visual regression, coverage, or browser automation.

#### Scenario: Current test stack

- GIVEN tasks are planned
- WHEN verification is defined
- THEN `pnpm run test` with existing tools is sufficient
- AND no new testing dependency is required
