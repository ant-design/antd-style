import { renderHook } from '@testing-library/react';
import { useContext } from 'react';
import { vi } from 'vitest';

import { ThemeModeContext } from './ThemeModeContext';

describe('ThemeModeContext', () => {
  it('should have default values', () => {
    const { result } = renderHook(() => useContext(ThemeModeContext));
    expect(result.current.appearance).toEqual('light');
    expect(result.current.isDarkMode).toEqual(false);
    expect(result.current.themeMode).toEqual('light');
    expect(result.current.browserPrefers).toEqual('light');
    expect(result.current.setAppearance).toBeDefined();
    expect(result.current.setThemeMode).toBeDefined();
  });

  it('should return false when window is undefined', () => {
    const matchMedia = vi.fn();
    Object.defineProperty(window, 'matchMedia', { value: matchMedia });

    const { result } = renderHook(() => useContext(ThemeModeContext));
    expect(result.current.browserPrefers).toEqual('light');
    expect(matchMedia).not.toHaveBeenCalled();
  });
});
