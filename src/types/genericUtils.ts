import { CSSObject } from '@emotion/css';

type StyleObject = Record<string, CSSObject | string>;

/**
 *  所有用户的可能的入参类型
 */
export type StyleInputType = string | StyleObject;

type StyleObjectOnly<T extends StyleInputType> = T extends string ? never : T;

/**
 * 根据用户输入的样式对象，导出可以给用户使用消费的类型泛型
 * 譬如用户输入为 { a: css`color: red;`, b: { color: 'red' }
 * 输出的类型泛型为 { a:string; b:string }
 */
type DefinitionToResult<T, K extends keyof T = keyof T> = {
  [P in K]: string;
};

/**
 * 根据用户返回的样式对象，返回一个可以给用户使用的
 * 譬如用户输入为 { a: css`color: red;`, b: { color: 'red' }
 * 输出的类型泛型为 { a:string; b:string }
 */
export type ReturnStyleToUse<T extends StyleInputType> = T extends string
  ? T
  : DefinitionToResult<StyleObjectOnly<T>>;
