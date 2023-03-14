import { Context, memo, ReactElement, useContext } from 'react';

import { DEFAULT_THEME_CONTEXT, DEFAULT_THEME_PROVIDER } from '@/functions/setupStyled';
import { StyledConfig, StyleEngine, UseTheme } from '@/types';

import { createStyledThemeProvider } from '@/factories/createStyledThemeProvider';
import AntdProvider from './AntdProvider';
import ThemeSwitcher from './ThemeSwitcher';
import TokenContainer from './TokenContainer';
import { ThemeProviderProps } from './type';

export * from './type';

interface CreateThemeProviderOptions {
  styledConfig?: StyledConfig;
  StyleEngineContext: Context<StyleEngine>;
  useTheme: UseTheme;
}

export const createThemeProvider = (
  option: CreateThemeProviderOptions,
): (<T = any, S = any>(props: ThemeProviderProps<T, S>) => ReactElement | null) => {
  // 如果有全局配置 styledConfig，那么 ThemeProvider
  const DefaultStyledThemeProvider = option.styledConfig
    ? createStyledThemeProvider(option.styledConfig)
    : undefined;

  const { StyleEngineContext } = option;

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
      const {
        prefixCls: defaultPrefixCls,
        StyledThemeContext,
        CustomThemeContext,
      } = useContext(StyleEngineContext);
      const defaultCustomToken = useContext(CustomThemeContext);

      const StyledThemeProvider = styled
        ? createStyledThemeProvider(styled)
        : DefaultStyledThemeProvider || DEFAULT_THEME_PROVIDER;

      return (
        <StyleEngineContext.Provider
          value={{
            prefixCls: prefixCls || defaultPrefixCls,
            StyledThemeContext: styled?.ThemeContext || StyledThemeContext || DEFAULT_THEME_CONTEXT,
            CustomThemeContext,
          }}
        >
          <ThemeSwitcher
            themeMode={themeMode}
            defaultAppearance={defaultAppearance}
            appearance={appearance}
            onAppearanceChange={onAppearanceChange}
            useTheme={option.useTheme}
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
                defaultCustomToken={defaultCustomToken}
                customStylish={customStylish}
                StyledThemeProvider={StyledThemeProvider}
              >
                {children}
              </TokenContainer>
            </AntdProvider>
          </ThemeSwitcher>
        </StyleEngineContext.Provider>
      );
    },
  );
};
