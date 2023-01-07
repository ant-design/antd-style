import { useAntdTheme } from '@/hooks/useAntdTheme';
import { Theme } from '@/types';
import { useTheme as _useTheme } from '@emotion/react';

export const useTheme = (): Theme => {
  const antdTheme = useAntdTheme();
  const defaultTheme = _useTheme();

  //  如果是个空值，说明没有套 Provider，返回 antdTheme 的默认值
  if (Object.keys(defaultTheme).length === 0) {
    return antdTheme;
  }

  return defaultTheme as Theme;
};
