import { createContext } from 'react';

import { DisplayTheme, ThemeMode } from '@/types';

export interface ThemeModeContextState {
  appearance: DisplayTheme;
  themeMode: ThemeMode;
}

export const ThemeModeContext = createContext<ThemeModeContextState | undefined>(undefined);
