import { NavLink, useSidebarData } from 'dumi';
import { type FC } from 'react';

import { useStyles } from './style';

const Sidebar: FC = () => {
  const sidebar = useSidebarData();

  const { styles } = useStyles();
  if (!sidebar) return null;

  return (
    <div className={styles.sidebar}>
      {sidebar.map((item, i) => (
        <dl key={String(i)}>
          {item.title && <dt>{item.title}</dt>}
          {item.children.map((child) => (
            <dd key={child.link}>
              <NavLink to={child.link} title={child.title} end>
                {child.title}
              </NavLink>
            </dd>
          ))}
        </dl>
      ))}
    </div>
  );
};

export default Sidebar;
