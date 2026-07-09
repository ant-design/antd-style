import { renderHook } from '@testing-library/react';
import { useContext } from 'react';
import { vi } from 'vitest';

import {
  AppearanceContext,
  BrowserPrefersContext,
  ThemeActionContext,
  ThemeModeValueContext,
} from './ThemeModeContext';

describe('ThemeModeContext', () => {
  it('should have default values', () => {
    const { result: appearance } = renderHook(() => useContext(AppearanceContext));
    const { result: themeMode } = renderHook(() => useContext(ThemeModeValueContext));
    const { result: browserPrefers } = renderHook(() => useContext(BrowserPrefersContext));
    const { result: actions } = renderHook(() => useContext(ThemeActionContext));

    expect(appearance.current).toEqual('light');
    expect(themeMode.current).toEqual('light');
    expect(browserPrefers.current).toEqual('light');
    expect(actions.current.setAppearance).toBeDefined();
    expect(actions.current.setThemeMode).toBeDefined();
  });

  it('should return false when window is undefined', () => {
    const matchMedia = vi.fn();
    Object.defineProperty(window, 'matchMedia', { value: matchMedia });

    const { result: browserPrefers } = renderHook(() => useContext(BrowserPrefersContext));
    expect(browserPrefers.current).toEqual('light');
    expect(matchMedia).not.toHaveBeenCalled();
  });
});
