import { Context, FC, memo, useContext } from 'react';

import { DEFAULT_THEME_CONTEXT, DEFAULT_THEME_PROVIDER } from '@/functions/setupStyled';
import { StyleEngine, StyledConfig, UseTheme } from '@/types';

import { createStyledThemeProvider } from '@/factories/createStyledThemeProvider';
import AntdProvider from './AntdProvider';
import ThemeSwitcher from './ThemeSwitcher';
import TokenContainer from './TokenContainer';
import { ThemeProviderProps } from './type';

export * from './type';
/**
 * @title CreateThemeProviderOptions
 * @category Interfaces
 * @description 用于创建主题提供者的选项接口
 */
interface CreateThemeProviderOptions {
  /**
   * @title styledConfig
   * @description 配置 styled-components 的选项
   * @default undefined
   */
  styledConfig?: StyledConfig;
  /**
   * @title StyleEngineContext
   * @description StyleEngine 上下文
   */
  StyleEngineContext: Context<StyleEngine>;
  /**
   * @title useTheme
   * @description 获取当前主题的钩子函数
   */
  useTheme: UseTheme;
}
export const createThemeProvider = (
  option: CreateThemeProviderOptions,
): (<T = any, S = any>(props: ThemeProviderProps<T, S>) => ReturnType<FC>) => {
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
      prefixCls: outPrefixCls,
      staticInstanceConfig,

      appearance,
      defaultAppearance,
      onAppearanceChange,
      themeMode,
      defaultThemeMode,
      onThemeModeChange,
      styled,
    }) => {
      // 从上一层的 Context 中获取上下文信息，以实现嵌套继承的效果
      const {
        prefixCls: defaultPrefixCls,
        StyledThemeContext,
        CustomThemeContext,
      } = useContext(StyleEngineContext);
      const defaultCustomToken = useContext(CustomThemeContext);

      const StyledThemeProvider = styled
        ? createStyledThemeProvider(styled)
        : DefaultStyledThemeProvider || DEFAULT_THEME_PROVIDER;

      const prefixCls = outPrefixCls || defaultPrefixCls;

      return (
        <StyleEngineContext.Provider
          value={{
            prefixCls: prefixCls,
            StyledThemeContext: styled?.ThemeContext || StyledThemeContext || DEFAULT_THEME_CONTEXT,
            CustomThemeContext,
          }}
        >
          <ThemeSwitcher
            themeMode={themeMode}
            defaultThemeMode={defaultThemeMode}
            onThemeModeChange={onThemeModeChange}
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
