import { PedestalProvider as defaultThemeProvider, useTheme as defaultUseTheme } from '@/core';

import { StyledConfig, StyledThemeProvider } from '@/types';

export let DEFAULT_THEME_PROVIDER = defaultThemeProvider as StyledThemeProvider;
export let DEFAULT_USE_THEME = defaultUseTheme;

export const setupStyled = (config: StyledConfig) => {
  if (config?.ThemeProvider) {
    DEFAULT_THEME_PROVIDER = config.ThemeProvider;
  }
  if (config.useTheme) {
    DEFAULT_USE_THEME = config.useTheme;
  }
};
