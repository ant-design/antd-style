import { DEFAULT_CSS_PREFIX_KEY } from '@/core';
import { createEmotion, Emotion } from '@/core/createEmotion';
import { StyleManager } from '@/types';
import { StyleProvider as AntdStyleProvider } from '@ant-design/cssinjs';
import type { StyleContextProps } from '@ant-design/cssinjs/es/StyleContext';
import { StylisPlugin } from '@emotion/cache';
import { Context, FC, memo, ReactNode, useEffect, useMemo } from 'react';

export interface StyleProviderProps
  extends Partial<
    Pick<StyleContextProps, 'autoClear' | 'cache' | 'hashPriority' | 'ssrInline' | 'transformers'>
  > {
  prefix?: string;

  nonce?: string;
  stylisPlugins?: StylisPlugin[];
  container?: Element | ShadowRoot | null;
  /**
   * 开启极速模式，极速模式下不会插入真实的样式 style
   * @default false
   */
  speedy?: boolean;
  insertionPoint?: HTMLElement;

  /**
   * 获取到 styleManager 实例
   * @param styleManager
   */
  getStyleManager?: (styleManager: StyleManager) => void;
  children: ReactNode;
}

interface DefaultProps {
  prefix: string;
  speedy?: boolean;
  container?: Node;
  defaultEmotion: Emotion;
}

export const createStyleProvider = (
  EmotionContext: Context<Emotion>,
  defaultProps?: DefaultProps,
): FC<StyleProviderProps> =>
  memo(
    ({
      children,
      prefix = defaultProps?.prefix || DEFAULT_CSS_PREFIX_KEY,
      speedy = defaultProps?.speedy,
      getStyleManager,
      container = defaultProps?.container,
      nonce,
      insertionPoint,
      stylisPlugins,
      ...antdStyleProviderProps
    }) => {
      // FIXME: 现在的解决方案比较 hack，通过修改默认传入的 defaultEmotion 的方式来实现，后续新方案里要考虑通过 context 的方式来实现
      if (container && defaultProps) {
        defaultProps.defaultEmotion.sheet.container = container;
      }

      // useEffect(() => {
      //   console.log(container);
      // }, [container]);
      const emotion = useMemo(() => {
        const defaultSpeedy = process.env.NODE_ENV === 'development';

        return createEmotion({
          speedy: speedy ?? defaultSpeedy,
          key: prefix,
          container: container as Node,
          nonce,
          insertionPoint,
          stylisPlugins,
        });
      }, [prefix, speedy, container, nonce, insertionPoint, stylisPlugins]);

      useEffect(() => {
        getStyleManager?.(emotion);
      }, [emotion]);

      const content = <EmotionContext.Provider value={emotion}>{children}</EmotionContext.Provider>;

      if (Boolean(Object.keys(antdStyleProviderProps).length) || container) {
        return (
          // @ts-ignore
          <AntdStyleProvider container={container} {...antdStyleProviderProps}>
            {content}
          </AntdStyleProvider>
        );
      }
      return content;
    },
  );
