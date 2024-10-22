import { createCache, extractStyle } from '@ant-design/cssinjs';
import CacheEntity from '@ant-design/cssinjs/es/Cache';
import { EmotionCache } from '@emotion/css/create-instance';
import { version } from 'antd';

import { createExtractCritical } from '@/utils/createEmotionServer';

const createExtractCriticalWithoutHtml = (cache: EmotionCache) => ({
  ids: Object.keys(cache.inserted),
  css: Object.values(cache.inserted)
    .filter((i) => typeof i === 'string')
    .join(''),
});

/**
 * 表示一个样式项
 */
export interface StyleItem {
  /**
   * @title 键值
   */
  key: string;
  /**
   * @title 样式元素
   */
  style: JSX.Element;
  /**
   * @title 样式对应的 CSS 字符串
   */
  css: string;
  /**
   * @title 样式应用的元素 ID 数组
   */
  ids: string[];
  /**
   * @title 样式应用的元素标签名
   */
  tag: string;
}

const defaultAntdCache = createCache();

interface ExtractStyleOptions {
  /**
   * 抽取样式时是否包含 antd，默认抽取
   * @default true
   */
  includeAntd?: boolean;
  /**
   * Antd 样式缓存配置
   */
  antdCache?: CacheEntity;
}

/**
 * Extract Static style
 * @param html html page string
 * @param options
 */
export const extractStaticStyle = (html?: string, options?: ExtractStyleOptions): StyleItem[] => {
  const shouldExtreactAntdStyle =
    typeof options?.includeAntd !== 'undefined' ? options.includeAntd : true;

  const cache = options?.antdCache ?? defaultAntdCache;
  const styleText = extractStyle(cache);

  const antdCssString = styleText.replace(/<style\s[^>]*>/g, '').replace(/<\/style>/g, '');

  const antdStyle: StyleItem = {
    style: (
      <style
        key={'antd'}
        data-antd-version={version}
        data-rc-order="prepend"
        data-rc-priority="-9999"
        dangerouslySetInnerHTML={{ __html: antdCssString }}
      />
    ),
    ids: Array.from(cache.cache.keys()),
    key: 'antd',
    css: antdCssString,
    tag: `<style data-rc-order="prepend" data-rc-priority="-9999" data-antd-version="${version}">${antdCssString}</style>`,
  };

  // copy from emotion ssr
  // https://github.com/vercel/next.js/blob/deprecated-main/examples/with-emotion-vanilla/pages/_document.js
  const styles = global.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__.getCacheList().map((cache) => {
    const extractHtml = createExtractCritical(cache);

    const result: { ids: string[]; css: string } = !html
      ? createExtractCriticalWithoutHtml(cache)
      : extractHtml(html);

    if (!result.css) return null;

    const { css, ids } = result;

    return {
      key: cache.key,
      style: (
        <style
          key={cache.key}
          data-emotion={`${cache.key} ${ids.join(' ')}`}
          dangerouslySetInnerHTML={{ __html: css }}
        />
      ),
      css,
      ids,
      tag: `<style data-emotion="${cache.key} ${result.ids.join(' ')}">${result.css}</style>`,
    };
  });

  // 只有当有 antd 的 css ，且需要抽取 antd 样式时，才抽取 antd 样式
  if (!!antdCssString && shouldExtreactAntdStyle) {
    styles.unshift(antdStyle);
  }

  return styles.filter(Boolean) as StyleItem[];
};

extractStaticStyle.cache = defaultAntdCache;
