import { Tag } from 'antd';
import { FC } from 'react';

interface DisplayTagProps {
  active?: boolean;
  color: 'blue' | 'green';
  title: string;
  value: string;
}

export const DisplayTag: FC<DisplayTagProps> = ({ active, color, title, value }) => {
  return (
    <Tag color={active ? color : undefined}>
      {title}: {value}
    </Tag>
  );
};
