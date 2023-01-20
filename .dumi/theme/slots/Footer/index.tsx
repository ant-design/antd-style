import { Divider, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { useSiteData } from 'dumi';
import { type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

const useStyles = createStyles(
  ({ css, token }) => css`
    margin-top: 48px;
    border-top: 1px solid ${token.colorSplit};
    color: ${token.colorTextDescription};
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    padding: 24px 0;

    //@media @mobile {
    //  padding: @s-content-padding * 0.3 0;
    //  font-size: 13px;
    //}
  `,
);

const Footer: FC = () => {
  const { themeConfig } = useSiteData();
  const { styles } = useStyles();
  if (!themeConfig.footer) return null;

  return (
    <Center horizontal className={styles}>
      Copyright © 2022-{new Date().getFullYear()} <Divider type={'vertical'} /> Powered by
      <Flexbox align={'center'} horizontal style={{ marginLeft: 8 }}>
        <Typography.Link href="https://d.umijs.org/">dumi</Typography.Link>
        <Divider type={'vertical'} style={{ margin: '0 8px' }} />
        <Typography.Link href="https://ant.design/">antd</Typography.Link>
      </Flexbox>
    </Center>
  );
};

export default Footer;
