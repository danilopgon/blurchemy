# Export

Blurchemy is planned to export processed canvases locally from the browser. Export is not implemented yet.

## Planned Formats

- PNG for lossless artwork export.
- WebP for smaller browser-native output.

## Planned Scale Multipliers

- `1x` for quick previews.
- `2x` for high-resolution sharing.
- `4x` for large artwork exports when the browser can handle the memory cost.

## Constraints

- Export must not upload artwork.
- Export should depend on the currently rendered canvas.
- Very large source images and `4x` exports may exceed browser memory limits.

## Future Work

- Add export size warnings.
- Add print-oriented dimensions and DPI metadata where possible.
- Add batch export once preset authoring exists.
