import { styled } from 'antd-style';
import { FC } from 'react';

const T = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colorTextTertiary};
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid ${(props) => props.theme.colorSplit};
  margin-bottom: 12px;
  width: 100%;
`;

export interface GroupTitleProps {
  name: string;
  id?: string;
}

export const GroupTitle: FC<GroupTitleProps> = ({ name, id }) => <T id={id ? id : name}>{name}</T>;
