import { Context, useContext, useMemo } from 'react';

import { Emotion, createCSS, serializeCSS } from '@/core';
import type {
  BaseReturnType,
  CSSObject,
  ClassNameGeneratorOption,
  HashPriority,
  ResponsiveUtil,
  ReturnStyleToUse,
} from '@/types';
import { isReactCssResult } from '@/utils';

import { convertResponsiveStyleToString, useMediaQueryMap } from './response';
import { ReturnStyles, StyleOrGetStyleFn } from './types';

interface CreateStylesFactory {
  EmotionContext: Context<Emotion>;
  hashPriority?: HashPriority;
  useTheme: () => any;
}

/**
 * 创建样式基础写法
 */
export const createStylesFactory =
  ({ hashPriority, useTheme, EmotionContext }: CreateStylesFactory) =>
  <Props, Input extends BaseReturnType = BaseReturnType>(
    styleOrGetStyle: StyleOrGetStyleFn<Input, Props>,
    options?: ClassNameGeneratorOption,
  ) => {
    // 返回 useStyles 方法，作为 hooks 使用
    return (props?: Props): ReturnStyles<Input> => {
      const theme = useTheme();
      const { cache } = useContext(EmotionContext);
      // 由于 toClassName 方法依赖了用户给 createStyle 传递的 hashPriority，所以需要在这里重新生成 cx 和 toClassName 方法
      const { cx, css: toClassName } = createCSS(cache, {
        hashPriority: options?.hashPriority || hashPriority,
        fileName: options?.fileName,
      });

      const responsiveMap = useMediaQueryMap();

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
              cx,
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
            tempStyles = toClassName(tempStyles) as any;
          } else {
            // 不是的话就是直接是 复合的 css object
            tempStyles = Object.fromEntries(
              Object.entries(tempStyles).map(([key, value]) => {
                // 这里有可能是 x:{ color:red } 也可能是 c:reactCss`color:red`;
                // 但无论哪种，都可以直接用 css 包一下转换成 className
                if (typeof value === 'object') {
                  return [key, toClassName(value as CSSObject)];
                }

                // 这里只可能是 c: css`color:red`; css 直接来自 antd-style，因此啥也不用处理
                return [key, value];
              }),
            ) as any;
          }
        }

        return tempStyles;
      }, [props, theme]);

      return useMemo(() => {
        const { prefixCls, ...res } = theme;
        return { styles, cx, theme: res, prefixCls };
      }, [styles, theme]);
    };
  };
