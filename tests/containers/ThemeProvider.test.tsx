import { render } from '@testing-library/react';

import { css, ThemeProvider, useTheme } from 'antd-style';

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
});
