import { styled } from 'antd-style';

export const Container = styled.div`
  background: ${({ theme }) => theme.colorBgLayout};
  padding: 24px;
`;
export const Label = styled.div`
  color: ${(p) => p.theme.colorTextPlaceholder};
`;
