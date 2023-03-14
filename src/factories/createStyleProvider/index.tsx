import { DEFAULT_CSS_PREFIX_KEY } from '@/core';
import { createEmotion, Emotion } from '@/core/createEmotion';
import { StyleManager } from '@/types';
import { StylisPlugin } from '@emotion/cache';
import { Context, FC, memo, ReactNode, useEffect, useMemo } from 'react';

export interface StyleProviderProps {
  prefix: string;

  nonce?: string;
  stylisPlugins?: StylisPlugin[];
  container?: HTMLElement;
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

      ...emotionOptions
    }) => {
      const emotion = useMemo(() => {
        const defaultSpeedy = process.env.NODE_ENV === 'development';

        return createEmotion({
          speedy: speedy ?? defaultSpeedy,
          key: prefix,
          ...emotionOptions,
        });
      }, [prefix, speedy, emotionOptions]);

      useEffect(() => {
        getStyleManager?.(emotion);
      }, [emotion]);

      return <EmotionContext.Provider value={emotion}>{children}</EmotionContext.Provider>;
    },
  );
