import { css, cx, type CSSObject } from '@emotion/css';
import type { Emotion } from '@emotion/css/create-instance';
import { useMemo } from 'react';

import { useTheme } from '@/hooks';
import { AntdStylish, FullToken, ReturnStyleToUse, StyleDefinition, Theme } from '@/types';

export interface CreateStylesTheme {
  token: FullToken;
  stylish: AntdStylish;
  cx: Emotion['cx'];
  css: Emotion['css'];
}

/**
 * 最终返回 styles 对象的类型定义
 */
export interface ReturnStyles<Obj> {
  styles: ReturnStyleToUse<Obj>;
  theme: Theme;
  cx: Emotion['cx'];
}

/**
 * 创建样式的函数或者对象
 */
export type StyleOrGetStyleFn<P, S> =
  | StyleDefinition<S>
  | ((theme: CreateStylesTheme, props?: P) => StyleDefinition<S>);

/**
 * 业务应用中创建样式基础写法
 */
export function createStyles<Props, Obj>(styleOrGetStyleFn: StyleOrGetStyleFn<Props, Obj>) {
  return (props?: Props) => {
    const theme = useTheme();

    // FIXME：如何收敛类型？ How to fix types?
    // @ts-ignore
    return useMemo<ReturnStyles<Obj>>(() => {
      let styles;

      if (styleOrGetStyleFn instanceof Function) {
        const { stylish, ...token } = theme;

        styles = styleOrGetStyleFn({ token, stylish, cx, css }, props);
      } else {
        styles = styleOrGetStyleFn;
      }

      if (typeof styles === 'object') {
        styles = Object.fromEntries(
          Object.entries(styles).map(([key, value]) => {
            if (typeof value === 'object') {
              return [key, css(value as CSSObject)];
            }

            return [key, value];
          }),
        );
      }

      return {
        styles,
        cx,
        theme,
      };
    }, [theme, props]);
  };
}
