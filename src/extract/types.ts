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
 * Extended entry used during build emission.
 */
export interface ExtractStyleChunk<T extends BaseReturnType = BaseReturnType>
  extends ExtractStyleEntry<T> {
  /**
   * Extracted CSS text for this style entry.
   */
  cssText?: string;
  /**
   * Optional stable order for deterministic CSS concatenation.
   */
  order?: number;
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

export interface ExtractAssetBuildOptions {
  /**
   * Sort manifest entries by styleId for deterministic output.
   * @default true
   */
  sortManifestEntries?: boolean;
  /**
   * Dedupe identical css chunks.
   * @default true
   */
  dedupeCss?: boolean;
  /**
   * Placeholder content when no css extracted.
   * @default '/* antd-style extract css (empty) *\/\n'
   */
  emptyCssText?: string;
}

export interface ExtractAssetBuildResult {
  manifest: ExtractStyleManifest;
  cssText: string;
}

export interface StaticCollectRule {
  include?: RegExp | ((resourcePath: string) => boolean);
  exclude?: RegExp | ((resourcePath: string) => boolean);
}

export interface StaticCollectOptions extends StaticCollectRule {
  emotionKey?: string;
  /**
   * Prefix used to resolve cssVar.xxx interpolations during static collection.
   * @default 'ant'
   */
  cssVarPrefix?: string;
  rootDir?: string;
  salt?: string;
}

export interface AntdStyleExtractPluginCommonOptions {
  /** Output manifest file name */
  manifestFile?: string;
  /** Output css file name */
  cssFile?: string;
  /**
   * Extracted entries provided by external transform step.
   * This is backward-compatible and will be converted to chunks without cssText.
   */
  getEntries?: () => ExtractStyleManifest['entries'];
  /**
   * Extracted chunks provided by external transform step.
   */
  getChunks?: () => ExtractStyleChunk[];
  /**
   * Build options for manifest/css assembly.
   */
  buildOptions?: ExtractAssetBuildOptions;
  /**
   * Static collection options.
   */
  staticCollect?: StaticCollectOptions;
  /**
   * Legacy fallback: allow runtime collector as chunk source.
   *
   * Default is false to avoid depending on runtime side-effects
   * in production extraction pipelines.
   */
  useRuntimeCollector?: boolean;
}

export interface AntdStyleExtractWebpackPluginOptions extends AntdStyleExtractPluginCommonOptions {
  /**
   * Enable experimental static collection from webpack compilation modules.
   */
  experimentalStaticCollect?: boolean;
}

export interface AntdStyleExtractVitePluginOptions extends AntdStyleExtractPluginCommonOptions {
  /**
   * Enable experimental static collection from vite transform hook.
   */
  experimentalStaticCollect?: boolean;
}
