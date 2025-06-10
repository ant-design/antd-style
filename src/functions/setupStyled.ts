import { ThemeContext, ThemeProvider } from '@emotion/react';
import { Context } from 'react';

import { createStyledThemeProvider } from '@/factories/createStyledThemeProvider';
import { StyledConfig, StyledThemeProvider } from '@/types';

export let DEFAULT_THEME_PROVIDER = ThemeProvider as StyledThemeProvider;
export let DEFAULT_THEME_CONTEXT = ThemeContext as Context<any>;

export const setupStyled = (config: StyledConfig) => {
  if (!config.ThemeContext) {
    throw 'ThemeContext is required. Please check your config.';
  }

  DEFAULT_THEME_CONTEXT = config.ThemeContext;
  DEFAULT_THEME_PROVIDER = createStyledThemeProvider(config);
};
