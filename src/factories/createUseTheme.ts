import { Theme, UseTheme } from '@/types';
import { useMemo } from 'react';

import { DEFAULT_USE_THEME } from '@/functions/setupStyled';
import { useAntdTheme } from '@/hooks/useAntdTheme';
import { useThemeMode } from '@/hooks/useThemeMode';

export const createUseTheme = (useDefaultTheme?: UseTheme) => (): Theme => {
  const antdTheme = useAntdTheme();
  const themeState = useThemeMode();
  const defaultTheme = useDefaultTheme ? useDefaultTheme() : DEFAULT_USE_THEME() || {};

  const initTheme = useMemo<Theme>(
    () => ({ ...antdTheme, ...themeState, prefixCls: 'ant' }),
    [antdTheme, themeState],
  );

  //  如果是个空值，说明没有套 Provider，返回 antdTheme 的默认值
  if (!defaultTheme || Object.keys(defaultTheme).length === 0) {
    return initTheme;
  }

  return defaultTheme as Theme;
};
