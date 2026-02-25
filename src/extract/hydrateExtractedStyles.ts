import { registerExtractedStyles, setStyleRuntimeMode } from '@/core';

import type { ExtractStyleManifest } from './types';

/**
 * Hydrate compile-time extracted style map into antd-style runtime.
 *
 * Typical usage (app bootstrap):
 *
 * ```ts
 * import manifest from './__antd-style.extract.manifest.json';
 * import { hydrateExtractedStyles } from 'antd-style';
 *
 * hydrateExtractedStyles(manifest);
 * ```
 */
export const hydrateExtractedStyles = (manifest: ExtractStyleManifest) => {
  if (!manifest || manifest.version !== 1) return;

  setStyleRuntimeMode('extract');

  for (const entry of manifest.entries) {
    registerExtractedStyles({ styleId: entry.styleId, styles: entry.styles });
  }
};
