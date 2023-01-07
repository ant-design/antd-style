import { render, renderHook } from '@testing-library/react';
import { theme } from 'antd';
import { AppContainer, css, useTheme } from 'antd-style';
import { MappingAlgorithm } from 'antd/es/config-provider/context';
import { FC, PropsWithChildren } from 'react';
import { GetCustomToken } from '../../src/containers/AppContainer/ThemeContent';

declare module 'antd-style' {
  interface CustomToken {
    customColor: string;
    customBrandColor: string;
  }
  interface CustomStylish {
    x: string;
  }
}
const App: FC<{ id?: string }> = ({ id }) => {
  return (
    <div data-testid={id} style={{ padding: 16 }} className={'container'}>
      <a href="">节点样式</a>
    </div>
  );
};

describe('AppContainer', () => {
  it('默认', () => {
    const { container } = render(<App />, { wrapper: AppContainer });

    expect(container).toMatchSnapshot();
  });

  it('局部作用域', async () => {
    const { container, findByTestId } = render(
      <>
        <App id={'without'} />
        <AppContainer
          className={css`
            .container {
              color: red;
            }
          `}
        >
          <App id={'within'} />
        </AppContainer>
        ,
      </>,
    );
    expect(container).toMatchSnapshot();

    const nodeWithout = await findByTestId('without');
    const nodeWithin = await findByTestId('within');

    expect(nodeWithin).toHaveStyle('color: red;');
    expect(nodeWithout).not.toHaveStyle('color: red;');
  });

  describe('注入 antd 主题', () => {
    it('注入 token', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <AppContainer theme={{ token: { colorPrimary: '#000' } }}>{children}</AppContainer>
      );
      const { result } = renderHook(useTheme, { wrapper: Wrapper });

      expect(result.current.colorPrimary).toEqual('#000000');
    });

    it('仅注入算法', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <AppContainer theme={{ algorithm: theme.compactAlgorithm }}>{children}</AppContainer>
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
        <AppContainer
          appearance={'dark'}
          theme={(mode) =>
            mode === 'dark'
              ? { algorithm: [theme.compactAlgorithm, customDarkAlgorithm] }
              : undefined
          }
        >
          {children}
        </AppContainer>
      );
      const { result } = renderHook(useTheme, { wrapper: Wrapper });
      expect(result.current.colorPrimary).toEqual('#1668dc');
      expect(result.current.colorBgLayout).toEqual('#20252b');
      expect(result.current.fontSize).toEqual(12);
    });
  });

  describe('注入自定义主题', () => {
    it('注入自定义 Token', () => {
      const customTokenFn: GetCustomToken<any> = ({ token, isDarkMode }) => ({
        customColor: isDarkMode ? '#000' : token.colorPrimary,
        customBrandColor: isDarkMode ? token.colorPrimary : '#FFF',
      });

      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <AppContainer customToken={customTokenFn}>{children}</AppContainer>
      );

      const { result: light } = renderHook(useTheme, { wrapper: Wrapper });
      expect(light.current.customColor).toEqual('#1677ff');
      expect(light.current.customBrandColor).toEqual('#FFF');

      const Darker: FC<PropsWithChildren> = ({ children }) => (
        <AppContainer appearance={'dark'} customToken={customTokenFn}>
          {children}
        </AppContainer>
      );

      const { result: dark } = renderHook(useTheme, { wrapper: Darker });
      expect(dark.current.customColor).toEqual('#000');
      expect(dark.current.customBrandColor).toEqual('#1677ff');
    });

    it('注入自定义 stylish', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <AppContainer customStylish={() => ({ x: '' })}>{children}</AppContainer>
      );

      const { result } = renderHook(useTheme, { wrapper: Wrapper });
      expect(result.current.stylish.x).toEqual('');
    });
  });

  describe('主题切换', () => {
    render(<AppContainer themeMode={'auto'}>App</AppContainer>);
  });
});
