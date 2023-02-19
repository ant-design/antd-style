import { render, renderHook } from '@testing-library/react';
import { createStylish } from 'antd-style';

describe('createStylish', () => {
  // 创建通用的 stylish 函数
  const useCommonStylish = createStylish(({ token, css }) => {
    const containerBgHover = css`
      cursor: pointer;
      transition: 150ms background-color ease-in-out;
      &:hover {
        background: ${token.colorFillQuaternary};
      }
    `;

    const defaultButtonBase = css`
      color: ${token.colorTextSecondary};
      background: ${token.colorFillQuaternary};
      border-color: transparent;
    `;

    return {
      defaultButton: css`
        ${defaultButtonBase};

        &:hover {
          color: ${token.colorText};
          background: ${token.colorFillSecondary};
          border-color: transparent;
        }
        &:focus {
          ${defaultButtonBase};
          border-color: ${token.colorPrimary};
        }
      `,

      containerBgHover: css`
        cursor: pointer;
        transition: 150ms background-color ease-in-out;

        &:hover {
          background: ${token.colorFillQuaternary};
        }
      `,

      containerBgL2: css`
        ${containerBgHover};
        border-radius: 4px;
        background: ${token.colorFillQuaternary};

        &:hover {
          background: ${token.colorFillTertiary};
        }
      `,
    };
  });

  it('默认快照', () => {
    const { result } = renderHook(useCommonStylish);
    expect(result.current).toMatchSnapshot();
  });

  it('渲染使用', () => {
    const App = () => {
      const stylish = useCommonStylish();
      return <div className={stylish.containerBgL2}>bglayout</div>;
    };

    const { container } = render(<App />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toHaveStyle({ cursor: 'pointer' });
  });
});
