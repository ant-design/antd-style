import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx, token }, prefixCls) => ({
  item: cx(
    `${prefixCls}-item`,

    css`
      display: block;
      all: unset;
      width: 100%;
      padding: 12px 10px;
      border-radius: 5px;
      box-sizing: inherit;
      user-select: none;
      line-height: 1;
      scroll-margin: 50px;

      font-weight: normal;
      color: ${token.colorText};
      background: transparent;
      &:hover {
        background: ${token.colorFillTertiary};
      }
    `,
  ),
  selected: cx(
    `${prefixCls}-item-selected`,
    css`
      background: ${token.colorPrimaryBg};
      font-weight: bold;
      &:hover {
        background: ${token.colorPrimaryBgHover};
      }
    `,
  ),
  active: cx(
    `${prefixCls}-item-active`,
    css`
      background: ${token.colorFillTertiary};
    `,
  ),
}));
