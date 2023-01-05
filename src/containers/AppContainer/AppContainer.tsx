import { memo, ReactNode } from 'react';

import { DisplayTheme, ThemeMode } from '@/types';

import { ThemeModeContext } from '@/context';
import { ThemeProvider, ThemeProviderProps } from '../ThemeProvider';
import { AntdProvider, type AntdProviderProps } from './AntdProvider';
import { GlobalStyle, GlobalStyleProps } from './GloabalStyle';

export interface AppContainerProps<T, S = Record<string, string>>
  extends ThemeProviderProps<T, S>,
    AntdProviderProps,
    GlobalStyleProps {
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

  className?: string;
  prefixCls?: string;
}

export const AppContainer: <T, S>(props: AppContainerProps<T, S>) => ReactNode = memo(
  ({ children, appearance, themeMode, customToken, customStylish, globalStyle, ...props }) => {
    return (
      <ThemeModeContext.Provider
        value={{
          themeMode: themeMode || 'light',
          appearance: appearance || 'light',
        }}
      >
        <AntdProvider {...props}>
          <ThemeProvider customToken={customToken} customStylish={customStylish}>
            <GlobalStyle globalStyle={globalStyle} />
            {children}
          </ThemeProvider>
        </AntdProvider>
      </ThemeModeContext.Provider>
    );
  },
);
