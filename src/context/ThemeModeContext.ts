import { createContext } from 'react';

import { ThemeContextState } from '@/types';
import { matchBrowserPrefers } from '@/utils/matchBrowserPrefers';

export const ThemeModeContext = createContext<ThemeContextState>({
  appearance: 'light',
  isDarkMode: false,
  themeMode: 'light',
  browserPrefers: matchBrowserPrefers('dark')?.matches ? 'dark' : 'light',
});
