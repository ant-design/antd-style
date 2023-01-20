import { Tabs } from 'antd';
import { createStyles } from 'antd-style';
import { history, Link, useLocation, useNavData } from 'dumi';
import NavbarExtra from 'dumi/theme-default/slots/NavbarExtra';
import { memo, type FC } from 'react';

const useStyles = createStyles(({ css, token }) => {
  const prefixCls = '.ant-tabs';

  const marginHoriz = 16;
  const paddingVertical = 6;

  return {
    tabs: css`
      //align-self: end;
      ${prefixCls}-tab + ${prefixCls}-tab {
        margin: ${marginHoriz}px 4px !important;
        padding: 0 12px !important;
      }

      ${prefixCls}-tab {
        color: ${token.colorTextSecondary};
        transition: background-color 100ms ease-out;

        &:first-child {
          margin: ${marginHoriz}px 4px ${marginHoriz}px 0;
          padding: ${paddingVertical}px 12px !important;
        }

        &:hover {
          color: ${token.colorText} !important;
          background: ${token.colorFillTertiary};
          border-radius: ${token.borderRadius}px;
        }
      }

      .ant-tabs-nav {
        margin-bottom: 0;
      }
    `,

    link: css`
      color: inherit;
      &:hover,
      &:active {
        color: inherit;
      }
    `,
  };
});
const Navbar: FC = () => {
  const nav = useNavData();
  const { pathname } = useLocation();
  const { styles } = useStyles();

  const activePath = nav.find((i) => pathname.startsWith(i.activePath))?.activePath;

  return (
    <>
      <Tabs
        items={nav.map((item) => ({
          label: (
            <Link className={styles.link} to={item.link}>
              {item.title}
            </Link>
          ),

          key: item.activePath,
        }))}
        onChange={(path) => {
          const url = nav.find((i) => i.activePath === path).link;

          history.push(url);
        }}
        activeKey={activePath}
        className={styles.tabs}
      />

      <NavbarExtra />
    </>
  );
};

export default memo(Navbar);
