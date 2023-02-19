import { renderHook } from '@testing-library/react';
import { ThemeProvider, useThemeMode } from 'antd-style';

describe('useThemeMode', () => {
  it('没有包裹 ThemeProvider 能正常使用', () => {
    const { result } = renderHook(useThemeMode);

    expect(result.current.appearance).toEqual('light');
    expect(result.current.themeMode).toEqual('light');
  });

  it('包裹 ThemeProvider 后正常可以正常调用', () => {
    const { result } = renderHook(useThemeMode, { wrapper: ThemeProvider });
    expect(result.current.appearance).toEqual('light');
    expect(result.current.themeMode).toEqual('light');
  });

  it('ThemeProvider 传入值', () => {
    const { result } = renderHook(useThemeMode, {
      wrapper: ({ children }) => <ThemeProvider themeMode={'auto'}>{children}</ThemeProvider>,
    });
    expect(result.current.appearance).toEqual('light');
    expect(result.current.themeMode).toEqual('auto');
  });
});
