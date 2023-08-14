/**
 * iframe: true
 */

import { Button, Checkbox, ConfigProvider, Popover, theme } from 'antd';
import { Flexbox } from 'react-layout-kit';

export default () => {
  const { token } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Popover: { colorText: token.colorTextLightSolid },
          Checkbox: {
            colorPrimary: token.blue7,
            colorText: token.colorTextLightSolid,
          },
          Button: { colorPrimary: token.blue7 },
        },
      }}
    >
      <div style={{ marginBottom: 100 }}>
        <Popover
          open
          content={
            <div style={{ width: 300 }}>
              <div>antd V5 的 Popup ，结合 结合 组件级 Token，可以非常简单地实现自定义样式</div>

              <Flexbox style={{ marginTop: 24 }} horizontal distribution={'space-between'} gap={8}>
                <Checkbox checked>不再显示</Checkbox>
                <Button type={'primary'} size={'small'}>
                  我知道了
                </Button>
              </Flexbox>
            </div>
          }
          color={'blue'}
          arrow={{ pointAtCenter: true }}
          trigger="hover"
        >
          antd v5 的组件级自定义样式，轻松又便捷
        </Popover>
      </div>
    </ConfigProvider>
  );
};
