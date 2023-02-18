import { ThemeProvider, useTheme } from '@emotion/react';

import { StyledConfig, StyledThemeProvider, Theme } from '@/types';

export let DEFAULT_THEME_PROVIDER = ThemeProvider as StyledThemeProvider;
export let DEFAULT_USE_THEME = useTheme as () => Theme;

export const setupStyled = (config: StyledConfig) => {
  if (config?.ThemeProvider) {
    DEFAULT_THEME_PROVIDER = config.ThemeProvider;
  }
  if (config.useTheme) {
    DEFAULT_USE_THEME = config.useTheme;
  }
};
