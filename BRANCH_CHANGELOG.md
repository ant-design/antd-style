# Branch Changelog - feat/zero-runtime-prototype

This file tracks prototype-only changes made on branch `feat/zero-runtime-prototype`.

## Summary

Goal: validate a zero-runtime extraction architecture for `antd-style` while keeping existing APIs largely intact.

## Included commits

- `6431b4e` feat: scaffold extract runtime mode for static styles
- `76e29aa` feat: add extracted-style manifest hydration API
- `f5e2698` feat: add styleId injection scaffold for extract pipeline
- `d95f62d` feat: add webpack emit plugin scaffold for extract assets
- `15a672a` feat: wire extract collector into webpack asset emission
- `432baed` feat: add runtime collector bridge for extract prototype

## Key changes

### 1) Extract runtime mode scaffold
- Added runtime mode switch: `runtime | extract`
- Added extracted class-map registry APIs:
  - `setStyleRuntimeMode`
  - `registerExtractedStyles`
  - `getExtractedStyles`
  - `clearExtractedStyles`

### 2) `createStaticStyles` extract path
- `createStaticStyles(stylesFn, { styleId })` now supports extract-mode lookup by `styleId`
- Falls back to existing runtime behavior when no extracted entry exists

### 3) Manifest hydration API
- Added `hydrateExtractedStyles(manifest)`
- Loads `styleId -> styles` map and switches runtime mode to `extract`

### 4) styleId injection scaffold
- Added `createStyleId`
- Added experimental Babel plugin `babelInjectStyleId` to annotate `createStaticStyles` calls

### 5) Webpack emit scaffold
- Added `AntdStyleExtractWebpackPlugin`
- Emits:
  - `__antd-style.extract.manifest.json`
  - `__antd-style.extract.css`

### 6) Collector bridge (prototype)
- Added collector APIs:
  - `pushExtractedChunk`
  - `pullExtractedChunks`
  - `clearExtractedChunks`
- Added experimental runtime bridge in `createStaticStyles` behind env flag:
  - `ANTD_STYLE_EXTRACT_COLLECT=1`

## Current prototype status

Validated:
- style-id based extract protocol and runtime consumption path
- manifest hydration flow
- webpack asset emit scaffold and collector integration

Not yet production-ready:
- full static compile-time extraction (SWC/loader evaluator)
- chunk-level ordering/dedup guarantees
- full Next/Turbopack integration and DX polish

## Suggested next step

Replace runtime collector bridge with true transform-time static extraction and wire emitted CSS per chunk.
