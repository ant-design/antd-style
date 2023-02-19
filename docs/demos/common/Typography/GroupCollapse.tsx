import styled from '@emotion/styled';
import { Collapse } from 'antd';
import { FC, PropsWithChildren } from 'react';

const CustomCollapse = styled(Collapse)`
  .typography-collapse-header {
    width: 100%;
    height: 30px;
    margin-bottom: 12px;
    padding: 0 !important;
    color: ${(props) => props.theme.colorTextTertiary} !important;
    font-size: 12px;
    line-height: 30px;
    border-bottom: 1px solid ${(props) => props.theme.colorSplit};
    border-radius: 0 !important;
  }
  .typography-collapse-content {
    overflow: unset !important;
  }
  .typography-collapse-content-box {
    padding: 0 !important;
  }
  .anticon-right {
    top: 6px !important;
    right: 0 !important;
    left: unset !important;
    color: ${(props) => props.theme.colorTextQuaternary} !important;
    font-size: 14px;
    &:hover {
      color: ${(props) => props.theme.colorPrimary} !important;
    }
  }
`;
interface GroupCollapseProps {
  name: string;
  id?: string;
}
export const GroupCollapse: FC<PropsWithChildren<GroupCollapseProps>> = ({
  name,
  id,
  children,
}) => (
  <CustomCollapse defaultActiveKey={['1']} ghost>
    <Collapse.Panel key="1" id={id ? id : name} header={name}>
      {children}
    </Collapse.Panel>
  </CustomCollapse>
);
