/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const pkgRoot = process.cwd();
const outDir = path.join(pkgRoot, '.tmp-extract-webpack');

const m = require('../lib');

function verifyStyleIdStability() {
  const idA1 = m.createStyleId('src/a.ts#0', { salt: 'x' });
  const idA2 = m.createStyleId('src/a.ts#0', { salt: 'x' });
  const idB = m.createStyleId('src/a.ts#0', { salt: 'y' });

  assert.equal(idA1, idA2, 'same input + same salt should be stable');
  assert.notEqual(idA1, idB, 'different salt should produce different id');

  console.log('✅ styleId stability verified');
}

function verifyExtractCore() {
  const { manifest, cssText } = m.buildExtractAssets([
    {
      styleId: 'b-style',
      styles: { root: 'b' },
      cssText: '.b{color:blue;}',
      order: 2,
    },
    {
      styleId: 'a-style',
      styles: { root: 'a' },
      cssText: '.a{color:red;}',
      order: 1,
    },
    {
      styleId: 'c-style',
      styles: { root: 'c' },
      cssText: '.a{color:red;}',
      order: 3,
    },
  ]);

  assert.deepEqual(
    manifest.entries.map((e) => e.styleId),
    ['a-style', 'b-style', 'c-style'],
    'manifest entries should be sorted by styleId',
  );
  assert.ok(
    cssText.indexOf('.a{color:red;}') < cssText.indexOf('.b{color:blue;}'),
    'css should respect order in chunks',
  );
  assert.equal(cssText.match(/\.a\{color:red;\}/g)?.length, 1, 'css should be deduped by default');

  console.log('✅ extract core build verified');
}

function verifyBabelStaticCollection() {
  let babel;
  try {
    babel = require('@babel/core');
  } catch {
    console.log('⚠️ @babel/core not found, skip babel static collection verification');
    return;
  }

  m.clearCompiledExtractChunks();
  m.resetStaticCollectState();

  const source = `
    import { createStaticStyles, cssVar, responsive } from 'antd-style';

    const prefixCls = 'ant';
    const space = 4;

    const styles = createStaticStyles(({ css, cx }) => ({
      base: css\`color: \${cssVar.colorText};\`,
      media: css\`\${responsive.sm} { padding: \${space * 2}px; }\`,
      mixed: cx('helper', css\`.\${prefixCls}-x { margin: \${space + 1}px; }\`),
    }));

    const atom = createStaticStyles(({ css }) => css\`margin: \${space + 3}px;\`);

    export { styles, atom };
  `;

  babel.transformSync(source, {
    babelrc: false,
    configFile: false,
    filename: `${process.cwd().replace(/\\/g, '/')}/src/__verify__/sample.ts`,
    plugins: [[m.babelInjectStyleId, { collectStatic: true, rootDir: process.cwd() }]],
  });

  const compiledChunks = m.pullCompiledExtractChunks();

  assert.equal(compiledChunks.length, 2, 'babel static collection should push two compiled chunks');

  const objectChunk = compiledChunks.find((chunk) => chunk.styles && typeof chunk.styles === 'object');
  const atomChunk = compiledChunks.find((chunk) => typeof chunk.styles === 'string');

  assert.ok(objectChunk, 'object-style chunk should exist');
  assert.ok(atomChunk, 'atom-style chunk should exist');

  assert.ok(objectChunk.styleId.startsWith('as-'));
  assert.deepEqual(Object.keys(objectChunk.styles), ['base', 'media', 'mixed']);
  assert.ok(objectChunk.styles.mixed.includes('helper'));
  assert.ok(objectChunk.cssText.includes('.acss-'));
  assert.ok(objectChunk.cssText.includes('var(--ant-color-text)'));
  assert.ok(objectChunk.cssText.includes('@media (max-width: 575.98px)'));
  assert.ok(objectChunk.cssText.includes('.ant-x'));

  assert.ok(atomChunk.styleId.startsWith('as-'));
  assert.ok(typeof atomChunk.styles === 'string' && atomChunk.styles.includes('acss-'));
  assert.ok(atomChunk.cssText.includes('margin:7px'));

  console.log('✅ babel static collection verified');
}

function verifyViteEmitPlugin() {
  m.clearCompiledExtractChunks();
  m.resetStaticCollectState();

  let hasBabelCore = false;
  try {
    require.resolve('@babel/core');
    hasBabelCore = true;
  } catch {
    hasBabelCore = false;
  }

  const plugin = m.AntdStyleExtractVitePlugin(
    hasBabelCore
      ? {
          experimentalStaticCollect: true,
          staticCollect: {
            include: /sample\.tsx$/,
            rootDir: process.cwd(),
          },
        }
      : {
          getChunks: () => [
            {
              styleId: 'verify-vite-style-id',
              styles: { item: 'acss-vite' },
              cssText: '.acss-vite{color:orange;}',
            },
          ],
        },
  );

  plugin.buildStart?.();

  if (hasBabelCore) {
    const transformed = plugin.transform?.(
      `
        import { createStaticStyles } from 'antd-style';
        export const styles = createStaticStyles(({ css, cssVar }) => ({
          item: css\`padding: 8px; border-color: \${cssVar.colorBorder};\`,
        }));
      `,
      `${process.cwd().replace(/\\/g, '/')}/src/__verify__/sample.tsx`,
    );

    assert.ok(
      transformed && typeof transformed === 'object' && transformed.code.includes('styleId'),
      'vite transform should inject styleId when static collect enabled',
    );
  } else {
    console.log('⚠️ @babel/core not found, skip vite static transform verification');
  }

  const emitted = [];
  plugin.generateBundle?.call(
    {
      emitFile(asset) {
        emitted.push(asset);
      },
    },
    {},
    {},
  );

  const manifestAsset = emitted.find((asset) => asset.fileName.endsWith('.manifest.json'));
  const cssAsset = emitted.find((asset) => asset.fileName.endsWith('.css'));

  assert.ok(manifestAsset, 'vite plugin should emit manifest asset');
  assert.ok(cssAsset, 'vite plugin should emit css asset');

  const manifest = JSON.parse(manifestAsset.source);
  assert.equal(manifest.version, 1);
  assert.equal(manifest.entries.length, 1);

  if (hasBabelCore) {
    assert.ok(manifest.entries[0].styleId.startsWith('as-'));
    assert.ok(typeof cssAsset.source === 'string' && cssAsset.source.includes('.acss-'));
    assert.ok(
      typeof cssAsset.source === 'string' && cssAsset.source.includes('var(--ant-color-border)'),
      'vite static collect should resolve cssVar interpolation',
    );
  } else {
    assert.equal(manifest.entries[0].styleId, 'verify-vite-style-id');
    assert.ok(typeof cssAsset.source === 'string' && cssAsset.source.includes('.acss-vite'));
  }

  console.log('✅ vite emit plugin verified');
}

function verifyCollectorAndHydration() {
  process.env.ANTD_STYLE_EXTRACT_COLLECT = '1';

  m.clearExtractedChunks();

  const runtimeStyles = m.createStaticStyles(
    ({ css }) => ({
      btn: css`
        color: red;
      `,
    }),
    { styleId: 'verify-style-id' },
  );

  const chunks = m.pullExtractedChunks();

  assert.equal(chunks.length, 1, 'collector should collect exactly one chunk');
  assert.equal(chunks[0].styleId, 'verify-style-id');
  assert.ok(
    chunks[0].cssText && chunks[0].cssText.length > 0,
    'collector cssText should be non-empty',
  );

  m.hydrateExtractedStyles({
    version: 1,
    entries: [{ styleId: 'verify-style-id', styles: { btn: 'from-manifest' } }],
  });

  const extractedStyles = m.createStaticStyles(
    ({ css }) => ({
      btn: css`
        color: blue;
      `,
    }),
    { styleId: 'verify-style-id' },
  );

  const fallbackStyles = m.createStaticStyles(
    ({ css }) => ({
      box: css`
        margin: 4px;
      `,
    }),
    { styleId: 'verify-unknown-style-id' },
  );

  assert.equal(m.getStyleRuntimeMode(), 'extract', 'runtime mode should switch to extract');
  assert.equal(extractedStyles.btn, 'from-manifest', 'known styleId should come from manifest');
  assert.notEqual(
    fallbackStyles.box,
    'from-manifest',
    'unknown styleId should fallback to runtime generated class',
  );

  assert.ok(runtimeStyles.btn && runtimeStyles.btn.length > 0, 'runtime style should be generated');

  console.log('✅ collector + hydration + fallback verified');
}

async function runWebpackBuild(webpack, config) {
  const {
    outputDirName,
    plugins,
    entrySource = 'module.exports = {}\n',
    externals,
    resolve,
  } = config;

  const buildDir = path.join(outDir, outputDirName);
  fs.rmSync(buildDir, { force: true, recursive: true });
  fs.mkdirSync(buildDir, { recursive: true });

  const entryFile = path.join(buildDir, 'entry.js');
  fs.writeFileSync(entryFile, entrySource, 'utf8');

  const compiler = webpack({
    entry: entryFile,
    mode: 'production',
    output: {
      filename: 'bundle.js',
      path: buildDir,
    },
    externals,
    plugins,
    resolve,
  });

  await new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err);
      if (stats && stats.hasErrors()) {
        return reject(new Error(stats.toString('errors-only')));
      }
      return resolve();
    });
  });

  await new Promise((resolve) => {
    compiler.close(() => {
      resolve();
    });
  });

  return buildDir;
}

function readExtractAssets(buildDir) {
  const manifestPath = path.join(buildDir, '__antd-style.extract.manifest.json');
  const cssPath = path.join(buildDir, '__antd-style.extract.css');

  assert.ok(fs.existsSync(manifestPath), 'manifest file should exist');
  assert.ok(fs.existsSync(cssPath), 'css file should exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.equal(manifest.version, 1, 'manifest version should be 1');
  assert.ok(Array.isArray(manifest.entries), 'manifest entries should be array');

  return { manifest, css };
}

function assertExtractAssets(buildDir, expectedStyleId, expectedCssPart) {
  const { manifest, css } = readExtractAssets(buildDir);

  assert.equal(manifest.entries[0].styleId, expectedStyleId);
  assert.ok(css.includes(expectedCssPart), 'css file should include expected extracted rule');
}

async function verifyWebpackEmit() {
  let webpack;
  try {
    webpack = require('webpack');
  } catch {
    console.log('⚠️ webpack not found, skip webpack emit verification');
    return;
  }

  fs.rmSync(outDir, { force: true, recursive: true });
  fs.mkdirSync(outDir, { recursive: true });

  // default path: compiled collector
  m.clearCompiledExtractChunks();
  m.pushCompiledExtractChunk({
    styleId: 'verify-compiled-style-id',
    styles: { root: 'acss-compiled' },
    cssText: '.acss-compiled{color:green;}',
  });

  const compiledBuildDir = await runWebpackBuild(webpack, {
    outputDirName: 'compiled',
    plugins: [new m.AntdStyleExtractWebpackPlugin()],
  });
  assertExtractAssets(compiledBuildDir, 'verify-compiled-style-id', '.acss-compiled');

  // legacy path: runtime collector (explicit opt-in)
  m.clearCompiledExtractChunks();
  m.clearExtractedChunks();
  m.pushExtractedChunk({
    styleId: 'verify-runtime-style-id',
    styles: { root: 'acss-runtime' },
    cssText: '.acss-runtime{color:red;}',
  });

  const runtimeBuildDir = await runWebpackBuild(webpack, {
    outputDirName: 'runtime',
    plugins: [new m.AntdStyleExtractWebpackPlugin({ useRuntimeCollector: true })],
  });
  assertExtractAssets(runtimeBuildDir, 'verify-runtime-style-id', '.acss-runtime');

  // compilation static collect path
  m.clearCompiledExtractChunks();

  const staticCollectBuildDir = await runWebpackBuild(webpack, {
    entrySource: `
      import { createStaticStyles } from 'antd-style';
      const styles = createStaticStyles(({ css }) => ({
        btn: css\`color: purple;\`,
      }));
      console.log(styles);
    `,
    externals: {
      'antd-style': 'commonjs antd-style',
    },
    outputDirName: 'static-collect',
    plugins: [
      new m.AntdStyleExtractWebpackPlugin({
        experimentalStaticCollect: true,
        staticCollect: {
          include: /entry\.js$/,
          rootDir: process.cwd(),
        },
      }),
    ],
  });

  const { manifest, css } = readExtractAssets(staticCollectBuildDir);
  assert.equal(
    manifest.entries.length,
    1,
    'experimental static collect should produce one manifest entry',
  );
  assert.ok(
    manifest.entries[0].styleId.startsWith('as-'),
    'experimental static collect should inject stable styleId',
  );
  assert.ok(css.includes('.acss-'), 'experimental static collect should emit emotion css');

  console.log('✅ webpack emit verified');
}

(async () => {
  try {
    verifyStyleIdStability();
    verifyExtractCore();
    verifyBabelStaticCollection();
    verifyViteEmitPlugin();
    verifyCollectorAndHydration();
    await verifyWebpackEmit();
    console.log('🎉 extract prototype verification passed');
  } catch (error) {
    console.error('❌ extract prototype verification failed');
    console.error(error);
    process.exit(1);
  }
})();
