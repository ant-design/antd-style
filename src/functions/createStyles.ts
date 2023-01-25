import { useMemo } from 'react';

import { useEmotion, useTheme } from '@/hooks';
import type {
  CommonStyleUtils,
  EmotionCX,
  FullStylish,
  FullToken,
  ReturnStyleToUse,
  StyleInputType,
  Theme,
  ThemeAppearance,
} from '@/types';
import { isReactCssResult } from '@/utils';

import { type CSSObject } from './css';
import { reactCss } from './react';

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
export interface ReturnStyles<T extends StyleInputType> extends Pick<CommonStyleUtils, 'cx'> {
  styles: ReturnStyleToUse<T>;
  theme: Omit<Theme, 'prefixCls'>;
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

        // 由于使用了 reactCss 作为基础样式工具，因此在使用 cx 级联 className 时需要使用特殊处理的 cx，要将 reactCss 的产出转为 css 产物
        const reactCx: EmotionCX = (...classNames) =>
          cx(...classNames.map((c) => (isReactCssResult(c) ? css(c) : c)));

        tempStyles = styleOrGetStyleFn(
          { token, stylish, appearance, cx: reactCx, css: reactCss, isDarkMode, prefixCls },
          props!,
        ) as any;
      }
      // 没有函数时直接就是 object 或者 string
      else {
        tempStyles = styleOrGetStyleFn as any;
      }

      if (typeof tempStyles === 'object') {
        // 判断是否是直接用 reactCSS 生成的
        if (isReactCssResult(tempStyles)) {
          tempStyles = css(tempStyles) as any;
        } else {
          // 不是的话就是直接是 css object，需要转换了
          tempStyles = Object.fromEntries(
            Object.entries(tempStyles).map(([key, value]) => {
              // 这里有可能是 x:{ color:red } 也可能是 c:reactCss`color:red`;
              // 但无论哪种，都可以直接用 css 包一下转换掉
              if (typeof value === 'object') {
                return [key, css(value as CSSObject)];
              }

              // 这里只可能是 c: css`color:red`; css 直接来自 antd-style
              return [key, value];
            }),
          ) as any;
        }
      }

      return tempStyles;
    }, [styleOrGetStyleFn, props, theme]);

    return useMemo(() => {
      const { prefixCls, ...res } = theme;
      return { styles, cx, theme: res, prefixCls };
    }, [styles, theme]);
  };
