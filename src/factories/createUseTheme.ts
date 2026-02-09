import { StyleEngine, Theme } from '@/types';
import { Context, useContext, useMemo } from 'react';

import {
  AppearanceContext,
  BrowserPrefersContext,
  ThemeActionContext,
  ThemeModeValueContext,
} from '@/context';
import { DEFAULT_THEME_CONTEXT } from '@/functions/setupStyled';
import { useAntdTheme } from '@/hooks/useAntdTheme';
import { ConfigProvider } from 'antd';

const EMPTY_THEME = {} as const;

interface CreateUseThemeOptions {
  StyleEngineContext: Context<StyleEngine>;
}

export const createUseTheme = (options: CreateUseThemeOptions) => (): Theme => {
  const { StyleEngineContext } = options;
  const styleEngine = useContext(StyleEngineContext);
  const { StyledThemeContext, CustomThemeContext, prefixCls: outPrefixCls } = styleEngine;

  const antdTheme = useAntdTheme();

  const appearance = useContext(AppearanceContext);
  const themeMode = useContext(ThemeModeValueContext);
  const browserPrefers = useContext(BrowserPrefersContext);
  const actions = useContext(ThemeActionContext);
  const { setAppearance, setThemeMode } = actions;

  const defaultCustomTheme = useContext(CustomThemeContext);
  const styledTheme = useContext(StyledThemeContext ?? DEFAULT_THEME_CONTEXT) || EMPTY_THEME;

  const configCtx = useContext(ConfigProvider.ConfigContext);
  const { iconPrefixCls, getPrefixCls } = configCtx;

  const antdPrefixCls = getPrefixCls();
  const prefixCls = outPrefixCls && outPrefixCls !== 'ant' ? outPrefixCls : antdPrefixCls;

  const initTheme = useMemo<Theme>(
    () => ({
      ...antdTheme,
      appearance,
      isDarkMode: appearance === 'dark',
      themeMode,
      setThemeMode,
      setAppearance,
      browserPrefers,
      ...defaultCustomTheme,
      prefixCls,
      iconPrefixCls,
    }),
    [
      antdTheme,
      appearance,
      themeMode,
      browserPrefers,
      setThemeMode,
      setAppearance,
      defaultCustomTheme,
      prefixCls,
      iconPrefixCls,
    ],
  );

  const styledThemeResult = useMemo<Theme>(
    () => ({ ...styledTheme, prefixCls, iconPrefixCls } as Theme),
    [styledTheme, prefixCls, iconPrefixCls],
  );

  //  如果是个空值，说明没有套 Provider，返回 antdTheme 的默认值
  if (!styledTheme || Object.keys(styledTheme).length === 0) {
    return initTheme;
  }

  return styledThemeResult;
};
