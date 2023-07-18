import { createGlobal, ThemeProvider } from 'antd-style';

const Global = createGlobal(
  ({ token, css }) => css`
    .ant-custom-button-secondary {
      color: ${token.colorSuccess};
      background: ${token.colorSuccessBg};
      height: ${token.controlHeight}px;
      border-radius: ${token.borderRadius}px;
      padding: 0 ${token.paddingContentHorizontal}px;

      :hover {
        background: ${token.colorSuccessBgHover};
        color: ${token.colorSuccessTextHover};
      }

      :active {
        background: ${token.colorSuccessBorder};
        color: ${token.colorSuccessTextActive};
      }

      border: none;
      cursor: pointer;
    }
  `,
);

export default () => {
  return (
    <ThemeProvider>
      <Global />
      <button className="ant-custom-button-secondary">antd 中不存在的按钮</button>
    </ThemeProvider>
  );
};
