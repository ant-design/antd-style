import { Tag } from 'antd';
import { FC } from 'react';

interface DisplayTagProps {
  active?: boolean;
  color: 'blue' | 'green';
  title: string;
  value: string;
}

export const DisplayTag: FC<DisplayTagProps> = ({ active, color, title, value, ...props }) => {
  return (
    <Tag color={active ? color : undefined} {...props}>
      {title}: {value}
    </Tag>
  );
};
