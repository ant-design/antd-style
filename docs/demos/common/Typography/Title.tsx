import { HomeOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Col, Row } from 'antd';

import { ActionPanel } from './ActionPanel';
import Avatar from './Avatar';

const TitleRow = styled(Row)`
  margin-bottom: 12px;
`;

const T = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.colorText};
  font-weight: 600;
  padding-top: 2px;
  width: 100%;
`;

export const TextCol = styled(Col)`
  > div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export interface DsTitleProps {
  id?: number;
  logo?: string;
  color?: string;
  name: string;
  url?: string;
}

export const Title: React.FC<DsTitleProps> = ({ id, logo, color, name, url }) => (
  <TitleRow id={id ? String(id) : name} align="middle" justify="center" wrap={false}>
    <Col flex="none" style={{ marginRight: '8px' }}>
      <Avatar size={20} logo={logo} color={color} name={name} />
    </Col>
    <TextCol flex="auto">
      <T>{name}</T>
    </TextCol>
    <ActionPanel>{url && <HomeOutlined title="主页" />}</ActionPanel>
  </TitleRow>
);
