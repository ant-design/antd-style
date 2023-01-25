/**
 * 判断是否是 ReactCss 的编译产物
 * @param params
 */
export const isReactCssResult = (params: any) => {
  return (
    typeof params === 'object' &&
    'styles' in params &&
    'name' in params &&
    'map' in params &&
    'next' in params &&
    'toString' in params
  );
};
