import { CSSObject } from './css';

/**
 * 任何一组样式，最基础的入参就只有 string
 */

export type AtomInputType = string | CSSObject;

/**
 * getStyle 函数的的基础出参类型，我们需要将为这个类型提供准确定义，进而为开发者用户提供精准的类型提示
 *
 * 其中用户输入的原子级样式类型有
 * CSSObject           :   { color: "red" }
 * string              :   css` color: red; `
 */
export type BaseReturnType = KVObject | AtomInputType;

type KVObject = Record<string, CSSObject | string>;

type StyleObjectOnly<T extends BaseReturnType> = T extends string ? never : T;

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
export type ReturnStyleToUse<T extends BaseReturnType> = T extends string
  ? T
  : DefinitionToResult<StyleObjectOnly<T>>;
