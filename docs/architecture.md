# Architecture

Blurchemy is planned as a client-side Angular application organized around explicit boundaries between UI, state, and browser-local image processing.

## Current State

The repository currently contains only the Angular CLI-generated application shell. Feature folders, processing services, shared models, and editor UI are intentionally not present yet.

## Intended Layers

- `core`: future browser-only services for pixel processing, gradient maps, grain, export, and presets.
- `features/blurchemy-editor`: future editor composition, Signals-based state, controls, previews, preset browsing, and export shell.
- `shared`: future types, models, pure utilities, and reusable UI building blocks.

## State Model

The editor should use Angular Signals for source image metadata, settings, selected preset, render status, and lightweight derived UI data.

Canvas rendering should be explicit. Expensive pixel processing inside a `computed` Signal would block the main thread, repeat work on unrelated state changes, and make cancellation or worker migration harder.

## Processing Boundary

Image-processing services should accept browser primitives such as `HTMLCanvasElement`, `ImageBitmap`, `ImageData`, and typed settings. They should not know about Angular components or templates.

## Browser-Only Contract

Blurchemy must not assume a backend. Imported images should stay local to the browser process. Export should be generated from a local canvas.

## Future Scaling

As algorithms become heavier, move rendering to a worker-oriented boundary using `OffscreenCanvas` where supported. The explicit render boundary is intended to make that migration straightforward.
