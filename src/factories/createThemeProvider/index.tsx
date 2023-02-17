import { ReactElement } from 'react';

import { UseTheme } from '@/types';
import AntdProvider from './AntdProvider';
import ThemeSwitcher from './ThemeSwitcher';
import TokenContainer from './TokenContainer';
import { StyledThemeProvider, ThemeProviderProps } from './type';

export * from './type';

export const createThemeProvider =
  (
    defaultStyledThemeProvider: StyledThemeProvider,
    defaultUseTheme: UseTheme,
  ): (<T = any, S = any>(props: ThemeProviderProps<T, S>) => ReactElement | null) =>
  ({
    children,

    customToken,
    customStylish,

    theme,
    getStaticInstance,
    prefixCls,
    staticInstanceConfig,

    appearance,
    defaultAppearance,
    onAppearanceChange,
    themeMode,
    StyledThemeProvider = defaultStyledThemeProvider,
    useTheme = defaultUseTheme,
  }) => {
    return (
      <ThemeSwitcher
        themeMode={themeMode}
        defaultAppearance={defaultAppearance}
        appearance={appearance}
        onAppearanceChange={onAppearanceChange}
        useTheme={useTheme}
      >
        <AntdProvider
          prefixCls={prefixCls}
          staticInstanceConfig={staticInstanceConfig}
          theme={theme}
          getStaticInstance={getStaticInstance}
        >
          <TokenContainer
            prefixCls={prefixCls}
            customToken={customToken}
            customStylish={customStylish}
            StyledThemeProvider={StyledThemeProvider}
          >
            {children}
          </TokenContainer>
        </AntdProvider>
      </ThemeSwitcher>
    );
  };
