import type { Compiler } from 'webpack';

import type {
  AntdStyleExtractWebpackPluginOptions,
  ExtractStyleManifest,
} from './types';

/**
 * Experimental webpack plugin for zero-runtime pipeline.
 *
 * Current capability:
 * - emits manifest json
 * - emits placeholder css file
 *
 * Next phase:
 * - collect css text + class map from transformed modules
 * - emit real css assets per chunk
 */
export class AntdStyleExtractWebpackPlugin {
  private options: Required<
    Pick<AntdStyleExtractWebpackPluginOptions, 'manifestFile' | 'cssFile'>
  > &
    Omit<AntdStyleExtractWebpackPluginOptions, 'manifestFile' | 'cssFile'>;

  constructor(options: AntdStyleExtractWebpackPluginOptions = {}) {
    this.options = {
      manifestFile: options.manifestFile || '__antd-style.extract.manifest.json',
      cssFile: options.cssFile || '__antd-style.extract.css',
      getEntries: options.getEntries,
    };
  }

  apply(compiler: Compiler) {
    const pluginName = 'AntdStyleExtractWebpackPlugin';

    compiler.hooks.thisCompilation.tap(pluginName, (compilation: any) => {
      const { Compilation, sources } = compiler.webpack as any;

      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          const entries = this.options.getEntries?.() || [];

          const manifest: ExtractStyleManifest = {
            version: 1,
            entries,
          };

          compilation.emitAsset(
            this.options.manifestFile,
            new sources.RawSource(JSON.stringify(manifest, null, 2)),
          );

          // Placeholder stylesheet. Real css extraction lands in next phase.
          compilation.emitAsset(
            this.options.cssFile,
            new sources.RawSource('/* antd-style extract css (placeholder) */\n'),
          );
        },
      );
    });
  }
}

export default AntdStyleExtractWebpackPlugin;
