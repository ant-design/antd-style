import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, isDarkMode, css }) => ({
  tmp: css``,

  content: css`
    .markdown {
      color: ${token.colorTextSecondary};

      p {
        line-height: 1.8;
      }

      // hyperlink
      a {
        color: ${token.colorPrimaryText};

        &:hover {
          color: ${token.colorPrimaryTextHover};
        }

        &:active {
          color: ${token.colorPrimaryTextActive};
        }
      }

      img {
        max-width: 100%;

        opacity: ${isDarkMode ? 0.8 : 1};
      }

      // inline code
      *:not(pre) code {
        padding: 2px 6px;

        color: ${token.colorPrimaryTextActive};
        background: ${token.colorPrimaryBg};
        border-radius: 4px;
      }

      // pre tag
      pre {
        font-size: 14px;
        padding-left: 24px;
        padding-right: 24px;
      }

      // table
      table {
        width: 100%;
        border-spacing: 1px;
      }

      th {
        background: ${token.colorFillTertiary};
      }

      tr {
      }
      th,
      td {
        padding-block-start: 10px;
        padding-block-end: 10px;
        padding-inline-start: 16px;
        padding-inline-end: 16px;
        border-bottom: 1px solid ${token.colorBorderSecondary};
      }

      // blockquote
      blockquote {
        font-style: italic;

        margin: 16px 0;
        padding: 0 12px;
        color: ${token.colorTextDescription};
        border-left: 3px solid ${token.colorBorder};
      }

      // list
      ul li {
        line-height: 1.8;
      }

      // anchor of headings
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        > a[aria-hidden]:first-child {
          float: left;
          width: 20px;
          padding-inline-end: 4px;
          margin-inline-start: -24px;
          color: ${token.colorText};
          // hide phantom blank node
          font-size: 0;
          text-align: right;
          line-height: inherit;

          &:hover {
            border: 0;
          }

          > .icon-link::before {
            content: '#';
            color: ${token.colorTextTertiary};
            font-size: 20px;
          }
        }

        &:not(:hover) > a[aria-hidden]:first-child > .icon-link {
          visibility: hidden;
        }
      }
    }

    flex: 1;
    width: 100%;
    box-sizing: border-box;

    padding: 24px 48px;
    background-color: ${token.colorBgContainer};
    border-radius: 10px;
    box-shadow: ${token.boxShadow};
  `,
}));
