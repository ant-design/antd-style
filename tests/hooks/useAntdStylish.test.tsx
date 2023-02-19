import { renderHook } from '@testing-library/react';

import { ThemeProvider, useAntdStylish } from 'antd-style';
import { FC, PropsWithChildren } from 'react';

describe('useAntdStylish', () => {
  it('如果没有 Provider，stylish 对象是 antd Token 的默认值', () => {
    const { result } = renderHook(useAntdStylish);
    expect(result.current).toMatchSnapshot();
  });

  it('包裹 Provider 后如果自定义主题变量', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider theme={{ token: { colorPrimary: '#485adf' } }}>{children}</ThemeProvider>
    );
    const { result } = renderHook(useAntdStylish, { wrapper });
    expect(result.current).toMatchSnapshot();
  });

  it('嵌套 Provider 后能拿到准确的主题值', () => {
    const Wrapper: FC<PropsWithChildren> = ({ children }) => {
      return (
        <ThemeProvider themeMode={'dark'}>
          <ThemeProvider defaultAppearance={'light'} prefixCls={'kitchen'}>
            {children}
          </ThemeProvider>
        </ThemeProvider>
      );
    };
    const { result } = renderHook(useAntdStylish, { wrapper: Wrapper });
    expect(result.current.buttonDefaultHover).toMatchSnapshot();
  });
});
