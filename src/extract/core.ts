import type { ExtractAssetBuildOptions, ExtractAssetBuildResult, ExtractStyleChunk } from './types';

const DEFAULT_EMPTY_CSS_TEXT = '/* antd-style extract css (empty) */\n';

export const buildExtractAssets = (
  chunks: ExtractStyleChunk[],
  options: ExtractAssetBuildOptions = {},
): ExtractAssetBuildResult => {
  const {
    dedupeCss = true,
    sortManifestEntries = true,
    emptyCssText = DEFAULT_EMPTY_CSS_TEXT,
  } = options;

  const normalized = chunks
    .map((chunk, index) => ({
      ...chunk,
      _index: index,
      _order: chunk.order ?? index,
    }))
    .sort((a, b) => {
      if (a._order !== b._order) return a._order - b._order;
      return a._index - b._index;
    });

  const entriesByStyleId = new Map<string, ExtractStyleChunk>();
  const cssParts: string[] = [];
  const cssSeen = new Set<string>();

  for (const chunk of normalized) {
    entriesByStyleId.set(chunk.styleId, chunk);

    if (!chunk.cssText) continue;

    const cssText = chunk.cssText.trim();
    if (!cssText) continue;

    if (dedupeCss) {
      if (cssSeen.has(cssText)) continue;
      cssSeen.add(cssText);
    }

    cssParts.push(cssText);
  }

  const entries = Array.from(entriesByStyleId.values()).map(({ styleId, styles }) => ({
    styleId,
    styles,
  }));

  if (sortManifestEntries) {
    entries.sort((a, b) => a.styleId.localeCompare(b.styleId));
  }

  return {
    cssText: cssParts.length > 0 ? `${cssParts.join('\n')}\n` : emptyCssText,
    manifest: {
      version: 1,
      entries,
    },
  };
};
