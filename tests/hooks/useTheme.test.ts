import { renderHook } from '@testing-library/react';

import { ThemeProvider, useTheme } from 'antd-style';

describe('useTheme', () => {
  it('如果没有Provider，theme对象时是空的', () => {
    const { result } = renderHook(useTheme);
    expect(result.current).toEqual({});
  });

  it('包裹 Provider 后能拿到完整变量', () => {
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });
    expect(result.current.colorPrimary.toLowerCase()).toEqual('#1677ff');
    expect(result.current.stylish).toMatchSnapshot();
  });

  it('自定义 Token', () => {});
  it('自定义 Stylish', () => {});
});
