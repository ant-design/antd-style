import { StyleEngine, Theme } from '@/types';
import { Context, useContext, useMemo } from 'react';

import { DEFAULT_THEME_CONTEXT } from '@/functions/setupStyled';
import { useAntdTheme } from '@/hooks/useAntdTheme';
import { useThemeMode } from '@/hooks/useThemeMode';

interface CreateUseThemeOptions {
  StyleEngineContext: Context<StyleEngine>;
}

export const createUseTheme = (options: CreateUseThemeOptions) => (): Theme => {
  const { StyleEngineContext } = options;
  const { StyledThemeContext, CustomThemeContext, prefixCls } = useContext(StyleEngineContext);

  const antdTheme = useAntdTheme();
  const themeState = useThemeMode();

  const defaultCustomTheme = useContext(CustomThemeContext);
  const styledTheme = useContext(StyledThemeContext ?? DEFAULT_THEME_CONTEXT) || {};

  const initTheme = useMemo<Theme>(
    () => ({
      ...antdTheme,
      ...themeState,
      ...defaultCustomTheme,
      prefixCls: prefixCls || 'ant',
    }),
    [antdTheme, themeState, prefixCls, defaultCustomTheme],
  );

  //  如果是个空值，说明没有套 Provider，返回 antdTheme 的默认值
  if (!styledTheme || Object.keys(styledTheme).length === 0) {
    return initTheme;
  }

  return styledTheme as Theme;
};
