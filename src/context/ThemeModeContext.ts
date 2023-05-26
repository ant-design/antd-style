import { createContext } from 'react';

import { ThemeContextState } from '@/types';
import { matchBrowserPrefers } from '@/utils/matchBrowserPrefers';

export const ThemeModeContext = createContext<ThemeContextState>({
  appearance: 'light',
  setAppearance: () => {},
  isDarkMode: false,
  themeMode: 'light',
  setThemeMode: () => {},
  browserPrefers: matchBrowserPrefers('dark')?.matches ? 'dark' : 'light',
});
