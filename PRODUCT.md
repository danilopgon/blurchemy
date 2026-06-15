# PRODUCT.md — Blurchemy

> **Scope of this document.** This is the product brief for the first SDD change, **`editor-import-foundation`**. It frames the product as a whole only enough to position the first slice. Everything marked **Available in Spec 1** is what this change delivers; everything marked **Placeholder** or **Out of scope** is explicitly *not* built yet.

---

## 1. Product vision

Blurchemy is a browser-only creative image studio. It turns a local image into a space for visual experimentation — blurs, distortions, and other transformations applied as a non-destructive pipeline — without an account, an upload, or a server.

The product bet is **immediacy and privacy**: you drop an image and you are already working. Nothing is sent anywhere; the original file and every derived pixel stay inside the browser tab. Blurchemy should feel like a darkroom on the web — focused, tactile, quiet — not like a SaaS dashboard.

`editor-import-foundation` builds the room before the chemistry: the editor shell, the two-panel workspace, and a trustworthy local import. It is the floor the processing pipeline (Spec 2) and presets/export (Spec 3) stand on.

## 2. Target users

- **Visual tinkerers and designers** who want to try an effect on an image quickly, without launching a heavy desktop editor.
- **Privacy-conscious creators** who specifically do not want their images uploaded to a third-party server.
- **Developers and technical users** evaluating a fast, local, no-friction image utility.

They share one expectation: **open the page, get to work.** They judge the tool in the first ten seconds, by how cleanly it accepts their image.

## 3. User problem

Trying a quick visual transformation today means a heavyweight desktop app that is slow to open and overkill for one effect, or a web tool that uploads your image to someone else's server first. Both add friction; the web case adds a privacy cost.

Blurchemy removes both. But none of that matters if **import** is unreliable — if it silently accepts a 50-megapixel file and freezes the tab, or rejects a valid image with no explanation. Spec 1 exists to make the front door fast, honest, and safe.

## 4. First-slice user journey

1. **Arrive.** The editor opens directly to the workspace: a top bar and a two-panel stage labelled **Original** and **Processed**. No splash, no login. The state line reads *"No image loaded."*
2. **Understand the offer.** The Original panel is an inviting dropzone — *"Drop an image to begin,"* the accepted formats and limits, and a one-line privacy reassurance. The Processed panel is present but clearly marked as a later release, so the two-panel intent reads from the first second without overpromising.
3. **Import.** The user drags a file onto the panel, or clicks to open the native file picker. Both paths are first-class.
4. **Validate.** Blurchemy checks format, file size, and pixel dimensions locally, decoding the image in the browser. A brief *"Reading image…"* state covers the work.
5. **Branch:**
   - **Success →** the Original panel shows the image on a transparency checkerboard; the status bar fills with filename, format, dimensions, and size. The primary action becomes **Replace image**.
   - **Failure →** the panel becomes a clear error state naming the *specific* rule that failed (wrong format / too large / dimensions too large / unreadable) and offers **Try another image**.
6. **Iterate.** The user can replace the image (the previous Object URL is released) or remove it to return to the empty state.

There the Spec 1 journey ends. The Processed panel continues to state, honestly, that effects arrive later.

## 5. Scope — `editor-import-foundation`

**Available in Spec 1**

- Editor/app shell: top bar (brand, version marker, primary action), workspace stage, status bar.
- Two-panel preview layout present from the start: **Original** and **Processed**.
- Local image import via **drag-and-drop** *and* a **file picker** (both required).
- Client-side validation: **file type**, **file size**, **pixel dimensions**.
- Four explicit UI states: **empty**, **importing/validating**, **imported**, **error**.
- Image preview in the Original panel (contained, on a transparency checkerboard).
- Metadata read-out: filename, format, pixel dimensions, file size.
- **Replace image** and **Remove** actions.
- Object URL lifecycle management (create on import, revoke on replace/remove/unmount).
- Responsive layout (two columns on desktop, stacked on narrow viewports).
- Keyboard-accessible import, visible focus, WCAG AA contrast, screen-reader state announcements.
- Copy throughout that does not imply effects or export exist yet.

**Placeholder in Spec 1 (honest, non-functional UI)**

- The **Processed** panel. It occupies its half of the workspace and explains that processed output will render there once the pipeline ships. It never displays a processed (or fake-processed) image.

**Out of scope for Spec 1**

- Any real image effect or algorithm (blur, distortion, colour, etc.).
- Presets, randomizer.
- Export / download / save.
- Backend, storage, cloud sync, accounts, authentication, telemetry, external APIs, upload flows.

## 6. Non-goals (explicit)

- **No processing.** Spec 1 produces no transformed pixels.
- **No persistence.** Imported images are not saved between sessions; no gallery or history.
- **No network.** Nothing is uploaded, fetched, or reported. No analytics.
- **No accounts.** No sign-in, identity, or settings sync.
- **No multi-image / batch.** One image at a time.
- **No dead affordances.** We do not ship disabled "Adjust/Effects" buttons that hint at Spec 2; the honest Processed placeholder carries that message instead.

## 7. Product decisions (fixed)

1. **Two panels from the start** — Original and Processed render from first load, before any image, so the product's intent reads immediately. *(Pre-decided.)*
2. **Validation goes beyond MIME type** — import validates file size and pixel dimensions too, because a small file can still be enormous in pixels and would degrade the future in-browser Canvas pipeline. *(Pre-decided.)*
3. **Drag-and-drop is in Spec 1**, alongside the file picker. The picker remains the keyboard-accessible, always-available fallback.
4. **Primary post-import action is "Replace image"** — honest (it does something real today), keeps the workspace as the focus, implies no downstream features. **Remove** is the secondary action.
5. **Validation limits: 20 MB and 6000 × 6000 px** (conservative tier) — see §11.
6. **Accepted formats: JPEG, PNG, WebP** — see §11.
7. **Visual direction: dark creative workspace** with a single **cyan** accent, neutral grotesque UI type, monospace for technical metadata — see DESIGN.md.
8. **Accessibility target: WCAG AA**, extended with large touch targets and careful screen-reader support (live-region state announcements).

## 8. Open questions (resolved for Spec 1)

| Question | Resolution for Spec 1 |
|---|---|
| Max file size | **20 MB** |
| Max pixel dimensions | **6000 × 6000 px** |
| Drag-and-drop required? | **Yes**, with file picker as the accessible fallback |
| Primary post-import CTA | **Replace image** |
| Visual direction | **Dark creative workspace, cyan accent** (DESIGN.md) |
| Accessibility beyond AA | **AA + large touch targets + screen-reader live announcements + reduced-motion** |

Deferred to later specs: GIF/AVIF support, animated-frame handling, multiple simultaneous images, device-adaptive limits.

## 9. Acceptance criteria

**Shell & layout**
- **AC-1** On first load, with no image, the editor shows the top bar, both **Original** and **Processed** panels, and a status line reading *"No image loaded."*
- **AC-2** The Processed panel is visibly marked as a later release and never shows an image in Spec 1.
- **AC-3** The layout is two columns on viewports ≥ 861 px and stacks vertically below that, with no horizontal scroll.

**Import**
- **AC-4** A user can import an image by dropping a file onto the Original panel.
- **AC-5** A user can import an image by activating the import control and choosing a file in the OS picker.
- **AC-6** The import control is operable by keyboard alone (focusable, activates on Enter/Space), with a visible focus indicator.

**Validation**
- **AC-7** Files whose type is not JPEG, PNG, or WebP are rejected with an error naming the format problem.
- **AC-8** Files larger than 20 MB are rejected with an error stating the size limit and the file's actual size.
- **AC-9** Images larger than 6000 px on either side are rejected with an error stating the dimension limit and the image's actual dimensions.
- **AC-10** A file that passes type/size checks but cannot be decoded produces an "unreadable file" error rather than a broken preview.
- **AC-11** Validation order is type → size → dimensions; the first failing rule is the one reported.

**Imported state**
- **AC-12** On success, the Original panel renders the image contained within the panel (no overflow, aspect ratio preserved).
- **AC-13** The status bar shows filename, format, pixel dimensions, and human-readable file size.
- **AC-14** The primary action becomes **Replace image**; a **Remove** action is available.
- **AC-15** Replacing or removing an image releases the previous image's Object URL (no leaked `blob:` URLs).

**Accessibility**
- **AC-16** Every state change (importing, imported, error) is announced via a polite live region.
- **AC-17** All text and meaningful UI meets WCAG AA contrast in both dark and light themes.
- **AC-18** Interactive targets are at least 44 × 44 px.
- **AC-19** With `prefers-reduced-motion: reduce`, non-essential motion is suppressed.

**Honesty**
- **AC-20** No copy, label, button, or tooltip in Spec 1 implies effects, presets, randomization, or export exist.

## 10. Privacy & local-only requirements

- **No network egress.** Spec 1 makes no fetch/XHR/WebSocket/`sendBeacon` calls. The image is never transmitted.
- **In-memory only.** The image is held as an in-memory `File`/`Blob` referenced by an Object URL — never written to `localStorage`, IndexedDB, or any persistent store.
- **Lifecycle hygiene.** Object URLs are revoked when superseded (replace), cleared (remove), or when the view unmounts.
- **No identifiers.** No cookies, fingerprinting, analytics, or server error reporting.
- **Honest messaging.** The empty state explicitly tells the user their image stays in the browser. This claim must remain literally true for the life of the product.

## 11. Validation rules

| Rule | Value | Rationale |
|---|---|---|
| **Accepted types** | `image/jpeg`, `image/png`, `image/webp` | Covers the vast majority of source images while keeping decode behaviour predictable for the future Canvas pipeline. GIF/AVIF deferred. |
| **Max file size** | **20 MB** | Conservative ceiling that keeps in-browser reads fast and protects low-memory devices. Reported with the file's actual size on failure. |
| **Max pixel dimensions** | **6000 × 6000 px** per side | Pixel count, not bytes, drives Canvas/ImageData cost in Spec 2. A small JPEG can still be huge in pixels, so this is validated independently by decoding locally. |

**Validation sequence:** type → size → dimensions. Dimension validation requires a decode, so it runs last and only on a candidate that already passed type and size.

**Error messages (one per failing rule):**

- **Unsupported format** — *"Blurchemy accepts JPEG, PNG and WebP. '{name}' looks like {detected}."*
- **File too large** — *"This image is {size}. The current limit is 20 MB so processing stays fast in the browser."*
- **Dimensions too large** — *"This image is {w} × {h} px. The current limit is 6000 × 6000 px per side."*
- **Unreadable** — *"The file appears to be corrupt or isn't a real image. Try a different one."*

## 12. Success criteria for the slice

`editor-import-foundation` is done when:

- A first-time user lands in the workspace and successfully imports a valid image with zero instructions.
- Every invalid file is rejected with a specific, human-readable reason — never a silent failure or a frozen tab.
- The two-panel layout communicates the eventual before/after model without faking any processing.
- No image ever leaves the browser, and no Object URLs leak across import/replace/remove cycles.
- The shell is structured so Spec 2 can light up the Processed panel without reworking import.

## 13. Roadmap context (informational, not in scope)

- **Spec 2 — processing pipeline.** Non-destructive effects (blur, distortion, …) rendering into the Processed panel via Canvas/ImageData.
- **Spec 3 — presets & export.** Saveable/recallable settings, randomizer, and downloading the processed result.

These exist only to justify Spec 1's structural choices (two panels, dimension limits, lifecycle hygiene). They are **not** built or designed here.
