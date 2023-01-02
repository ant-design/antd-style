import { Divider, Space } from 'antd';
import { AppContainer, ThemeProvider, useTheme } from 'antd-style';

const App = () => {
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
  return (
    <>
      AppContainer 包裹
      <AppContainer>
        <App />
      </AppContainer>
      <Divider />
      <div>ThemeProvider 包裹</div>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <Divider />
      <div>未包裹</div>
      <App />
    </>
  );
};
