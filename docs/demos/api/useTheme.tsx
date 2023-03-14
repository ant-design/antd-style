/**
 * iframe: 500
 */
import { App, Divider, Space } from 'antd';
import { ThemeProvider, useTheme } from 'antd-style';

const Demo = () => {
  const token = useTheme();

  return (
    <Space direction={'vertical'} size={8}>
      <div style={{ fontSize: 12, color: token.colorTextPlaceholder }}>colorPrimary</div>
      <Space
        align={'center'}
        style={{
          background: token.colorFillTertiary,
          borderRadius: token.borderRadius,
          padding: '4px 8px',
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            background: token.colorPrimary,
            borderRadius: 16,
          }}
        />
        <code>{token.colorPrimary}</code>
      </Space>
      <div style={{ fontSize: 12, color: token.colorTextLabel, marginLeft: 8 }}>colorPrimary</div>
    </Space>
  );
};

export default () => {
  const token = useTheme();
  return (
    <div style={{ background: token.colorBgLayout, padding: 24 }}>
      <ThemeProvider appearance={'dark'}>
        <App>
          <div style={{ background: '#000', padding: '24px 12px', borderRadius: 12 }}>
            ThemeProvider & 暗色模式
            <div>
              <Demo />
            </div>
          </div>
        </App>
      </ThemeProvider>
      <Divider />
      <div>ThemeProvider & token 值</div>
      <ThemeProvider theme={{ token: { colorPrimary: '#60ff68' } }}>
        <Demo />
      </ThemeProvider>
      <Divider />
      <div>未包裹，使用默认值</div>
      <Demo />
    </div>
  );
};
