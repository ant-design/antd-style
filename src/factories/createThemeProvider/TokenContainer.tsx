import { ReactElement, useMemo } from 'react';

import { serializeCSS } from '@/core';
import { useAntdTheme, useThemeMode } from '@/hooks';
import { StyledThemeProvider, Theme } from '@/types';

import type { ThemeProviderProps } from './type';

interface TokenContainerProps<T, S = Record<string, string>>
  extends Pick<
    ThemeProviderProps<T, S>,
    'children' | 'customToken' | 'customStylish' | 'prefixCls'
  > {
  StyledThemeProvider: StyledThemeProvider;
  defaultCustomToken?: ThemeProviderProps<T, S>['customToken'];
}

const TokenContainer: <T, S>(props: TokenContainerProps<T, S>) => ReactElement | null = ({
  children,
  customToken: customTokenOrFn,
  defaultCustomToken: defaultCustomTokenFn,
  customStylish: stylishOrGetStylish,
  prefixCls,
  StyledThemeProvider,
}) => {
  const themeState = useThemeMode();
  const { appearance, isDarkMode } = themeState;
  const { stylish: antdStylish, ...token } = useAntdTheme();

  // 获取默认的自定义 token
  const defaultCustomToken = useMemo(() => {
    if (!defaultCustomTokenFn) return {};

    if (defaultCustomTokenFn instanceof Function) {
      return defaultCustomTokenFn({ token, appearance, isDarkMode });
    }

    return defaultCustomTokenFn;
  }, [defaultCustomTokenFn, token, appearance]);

  // 获取 自定义 token
  const customToken = useMemo(() => {
    if (customTokenOrFn instanceof Function) {
      return { ...defaultCustomToken, ...customTokenOrFn({ token, appearance, isDarkMode }) };
    }

    return { ...defaultCustomToken, ...customTokenOrFn };
  }, [defaultCustomToken, customTokenOrFn, token, appearance]);

  // 获取 stylish
  const customStylish = useMemo(() => {
    if (!stylishOrGetStylish) return {};

    return stylishOrGetStylish({
      token: { ...token, ...customToken } as any,
      stylish: antdStylish,
      appearance,
      isDarkMode,
      css: serializeCSS,
    });
  }, [stylishOrGetStylish, token, customToken, antdStylish, appearance]);

  const stylish = useMemo(
    () => ({ ...customStylish, ...antdStylish }),
    [customStylish, antdStylish],
  );

  const theme: Theme = {
    ...token,
    ...(customToken as any),
    stylish: stylish as any,
    ...themeState,
    prefixCls,
  };

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default TokenContainer;
