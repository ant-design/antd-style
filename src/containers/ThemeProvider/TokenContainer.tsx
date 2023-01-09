import { ThemeProvider as Provider } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { useThemeMode } from '@/hooks';
import { useAntdTheme } from '@/hooks/useAntdTheme';
import type { ThemeProviderProps } from './type';

import { Theme } from '@/types';

type TokenContainerProps<T, S = Record<string, string>> = Pick<
  ThemeProviderProps<T, S>,
  'children' | 'customToken' | 'customStylish'
>;

const TokenContainer: <T, S>(props: TokenContainerProps<T, S>) => ReactElement | null = ({
  children,
  customToken: customTokenOrFn,
  customStylish: stylishOrGetStylish,
}) => {
  const themeState = useThemeMode();
  const { appearance, isDarkMode } = themeState;
  const { stylish: antdStylish, ...token } = useAntdTheme();

  // 获取 自定义 token
  const customToken = useMemo(() => {
    if (customTokenOrFn instanceof Function) {
      return customTokenOrFn({ token, appearance, isDarkMode });
    }

    return customTokenOrFn;
  }, [customTokenOrFn, token, appearance]);

  // 获取 stylish
  const customStylish = useMemo(() => {
    if (stylishOrGetStylish instanceof Function) {
      return stylishOrGetStylish({
        token: { ...token, ...customToken },
        stylish: antdStylish,
        appearance,
        isDarkMode,
      });
    }
    return stylishOrGetStylish;
  }, [stylishOrGetStylish, token, customToken, antdStylish, appearance]);

  const stylish = { ...customStylish, ...antdStylish };

  const theme: Theme = {
    ...token,
    ...customToken,
    stylish,
    ...themeState,
  };

  return <Provider theme={theme}>{children}</Provider>;
};

export default TokenContainer;
