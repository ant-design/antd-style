import { useContext } from 'react';

import { ThemeContextState, ThemeModeContext } from '@/context';

export const useThemeMode = (): ThemeContextState => useContext(ThemeModeContext);
