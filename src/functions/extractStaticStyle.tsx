import createEmotionServer from '@emotion/server/create-instance';
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

/**
 * Extract Static style
 * @param html html page string
 */
export const extractStaticStyle = (html: string): StyleItem[] => {
  // copy from emotion ssr
  // https://github.com/vercel/next.js/blob/deprecated-main/examples/with-emotion-vanilla/pages/_document.js
  const styles = global.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__.getCacheList().map((cache) => {
    const result = createEmotionServer(cache).extractCritical(html);
    if (!result) return null;

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

  return styles.filter(Boolean) as StyleItem[];
};
