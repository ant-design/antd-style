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
    it('没有包裹 ThemeProvider 的情况下，找不到样式', () => {
      const App = styled.div`
        width: 30px;
        color: ${(p) => p.theme.colorPrimary};
        background: ${(p) => p.theme.colorPrimaryBg};
      `;

      const { container } = render(<App>自定义样式</App>);
      expect(container).toHaveStyle({ color: undefined, background: undefined, width: 30 });
      expect(container).toMatchSnapshot();
    });

    it('在 ThemeProvider 包裹下，能正常获得样式', () => {
      const App = styled.div`
        width: 30px;
        color: ${(p) => p.theme.colorPrimary};
        background: ${(p) => p.theme.colorPrimaryBg};
      `;

      const { container } = render(<App>自定义样式</App>, { wrapper: ThemeProvider });
      expect(container.firstChild).toHaveStyle({
        width: '30px',
        color: '#1677ff',
        background: '#e6f4ff',
      });

      expect(container).toMatchSnapshot();
    });

    it('带有外部传参的方式', () => {
      const Card = styled.div<{ primary?: boolean }>`
        border-radius: ${(p) => p.theme.borderRadiusLG}px;
        padding: ${(p) => p.theme.paddingLG}px;

        background: ${(p) => (p.primary ? p.theme.colorPrimary : p.theme.colorBgContainer)};
        color: ${(p) => (p.primary ? p.theme.colorTextLightSolid : p.theme.colorText)};
      `;
      const { container, rerender } = render(<Card>卡片</Card>, { wrapper: ThemeProvider });

      expect(container.firstChild).toHaveStyle({
        borderRadius: '8px',
        padding: '24px',
        color: 'rgba(0,0,0,0.88)',
        background: 'rgb(255, 255, 255)',
      });

      expect(container).toMatchSnapshot();

      rerender(<Card primary>卡片</Card>);

      expect(container.firstChild).toHaveStyle({
        borderRadius: '8px',
        padding: '24px',
        background: '#1677ff',
        color: 'rgb(255, 255, 255)',
      });

      expect(container).toMatchSnapshot();
    });
  });
});
