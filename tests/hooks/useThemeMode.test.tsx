import { renderHook } from '@testing-library/react';
import { AppContainer, useThemeMode } from 'antd-style';

describe('useThemeMode', () => {
  it('没有包裹 AppContainer 会抛出错误', () => {
    expect(() => renderHook(useThemeMode)).toThrowErrorMatchingSnapshot();
  });

  it('包裹 AppContainer 后正常可以正常调用', () => {
    const { result } = renderHook(useThemeMode, { wrapper: AppContainer });
    expect(result.current.appearance).toEqual('light');
    expect(result.current.themeMode).toEqual('light');
  });

  it('AppContainer 传入值', () => {
    const { result } = renderHook(useThemeMode, {
      wrapper: ({ children }) => <AppContainer themeMode={'auto'}>{children}</AppContainer>,
    });
    expect(result.current.appearance).toEqual('light');
    expect(result.current.themeMode).toEqual('auto');
  });
});
