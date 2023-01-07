import { memo, ReactElement, ReactNode, useMemo } from 'react';

import { ThemeModeContext } from '@/context';
import { AntdStylish, AntdToken, DisplayTheme, FullToken, ThemeMode } from '@/types';

import { useAntdTheme } from '@/hooks/useAntdTheme';
import { ThemeProvider } from '../ThemeProvider';
import { AntdProvider, type AntdProviderProps } from './AntdProvider';

type GetCustomToken<T> = ({ token }: { token: AntdToken }) => T;

type GetCustomStylish<S> = ({ token, stylish }: { token: FullToken; stylish: AntdStylish }) => S;

export interface AppContainerProps<T, S = Record<string, string>> extends AntdProviderProps {
  /**
   * 应用的展示外观主题，只存在亮色和暗色两种
   * @default light
   */
  appearance?: DisplayTheme;
  defaultAppearance?: DisplayTheme;
  onAppearanceChange?: (mode: DisplayTheme) => void;
  /**
   * 主题的展示模式，有三种配置：跟随系统、亮色、暗色
   * 默认不开启自动模式，需要手动进行配置
   * @default light
   */
  themeMode?: ThemeMode;

  children: ReactNode;
  /**
   * 自定义 Token
   */
  customToken?: T | GetCustomToken<T>;
  /**
   * 自定义 Stylish
   */
  customStylish?: S | GetCustomStylish<S>;
  className?: string;
  prefixCls?: string;
}

const Content: <T, S>(
  props: Pick<AppContainerProps<T, S>, 'customStylish' | 'customToken'> &
    AntdProviderProps & { children: ReactNode },
) => ReactElement | null = ({
  children,
  customToken: customTokenOrFn,
  customStylish: stylishOrGetStylish,
  ...props
}) => {
  const { stylish: antdStylish, ...token } = useAntdTheme();

  // 获取 自定义 token
  const customToken = useMemo(() => {
    if (typeof customTokenOrFn === 'function') {
      // @ts-ignore
      return customTokenOrFn({ token });
    }

    return customTokenOrFn;
  }, [token, customTokenOrFn]);

  // 获取 stylish
  const customStylish = useMemo(() => {
    if (typeof stylishOrGetStylish === 'function') {
      // @ts-ignore
      return stylishOrGetStylish({ token: { ...token, ...customToken }, stylish: antdStylish });
    }
    return stylishOrGetStylish;
  }, []);

  return (
    <AntdProvider {...props}>
      <ThemeProvider customToken={customToken} customStylish={customStylish}>
        {children}
      </ThemeProvider>
    </AntdProvider>
  );
};

export const AppContainer: <T, S>(props: AppContainerProps<T, S>) => ReactElement | null = memo(
  ({ children, appearance, themeMode, customToken, customStylish, ...props }) => (
    <ThemeModeContext.Provider
      value={{
        themeMode: themeMode || 'light',
        appearance: appearance || 'light',
      }}
    >
      <Content customStylish={customStylish} customToken={customToken} {...props}>
        {children}
      </Content>
    </ThemeModeContext.Provider>
  ),
);
