# Image Processing Pipeline

This document describes the planned image-processing direction. The pipeline is not implemented yet.

## Planned Order

1. Draw the source image to a working canvas.
2. Apply tonal controls such as exposure and contrast.
3. Apply blur.
4. Apply motion blur.
5. Read pixels through `ImageData`.
6. Apply gradient-map colorization.
7. Add grain.
8. Write pixels back to the output canvas.

## Constraints

- All processing must remain local to the browser.
- Initial implementations should prioritize safe behavior and clear contracts over final algorithm quality.
- Large images may block the main thread until worker rendering is introduced.
- Processing services should not depend on Angular component classes.

## Upgrade Path

- Use a deterministic separable Gaussian blur instead of relying only on Canvas filter behavior.
- Use a directional kernel for motion blur.
- Add halation, bloom, dust, and paper texture passes.
- Move the pipeline into a Web Worker with `OffscreenCanvas` support and a main-thread fallback.
