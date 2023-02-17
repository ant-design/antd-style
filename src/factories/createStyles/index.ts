import { useMemo } from 'react';

import { createClassNameGenerator, createCX, serializeCSS } from '@/core';
import type {
  BaseReturnType,
  ClassNamesUtil,
  CSSObject,
  HashPriority,
  ResponsiveUtil,
  ReturnStyleToUse,
  UseTheme,
} from '@/types';
import { isReactCssResult } from '@/utils';

import { createUseTheme } from '@/factories/createUseTheme';
import { Emotion, EmotionCache } from '@emotion/css/create-instance';
import { convertResponsiveStyleToString, useMediaQueryMap } from './response';
import { ReturnStyles, StyleOrGetStyleFn } from './types';

interface CreateStylesFactory {
  cache: EmotionCache;
  cx: Emotion['cx'];
  styledUseTheme?: UseTheme;
  hashPriority?: HashPriority;
}

export interface CreateStyleOptions {
  hashPriority?: HashPriority;
}

/**
 * 创建样式基础写法
 */
export const createStylesFactory =
  ({ styledUseTheme, hashPriority, cache, cx: emotionCX }: CreateStylesFactory) =>
  <Props, Input extends BaseReturnType = BaseReturnType>(
    styleOrGetStyle: StyleOrGetStyleFn<Input, Props>,
  ) =>
  (props?: Props, options?: CreateStyleOptions): ReturnStyles<Input> => {
    const useTheme = createUseTheme(styledUseTheme);
    const theme = useTheme();

    const responsiveMap = useMediaQueryMap();

    const css = createClassNameGenerator(cache, options?.hashPriority || hashPriority);

    // 由于使用了 reactCss 作为基础样式工具，因此在使用 cx 级联 className 时需要使用特殊处理的 cx
    // 要将 reactCss 的产出转为 css 产物
    const cxUtil: ClassNamesUtil = createCX(css, emotionCX);

    const styles = useMemo(() => {
      let tempStyles: ReturnStyleToUse<Input>;

      // 函数场景
      if (styleOrGetStyle instanceof Function) {
        const { stylish, appearance, isDarkMode, prefixCls, ...token } = theme;

        // 创建响应式断点选择器的工具函数
        // @ts-ignore
        const responsive: ResponsiveUtil = (styles) =>
          convertResponsiveStyleToString(styles, responsiveMap);
        // 并赋予其相应的断点工具
        Object.assign(responsive, responsiveMap);

        tempStyles = styleOrGetStyle(
          {
            token,
            stylish,
            appearance,
            isDarkMode,
            prefixCls,
            // 工具函数们
            cx: cxUtil,
            css: serializeCSS,
            responsive,
          },
          props!,
        ) as any;
      }
      // 没有函数时直接就是 object 或者 string
      else {
        tempStyles = styleOrGetStyle as any;
      }

      if (typeof tempStyles === 'object') {
        // 判断是否是用 reactCSS 生成的
        if (isReactCssResult(tempStyles)) {
          // 如果是用 reactCss 生成的话，需要用 className 的 css 做一层转换
          tempStyles = css(tempStyles) as any;
        } else {
          // 不是的话就是直接是 复合的 css object
          tempStyles = Object.fromEntries(
            Object.entries(tempStyles).map(([key, value]) => {
              // 这里有可能是 x:{ color:red } 也可能是 c:reactCss`color:red`;
              // 但无论哪种，都可以直接用 css 包一下转换成 className
              if (typeof value === 'object') {
                return [key, css(value as CSSObject)];
              }

              // 这里只可能是 c: css`color:red`; css 直接来自 antd-style，因此啥也不用处理
              return [key, value];
            }),
          ) as any;
        }
      }

      return tempStyles;
    }, [styleOrGetStyle, props, theme]);

    return useMemo(() => {
      const { prefixCls, ...res } = theme;
      return { styles, cx: cxUtil, theme: res, prefixCls };
    }, [styles, theme]);
  };
