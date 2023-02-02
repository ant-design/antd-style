import { render } from '@testing-library/react';

import { SettingOutlined, SmileOutlined } from '@ant-design/icons';
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

      expect(container.firstChild).toHaveStyleRule('width', '30px');
      expect(container.firstChild).toHaveStyleRule('color', undefined);
      expect(container.firstChild).toHaveStyleRule('background', undefined);
      expect(container).toMatchSnapshot();
    });

    it('在 ThemeProvider 包裹下，能正常获得样式', () => {
      const App = styled.div`
        width: 30px;
        color: ${(p) => p.theme.colorPrimary};
        background: ${(p) => p.theme.colorPrimaryBg};
      `;

      const { container } = render(<App>自定义样式</App>, { wrapper: ThemeProvider });

      expect(container.firstChild).toHaveStyleRule('width', '30px');
      expect(container.firstChild).toHaveStyleRule('color', '#1677ff');
      expect(container.firstChild).toHaveStyleRule('background', '#e6f4ff');
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

      const content = container.firstChild;
      expect(content).toHaveStyleRule('border-radius', '8px');
      expect(content).toHaveStyleRule('padding', '24px');
      expect(content).toHaveStyleRule('background', '#ffffff');
      expect(content).toHaveStyleRule('color', 'rgba(0, 0, 0, 0.88)');

      expect(container).toMatchSnapshot();

      rerender(<Card primary>卡片</Card>);

      expect(content).toHaveStyleRule('border-radius', '8px');
      expect(content).toHaveStyleRule('padding', '24px');
      expect(content).toHaveStyleRule('background', '#1677ff');
      expect(content).toHaveStyleRule('color', '#fff');

      expect(container).toMatchSnapshot();
    });
  });

  it('嵌套组件选择', () => {
    const Icon = styled.span`
      display: flex;
      flex: 1;
      color: red;
    `;

    const ButtonCtn = styled.button`
      background: dodgerblue;
      color: white;
      border: ${Math.random()}px solid white;

      &:focus,
      &:hover {
        padding: 1em;
      }

      .otherClass {
        margin: 0;
      }

      ${Icon} {
        color: black;
      }
    `;

    const App = () => (
      <div>
        <Icon>
          <SmileOutlined />
        </Icon>

        <ButtonCtn>
          <Icon>
            <SettingOutlined />
          </Icon>
          按钮
        </ButtonCtn>
      </div>
    );

    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
