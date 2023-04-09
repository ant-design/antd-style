import { vi } from 'vitest';
import { matchBrowserPrefers } from './matchBrowserPrefers';

describe('matchBrowserPrefers', () => {
  it('should return false when window is not defined', () => {
    expect(matchBrowserPrefers('light').matches).toBe(false);
  });

  it('should return a MediaQueryList object when window is defined', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    expect(matchBrowserPrefers('dark').matches).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });
});
