import { createInstance } from 'antd-style';

interface ForDemoToken {
  primaryColor: string;
  demoBgColor: string;
}

export const { createStyles, ThemeProvider: ProDemoProvider } = createInstance<ForDemoToken>({
  key: 'css',
  prefixCls: 'for-demo',
  customToken: {
    primaryColor: '#ce1472',
    demoBgColor: '#f1f2f5',
  },
  hashPriority: 'low',
});
