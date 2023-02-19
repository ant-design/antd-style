import { Context, memo, ReactElement } from 'react';

import { createUseTheme } from '@/factories/createUseTheme';
import { DEFAULT_THEME_PROVIDER, DEFAULT_USE_THEME } from '@/functions/setupStyled';
import { StyledConfig } from '@/types';

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
): (<T = any, S = any>(props: ThemeProviderProps<T, S>) => ReactElement | null) =>
  memo(
    ({
      children,

      customToken = option.customToken,
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
    }) => (
      <ThemeSwitcher
        themeMode={themeMode}
        defaultAppearance={defaultAppearance}
        appearance={appearance}
        onAppearanceChange={onAppearanceChange}
        useTheme={createUseTheme({
          prefixCls: prefixCls || option.prefixCls,
          styledUseTheme: styled?.useTheme || option.styledConfig?.useTheme || DEFAULT_USE_THEME,
          CustomThemeContext: option.CustomThemeContext,
        })}
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
            StyledThemeProvider={
              styled?.ThemeProvider || option.styledConfig?.ThemeProvider || DEFAULT_THEME_PROVIDER
            }
          >
            {children}
          </TokenContainer>
        </AntdProvider>
      </ThemeSwitcher>
    ),
  );
