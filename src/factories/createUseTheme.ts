import { Theme, UseTheme } from '@/types';
import { Context, useContext, useMemo } from 'react';

import { DEFAULT_USE_THEME } from '@/functions/setupStyled';
import { useAntdTheme } from '@/hooks/useAntdTheme';
import { useThemeMode } from '@/hooks/useThemeMode';

interface CreateUseThemeOptions {
  prefixCls?: string;
  CustomThemeContext: Context<any>;
  styledUseTheme?: UseTheme;
}

export const createUseTheme = (options: CreateUseThemeOptions) => (): Theme => {
  const { prefixCls, styledUseTheme, CustomThemeContext } = options;
  const antdTheme = useAntdTheme();
  const themeState = useThemeMode();

  const defaultCustomTheme = useContext(CustomThemeContext);

  const styledTheme = styledUseTheme ? styledUseTheme() : DEFAULT_USE_THEME() || {};

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
