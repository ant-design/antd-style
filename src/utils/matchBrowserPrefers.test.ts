import { matchBrowserPrefers } from './matchBrowserPrefers';

describe('matchBrowserPrefers', () => {
  it('should return false when window is not defined', () => {
    expect(matchBrowserPrefers('light').matches).toBe(false);
  });

  it('should return a MediaQueryList object when window is defined', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    expect(matchBrowserPrefers('dark').matches).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });
});
