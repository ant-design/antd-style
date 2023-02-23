import { extractStyle } from '@ant-design/cssinjs';
import createEmotionServer from '@emotion/server/create-instance';
import { EmotionCache } from '@emotion/utils';
import { CacheManager } from 'antd-style';
import chalk from 'chalk';
import { createHash } from 'crypto';
import type { IApi } from 'dumi';
import fs from 'fs';
import { join } from 'path';

declare global {
  // eslint-disable-next-line no-var
  var __ANTD_STYLE_CACHE_MANAGER_FOR_SSR__: CacheManager;
}

const getHash = (str: string) => createHash('md5').update(str).digest('base64url');

const RoutesPlugin = (api: IApi) => {
  // 如果没有开启 SSR，则啥也不做
  if (!api.userConfig.ssr) return;

  api.logger.info('detect ssr config, when building html will extract css.');

  const writeCSSFile = (key: string, hashKey: string, cssString: string) => {
    const fileName = `ssr-${key}-${getHash(hashKey)}.css`;

    const filePath = join(api.paths.absOutputPath, fileName);

    if (!fs.existsSync(filePath)) {
      api.logger.event(chalk.grey(`write to: ${filePath}`));
      fs.writeFileSync(filePath, cssString, 'utf8');
    }

    return fileName;
  };

  const getStyleFromEmotionCache = (
    cache: EmotionCache,
    file: {
      content: string;
      path: string;
    },
  ) => {
    const result = createEmotionServer(cache).extractCritical(file.content);

    const css = result.css ?? '';

    if (!!css) {
      api.logger.event(
        `${chalk.yellow(file.path)} include ${chalk.blue`[${cache.key}]`} ${chalk.yellow(
          result.ids.length,
        )} styles`,
      );

      const cssFile = writeCSSFile(cache.key, result.ids.join(''), css);

      const tag = `<style data-emotion="${cache.key} ${result.ids.join(' ')}">${
        result.css
      }</style>`;

      return { css, file: cssFile, tag };
    }

    return {};
  };

  const addLinkStyle = (html: string, cssFile: string) => {
    const prefix = api.userConfig.publicPath || api.config.publicPath;
    return html.replace('</head>', `<link rel="stylesheet" href="${prefix + cssFile}"></head>`);
  };

  api.modifyExportHTMLFiles((files) =>
    files
      // exclude dynamic route path, to avoid deploy failed by `:id` directory
      .filter((f) => !f.path.includes(':'))

      .map((file) => {
        // 提取 antd-style emotion 样式

        const cacheManager = global.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__;

        cacheManager.getCacheList().forEach((cache) => {
          const styleFromCache = getStyleFromEmotionCache(cache, file);

          if (styleFromCache.file) {
            file.content = addLinkStyle(file.content, styleFromCache.file);
          }
        });

        // 提取 antd 样式
        const styleCache = (global as any).__ANTD_CACHE__;

        const styleText = styleCache ? extractStyle(styleCache) : '';

        const antdCssString = styleText.replace(/<style\s[^>]*>/g, '').replace(/<\/style>/g, '');

        if (antdCssString) {
          api.logger.event(`${chalk.yellow(file.path)} include ${chalk.blue`antd`} styles`);
          const antdCssFileName = writeCSSFile('antd', antdCssString, antdCssString);
          file.content = addLinkStyle(file.content, antdCssFileName);
        }

        return file;
      }),
  );
};

export default RoutesPlugin;
