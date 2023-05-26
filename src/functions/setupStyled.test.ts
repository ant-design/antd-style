import { Context } from 'react';

import { StyledConfig, StyledThemeProvider, Theme } from '@/types';
import { DEFAULT_THEME_CONTEXT, setupStyled } from './setupStyled';

describe('setupStyled', () => {
  it('should throw an error if ThemeContext is not provided in config', () => {
    expect(() => setupStyled({} as StyledConfig)).toThrow(
      'ThemeContext is required. Please check your config.',
    );
  });

  it('should update the default theme provider and context with provided config', () => {
    const provider = { hello: 1 } as any;
    const ThemeContext = { Provider: provider } as Context<Theme>;
    const customThemeProvider = {} as StyledThemeProvider;
    const config = {
      ThemeContext,
      createThemeProvider: () => customThemeProvider,
    } as StyledConfig;

    setupStyled(config);

    expect(DEFAULT_THEME_CONTEXT).toEqual(ThemeContext);
  });
});
