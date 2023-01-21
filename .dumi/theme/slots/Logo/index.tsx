import { Link, useLocale } from 'dumi';
import isEqual from 'fast-deep-equal';
import { memo, type FC } from 'react';

import { useSiteStore } from '../../store/useSiteStore';

import { useStyles } from './style';

const Logo: FC = () => {
  const locale = useLocale();
  const themeConfig = useSiteStore((s) => s.siteData.themeConfig, isEqual);
  const { styles, cx, theme } = useStyles();

  return (
    themeConfig && (
      <Link
        className={cx(theme.stylish.clickableText, styles)}
        to={'base' in locale ? locale.base : '/'}
      >
        <img src={themeConfig.logo} alt={themeConfig.name} />
        {themeConfig.name}
      </Link>
    )
  );
};

export default memo(Logo);
