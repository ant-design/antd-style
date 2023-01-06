import { css, cx, type CSSObject } from '@emotion/css';
import type { Emotion } from '@emotion/css/create-instance';
import { useMemo } from 'react';

import { useAntdToken, useTheme } from '@/hooks';
import { FullToken, Theme } from '@/types';

import type { AntdStylish } from '@/stylish';
import { useInternalStylish } from '@/stylish';

export interface CreateStylesTheme {
  token: FullToken;
  stylish: AntdStylish;
}

export interface ReturnStyles<Key extends string> {
  styles: Record<Key, string>;
  theme: Theme;
  cx: Emotion['cx'];
}

export type StyleParams<T extends string> = string | Record<T, CSSObject | string>;

/**
 * 业务应用中创建样式基础写法
 */
export function createStyles<Props, Key extends string>(
  cssStyleOrGetCssStyleFn:
    | StyleParams<Key>
    | ((theme: CreateStylesTheme, props?: Props) => StyleParams<Key>),
) {
  return (props?: Props): ReturnStyles<Key> => {
    const antdToken = useAntdToken();
    const internalStylish = useInternalStylish();
    const theme = useTheme();

    return useMemo(() => {
      let styles: Record<Key, string>;

      if (typeof cssStyleOrGetCssStyleFn === 'function') {
        const { stylish, ...fullToken } = theme;
        // @ts-ignore
        styles = cssStyleOrGetCssStyleFn(
          {
            token: { ...antdToken, ...fullToken },
            stylish: { ...internalStylish, ...stylish },
          },
          props,
        );
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
    }, [antdToken, theme, props]);
  };
}
