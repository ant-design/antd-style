// ===========  styled 方案  =========== //
// 适用场景：看上去像是一个自定义样式组件的场景，且可能会有相应的入参
// 推荐使用 styled 将其包裹为一个样式组件

import { Theme, ThemeProvider as Provider } from '@emotion/react';
import { FC, memo, PropsWithChildren } from 'react';

import { AntdToken } from './types';
import { useToken } from './useToken';

declare module '@emotion/react' {
  interface Theme extends AntdToken {
    stylish?: any;
  }
}

export interface ThemeProviderProps {
  /**
   * 自定义 token， 可在 antd v5 token 规范基础上扩展和新增自己需要的 token
   */
  customToken?: Record<string, any>;
  /**
   * 自定义 stylish 可以自行扩展和新增自己需要的复合样式
   */
  customStylish?: Record<string, string>;
}

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = memo(
  ({ children, customToken = {}, customStylish = {} }) => {
    const token = useToken();

    const stylish = { ...customStylish };
    const theme: Theme = { ...token, ...customToken, stylish };

    return <Provider theme={theme}>{children}</Provider>;
  },
);

export { useTheme } from '@emotion/react';
export { default as styled } from '@emotion/styled';
