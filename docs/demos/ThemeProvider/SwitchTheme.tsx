/**
 * compact: true
 */
import { ThemeProvider } from 'antd-style';
import { Flexbox } from 'react-layout-kit';
import App from '../common/demo';

export default () => {
  return (
    <Flexbox horizontal>
      <Flexbox flex={1}>
        <ThemeProvider appearance={'light'}>
          <App />
        </ThemeProvider>
      </Flexbox>
      <Flexbox flex={1}>
        <ThemeProvider appearance={'dark'}>
          <App />
        </ThemeProvider>
      </Flexbox>
    </Flexbox>
  );
};
