import { useAntdTheme } from '@/hooks';
import { Theme } from '@/types';
import { ThemeProvider as Provider } from '@emotion/react';
import { memo, PropsWithChildren, ReactElement } from 'react';

export interface ThemeProviderProps<CT, CS = Record<string, string>> {
  /**
   * 自定义 token， 可在 antd v5 token 规范基础上扩展和新增自己需要的 token
   */
  customToken?: CT;
  /**
   * 自定义 stylish 可以自行扩展和新增自己需要的复合样式
   * @internal
   */
  customStylish?: CS;
}

export const ThemeProvider: <T = Record<string, string>, S = Record<string, string>>(
  props: PropsWithChildren<ThemeProviderProps<T, S>>,
) => ReactElement | null = memo(({ children, customToken = {}, customStylish = {} }) => {
  const { stylish: antdStylish, ...antdToken } = useAntdTheme();

  const stylish = { ...customStylish, ...antdStylish };
  const theme: Theme = { ...antdToken, ...customToken, stylish };

  return <Provider theme={theme}>{children}</Provider>;
});
