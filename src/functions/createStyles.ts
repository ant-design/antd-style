import { css, cx, type CSSObject } from '@emotion/css';
import type { Emotion } from '@emotion/css/create-instance';
import { useMemo } from 'react';

import { useTheme } from '@/hooks';
import { AntdStylish, FullToken, Theme } from '@/types';

export interface CreateStylesTheme {
  token: FullToken;
  stylish: AntdStylish;
  cx: Emotion['cx'];
  css: Emotion['css'];
}

export type StyleParams<T extends string> = string | Record<T, CSSObject | string>;

export type CssStyleOrGetCssStyleFn<Props, Key extends string> =
  | StyleParams<Key>
  | ((theme: CreateStylesTheme, props?: Props) => StyleParams<Key>);

export interface ReturnStyles<Key extends string> {
  styles: Record<Key, string>;
  theme: Theme;
  cx: Emotion['cx'];
}

/**
 * 业务应用中创建样式基础写法
 */
export function createStyles<Props, Key extends string>(
  cssStyleOrGetCssStyleFn: CssStyleOrGetCssStyleFn<Props, Key>,
) {
  return (props?: Props): ReturnStyles<Key> => {
    const theme = useTheme();

    return useMemo(() => {
      let styles: Record<Key, string>;

      if (typeof cssStyleOrGetCssStyleFn === 'function') {
        const { stylish, ...token } = theme;
        // @ts-ignore
        styles = cssStyleOrGetCssStyleFn({ token, stylish, cx, css }, props);
      } else {
        // @ts-ignore
        styles = cssStyleOrGetCssStyleFn;
      }

      if (typeof styles === 'object') {
        styles = Object.fromEntries(
          Object.entries(styles).map(([key, value]) => {
            if (typeof value === 'object') {
              return [key, css(value as CSSObject)];
            }

            return [key, value];
          }),
        ) as Record<Key, string>;
      }
      // 处理

      return {
        styles,
        cx,
        theme,
      };
    }, [theme, props]);
  };
}
