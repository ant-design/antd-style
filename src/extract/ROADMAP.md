# Extract Pipeline Roadmap (MVP)

This folder contains the building blocks for zero-runtime extraction.

## Implemented

- Runtime extract-mode registry (`core/styleEngine.ts`)
- Manifest hydration API (`hydrateExtractedStyles`)
- Experimental Babel pass to inject stable `styleId` for `createStaticStyles`
  - supports optional `salt` (or `ANTD_STYLE_EXTRACT_SALT`) to avoid cross-project collisions
  - supports best-effort static collection mode (`collectStatic`) for object and atom returns
  - supports static interpolation for `cssVar.xxx`, `responsive.xxx`, local constants, and imported values via resolver
  - supports `cx(...)` composition and collected `keyframes`
  - can optionally prune runtime style factories with `pruneRuntimeStyles`
- Extract asset assembly core (`buildExtractAssets`) for manifest/css generation
- Experimental webpack emit plugin scaffold (`AntdStyleExtractWebpackPlugin`)
  - supports compilation static collect mode (`experimentalStaticCollect`)
- Experimental vite emit plugin scaffold (`AntdStyleExtractVitePlugin`)
  - supports transform static collect mode (`experimentalStaticCollect`)
- Compiled collector bridge for bundler transforms (`compiledCollector.ts`)
- Experimental runtime collector bridge (`ANTD_STYLE_EXTRACT_COLLECT=1`, legacy fallback)

## Next

1. Build adapters
   - Collect transformed modules with `styleId`
   - Evaluate/serialize static CSS
   - Feed chunks into extract core (`buildExtractAssets`)
   - Emit CSS assets + JSON manifest
2. Bundler integration
   - Auto-import emitted CSS
   - Auto-hydrate manifest during app bootstrap
3. Fallback policy
   - Missing manifest entry => runtime mode fallback
   - Diagnostics in dev for unextracted callsites

## Notes

The Babel plugin in this folder only injects callsite metadata.
It does **not** emit CSS assets by itself.
