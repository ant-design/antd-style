import { EditOutlined, GithubFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { useResponsive } from 'antd-style';
import { FC, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Code from '../CodeSnippet';
import NpmFilled from './NpmFilled';

import { useSiteStore } from '../../store/useSiteStore';
import { Label, useStyles } from './style';

interface ApiTitleProps {
  title: string;
  description?: string;
}

export const ApiHeader: FC<ApiTitleProps> = memo(({ title, description }) => {
  const { styles } = useStyles();
  const { mobile } = useResponsive();

  const REPO_BASE = useSiteStore((s) => s.siteData.themeConfig.repoUrl);

  const items = [
    {
      label: '源码',
      icon: <GithubFilled />,
      children: '查看源码',
      url: `${REPO_BASE}/tree/master/src/${title}`,
    },
    {
      label: '文档',
      icon: <EditOutlined />,
      children: '编辑文档',
      url: `${REPO_BASE}/tree/master/docs/api/${title}`,
    },
    {
      label: '产物',
      icon: <NpmFilled />,
      children: 'antd-style',
      url: 'https://www.npmjs.com/package/antd-style?activeTab=explore',
    },
  ];

  return (
    <Flexbox>
      <Typography.Title className={styles.title}>{title}</Typography.Title>
      {description && (
        <div>
          <Typography.Text type={'secondary'} className={styles.desc}>
            {description}
          </Typography.Text>
        </div>
      )}
      <Flexbox style={{ marginTop: 24 }} gap={mobile ? 16 : 12}>
        <Flexbox horizontal={!mobile} gap={mobile ? 12 : 0}>
          <Label type={'secondary'}>引入方法</Label>
          <Code>{`import { ${title} } from "antd-style";`}</Code>
        </Flexbox>
        {items.map((item) => (
          <Flexbox horizontal key={item.label}>
            <Label type={'secondary'}>{item.label}</Label>
            {
              <a href={item.url} target={'_blank'} rel="noreferrer">
                <Flexbox horizontal align={'center'} gap={8} className={styles.text}>
                  <>{item.icon}</>
                  <>{item.children}</>
                </Flexbox>
              </a>
            }
          </Flexbox>
        ))}
      </Flexbox>
    </Flexbox>
  );
});
