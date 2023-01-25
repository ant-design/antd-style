import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, cx, css, stylish }) => {
  const offset = 6;

  return {
    icon: cx(
      'site-burger-icon',
      css`
        position: relative;

        &,
        &::before,
        &::after {
          display: inline-block;
          height: 2px;
          background: ${token.colorTextSecondary};

          width: 16px;

          transition: all 150ms ease;
        }

        &::before,
        &::after {
          position: absolute;
          left: 0;

          content: '';
        }

        &::before {
          top: ${offset}px;
        }

        &::after {
          top: -${offset}px;
        }
      `,
    ),
    active: css`
      &::before,
      &::after {
        background: ${token.colorText};
      }
      & {
        background: transparent;
      }

      &::before {
        top: 0;
        transform: rotate(-135deg);
      }

      &::after {
        top: 0;
        transform: rotate(135deg);
      }
    `,
    container: css`
      width: ${token.controlHeight}px;
      height: ${token.controlHeight}px;
      border-radius: ${token.borderRadius}px;
      cursor: pointer;
    `,
  };
});
