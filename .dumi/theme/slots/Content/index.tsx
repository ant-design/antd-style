import { useSidebarData } from 'dumi';
import { PropsWithChildren, type FC } from 'react';
import { useStyles } from './style';

const Content: FC<PropsWithChildren> = ({ children }) => {
  const sidebar = useSidebarData();

  const { styles, cx } = useStyles();
  return (
    <div
      className={cx('dumi-default-content', styles.content)}
      data-no-sidebar={!sidebar || undefined}
    >
      {children}
    </div>
  );
};

export default Content;
