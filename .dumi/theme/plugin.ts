import { extractStyle } from '@ant-design/cssinjs';
import createEmotionServer from '@emotion/server/create-instance';
import { EmotionCache } from '@emotion/utils';
import chalk from 'chalk';
import { createHash } from 'crypto';
import type { IApi } from 'dumi';
import fs from 'fs';
import { join } from 'path';

const getHash = (str: string) => createHash('md5').update(str).digest('base64url');

const RoutesPlugin = (api: IApi) => {
  const writeCSSFile = (key: string, hashKey: string, cssString: string) => {
    const fileName = `ssr-${key}-${getHash(hashKey)}.css`;

    const filePath = join(api.paths.absOutputPath, fileName);

    if (!fs.existsSync(filePath)) {
      api.logger.info(chalk.grey(`写入文件: ${filePath}`));
      fs.writeFileSync(filePath, cssString, 'utf8');
    }

    return fileName;
  };

  const getStyleFromEmotionCache = (cache: EmotionCache, html: string, path: string) => {
    const result = createEmotionServer(cache).extractCritical(html);

    const css = result.css ?? '';

    if (!!css) {
      api.logger.info(
        `${chalk.yellow(path)} 包含 [${cache.key}] ${chalk.yellow(result.ids.length)} 组样式`,
      );

      const file = writeCSSFile(cache.key, result.ids.join(''), css);

      const tag = `<style data-emotion="${cache.key} ${result.ids.join(' ')}">${
        result.css
      }</style>`;

      return { css, file, tag };
    }

    return {};
  };

  const addLinkStyle = (html: string, cssFile: string) => {
    return html.replace(
      '</head>',
      `<link rel="stylesheet" href="${api.userConfig.publicPath + cssFile}"></head>`,
    );
  };

  api.modifyExportHTMLFiles((files) =>
    files
      // exclude dynamic route path, to avoid deploy failed by `:id` directory
      .filter((f) => !f.path.includes(':'))

      .map((file) => {
        // 提取 antd-style 样式

        const antdStyle = getStyleFromEmotionCache(
          // @ts-ignore
          global.__ANTD_STYLE_CACHE__ as EmotionCache,
          file.content,
          file.path,
        );

        if (antdStyle.file) {
          file.content = addLinkStyle(file.content, antdStyle.file);
        }
        // 提取 emotion 默认样式
        const emotionStyle = getStyleFromEmotionCache(
          // @ts-ignore
          global.__EMOTION_CACHE__ as EmotionCache,
          file.content,
          file.path,
        );
        if (emotionStyle.file) {
          file.content = addLinkStyle(file.content, emotionStyle.file);
        }

        // 提取 antd 样式
        const styleCache = (global as any).__ANTD_CACHE__;

        const styleText = styleCache ? extractStyle(styleCache) : '';

        const antdCssString = styleText.replace(/<style\s[^>]*>/g, '').replace(/<\/style>/g, '');

        const antdCssFileName = writeCSSFile('antd', antdCssString, antdCssString);

        if (antdCssString) {
          file.content = addLinkStyle(file.content, antdCssFileName);
        }

        return file;
      }),
  );
};

export default RoutesPlugin;
