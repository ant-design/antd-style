import { createCSS, createEmotion, DEFAULT_CSS_PREFIX_KEY } from '@/core';
import type { EmotionCache } from '@emotion/css/create-instance';

import type { BaseReturnType, HashPriority } from '@/types';

import { cssVar, CSSVarMap, generateCSSVarMap } from './cssVar';
import { responsive, StaticResponsiveMap } from './responsive';
import type { StaticStylesInput, StaticStyleUtils } from './types';

/**
 * createStaticStyles 的配置选项
 */
export interface CreateStaticStylesOptions {
  /**
   * CSS 变量前缀
   * @default 'ant'
   */
  prefix?: string;
  /**
   * 样式 hash 优先级
   * @default 'high'
   */
  hashPriority?: HashPriority;
  /**
   * 自定义 emotion cache，用于与其他样式共享同一个 cache
   * 如果不提供，将使用默认的全局 cache
   *
   * 若提供了 cache，`speedy` 选项会被忽略（speedy 由该 cache 自身决定）
   */
  cache?: EmotionCache;
  /**
   * 是否开启 emotion 急速模式（speedy mode）
   *
   * 开启后 emotion 使用 `CSSStyleSheet.insertRule()` 注入样式（一个 <style>
   * 标签承载多达 65000 条规则），相较默认逐条 textContent 模式可显著减少
   * DOM 操作开销。但会牺牲 devtools 中实时编辑样式与某些 SSR 抽取场景的能力。
   *
   * 仅当未提供 `cache` 时生效。
   *
   * @default false
   */
  speedy?: boolean;
}

/**
 * 工厂函数返回类型
 */
export interface StaticStylesInstance {
  createStaticStyles: <T extends BaseReturnType>(stylesFn: StaticStylesInput<T>) => T;
  cssVar: CSSVarMap;
  responsive: StaticResponsiveMap;
}

// 创建默认的全局 emotion 实例，使用与默认 styleInstance 相同的 key
const defaultEmotion = createEmotion({
  key: DEFAULT_CSS_PREFIX_KEY,
  speedy: false,
});

// 单例缓存 speedy=true 时的 emotion 实例，避免多次调用 factory 时重复创建
// 同 key emotion 实例（emotion 会发出 multi-instance 警告）
let speedyEmotion: ReturnType<typeof createEmotion> | undefined;

/**
 * 创建 createStaticStyles 工厂函数
 *
 * 用于创建带有自定义 prefix 的 createStaticStyles 实例
 *
 * @example
 * ```tsx
 * // 创建自定义 prefix 的实例
 * const { createStaticStyles, cssVar } = createStaticStylesFactory({ prefix: 'my-app' });
 *
 * const styles = createStaticStyles(({ css, cssVar }) => ({
 *   container: css`
 *     background: ${cssVar.colorBgContainer}; // => var(--my-app-color-bg-container)
 *   `
 * }));
 * ```
 */
export const createStaticStylesFactory = (
  options: CreateStaticStylesOptions = {},
): StaticStylesInstance => {
  const { prefix = 'ant', hashPriority = 'high', cache, speedy = false } = options;

  // 根据 prefix 生成 cssVar
  const customCssVar = generateCSSVarMap(prefix);

  // 决定使用的 emotion cache：
  // 1. 用户显式提供则使用之；
  // 2. speedy=true 时使用单例 speedyEmotion.cache（首次惰性创建）；
  // 3. 否则回退到默认的全局 cache（speedy=false）。
  let emotionCache: EmotionCache;
  if (cache) {
    emotionCache = cache;
  } else if (speedy) {
    if (!speedyEmotion) {
      speedyEmotion = createEmotion({ key: DEFAULT_CSS_PREFIX_KEY, speedy: true });
    }
    emotionCache = speedyEmotion.cache;
  } else {
    emotionCache = defaultEmotion.cache;
  }

  // 创建 css 和 cx 函数
  const { css, cx } = createCSS(emotionCache, { hashPriority });

  const createStaticStyles = <T extends BaseReturnType>(stylesFn: StaticStylesInput<T>): T => {
    const utils: StaticStyleUtils = {
      css,
      cx,
      cssVar: customCssVar,
      responsive,
    };

    return stylesFn(utils);
  };

  return {
    createStaticStyles,
    cssVar: customCssVar,
    responsive,
  };
};

// 默认实例（使用 'ant' 前缀）
const defaultInstance = createStaticStylesFactory();

/**
 * 创建静态样式
 *
 * 与 createStyles 不同，createStaticStyles 直接返回样式对象而非 hook。
 * 样式在模块导入时计算一次，组件内直接使用，无需调用 hook。
 *
 * 静态样式使用与 antd-style 默认实例相同的 emotion cache，
 * 因此可以使用从 antd-style 导出的 cx 来正确合并样式。
 *
 * @example
 * ```tsx
 * import { createStaticStyles, cx } from 'antd-style';
 *
 * // 模块级别定义
 * const styles = createStaticStyles(({ css, cssVar }) => ({
 *   container: css`
 *     background: ${cssVar.colorBgContainer};
 *     color: ${cssVar.colorText};
 *   `,
 *   text: css`
 *     color: ${cssVar.colorText};
 *   `,
 *   secondary: css`
 *     font-size: 12px;
 *   `
 * }));
 *
 * // 组件内直接使用
 * const Component = () => {
 *   // 使用 antd-style 导出的 cx 来合并样式
 *   return <div className={cx(styles.text, styles.secondary)}>Hello</div>;
 * };
 * ```
 *
 * @param stylesFn - 样式生成函数
 * @returns 样式对象
 */
export const createStaticStyles = defaultInstance.createStaticStyles;

// 导出类型和工具
export { cssVar, generateCSSVarMap, responsive };
export type { CSSVarMap, StaticResponsiveMap, StaticStylesInput, StaticStyleUtils };
