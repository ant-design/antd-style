import type { BaseReturnType } from '@/types';

import type { CSSVarMap } from './cssVar';
import type { StaticResponsiveMap } from './responsive';

/**
 * createStaticStyles 工具函数参数
 */
export interface StaticStyleUtils {
  /**
   * CSS 模板函数，将样式转换为 className
   */
  css: (template: TemplateStringsArray, ...args: any[]) => string;
  /**
   * 合并多个 className
   */
  cx: (...classNames: any[]) => string;
  /**
   * antd CSS 变量映射
   */
  cssVar: CSSVarMap;
  /**
   * 响应式断点映射
   */
  responsive: StaticResponsiveMap;
}

/**
 * createStaticStyles 的输入函数类型
 */
export type StaticStylesInput<T extends BaseReturnType> = (utils: StaticStyleUtils) => T;
