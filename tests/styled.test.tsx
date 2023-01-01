import { render } from '@testing-library/react';

import { styled, ThemeProvider } from 'antd-style';

describe('styled', () => {
  it('类型定义正常', () => {
    const App = styled.div`
      background: ${(p) => p.theme.colorPrimary};
    `;

    expect(App).toBeTruthy();
  });
  describe('使用 antd 主题样式', () => {
    it('没有包裹 Provider 的情况下，找不到样式', () => {
      const App = styled.div`
        width: 30px;
        color: ${(p) => p.theme.colorPrimary};
        background: ${(p) => p.theme.colorPrimaryBg};
      `;

      const { container } = render(<App>自定义样式</App>);
      expect(container).toHaveStyle({ color: undefined, background: undefined, width: 30 });
      expect(container).toMatchSnapshot();
    });

    it('在 Provider 包裹下，能正常获得样式', () => {
      const App = styled.div`
        width: 30px;
        color: ${(p) => p.theme.colorPrimary};
        background: ${(p) => p.theme.colorPrimaryBg};
      `;

      const { container } = render(
        <ThemeProvider>
          <App>自定义样式</App>
        </ThemeProvider>,
      );
      expect(container.firstChild).toHaveStyle({
        width: '30px',
        color: '#1677ff',
        background: '#e6f4ff',
      });

      expect(container).toMatchSnapshot();
    });
  });
});
