import { Theme } from '@/types/theme';
import { ArrayClassNamesArg, Emotion } from '@emotion/css/create-instance';
import { CSSInterpolation, SerializedStyles } from '@emotion/serialize';
import { Interpolation } from '@emotion/styled';

export type CSSStyle<T = Theme> = Array<TemplateStringsArray | Interpolation<T>>;

export { type CSSObject } from '@emotion/css';
export type { SerializedStyles } from '@emotion/serialize';

export type ClassNameGenerator = Emotion['css'];

export interface CssUtil {
  (template: TemplateStringsArray, ...args: Array<CSSInterpolation>): SerializedStyles;
  (...args: Array<CSSInterpolation>): SerializedStyles;
}

export type ClassNamesArg =
  | undefined
  | null
  | string
  | boolean
  | { [className: string]: boolean | null | undefined }
  | ArrayClassNamesArg
  | SerializedStyles;

/**
 * 可以传入多个 css 对象 或者 className 字符串，最终会合并成一个 className 字符串
 * 支持入参：{SerializedStyles} | string
 */
export type ClassNamesUtil = (...classNames: ClassNamesArg[]) => string;

export type HashPriority = 'low' | 'high';
