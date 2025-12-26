import { createCSS, createEmotion } from '@/core';
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
}

/**
 * 工厂函数返回类型
 */
export interface StaticStylesInstance {
  createStaticStyles: <T extends BaseReturnType>(stylesFn: StaticStylesInput<T>) => T;
  cssVar: CSSVarMap;
  responsive: StaticResponsiveMap;
}

// 创建全局的 emotion 实例用于静态样式
const staticEmotion = createEmotion({
  key: 'acss-static',
  speedy: false,
});

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
  const { prefix = 'ant', hashPriority = 'high' } = options;

  // 根据 prefix 生成 cssVar
  const customCssVar = generateCSSVarMap(prefix);

  // 创建 css 和 cx 函数
  const { css, cx } = createCSS(staticEmotion.cache, { hashPriority });

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
 * @example
 * ```tsx
 * // 模块级别定义
 * const styles = createStaticStyles(({ css, cssVar }) => ({
 *   container: css`
 *     background: ${cssVar.colorBgContainer};
 *     color: ${cssVar.colorText};
 *   `
 * }));
 *
 * // 组件内直接使用
 * const Component = () => {
 *   return <div className={styles.container}>Hello</div>;
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
