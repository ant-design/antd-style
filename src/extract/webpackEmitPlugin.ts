import { babelInjectStyleId, resetStaticCollectState } from './babelInjectStyleId';
import { pullExtractedChunks } from './collector';
import { clearCompiledExtractChunks, pullCompiledExtractChunks } from './compiledCollector';
import { buildExtractAssets } from './core';
import type {
  AntdStyleExtractWebpackPluginOptions,
  ExtractStyleChunk,
  StaticCollectRule,
} from './types';

const DEFAULT_SCRIPT_PATTERN = /\.[cm]?[jt]sx?$/;

const loadBabelCore = () => {
  try {
    // Prefer eval-based require in CommonJS runtime.
    // Avoid static require() so client bundlers won't pull @babel/core eagerly.
    // eslint-disable-next-line no-eval
    const req = eval('require');
    if (typeof req === 'function') return req('@babel/core');
  } catch {
    // ignore
  }

  try {
    // Fallback for environments where eval('require') is unavailable.
    // eslint-disable-next-line no-new-func
    const dynamicRequire = Function('try { return require; } catch { return null; }')();
    if (typeof dynamicRequire === 'function') return dynamicRequire('@babel/core');
  } catch {
    // ignore
  }

  return undefined;
};

/**
 * Experimental webpack plugin for zero-runtime pipeline.
 *
 * Current capability:
 * - emits manifest json
 * - emits css file from extracted chunks
 *
 * Input source priority:
 * 1. options.getChunks()
 * 2. options.getEntries() (backward-compatible, cssText empty)
 * 3. compiled collector (compile-time bridge)
 * 4. runtime collector (legacy, opt-in)
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
      getChunks: options.getChunks,
      buildOptions: options.buildOptions,
      experimentalStaticCollect: options.experimentalStaticCollect || false,
      staticCollect: options.staticCollect,
      useRuntimeCollector: options.useRuntimeCollector || false,
    };
  }

  apply(compiler: any) {
    const pluginName = 'AntdStyleExtractWebpackPlugin';

    compiler.hooks.thisCompilation.tap(pluginName, (compilation: any) => {
      const { Compilation, sources } = compiler.webpack as any;

      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          if (this.options.experimentalStaticCollect) {
            this.collectStaticChunksFromCompilation(compilation);
          }

          const chunks = this.resolveChunks();
          const { manifest, cssText } = buildExtractAssets(chunks, this.options.buildOptions);

          compilation.emitAsset(
            this.options.manifestFile,
            new sources.RawSource(JSON.stringify(manifest, null, 2)),
          );

          compilation.emitAsset(this.options.cssFile, new sources.RawSource(cssText));
        },
      );
    });
  }

  private resolveChunks(): ExtractStyleChunk[] {
    if (this.options.getChunks) return this.options.getChunks();

    if (this.options.getEntries) {
      return this.options.getEntries().map((entry) => ({
        ...entry,
        cssText: '',
      }));
    }

    const compiledChunks = pullCompiledExtractChunks();
    if (compiledChunks.length > 0) return compiledChunks;

    if (this.options.useRuntimeCollector) return pullExtractedChunks();

    return [];
  }

  private collectStaticChunksFromCompilation(compilation: any) {
    const babel = loadBabelCore();
    if (!babel) return;

    clearCompiledExtractChunks();
    resetStaticCollectState();

    const modules = Array.from(compilation.modules || []) as any[];
    const visited = new Set<string>();

    for (const module of modules) {
      const resources = this.getCollectResourcePaths(module);

      for (const resource of resources) {
        if (visited.has(resource)) continue;
        visited.add(resource);

        if (!this.shouldCollect(resource)) continue;

        const source = this.getCollectSource(module, resource);
        if (!source) continue;

        try {
          babel.transformSync(source, {
            babelrc: false,
            configFile: false,
            filename: resource,
            parserOpts: {
              plugins: [
                'classPrivateMethods',
                'classPrivateProperties',
                'classProperties',
                'jsx',
                'topLevelAwait',
                'typescript',
              ],
              sourceType: 'unambiguous',
            },
            plugins: [
              [
                babelInjectStyleId,
                {
                  collectStatic: true,
                  emotionKey: this.options.staticCollect?.emotionKey,
                  cssVarPrefix: this.options.staticCollect?.cssVarPrefix,
                  rootDir: this.options.staticCollect?.rootDir,
                  salt: this.options.staticCollect?.salt,
                  pruneRuntimeStyles: this.options.staticCollect?.pruneRuntimeStyles === true,
                  resolveImportedValue: this.options.staticCollect?.resolveImportedValue,
                },
              ],
            ],
          });
        } catch {
          // static collection is best-effort; unsupported sources fall back
        }
      }
    }
  }

  private getCollectResourcePaths(module: any): string[] {
    const resources = new Set<string>();

    const pushResource = (value: unknown) => {
      if (typeof value !== 'string' || !value) return;
      resources.add(value);
    };

    pushResource(module?.resource);
    pushResource(module?.rootModule?.resource);

    const nestedModules = (module?.modules || module?._modules) as any[] | undefined;
    if (Array.isArray(nestedModules)) {
      for (const nested of nestedModules) {
        pushResource(nested?.resource);
      }
    }

    return Array.from(resources.values());
  }

  private shouldCollect(resourcePath?: string) {
    if (!resourcePath) return false;
    if (!DEFAULT_SCRIPT_PATTERN.test(resourcePath)) return false;

    const rule = this.options.staticCollect as StaticCollectRule | undefined;
    if (!rule) return true;

    if (rule.exclude) {
      if (typeof rule.exclude === 'function' && rule.exclude(resourcePath)) return false;
      if (rule.exclude instanceof RegExp && rule.exclude.test(resourcePath)) return false;
    }

    if (rule.include) {
      if (typeof rule.include === 'function') return rule.include(resourcePath);
      if (rule.include instanceof RegExp) return rule.include.test(resourcePath);
      return false;
    }

    return true;
  }

  private getCollectSource(module: any, resourcePath: string): string | undefined {
    const candidates: any[] = [];

    candidates.push(module);

    if (module?.rootModule) {
      candidates.push(module.rootModule);
    }

    const nestedModules = (module?.modules || module?._modules) as any[] | undefined;
    if (Array.isArray(nestedModules)) {
      for (const nested of nestedModules) {
        candidates.push(nested);
      }
    }

    for (const candidate of candidates) {
      if (candidate?.resource !== resourcePath) continue;

      const source = this.getModuleSource(candidate);
      if (source) return source;
    }

    return this.getModuleSource(module);
  }

  private getModuleSource(module: any): string | undefined {
    const source = module?.originalSource?.();
    if (!source || typeof source.source !== 'function') return;

    const value = source.source();
    if (typeof value === 'string') return value;

    if (value && typeof (value as any).toString === 'function') {
      return (value as any).toString('utf8');
    }

    return;
  }
}

export default AntdStyleExtractWebpackPlugin;
