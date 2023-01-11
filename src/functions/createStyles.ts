import { css, cx, type CSSObject } from '@emotion/css';
import type { Emotion } from '@emotion/css/create-instance';
import { useMemo } from 'react';

import { useTheme } from '@/hooks';
import {
  CommonStyleUtils,
  FullStylish,
  FullToken,
  ReturnStyleToUse,
  StyleInputType,
  Theme,
  ThemeAppearance,
} from '@/types';

export interface CreateStylesTheme extends CommonStyleUtils {
  token: FullToken;
  stylish: FullStylish;
  appearance: ThemeAppearance;
}

/**
 * 最终返回 styles 对象的类型定义
 */
export interface ReturnStyles<T extends StyleInputType> {
  styles: ReturnStyleToUse<T>;
  theme: Theme;
  cx: Emotion['cx'];
}

// 获取样式
export type GetStyleFn<Input extends StyleInputType, Props> = <P extends Props>(
  theme: CreateStylesTheme,
  props?: P,
) => Input;

/**
 * 创建样式的函数或者对象
 */
export type StyleOrGetStyleFn<Input extends StyleInputType, Props> =
  | Input
  | GetStyleFn<Input, Props>;

/**
 * 业务应用中创建样式基础写法
 */
export const createStyles =
  <Props, Input extends StyleInputType>(styleOrGetStyleFn: StyleOrGetStyleFn<Input, Props>) =>
  (props?: Props): ReturnStyles<Input> => {
    const theme = useTheme();

    const styles = useMemo(() => {
      let tempStyles: ReturnStyleToUse<Input>;

      if (styleOrGetStyleFn instanceof Function) {
        const { stylish, appearance, ...token } = theme;

        tempStyles = styleOrGetStyleFn({ token, stylish, appearance, cx, css }, props) as any;
      } else {
        tempStyles = styleOrGetStyleFn as any;
      }

      if (typeof tempStyles === 'object') {
        tempStyles = Object.fromEntries(
          Object.entries(tempStyles).map(([key, value]) => {
            if (typeof value === 'object') {
              return [key, css(value as CSSObject)];
            }

            return [key, value];
          }),
        ) as any;
      }

      return tempStyles;
    }, [styleOrGetStyleFn, props, theme]);

    return useMemo(() => ({ styles, cx, theme }), [styles, theme]);
  };
