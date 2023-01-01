// ===========  emotion css 方案  =========== //
// 写成 useStyles 的方式
// 适用场景：单纯用于部分样式的，没必要抽成组件的话，使用这种写法
// 可支持将样式部分独立到 style.ts 文件中
import { useMemo } from 'react';

import type { AntdStylish } from './stylish';
import { useInternalStylish } from './stylish';
import { AntdToken } from './types';
import { useToken } from './useToken';

export interface CreateStylesTheme {
  token: AntdToken;
  stylish: AntdStylish;
}

/**
 * 业务应用中创建样式基础写法
 */
export function createStyles<Props, ReturnStyle>(
  createStyleFn: (theme: CreateStylesTheme, props?: Props) => ReturnStyle,
) {
  return (props?: Props): ReturnStyle => {
    const token = useToken();
    const stylish = useInternalStylish();

    return useMemo(() => createStyleFn({ token, stylish }, props), [token, props]);
  };
}

export { css, cx } from '@emotion/css';
