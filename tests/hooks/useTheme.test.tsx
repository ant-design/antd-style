import { renderHook } from '@testing-library/react';
import { ThemeContext } from 'styled-components';

import { ThemeProvider, useTheme } from 'antd-style';
import { FC, PropsWithChildren } from 'react';

describe('useTheme', () => {
  it('如果没有 Provider，theme 对象时是 antd Token 默认值', () => {
    const { result } = renderHook(useTheme);
    expect(result.current.colorPrimary.toLowerCase()).toEqual('#1677ff');
    expect(result.current.stylish).toMatchSnapshot();
  });

  it('包裹 Provider 后如果自定义主题变量', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider theme={{ token: { colorPrimary: '#485adf' } }}>{children}</ThemeProvider>
    );
    const { result } = renderHook(useTheme, { wrapper });
    expect(result.current.colorPrimary.toLowerCase()).toEqual('#485adf');
    expect(result.current.stylish).toMatchSnapshot();
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
    const { result } = renderHook(useTheme, { wrapper: Wrapper });
    expect(result.current.colorPrimary.toLowerCase()).toEqual('#1668dc');
    expect(result.current.prefixCls).toEqual('kitchen');
  });

  describe('自定义 Token', () => {
    it('普通值', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => {
        return <ThemeProvider customToken={{ x: '222' }}>{children}</ThemeProvider>;
      };
      const { result } = renderHook(useTheme, { wrapper: Wrapper });
      expect(result.current.x).toEqual('222');
    });

    it('函数获取', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => {
        return (
          <ThemeProvider customToken={({ appearance }) => ({ x: appearance })} themeMode={'dark'}>
            {children}
          </ThemeProvider>
        );
      };
      const { result } = renderHook(useTheme, { wrapper: Wrapper });
      expect(result.current.x).toEqual('dark');
    });

    it('集成 styled 的 ThemeProvider 后可以拿到自定义 token', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => {
        return (
          <ThemeProvider
            customToken={{ x: '123' }}
            prefixCls={'kitchen'}
            themeMode={'dark'}
            styled={{ ThemeContext }}
          >
            {children}
          </ThemeProvider>
        );
      };
      const { result } = renderHook(useTheme, { wrapper: Wrapper });
      expect(result.current.prefixCls).toEqual('kitchen');
      expect(result.current.x).toEqual('123');
    });
  });

  it('TODO: 自定义 Stylish', () => {});
});
