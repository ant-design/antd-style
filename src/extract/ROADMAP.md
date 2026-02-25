# Extract Pipeline Roadmap (MVP)

This folder contains the building blocks for zero-runtime extraction.

## Implemented

- Runtime extract-mode registry (`core/styleEngine.ts`)
- Manifest hydration API (`hydrateExtractedStyles`)
- Experimental Babel pass to inject stable `styleId` for `createStaticStyles`
- Experimental webpack emit plugin scaffold (`AntdStyleExtractWebpackPlugin`)
- Experimental runtime collector bridge (`ANTD_STYLE_EXTRACT_COLLECT=1`)

## Next

1. Build plugin
   - Collect transformed modules with `styleId`
   - Evaluate/serialize static CSS
   - Emit CSS assets + JSON manifest
2. Next/Webpack integration
   - Auto-import emitted CSS
   - Auto-hydrate manifest during app bootstrap
3. Fallback policy
   - Missing manifest entry => runtime mode fallback
   - Diagnostics in dev for unextracted callsites

## Notes

The Babel plugin in this folder only injects callsite metadata.
It does **not** emit CSS assets by itself.
