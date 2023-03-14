import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx, token, prefixCls }) => {
  const prefix = `${prefixCls}-pro-card-statistic`;

  return css`
    &.${prefix} {
      display: flex;
      font-size: ${token.fontSize}px;
    }

    .${prefix} {
      & + & {
        margin-top: 4px;
      }

      &-tip {
        margin-left: 4px;
      }

      &-wrapper {
        display: flex;
        width: 100%;
      }

      &-icon {
        margin-right: 16px;
      }

      &-trend-icon {
        width: 0;
        height: 0;
        border-right: 3.5px solid transparent;
        border-bottom: 9px solid #000;
        border-left: 3.5px solid transparent;

        &-up {
          transform: rotate(0deg);
        }

        &-down {
          transform: rotate(180deg);
        }
      }

      &-content {
        width: 100%;
      }

      &-description {
        width: 100%;
      }

      .${prefixCls}-statistic-title {
        color: ${token.colorText};
      }

      &-layout-inline {
        display: inline-flex;
        color: ${token.colorTextSecondary};

        .${prefixCls}-statistic-title {
          margin-right: 6px;
          margin-bottom: 0;
        }

        .${prefixCls}-statistic-content {
          color: ${token.colorTextSecondary};
        }

        .${prefixCls}-statistic-title,
          .${prefixCls}-statistic-content,
          .${prefixCls}-statistic-content-suffix,
          .${prefixCls}-statistic-content-prefix,
          .${prefixCls}-statistic-content-value-decimal {
          font-size: ${token.fontSizeSM}px;
        }
      }

      &-layout-horizontal {
        display: flex;
        justify-content: space-between;

        .${prefixCls}-statistic-title {
          margin-bottom: 0;
        }

        .${prefixCls}-statistic-content-value {
          font-weight: 500;
        }

        .${prefixCls}-statistic-title,
          .${prefixCls}-statistic-content,
          .${prefixCls}-statistic-content-suffix,
          .${prefixCls}-statistic-content-prefix,
          .${prefixCls}-statistic-content-value-decimal {
          font-size: ${token.fontSize}px;
        }
      }

      &-trend-up {
        .${prefixCls}-statistic-content {
          color: #f5222d;
          .${prefix}-trend-icon {
            border-bottom-color: #f5222d;
          }
        }
      }

      &-trend-down {
        .${prefixCls}-statistic-content {
          color: #389e0d;
          .${prefixCls}-trend-icon {
            border-bottom-color: #52c41a;
          }
        }
      }
    }
  `;
});
