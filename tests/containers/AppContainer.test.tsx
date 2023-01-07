import { render } from '@testing-library/react';
import { AppContainer, css } from 'antd-style';
import { FC } from 'react';

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

  it('注入主题', () => {});
});
