import { useMemo } from 'react';

import { useEmotion, useTheme } from '@/hooks';
import type {
  CommonStyleUtils,
  FullStylish,
  FullToken,
  ReturnStyleToUse,
  StyleInputType,
  Theme,
  ThemeAppearance,
} from '@/types';

import { type CSSObject, type Emotion } from './css';

export interface CreateStylesTheme extends CommonStyleUtils {
  token: FullToken;
  stylish: FullStylish;
  appearance: ThemeAppearance;
  isDarkMode: boolean;
  prefixCls: string;
}

/**
 * 最终返回 styles 对象的类型定义
 */
export interface ReturnStyles<T extends StyleInputType> {
  styles: ReturnStyleToUse<T>;
  theme: Omit<Theme, 'prefixCls'>;
  cx: Emotion['cx'];
  prefixCls: string;
}

// 获取样式
export type GetStyleFn<Input extends StyleInputType, Props> = (
  theme: CreateStylesTheme,
  props: Props,
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
  <Props, Input extends StyleInputType = StyleInputType>(
    styleOrGetStyleFn: StyleOrGetStyleFn<Input, Props>,
  ) =>
  (props?: Props): ReturnStyles<Input> => {
    const theme = useTheme();
    const { css, cx } = useEmotion();

    const styles = useMemo(() => {
      let tempStyles: ReturnStyleToUse<Input>;

      // 函数场景
      if (styleOrGetStyleFn instanceof Function) {
        const { stylish, appearance, isDarkMode, prefixCls, ...token } = theme;

        tempStyles = styleOrGetStyleFn(
          { token, stylish, appearance, cx, css, isDarkMode, prefixCls },
          props!,
        ) as any;
      }
      // 没有函数时直接就是 object 或者 string
      else {
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

    return useMemo(() => {
      const { prefixCls, ...res } = theme;
      return { styles, cx, theme: res, prefixCls };
    }, [styles, theme]);
  };
