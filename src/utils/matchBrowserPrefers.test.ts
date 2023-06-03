import { ThemeAppearance } from 'antd-style';
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

  test('should return a dummy MediaQueryList object when window is undefined', () => {
    const mode = 'dark';
    const originalWindow = global.window;
    // 模拟 window 不存在的情况
    // @ts-ignore
    delete global.window;
    const result = matchBrowserPrefers(mode);
    expect(result.matches).toBe(false);
    // 还原全局变量
    global.window = originalWindow;
  });
  it('should return a MediaQueryList-like object when window object is undefined', () => {
    const tempWin = window;
    // eslint-disable-next-line no-global-assign,no-native-reassign
    window = undefined as any;

    const mode: ThemeAppearance = 'dark';
    const result = matchBrowserPrefers(mode);

    expect(result.matches).toBe(false);

    // eslint-disable-next-line no-global-assign,no-native-reassign
    window = tempWin;
  });
});
