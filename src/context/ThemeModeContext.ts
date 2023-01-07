import { createContext } from 'react';

import { ThemeAppearance, ThemeMode } from '@/types';

export interface ThemeContextState {
  appearance: ThemeAppearance;
  themeMode: ThemeMode;
  isDarkMode: boolean;
}

export const ThemeModeContext = createContext<ThemeContextState>({
  appearance: 'light',
  isDarkMode: false,
  themeMode: 'light',
});
