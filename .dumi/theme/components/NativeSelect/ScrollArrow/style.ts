import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(({ token, cx }, prefixCls: string) => ({
  container: cx(
    prefixCls,
    css`
      color: ${token.colorTextPlaceholder};
      border-radius: 0;
      cursor: default;
      font-size: 12px;
      line-height: 1;
      height: 25px;
      user-select: none;
      position: absolute;
      z-index: 1;
      width: 100%;

      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 35px;
        position: absolute;
        left: 0;
        z-index: -1;
        pointer-events: none;
      }

      &[data-dir='up'] {
        top: 0;

        &::before {
          background: linear-gradient(to bottom, ${token.colorBgElevated} 50%, transparent);
          border-radius: 8px 8px 0 0;
          top: 1px;
          left: 1px;
          right: 1px;
          width: auto;
        }
      }

      &[data-dir='down'] {
        bottom: 0;

        &::before {
          background: linear-gradient(to top, ${token.colorBgElevated} 50%, transparent);
          border-radius: 0 0 8px 8px;
          top: -10px;
          left: 1px;
          right: 1px;
          width: auto;
        }
      }
    `,
  ),
}));
