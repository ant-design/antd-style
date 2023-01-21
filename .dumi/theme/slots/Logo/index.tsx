import { Link, useLocale } from 'dumi';
import isEqual from 'fast-deep-equal';
import { memo, type FC } from 'react';

import { useSiteStore } from '../../store/useSiteStore';

import { useWhyDidYouUpdate } from 'ahooks';
import { useStyles } from './style';

const Logo: FC = () => {
  const locale = useLocale();
  const themeConfig = useSiteStore((s) => s.siteData.themeConfig, isEqual);
  const { styles } = useStyles();

  useWhyDidYouUpdate('Logo', { locale, themeConfig });
  return (
    themeConfig && (
      <Link className={styles} to={'base' in locale ? locale.base : '/'}>
        <img src={themeConfig.logo} alt={themeConfig.name} />
        {themeConfig.name}
      </Link>
    )
  );
};

export default memo(Logo);
