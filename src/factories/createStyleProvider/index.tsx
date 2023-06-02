import { createEmotion, Emotion } from '@/core/createEmotion';
import { StyleManager } from '@/types';
import { StyleProvider as AntdStyleProvider } from '@ant-design/cssinjs';
import { StylisPlugin } from '@emotion/cache';
import {
  ComponentProps,
  Context,
  FC,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';

export interface StyleProviderProps
  extends Partial<
    Pick<
      ComponentProps<typeof AntdStyleProvider>,
      'autoClear' | 'cache' | 'hashPriority' | 'ssrInline' | 'transformers'
    >
  > {
  /**
   * emotion 样式前缀，默认值为 acss
   */
  prefix?: string;

  /**
   * 随机数，用于 CSP
   */
  nonce?: string;

  /**
   * Stylis 插件
   */
  stylisPlugins?: StylisPlugin[];

  /**
   * 渲染样式的容器
   */
  container?: Element | ShadowRoot | null;

  /**
   * 开启极速模式，极速模式下不会插入真实的样式 style
   * @default false
   */
  speedy?: boolean;

  /**
   * 样式插入点，用于控制第一个 style 标签插入的位置
   */
  insertionPoint?: HTMLElement;

  /**
   * 获取到 styleManager 实例的回调函数
   * @param styleManager - StyleManager 实例
   */
  getStyleManager?: (styleManager: StyleManager) => void;

  /**
   * 子组件
   */
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

        const instance = createEmotion({
          speedy: speedy ?? defaultSpeedy,
          key: prefix,
          container: container as Node,
          nonce,
          insertionPoint,
          stylisPlugins,
        });

        const cacheManager = global?.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__;

        if (cacheManager) {
          // add 方法有幂等
          cacheManager.add(instance.cache);
        }

        return instance;
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
