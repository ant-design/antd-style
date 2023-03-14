import { createContext } from 'react';

import { ThemeAppearance, ThemeContextState } from '@/types';

const matchThemeMode = (mode: ThemeAppearance) =>
  matchMedia && matchMedia(`(prefers-color-scheme: ${mode})`);

export const ThemeModeContext = createContext<ThemeContextState>({
  appearance: 'light',
  isDarkMode: false,
  themeMode: 'light',
  browserPrefers: matchThemeMode('dark')?.matches ? 'dark' : 'light',
});
