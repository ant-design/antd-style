/**
 * compact: true
 */
import { ThemeProvider, useTheme } from 'antd-style';

interface NewToken {
  customBrandColor: string;
}

// 通过给 antd-style 扩展 CustomToken 对象类型定义，可以为 useTheme 中增加相应的 token 对象
declare module 'antd-style' {
  export interface CustomToken extends NewToken {}
}

const App = () => {
  const token = useTheme();
  return <div>{token.customBrandColor}</div>;
};

export default () => (
  // 给 `ThemeProvider` 对象添加泛型，可以约束 `customToken` 的入参定义。
  <ThemeProvider<NewToken> customToken={{ customBrandColor: '#c956df' }}>
    <App />
  </ThemeProvider>
);
