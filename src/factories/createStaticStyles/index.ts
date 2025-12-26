import { createCSS, createEmotion } from '@/core';
import type { BaseReturnType } from '@/types';

import { cssVar, CSSVarMap } from './cssVar';
import { responsive, StaticResponsiveMap } from './responsive';
import type { StaticStylesInput, StaticStyleUtils } from './types';

// 创建全局的 emotion 实例用于静态样式
const staticEmotion = createEmotion({
  key: 'acss-static',
  speedy: false,
});

// 创建静态的 css 和 cx 函数
const { css, cx } = createCSS(staticEmotion.cache, { hashPriority: 'high' });

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
export const createStaticStyles = <T extends BaseReturnType>(stylesFn: StaticStylesInput<T>): T => {
  const utils: StaticStyleUtils = {
    css,
    cx,
    cssVar,
    responsive,
  };

  return stylesFn(utils);
};

// 导出类型和工具
export { cssVar, responsive };
export type { CSSVarMap, StaticResponsiveMap, StaticStylesInput, StaticStyleUtils };
