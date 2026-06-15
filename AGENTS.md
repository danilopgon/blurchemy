# Blurchemy Agent Guide

Generated technical artifacts must be written in professional English.

## Project Contract

- Blurchemy is planned as a browser-only creative image-processing app.
- Do not introduce backend, authentication, database, storage, telemetry, or external API assumptions unless explicitly requested.
- Imported images must remain local to the browser. Do not upload or transmit image data.
- Follow an SDD-first workflow for feature work: proposal, spec, design, tasks, implementation, verification, then archive.

## Current Foundation

- Angular CLI 22 workspace generated with pnpm.
- Standalone Angular application; do not add NgModules for app features.
- Tailwind CSS 4 is configured through the Angular CLI/PostCSS pipeline.
- Vitest is configured through Angular's unit test builder.
- ESLint uses `angular-eslint`; Prettier handles formatting.
- Angular CLI AI config is present for agents and Claude. Keep Claude guidance as a pointer to `AGENTS.md`.

## Angular Standards

- Use strict TypeScript. Avoid `any`; use `unknown` at uncertain boundaries.
- Prefer `type` aliases over `interface` for TypeScript contracts. Use type composition for closed domain models, ports, and view models; only use `interface` when declaration merging or an explicitly extensible public API is required.
- Do not set `standalone: true` in decorators; it is the Angular v20+ default.
- Use Signals for local and feature state, with `computed()` only for lightweight derived state.
- Do not put expensive Canvas/ImageData processing inside `computed` Signals.
- Use native control flow (`@if`, `@for`, `@switch`) instead of structural directives.
- Use `input()` and `output()` functions instead of decorators.
- Use the `host` metadata object instead of `@HostBinding` or `@HostListener`.
- Use `inject()` instead of constructor injection.
- Do not use `ngClass` or `ngStyle`; use class and style bindings.
- Use `NgOptimizedImage` for static images, except inline base64 images.

## Product Boundaries

- Keep future image-processing code isolated from Angular components.
- Components may orchestrate state and user events, but Canvas/ImageData algorithms belong in browser-only services or pure utilities.
- Prefer small focused services over large cross-cutting abstractions.
- Preserve responsive behavior, keyboard access, focus management, and WCAG AA color contrast.
- Keep documentation accurate: planned features must not be described as implemented.
