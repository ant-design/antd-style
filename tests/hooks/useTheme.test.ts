import { renderHook } from '@testing-library/react';

import { ThemeProvider, useTheme } from 'antd-style';

describe('useTheme', () => {
  it('如果没有 Provider，theme 对象时是 antd Token 默认值', () => {
    const { result } = renderHook(useTheme);
    expect(result.current.colorPrimary.toLowerCase()).toEqual('#1677ff');
    expect(result.current.stylish).toEqual({});
  });

  it('包裹 Provider 后如果自定义主题变量', () => {
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });
    expect(result.current.colorPrimary.toLowerCase()).toEqual('#1677ff');
    expect(result.current.stylish).toEqual({});
  });

  it('自定义 Token', () => {});
  it('自定义 Stylish', () => {});
});
