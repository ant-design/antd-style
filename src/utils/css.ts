/**
 * 判断是否是 ReactCss 的编译产物
 * @param params
 */
export const isReactCssResult = (params: any) =>
  typeof params === 'object' && 'styles' in params && 'name' in params && 'toString' in params;
