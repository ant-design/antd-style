import { Space } from 'antd';
import { styled } from 'antd-style';

export const ActionPanel = styled(Space)`
  .anticon {
    color: ${(props) => props.theme.colorIcon};
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.colorPrimary};
    }
  }
`;
