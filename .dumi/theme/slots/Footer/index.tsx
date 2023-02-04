import { Divider, Typography } from 'antd';
import { useResponsive } from 'antd-style';
import RcFooter from 'rc-footer';
import { type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import {
  GithubOutlined,
  HistoryOutlined,
  IssuesCloseOutlined,
  MediumOutlined,
  TwitterOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import { useSiteStore } from '../../store/useSiteStore';
import { useStyles } from './style';

const Footer: FC = () => {
  const { themeConfig } = useSiteStore((s) => s.siteData);
  const { styles, theme } = useStyles();
  const { mobile } = useResponsive();
  if (!themeConfig.footer) return null;

  return mobile ? (
    <Center horizontal className={styles.container}>
      Copyright © 2022-{new Date().getFullYear()}
      <Flexbox align={'center'} horizontal>
        Powered by
        <Typography.Link href="https://d.umijs.org/" style={{ marginLeft: 8 }}>
          dumi
        </Typography.Link>
        <Divider type={'vertical'} style={{ margin: '0 8px' }} />
        <Typography.Link href="https://ant.design/">antd</Typography.Link>
        <Divider type={'vertical'} style={{ margin: '0 8px' }} />
        <Typography.Link href="https://kitchen.alipay.com/">kitchen</Typography.Link>
      </Flexbox>
    </Center>
  ) : (
    <div className={styles.container}>
      <RcFooter
        theme={theme.appearance}
        className={styles.footer}
        columns={[
          {
            title: '相关资源',
            items: [
              {
                title: 'Ant Design Pro',
                url: 'https://pro.ant.design',
                openExternal: true,
              },
              {
                title: 'Ant Design Pro Components',
                url: 'https://procomponents.ant.design',
                openExternal: true,
              },
              {
                title: 'Umi',
                description: 'React 应用开发框架',
                url: 'https://umijs.org',
                openExternal: true,
              },
              {
                title: 'Dumi',
                description: '组件/文档研发工具',
                url: 'https://d.umijs.org',
                openExternal: true,
              },
              {
                title: 'qiankun',
                description: '微前端框架',
                url: 'https://qiankun.umijs.org',
                openExternal: true,
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                icon: <MediumOutlined />,
                title: 'Medium',
                url: 'http://medium.com/ant-design/',
                openExternal: true,
              },
              {
                icon: <TwitterOutlined style={{ color: '#1DA1F2' }} />,
                title: 'Twitter',
                url: 'http://twitter.com/antdesignui',
                openExternal: true,
              },
              {
                icon: (
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
                    alt="yuque"
                  />
                ),
                title: 'Ant Design 语雀专栏',
                url: 'https://yuque.com/ant-design/ant-design',
                openExternal: true,
              },
              {
                icon: <ZhihuOutlined style={{ color: '#056de8' }} />,
                title: 'Ant Design 知乎专栏',
                url: 'https://www.zhihu.com/column/c_1564262000561106944',
                openExternal: true,
              },
              {
                icon: <ZhihuOutlined style={{ color: '#056de8' }} />,
                title: '体验科技专栏',
                url: 'http://zhuanlan.zhihu.com/xtech',
                openExternal: true,
              },
              {
                icon: (
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png"
                    alt="seeconf"
                  />
                ),
                title: 'SEE Conf',
                description: 'SEE Conf-蚂蚁体验科技大会',
                url: 'https://seeconf.antfin.com/',
                openExternal: true,
              },
            ],
          },
          {
            title: '帮助',
            items: [
              {
                icon: <GithubOutlined />,
                title: 'GitHub',
                url: 'https://github.com/ant-design/antd-style',
                openExternal: true,
              },
              {
                icon: <HistoryOutlined />,
                title: '更新日志',
                url: '/changelog',
                // LinkComponent: Link,
              },

              {
                icon: <IssuesCloseOutlined />,
                title: '讨论',
                url: 'https://github.com/ant-design/antd-style/issues',
                openExternal: true,
              },
            ],
          },
          {
            icon: (
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
                alt="more products"
              />
            ),
            title: '更多产品',
            items: [
              {
                icon: (
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
                    alt="yuque"
                  />
                ),
                title: '语雀',
                url: 'https://yuque.com',
                description: '知识创作与分享工具',
                openExternal: true,
              },
            ],
          },
        ]}
        bottom={
          <Center horizontal>
            Copyright © 2022-{new Date().getFullYear()} <Divider type={'vertical'} />
            Made with ❤️ by 蚂蚁集团 - AFX & 数字科技
          </Center>
        }
      />
    </div>
  );
};

export default Footer;
