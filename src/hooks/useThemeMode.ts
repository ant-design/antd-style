import { useContext } from 'react';

import { ThemeModeContext } from '@/context';
import { ThemeContextState } from '@/types';

export const useThemeMode = (): ThemeContextState => useContext(ThemeModeContext);
