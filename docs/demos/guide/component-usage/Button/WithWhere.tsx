import { createStyles } from 'antd-style';
import { FC, ReactNode } from 'react';

const useStyles = createStyles(
  ({ css, cx, prefixCls, token }) => {
    const prefix = `${prefixCls}-btn`;
    return {
      container: cx(
        prefix,
        css`
          &.${prefix} {
            padding: 6px 16px;
            border-radius: 6px;
            border: unset;
            background: unset;
            cursor: pointer;
          }
        `,
      ),
      primary: cx(
        `${prefix}-primary`,
        css`
          &.${prefix}-primary {
            color: ${token.colorTextLightSolid};
            background: ${token.colorPrimary};
            :hover {
              background: ${token.colorPrimaryHover};
            }
          }
        `,
      ),
      filled: cx(
        `${prefix}-filled`,
        css`
          &.${prefix}-filled {
            color: ${token.colorPrimary};
            background: ${token.colorPrimaryBg};
            :hover {
              background: ${token.colorPrimaryBgHover};
            }
          }
        `,
      ),
      default: cx(
        `${prefix}-default`,
        css`
          &.${prefix}-default {
            color: ${token.colorTextSecondary};
            background: ${token.colorBgContainer};
            border: 1px solid ${token.colorBorder};
          }
        `,
      ),
      text: cx(
        `${prefix}-text`,
        css`
          &.${prefix}-text {
            color: ${token.colorTextSecondary};
            :hover {
              color: ${token.colorText};
              background: ${token.colorFillTertiary};
            }
          }
        `,
      ),
    };
  },
  { hashPriority: 'low' },
);

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'primary' | 'filled' | 'default' | 'text';
}

const Button: FC<ButtonProps> = ({ children, type, className }) => {
  const { styles, cx } = useStyles();

  return (
    <button className={cx(styles.container, type && styles[type], className)}>{children}</button>
  );
};

export default Button;
