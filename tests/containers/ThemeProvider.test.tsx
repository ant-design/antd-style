import { act, render, renderHook } from '@testing-library/react';
import { App, theme } from 'antd';
import { css, GetCustomToken, ThemeProvider, useTheme, useThemeMode } from 'antd-style';
import { MappingAlgorithm } from 'antd/es/config-provider/context';
import { MessageInstance } from 'antd/es/message/interface';
import { NotificationInstance } from 'antd/es/notification/interface';
import { FC, PropsWithChildren } from 'react';

interface TestDesignToken {
  customBrandColor: string;
}
interface TestDesignStylish {
  defaultText: string;
}

declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface CustomToken extends TestDesignToken {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface CustomStylish extends TestDesignStylish {}
}

describe('ThemeProvider', () => {
  describe('注入 antd 主题', () => {
    it('注入 token', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <ThemeProvider theme={{ token: { colorPrimary: '#000' } }}>{children}</ThemeProvider>
      );
      const { result } = renderHook(useTheme, { wrapper: Wrapper });

      expect(result.current.colorPrimary).toEqual('#000000');
    });

    it('仅注入算法', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <ThemeProvider theme={{ algorithm: theme.compactAlgorithm }}>{children}</ThemeProvider>
      );
      const { result } = renderHook(useTheme, { wrapper: Wrapper });

      expect(result.current.fontSize).toEqual(12);
    });

    it('注入暗色模式的自定义算法', () => {
      /**
       * 自定义主题算法
       * @param seedToken
       * @param mapToken
       */
      const customDarkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
        const mergeToken = theme.darkAlgorithm(seedToken, mapToken);

        return {
          ...mergeToken,
          // Layout 颜色
          colorBgLayout: '#20252b',
          // 容器颜色
          colorBgContainer: '#282c34',
          // 悬浮类面板颜色
          colorBgElevated: '#32363e',
        };
      };

      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <ThemeProvider
          appearance={'dark'}
          theme={(mode) =>
            mode === 'dark'
              ? { algorithm: [theme.compactAlgorithm, customDarkAlgorithm] }
              : undefined
          }
        >
          {children}
        </ThemeProvider>
      );
      const { result } = renderHook(useTheme, { wrapper: Wrapper });
      expect(result.current.colorPrimary).toEqual('#1668dc');
      expect(result.current.colorBgLayout).toEqual('#20252b');
      expect(result.current.fontSize).toEqual(12);
    });
  });

  describe('注入自定义主题', () => {
    it('自定义 Token', () => {
      const App = () => {
        const theme = useTheme();
        return <div style={{ color: theme.customBrandColor }}>{theme.customBrandColor}</div>;
      };

      const { container } = render(
        <ThemeProvider<TestDesignToken> customToken={{ customBrandColor: '#c956df' }}>
          <App />
        </ThemeProvider>,
      );

      expect(container).toMatchSnapshot();
      expect(container.firstChild).toHaveStyle({ color: '#c956df' });
    });

    it('自定义 Stylish', () => {
      const App = () => {
        const theme = useTheme();
        return <div className={theme.stylish.defaultText}>普通文本</div>;
      };

      const { container } = render(
        <ThemeProvider<any, TestDesignStylish>
          customStylish={{
            defaultText: css`
              font-size: 14px;
              font-weight: 500;
              color: #333;
            `,
          }}
        >
          <App />
        </ThemeProvider>,
      );

      expect(container).toMatchSnapshot();
      expect(container.firstChild).toHaveStyle({ color: '#333', fontSize: 14, fontWeight: 500 });
    });

    it('注入自定义 Token 方法', () => {
      const customTokenFn: GetCustomToken<any> = ({ token, isDarkMode }) => ({
        customColor: isDarkMode ? '#000' : token.colorPrimary,
        customBrandColor: isDarkMode ? token.colorPrimary : '#FFF',
      });

      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <ThemeProvider customToken={customTokenFn}>{children}</ThemeProvider>
      );

      const { result: light } = renderHook(useTheme, { wrapper: Wrapper });
      expect(light.current.customColor).toEqual('#1677ff');
      expect(light.current.customBrandColor).toEqual('#FFF');

      const Darker: FC<PropsWithChildren> = ({ children }) => (
        <ThemeProvider appearance={'dark'} customToken={customTokenFn}>
          {children}
        </ThemeProvider>
      );

      const { result: dark } = renderHook(useTheme, { wrapper: Darker });
      expect(dark.current.customColor).toEqual('#000');
      expect(dark.current.customBrandColor).toEqual('#1668dc');
    });

    it('注入自定义 stylish 方法', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <ThemeProvider customStylish={() => ({ x: '' })}>{children}</ThemeProvider>
      );

      const { result } = renderHook(useTheme, { wrapper: Wrapper });
      expect(result.current.stylish.x).toEqual('');
    });
  });

  describe('主题切换', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: true,
          media: query,
          onchange: null,

          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
    });

    it('自动模式', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <ThemeProvider themeMode={'auto'}>{children}</ThemeProvider>
      );

      const { result } = renderHook(useThemeMode, { wrapper: Wrapper });

      expect(result.current.themeMode).toEqual('auto');
    });
  });

  it('配合 App 实现局部作用域', async () => {
    const Demo: FC<{ id?: string }> = ({ id }) => {
      return (
        <div data-testid={id} style={{ padding: 16 }} className={'container'}>
          <a href="">节点样式</a>
        </div>
      );
    };

    const { container, findByTestId } = render(
      <>
        <Demo id={'without'} />
        <ThemeProvider>
          <App
            className={css`
              .container {
                color: red;
              }
            `}
          >
            <Demo id={'within'} />
          </App>
        </ThemeProvider>
        ,
      </>,
    );
    expect(container).toMatchSnapshot();

    const nodeWithout = await findByTestId('without');
    const nodeWithin = await findByTestId('within');

    expect(nodeWithin).toHaveStyle('color: red;');
    expect(nodeWithout).not.toHaveStyle('color: red;');
  });

  describe('静态实例对象', () => {
    it('获得静态实例对象', () => {
      let message = {} as MessageInstance;
      const Demo: FC = () => {
        return (
          <ThemeProvider getStaticInstance={(instances) => (message = instances.message)}>
            <div style={{ padding: 16 }} className={'container'}>
              <a href="">节点样式</a>
            </div>
          </ThemeProvider>
        );
      };

      render(<Demo />);

      expect(message.success).not.toBeUndefined();
    });
  });
  it('测试 prefix', () => {
    let message = {} as MessageInstance;
    let notification = {} as NotificationInstance;

    const Demo: FC = () => {
      return (
        <ThemeProvider
          prefixCls={'demo'}
          getStaticInstance={(instances) => {
            message = instances.message;
            notification = instances.notification;
          }}
          staticInstanceConfig={{
            message: {
              maxCount: 1,
              getContainer: () => document.getElementById('xxx')!,
            },
            notification: {
              getContainer: () => document.getElementById('xxx')!,
            },
          }}
        >
          <div id={'xxx'} style={{ padding: 16 }} className={'container'}>
            <a href="">节点样式</a>
          </div>
        </ThemeProvider>
      );
    };

    const { container } = render(<Demo />);

    act(() => {
      message.success('success');
    });

    expect(container.getElementsByClassName('demo-message')).toHaveLength(1);

    act(() => {
      notification.warning({ message: '123' });
    });

    expect(container.getElementsByClassName('demo-notification')).toHaveLength(1);
  });
});
