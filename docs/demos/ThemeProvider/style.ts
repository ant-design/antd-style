import { Space } from 'antd';
import { styled } from 'antd-style';

export const Container = styled(Space)`
  padding: 40px;
  background: ${(p) => p.theme.colorBgLayout};
`;
