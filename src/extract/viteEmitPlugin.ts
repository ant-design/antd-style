import { babelInjectStyleId, resetStaticCollectState } from './babelInjectStyleId';
import { pullExtractedChunks } from './collector';
import { clearCompiledExtractChunks, pullCompiledExtractChunks } from './compiledCollector';
import { buildExtractAssets } from './core';
import type {
  AntdStyleExtractVitePluginOptions,
  ExtractStyleChunk,
  StaticCollectRule,
} from './types';

const DEFAULT_SCRIPT_PATTERN = /\.[cm]?[jt]sx?$/;

type TransformResult =
  | null
  | undefined
  | string
  | {
      code: string;
      map?: any;
    };

interface ViteLikePlugin {
  buildStart?: () => void;
  enforce?: 'pre' | 'post';
  generateBundle?: (this: { emitFile: (asset: any) => void }, ...args: any[]) => void;
  name: string;
  transform?: (code: string, id: string) => TransformResult;
}

const shouldCollect = (resourcePath: string, rule?: StaticCollectRule) => {
  if (!DEFAULT_SCRIPT_PATTERN.test(resourcePath)) return false;
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
};

const resolveChunks = (
  options: Required<Pick<AntdStyleExtractVitePluginOptions, 'manifestFile' | 'cssFile'>> &
    Omit<AntdStyleExtractVitePluginOptions, 'manifestFile' | 'cssFile'>,
): ExtractStyleChunk[] => {
  if (options.getChunks) return options.getChunks();

  if (options.getEntries) {
    return options.getEntries().map((entry) => ({
      ...entry,
      cssText: '',
    }));
  }

  const compiledChunks = pullCompiledExtractChunks();
  if (compiledChunks.length > 0) return compiledChunks;

  if (options.useRuntimeCollector) return pullExtractedChunks();

  return [];
};

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
 * Experimental Vite/Rollup plugin for zero-runtime extraction.
 *
 * - Emits manifest + css assets in generateBundle
 * - Optional static collect mode in transform hook
 */
export const AntdStyleExtractVitePlugin = (
  options: AntdStyleExtractVitePluginOptions = {},
): ViteLikePlugin => {
  const resolved = {
    manifestFile: options.manifestFile || '__antd-style.extract.manifest.json',
    cssFile: options.cssFile || '__antd-style.extract.css',
    getEntries: options.getEntries,
    getChunks: options.getChunks,
    buildOptions: options.buildOptions,
    experimentalStaticCollect: options.experimentalStaticCollect || false,
    staticCollect: options.staticCollect,
    useRuntimeCollector: options.useRuntimeCollector || false,
  };

  return {
    buildStart() {
      if (!resolved.experimentalStaticCollect) return;
      clearCompiledExtractChunks();
      resetStaticCollectState();
    },
    enforce: 'post',
    name: 'antd-style-extract-vite-plugin',
    transform(code, id) {
      if (!resolved.experimentalStaticCollect) return null;
      if (!shouldCollect(id, resolved.staticCollect)) return null;

      const babel = loadBabelCore();
      if (!babel) return null;

      try {
        const result = babel.transformSync(code, {
          babelrc: false,
          configFile: false,
          filename: id,
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
                emotionKey: resolved.staticCollect?.emotionKey,
                cssVarPrefix: resolved.staticCollect?.cssVarPrefix,
                rootDir: resolved.staticCollect?.rootDir,
                salt: resolved.staticCollect?.salt,
                pruneRuntimeStyles: resolved.staticCollect?.pruneRuntimeStyles === true,
                resolveImportedValue: resolved.staticCollect?.resolveImportedValue,
              },
            ],
          ],
          sourceMaps: true,
        });

        if (!result?.code) return null;

        return {
          code: result.code,
          map: result.map || null,
        };
      } catch {
        // static collection is best-effort; fallback remains runtime safe
        return null;
      }
    },
    generateBundle() {
      const chunks = resolveChunks(resolved);
      const { manifest, cssText } = buildExtractAssets(chunks, resolved.buildOptions);

      this.emitFile({
        fileName: resolved.manifestFile,
        source: JSON.stringify(manifest, null, 2),
        type: 'asset',
      });

      this.emitFile({
        fileName: resolved.cssFile,
        source: cssText,
        type: 'asset',
      });
    },
  };
};

export default AntdStyleExtractVitePlugin;
