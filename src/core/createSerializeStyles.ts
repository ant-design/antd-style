import { CSSInterpolation, SerializedStyles, serializeStyles } from '@emotion/serialize';

export interface SerializeCSS {
  (template: TemplateStringsArray, ...args: Array<CSSInterpolation>): SerializedStyles;
  (...args: Array<CSSInterpolation>): SerializedStyles;
}
/**
 * 提供给 createStyles 方法，用于将用户写入的 css 字符串序列化成特定结构的样式对象
 * @param args
 */
export const serializeCSS: SerializeCSS = (...args) => serializeStyles(args);
