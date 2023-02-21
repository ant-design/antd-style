import { extractStyle } from '@ant-design/cssinjs';
import createEmotionServer from '@emotion/server/create-instance';
import { EmotionCache } from '@emotion/utils';
import type { IApi } from 'dumi';
import fs from 'fs';
import { join } from 'path';

const RoutesPlugin = (api: IApi) => {
  const ssrCssFileName = `ssr-${Date.now()}.css`;

  api.modifyExportHTMLFiles((files) =>
    files
      // exclude dynamic route path, to avoid deploy failed by `:id` directory
      .filter((f) => !f.path.includes(':'))
      // FIXME: workaround to make emotion support react 18 pipeableStream
      // ref: https://github.com/emotion-js/emotion/issues/2800#issuecomment-1221296308
      .map((file) => {
        let styles = '';
        // @ts-ignore
        const cache = global.__ANTD_STYLE_CACHE__ as EmotionCache;

        const { extractCritical } = createEmotionServer(cache);

        const result = extractCritical(file.content);

        // extract all emotion style tags from body
        file.content = file.content.replace(/<style data-emotion[\S\s]+?<\/style>/g, (s) => {
          styles += s;

          return '';
        });

        const antdStyle = result.css
          ? `<style data-emotion="${cache.key} ${result.ids.join(' ')}">${result.css}</style>`
          : '';

        if (!!antdStyle) {
          api.logger.info(
            `${file.path} 包含 antd-style [${cache.key}] ${result.ids.length} 组样式`,
          );
        }
        // insert emotion style tags to head
        file.content = file.content.replace(
          '</head>',
          `${styles}
${antdStyle}</head>`,
        );

        return file;
      }),
  );

  // add ssr css file to html
  api.modifyConfig((memo) => {
    memo.styles ??= [];
    memo.styles.push(api.userConfig.publicPath + ssrCssFileName);

    return memo;
  });

  // generate ssr css file
  api.onBuildHtmlComplete(() => {
    const styleCache = (global as any).__ANTD_CACHE__;

    const styleText = styleCache ? extractStyle(styleCache) : '';

    const styleTextWithoutStyleTag = styleText
      .replace(/<style\s[^>]*>/g, '')
      .replace(/<\/style>/g, '');

    fs.writeFileSync(
      join(__dirname, `../../dist/${ssrCssFileName}`),
      styleTextWithoutStyleTag,
      'utf8',
    );
  });
};

export default RoutesPlugin;
