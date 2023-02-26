import { Context, memo, ReactElement } from 'react';

import { createUseTheme } from '@/factories/createUseTheme';
import { DEFAULT_THEME_CONTEXT, DEFAULT_THEME_PROVIDER } from '@/functions/setupStyled';
import { StyledConfig } from '@/types';

import { createStyledThemeProvider } from '@/factories/createStyledThemeProvider';
import AntdProvider from './AntdProvider';
import ThemeSwitcher from './ThemeSwitcher';
import TokenContainer from './TokenContainer';
import { ThemeProviderProps } from './type';

export * from './type';

interface CreateThemeProviderOptions {
  styledConfig?: StyledConfig;
  CustomThemeContext: Context<any>;
  prefixCls?: string;
  customToken: ThemeProviderProps<any>['customToken'];
}

export const createThemeProvider = (
  option: CreateThemeProviderOptions,
): (<T = any, S = any>(props: ThemeProviderProps<T, S>) => ReactElement | null) => {
  // 如果有全局配置 styledConfig，那么 ThemeProvider
  const DefaultStyledThemeProvider = option.styledConfig
    ? createStyledThemeProvider(option.styledConfig)
    : undefined;

  return memo(
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
      styled,
    }) => {
      const useTheme = createUseTheme({
        prefixCls: prefixCls || option.prefixCls,
        styledThemeContext:
          styled?.ThemeContext || option.styledConfig?.ThemeContext || DEFAULT_THEME_CONTEXT,
        CustomThemeContext: option.CustomThemeContext,
      });

      const StyledThemeProvider = styled
        ? createStyledThemeProvider(styled)
        : DefaultStyledThemeProvider || DEFAULT_THEME_PROVIDER;

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
              defaultCustomToken={option.customToken}
              customStylish={customStylish}
              StyledThemeProvider={StyledThemeProvider}
            >
              {children}
            </TokenContainer>
          </AntdProvider>
        </ThemeSwitcher>
      );
    },
  );
};
