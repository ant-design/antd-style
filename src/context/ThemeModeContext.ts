import { createContext } from 'react';

import { ThemeContextState } from '@/types';

export const ThemeModeContext = createContext<ThemeContextState>({
  appearance: 'light',
  isDarkMode: false,
  themeMode: 'light',
});
