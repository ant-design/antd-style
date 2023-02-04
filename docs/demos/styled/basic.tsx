import { SettingOutlined, SmileOutlined } from '@ant-design/icons';
import { styled } from 'antd-style';

const Icon = styled.span`
  display: flex;
  flex: 1;
  color: red;
`;

const ButtonCtn = styled.button`
  background: dodgerblue;
  color: white;
  border: ${Math.random()}px solid white;

  &:focus,
  &:hover {
    padding: 1em;
  }

  .otherClass {
    margin: 0;
  }

  ${Icon} {
    color: black;
  }
`;

export default () => (
  <div>
    <Icon>
      <SmileOutlined />
    </Icon>

    <ButtonCtn>
      <Icon>
        <SettingOutlined />
      </Icon>
      按钮
    </ButtonCtn>
  </div>
);
