import { createContext } from 'react';

import { BrowserPrefers, ThemeAppearance, ThemeMode } from '@/types';
import { matchBrowserPrefers } from '@/utils/matchBrowserPrefers';

// ---- Fine-grained State Contexts (primitives, reference-stable when value unchanged) ----

export const AppearanceContext = createContext<ThemeAppearance>('light');

export const ThemeModeValueContext = createContext<ThemeMode>('light');

export const BrowserPrefersContext = createContext<BrowserPrefers>(
  matchBrowserPrefers('dark')?.matches ? 'dark' : 'light',
);

// ---- Action Context (function refs, stable across renders) ----

export interface ThemeActions {
  setAppearance: (appearance: ThemeAppearance) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
}

const noop = () => {};

export const ThemeActionContext = createContext<ThemeActions>({
  setAppearance: noop,
  setThemeMode: noop,
});
