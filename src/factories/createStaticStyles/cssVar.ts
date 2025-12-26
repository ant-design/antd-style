import { theme } from 'antd';
import type { AliasToken } from 'antd/es/theme/interface';

/**
 * 将 camelCase 转换为 kebab-case
 * 处理连续大写字母的情况，如 paddingLG → padding-lg, screenXSMax → screen-xs-max
 */
export const toKebabCase = (str: string): string =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

/**
 * 根据 token keys 生成 CSS 变量映射
 * @param prefix - CSS 变量前缀，默认为 'ant'
 * @returns CSS 变量映射对象
 *
 * @description
 * 当 prefix 不是 'ant' 时，会自动添加 fallback 到 ant 前缀的变量。
 * 例如：prefix='site' 时，colorPrimary 会生成：
 * `var(--site-color-primary, var(--ant-color-primary))`
 * 这样即使自定义前缀的变量不存在，也会回退到 ant 前缀的变量。
 */
export const generateCSSVarMap = (prefix = 'ant'): Record<keyof AliasToken, string> => {
  const token = theme.getDesignToken();
  const cssVar = {} as Record<keyof AliasToken, string>;
  const needFallback = prefix !== 'ant';

  for (const key of Object.keys(token) as Array<keyof AliasToken>) {
    const kebabKey = toKebabCase(key);
    if (needFallback) {
      // 添加 fallback 到 ant 前缀
      cssVar[key] = `var(--${prefix}-${kebabKey}, var(--ant-${kebabKey}))`;
    } else {
      cssVar[key] = `var(--${prefix}-${kebabKey})`;
    }
  }

  return cssVar;
};

/**
 * 默认的 CSS 变量映射（使用 'ant' 前缀）
 */
export const cssVar = generateCSSVarMap();

export type CSSVarMap = typeof cssVar;
