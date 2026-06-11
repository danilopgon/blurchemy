# Blurchemy

Blurchemy is planned as a browser-only creative image-processing instrument for turning real photographs into atmospheric, grainy, dreamlike visual compositions. It is aimed at visual artists, designers, photographers, and musicians who want to experiment with editorial, raw, abstract artwork directly in the browser.

This repository currently contains the clean Angular CLI foundation only. The editor, processing pipeline, presets, and export workflow are intentionally not implemented yet.

## Stack

- Angular 22 with standalone components and strict TypeScript
- Angular CLI-generated application shell
- Tailwind CSS 4 through the Angular CLI stylesheet pipeline
- Vitest through Angular's unit test builder
- ESLint through `angular-eslint`
- Prettier for formatting
- Browser-only product direction: no backend, no authentication, no external APIs, no uploaded images

## Quick Start

```bash
pnpm install
pnpm start
```

Open `http://localhost:4200/` after the development server starts.

## Useful Commands

```bash
pnpm run build
pnpm run test
pnpm run lint
pnpm run format
pnpm run format:check
pnpm run typecheck
```

## Planned Architecture

Blurchemy should separate browser-local image-processing logic from presentation code when implementation begins:

- UI and editor composition should live under a future feature area.
- Canvas/ImageData algorithms should remain isolated from Angular components.
- Signals should manage state and lightweight derived UI data.
- Expensive rendering should be triggered explicitly, not hidden inside `computed` Signals.
- Future heavy processing should move toward Web Workers or `OffscreenCanvas` where supported.

## Planned Features

- Import local images through drag-and-drop or file picker.
- Preview original and processed artwork.
- Adjust blur, motion blur, grain, gradient intensity, contrast, and exposure.
- Apply creative starter presets such as Dream, Dune, Blade Runner, Noir, and Hotel Sur.
- Randomize settings within visually useful ranges.
- Export processed work as PNG or WebP at multiple scales.

## Documentation

- `docs/architecture.md` describes intended boundaries.
- `docs/image-processing-pipeline.md` outlines the planned processing order.
- `docs/presets.md` captures planned preset direction.
- `docs/export.md` captures planned export behavior.
- `docs/roadmap.md` tracks implementation phases.
