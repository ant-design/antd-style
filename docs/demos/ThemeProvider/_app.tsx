import { Space } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { FC } from 'react';

interface AppProps {
  title: string;
  tokenName?: string;
}

const useStyle = createStyles(({ cx, cssVar }, { tokenName }: AppProps) => ({
  box: {
    width: 32,
    height: 32,
    background: { ...(cssVar as any) }[tokenName!] || 'pink',
    borderRadius: 16,
  },
}));

const App: FC<AppProps> = (props) => {
  const { title, tokenName } = props;
  const token = useTheme();

  // @ts-ignore
  const tokenColor = tokenName ? token[tokenName] : token.colorPrimary;
  const { styles } = useStyle(props);

  return (
    <Space direction={'vertical'} size={8}>
      <div style={{ fontSize: 12, color: token.colorTextPlaceholder }}>{title}</div>
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
            background: tokenColor || 'black',
            borderRadius: 16,
          }}
        />
        <div className={styles.box} />
        <code>{tokenColor || 'None'}</code>
      </Space>
      <div style={{ fontSize: 12, color: token.colorTextLabel, marginLeft: 8 }}>
        {tokenName || '-'}
      </div>
    </Space>
  );
};

export default App;
