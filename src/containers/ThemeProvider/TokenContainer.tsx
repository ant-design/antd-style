import { css as reactCss, ThemeProvider as Provider } from '@emotion/react';
import { SerializedStyles } from '@emotion/serialize';
import { ReactElement, useMemo } from 'react';

import { useThemeMode } from '@/hooks';
import { useAntdTheme } from '@/hooks/useAntdTheme';
import type { ThemeProviderProps } from './type';

import { Theme } from '@/types';

type TokenContainerProps<T, S = Record<string, string>> = Pick<
  ThemeProviderProps<T, S>,
  'children' | 'customToken' | 'customStylish' | 'prefixCls'
>;

const TokenContainer: <T, S>(props: TokenContainerProps<T, S>) => ReactElement | null = ({
  children,
  customToken: customTokenOrFn,
  customStylish: stylishOrGetStylish,
  prefixCls = 'ant',
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
        css: reactCss,
      });
    }
    return stylishOrGetStylish;
  }, [stylishOrGetStylish, token, customToken, antdStylish, appearance]);

  const stylish = useMemo(() => {
    const merged = { ...customStylish, ...antdStylish };

    return Object.fromEntries(
      Object.entries<SerializedStyles>(merged).map(([key, value]) => [key, value.styles]),
    );
  }, [customStylish, antdStylish]);

  const theme: Theme = {
    ...token,
    ...customToken,
    stylish,
    ...themeState,
    prefixCls,
  };

  return <Provider theme={theme}>{children}</Provider>;
};

export default TokenContainer;
