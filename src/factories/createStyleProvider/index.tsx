import { createEmotion, Emotion } from '@/core/createEmotion';
import { StyleManager } from '@/types';
import { StyleProvider as AntdStyleProvider } from '@ant-design/cssinjs';
import type { StyleContextProps } from '@ant-design/cssinjs/es/StyleContext';
import { StylisPlugin } from '@emotion/cache';
import { Context, FC, memo, ReactNode, useContext, useEffect, useMemo } from 'react';

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

export const createStyleProvider = (EmotionContext: Context<Emotion>): FC<StyleProviderProps> =>
  memo(
    ({
      children,
      prefix: outerPrefix,
      speedy: outSpeedy,
      getStyleManager,
      container: outerContainer,
      nonce,
      insertionPoint,
      stylisPlugins,
      ...antdStyleProviderProps
    }) => {
      const defaultEmotion = useContext(EmotionContext);

      const prefix = outerPrefix ?? defaultEmotion.sheet.key;
      const container = outerContainer ?? defaultEmotion.sheet.container;
      const speedy = outSpeedy ?? defaultEmotion.sheet.isSpeedy;

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
