import { useContext } from 'react';

import {
  AppearanceContext,
  BrowserPrefersContext,
  ThemeActionContext,
  ThemeModeValueContext,
} from '@/context';
import { ThemeContextState } from '@/types';

export const useThemeMode = (): ThemeContextState => {
  const appearance = useContext(AppearanceContext);
  const themeMode = useContext(ThemeModeValueContext);
  const browserPrefers = useContext(BrowserPrefersContext);
  const { setAppearance, setThemeMode } = useContext(ThemeActionContext);

  return {
    appearance,
    isDarkMode: appearance === 'dark',
    themeMode,
    setThemeMode,
    setAppearance,
    browserPrefers,
  };
};
