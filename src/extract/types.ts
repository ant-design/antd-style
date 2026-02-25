import type { BaseReturnType } from '@/types';

/**
 * Single extracted style entry for one createStaticStyles call.
 */
export interface ExtractStyleEntry<T extends BaseReturnType = BaseReturnType> {
  /**
   * Stable id injected at compile time.
   */
  styleId: string;
  /**
   * Final className map consumed by createStaticStyles in extract mode.
   */
  styles: T;
}

/**
 * Bundle-level extracted style manifest.
 *
 * CSS asset emission is handled by bundler plugins.
 * This manifest only carries runtime class maps.
 */
export interface ExtractStyleManifest {
  version: 1;
  entries: ExtractStyleEntry[];
}

export interface AntdStyleExtractWebpackPluginOptions {
  /** Output manifest file name */
  manifestFile?: string;
  /** Output css file name (placeholder scaffold) */
  cssFile?: string;
  /**
   * Extracted entries provided by external transform step.
   */
  getEntries?: () => ExtractStyleManifest['entries'];
}
