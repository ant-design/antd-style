import { GithubFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { memo, type FC } from 'react';

import { useSiteStore } from '../../store/useSiteStore';

const GithubButton: FC = () => {
  const repoUrl = useSiteStore((s) => s.siteData.themeConfig?.repoUrl);

  return (
    repoUrl && (
      <Tooltip showArrow={false} title={'Github'}>
        <a href={repoUrl} target={'_blank'} rel="noreferrer">
          <Button icon={<GithubFilled />} />
        </a>
      </Tooltip>
    )
  );
};

export default memo(GithubButton);
