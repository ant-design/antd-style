import { useTheme as _useTheme } from '@/pedestal';
import { Theme } from '@/types';
import { useMemo } from 'react';

import { useAntdTheme } from './useAntdTheme';
import { useThemeMode } from './useThemeMode';

export const useTheme = (): Theme => {
  const antdTheme = useAntdTheme();
  const themeState = useThemeMode();
  const defaultTheme = _useTheme();

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
