import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx, token }, prefixCls: string) => ({
  container: cx(
    prefixCls,
    css`
      background: ${token.colorBgElevated};
      font-size: ${token.fontSize};
      border: 1px solid ${token.colorBorder};
      box-shadow: ${token.boxShadowSecondary};
      border-radius: 8px;
      box-sizing: border-box;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: none;
      padding: 5px;
      outline: 0;
      user-select: none;
      width: 160px;

      &::-webkit-scrollbar {
        display: none;
      }
    `,
  ),
  button: cx(
    `${prefixCls}-button`,
    css`
      all: unset;
      font-size: ${token.fontSize}px;
      padding: 12px 10px;
      line-height: 1;
      background: ${token.colorBgContainer};
      color: ${token.colorText};
      border-radius: ${token.borderRadius}px;
      cursor: default;
      user-select: none;
      border: 1px solid ${token.colorBorder};
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: ${token.colorPrimaryBg};
        border-color: transparent;
      }

      &:focus-visible {
        border-color: ${token.colorPrimary};
        box-shadow: 0 0 0 2px ${token.colorPrimaryBg};
      }
    `,
  ),
}));
