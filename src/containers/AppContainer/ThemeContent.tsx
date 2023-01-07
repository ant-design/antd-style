import { GetAntdThemeConfig, GetCustomStylish, GetCustomToken } from '@/types';
import { ReactElement, ReactNode, useMemo } from 'react';

import { useThemeMode } from '@/hooks';
import { useAntdTheme } from '@/hooks/useAntdTheme';
import { theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { ThemeProvider } from '../ThemeProvider';
import { AntdProvider, type AntdProviderProps } from './AntdProvider';

export interface ThemeContentProps<T, S = Record<string, string>>
  extends Omit<AntdProviderProps, 'theme'> {
  children: ReactNode;
  /**
   * 自定义 Token
   */
  customToken?: T | GetCustomToken<T>;
  /**
   * 自定义 Stylish
   */
  customStylish?: S | GetCustomStylish<S>;
  /**
   * 直接传入 antd 主题，或者传入一个函数，根据当前的主题模式返回对应的主题
   */
  theme?: ThemeConfig | GetAntdThemeConfig;
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

  const antdTheme = useMemo<ThemeConfig>(() => {
    const baseAlgorithm = isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;

    let antdTheme = themeProp as ThemeConfig | undefined;

    if (typeof themeProp === 'function') {
      antdTheme = themeProp(appearance);
    }

    if (!antdTheme) {
      return { algorithm: baseAlgorithm };
    }

    // 如果有 themeProp 说明是外部传入的 theme，需要对算法做一个合并处理，因此先把 themeProp 的算法规整为一个数组
    const algoProp = !antdTheme.algorithm
      ? []
      : antdTheme.algorithm instanceof Array
      ? antdTheme.algorithm
      : [antdTheme.algorithm];

    return {
      ...antdTheme,
      algorithm: !antdTheme.algorithm ? baseAlgorithm : [baseAlgorithm, ...algoProp],
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
