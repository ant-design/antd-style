import { render, renderHook } from '@testing-library/react';
import { theme } from 'antd';
import { css, ThemeProvider, useTheme, useThemeMode } from 'antd-style';
import { MappingAlgorithm } from 'antd/es/config-provider/context';
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

  it('注入自定义 Stylish', () => {
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
});
