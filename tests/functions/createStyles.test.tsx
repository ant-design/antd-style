import { render } from '@testing-library/react';
import { createStyles, css } from 'antd-style';

describe('createStyles', () => {
  it('插入样式', async () => {
    const useStyles = createStyles(
      ({ token }) =>
        css`
          color: ${token.colorPrimary};
        `,
    );
    const App = () => {
      const className = useStyles();
      return <div className={className}>123</div>;
    };

    const { container } = render(<App />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
