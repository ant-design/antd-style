import { useSidebarData } from 'dumi';
import { type FC, type ReactNode } from 'react';
import { useStyles } from './style';

const Content: FC<{ children: ReactNode }> = (props) => {
  const sidebar = useSidebarData();

  const { styles, cx } = useStyles();
  return (
    <div
      className={cx('dumi-default-content', styles.content)}
      data-no-sidebar={!sidebar || undefined}
    >
      {props.children}
    </div>
  );
};

export default Content;
