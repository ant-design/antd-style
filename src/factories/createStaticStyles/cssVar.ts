import { theme } from 'antd';
import type { AliasToken } from 'antd/es/theme/interface';

/**
 * 将 camelCase 转换为 kebab-case
 * 处理连续大写字母的情况，如 paddingLG → padding-lg, screenXSMax → screen-xs-max
 */
const toKebabCase = (str: string): string =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

/**
 * 根据 token keys 生成 CSS 变量映射
 * @param prefix - CSS 变量前缀，默认为 'ant'
 * @returns CSS 变量映射对象
 */
export const generateCSSVarMap = (prefix = 'ant'): Record<keyof AliasToken, string> => {
  const token = theme.getDesignToken();
  const cssVar = {} as Record<keyof AliasToken, string>;

  for (const key of Object.keys(token) as Array<keyof AliasToken>) {
    cssVar[key] = `var(--${prefix}-${toKebabCase(key)})`;
  }

  return cssVar;
};

/**
 * 默认的 CSS 变量映射（使用 'ant' 前缀）
 */
export const cssVar = generateCSSVarMap();

export type CSSVarMap = typeof cssVar;
