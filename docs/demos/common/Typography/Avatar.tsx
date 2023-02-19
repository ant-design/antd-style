import styled from '@emotion/styled';
import { Avatar as A } from 'antd';
import { useTheme } from 'antd-style';
import { FC } from 'react';

const AvatarText = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

interface AvatarProps {
  logo?: string;
  color?: string;
  name?: string;
  size?: number;
}

const Avatar: FC<AvatarProps> = ({ logo, color, name, size = 36 }) => {
  const theme = useTheme();
  return (
    <A
      src={logo}
      size={size}
      shape="square"
      style={{
        background: logo ? undefined : color ? color : theme.colorPrimary,
        borderRadius: 4,
      }}
    >
      {name && <AvatarText>{name.slice(0, 1).toUpperCase()}</AvatarText>}
    </A>
  );
};

export default Avatar;
