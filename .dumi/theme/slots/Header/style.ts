import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css, token }) => ({
  header: css`
    position: relative;
    z-index: ${token.zIndexPopupBase - 50};
    border-bottom: 1px solid ${token.colorSplit};

    grid-area: head;
    align-self: stretch;

    &:not([data-static]) {
      top: 0;
      position: sticky;
      background-color: transparent;
      backdrop-filter: blur(6px);

      // to avoid backdrop filter conflict with navbar overlay
      &[data-mobile-active] {
        background-color: ${token.colorBgLayout};
        backdrop-filter: none;
      }
    }
  `,
  content: css`
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0 24px;
    //max-width: @s-content-width;
    height: 64px;
    box-sizing: border-box;

    //@media @mobile {
    //  height: @s-header-height-m;
    //}
  `,
  left: css`
    //width: @s-sidebar-width;
  `,
  right: css`

    flex: 1;
    display: flex;
    justify-content: space-between;

    &-aside {
      display: flex;
      align-items: center;

      @media @mobile {
        margin: 8px 16px;
        padding-top: 24px;
        justify-content: center;
        border-top: 1px solid ${token.colorBorder};

      }
    }

    //@media @mobile {
    //  position: fixed;
    //  top: @s-header-height-m;
    //  left: 0;
    //  right: 0;
    //  height: calc(100vh - @s-header-height-m);
    //  display: block;
    //  background-color: fadeout(@c-site-bg, 40%);
    //  border-top: 1px solid @c-border-light;
    //  backdrop-filter: blur(30px);
    //  box-sizing: border-box;
    //  transition: all 0.2s;
    //
    //  @{dark-selector} & {
    //    background-color: fadeout(@c-site-bg-dark, 40%);
    //    border-top: 1px solid @c-border-less-dark;
    //  }
    //
    //  .@{prefix}-header:not([data-mobile-active]) & {
    //    opacity: 0;
    //    visibility: hidden;
    //    padding-top: 20px;
    //  }
    }
  `,
}));
