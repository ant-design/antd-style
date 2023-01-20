import { Anchor } from 'antd';
import { useRouteMeta } from 'dumi';
import { useMemo, type FC } from 'react';

type AnchorItem = {
  id: string;
  title: string;
  children?: AnchorItem[];
};

const Toc: FC = () => {
  const meta = useRouteMeta();

  const anchorItems = useMemo(
    () =>
      meta.toc.reduce<AnchorItem[]>((result, item) => {
        if (item.depth === 2) {
          result.push({ ...item });
        } else if (item.depth === 3) {
          const parent = result[result.length - 1];
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push({ ...item });
          }
        }
        return result;
      }, []),
    [meta.toc],
  );

  return (
    anchorItems && (
      <Anchor
        items={anchorItems.map((item) => ({
          href: `#${item.id}`,
          title: item.title,
          key: item.id,
          children: item.children?.map((child) => ({
            href: `#${child.id}`,
            title: child?.title,
            key: child.id,
          })),
        }))}
      />
    )
  );
};

export default Toc;
