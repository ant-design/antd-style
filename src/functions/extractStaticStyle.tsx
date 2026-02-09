import { createCache, extractStyle } from '@ant-design/cssinjs';
import CacheEntity from '@ant-design/cssinjs/es/Cache';
import { EmotionCache } from '@emotion/css/create-instance';
import { version, type ThemeConfig } from 'antd';

import { getAntdToken, toKebabCase } from '@/factories/createStaticStyles/cssVar';
import type { GetAntdThemeConfig, ThemeAppearance } from '@/types';
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

type TokenVarFilter = 'color' | 'colors' | 'all';

interface InjectTokenStyleOptions {
  /**
   * Theme appearance.
   * @default 'light'
   */
  appearance?: ThemeAppearance;
  /**
   * Same as `ThemeProvider`'s `theme` prop:
   * - pass a ThemeConfig directly
   * - or pass a getter function by appearance
   */
  theme?: ThemeConfig | GetAntdThemeConfig;
  /**
   * CSS variable prefix.
   * @default 'ant'
   */
  prefix?: string;
  /**
   * CSS selector to attach vars.
   * @default ':root'
   */
  selector?: string;
  /**
   * Which token keys to inject.
   *
   * - 'color': only `color*` keys and palette keys like `blue1`
   * - 'colors': all token entries whose value looks like a color string (includes shadows/gradients if they are color-like)
   * - 'all': all token entries
   *
   * @default 'colors'
   */
  filter?: TokenVarFilter;
}

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
  /**
   * Inject an extra `<style>` tag that contains CSS variables generated from
   * antd token values for a specified appearance (e.g. dark/light).
   *
   * This is useful for SSR/SSG to avoid theme flashing (FOUC) when you use
   * `cssVar.xxx` in your static styles.
   *
   * @default false
   */
  injectTokenStyle?: boolean | InjectTokenStyleOptions;
}

const isColorLike = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  const v = value.trim().toLowerCase();
  return (
    v.startsWith('#') ||
    v.startsWith('rgb(') ||
    v.startsWith('rgba(') ||
    v.startsWith('hsl(') ||
    v.startsWith('hsla(') ||
    v.startsWith('var(') ||
    v === 'transparent' ||
    v === 'currentcolor'
  );
};

const isColorTokenKey = (key: string): boolean => {
  // `colorPrimary`, `colorBgBase`, etc.
  if (key.startsWith('color')) return true;
  // palette keys like `blue1`, `geekblue10`, `cyan2`, etc.
  // (keep it broad: letters + digits)
  return /^[a-z]+(\d{1,2})$/i.test(key);
};

const createTokenVarStyleItem = (inject: boolean | InjectTokenStyleOptions): StyleItem | null => {
  const options = inject === true ? ({} as InjectTokenStyleOptions) : inject;
  if (!options) return null;

  const appearance = options.appearance ?? 'light';
  const prefix = options.prefix ?? 'ant';
  const selector = options.selector ?? ':root';
  const filter: TokenVarFilter = options.filter ?? 'colors';

  const token = getAntdToken({ appearance, theme: options.theme });

  const vars: string[] = [];
  for (const [rawKey, rawValue] of Object.entries(token)) {
    // Filter out kebab-case keys (antd token may include both `yellow1` and `blue-1`).
    if (rawKey.includes('-')) continue;

    if (filter === 'color' && !isColorTokenKey(rawKey)) continue;
    if (filter === 'colors' && !isColorLike(rawValue)) continue;
    if (rawValue === null || typeof rawValue === 'undefined') continue;

    const kebabKey = toKebabCase(rawKey);
    const value = typeof rawValue === 'number' ? `${rawValue}px` : String(rawValue);
    vars.push(`--${prefix}-${kebabKey}:${value};`);
  }

  if (vars.length === 0) return null;

  const css = `${selector}{${vars.join('')}}`;
  const key = `${prefix}-token-${appearance}`;

  return {
    key,
    ids: [],
    css,
    style: (
      <style
        key={key}
        data-antd-style-token={appearance}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    ),
    tag: `<style data-antd-style-token="${appearance}">${css}</style>`,
  };
};

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

  const tokenStyleItem = options?.injectTokenStyle
    ? createTokenVarStyleItem(options.injectTokenStyle)
    : null;

  const result = styles.filter(Boolean) as StyleItem[];
  if (tokenStyleItem) result.push(tokenStyleItem);

  return result;
};

extractStaticStyle.cache = defaultAntdCache;
