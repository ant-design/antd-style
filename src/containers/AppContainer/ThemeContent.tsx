import { ReactElement, ReactNode, useMemo } from 'react';

import { AntdStylish, AntdToken, FullToken, ThemeAppearance } from '@/types';

import { useThemeMode } from '@/hooks';
import { useAntdTheme } from '@/hooks/useAntdTheme';
import { theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { ThemeProvider } from '../ThemeProvider';
import { AntdProvider, type AntdProviderProps } from './AntdProvider';

export type GetCustomToken<T> = (theme: { token: AntdToken; appearance: ThemeAppearance }) => T;

export type GetCustomStylish<S> = (theme: {
  token: FullToken;
  stylish: AntdStylish;
  appearance: ThemeAppearance;
}) => S;

export interface ThemeContentProps<T, S = Record<string, string>> extends AntdProviderProps {
  children: ReactNode;
  /**
   * 自定义 Token
   */
  customToken?: T | GetCustomToken<T>;
  /**
   * 自定义 Stylish
   */
  customStylish?: S | GetCustomStylish<S>;
}

const ThemeContent: <T, S>(props: ThemeContentProps<T, S>) => ReactElement | null = ({
  children,
  customToken: customTokenOrFn,
  customStylish: stylishOrGetStylish,
  theme: themeProp,
  ...props
}) => {
  const { appearance, isDarkMode } = useThemeMode();
  const { stylish: antdStylish, ...token } = useAntdTheme();

  // 获取 自定义 token
  const customToken = useMemo(() => {
    if (typeof customTokenOrFn === 'function') {
      // @ts-ignore
      return customTokenOrFn({ token, appearance });
    }

    return customTokenOrFn;
  }, [customTokenOrFn, token, appearance]);

  // 获取 stylish
  const customStylish = useMemo(() => {
    if (typeof stylishOrGetStylish === 'function') {
      // @ts-ignore
      return stylishOrGetStylish({ token: { ...token, ...customToken }, stylish: antdStylish });
    }
    return stylishOrGetStylish;
  }, [stylishOrGetStylish, token, customToken, antdStylish, appearance]);

  const antdTheme = useMemo<ThemeConfig>(() => {
    const baseAlgorithm = isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;

    if (!themeProp) {
      return { algorithm: baseAlgorithm };
    }

    // 如果有 themeProp 说明是外部传入的 theme，需要对算法做一个合并处理，因此先把 themeProp 的算法规整为一个数组
    const algoProp = !themeProp.algorithm
      ? []
      : themeProp.algorithm instanceof Array
      ? themeProp.algorithm
      : [themeProp.algorithm];

    return {
      ...themeProp,
      algorithm: !themeProp.algorithm ? baseAlgorithm : [baseAlgorithm, ...algoProp],
    };
  }, [themeProp, isDarkMode]);

  return (
    <AntdProvider theme={antdTheme} {...props}>
      <ThemeProvider customToken={customToken} customStylish={customStylish}>
        {children}
      </ThemeProvider>
    </AntdProvider>
  );
};

export default ThemeContent;
