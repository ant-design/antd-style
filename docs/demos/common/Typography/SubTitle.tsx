import { ReadOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import { styled } from 'antd-style';
import { startCase } from 'lodash';
import { FC, ReactNode } from 'react';

import { ActionPanel } from './ActionPanel';
import { TextCol } from './Title';

const T = styled.div`
  color: ${(props) => props.theme.colorText};
  font-weight: 600;
  width: 100%;
`;

const SubTitleRow = styled(Row)<{ size: number; hover?: boolean }>`
  font-size: ${({ size }) => size + 'px'};
  margin-bottom: ${({ size }) => size + 'px'};
  ${({ hover }) => {
    if (!hover) return;
    return `
      ${ActionPanel} {
        display: none;
      }
      &:hover {
        ${ActionPanel} {
          display: flex;
        }
      }
    `;
  }}
`;

interface DsSubTitleProps {
  name: string;
  chineseName?: string;
  id?: string;
  url?: string;
  addon?: ReactNode;
  baseUrl?: string;
  size?: number;
  actionHover?: boolean;
  onLinkClick?: () => void;
}

export const SubTitle: FC<DsSubTitleProps> = ({
  name,
  chineseName,
  id,
  url,
  addon,
  size = 14,
  actionHover,
  onLinkClick,
}) => (
  <SubTitleRow wrap={false} align="middle" size={size} hover={actionHover}>
    <TextCol flex="auto">
      <T id={id ? id : name}>{[startCase(name), chineseName].filter(Boolean).join(' ')}</T>
    </TextCol>
    <ActionPanel>
      {addon}
      {url && <ReadOutlined title="文档" />}
    </ActionPanel>
  </SubTitleRow>
);
