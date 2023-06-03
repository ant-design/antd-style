/**
 * compact: true
 */

import { ThemeProvider } from 'antd-style';
import Demo from './Demo';
import { Container } from './style';

export default () => {
  return (
    <Container>
      <ThemeProvider
        theme={{
          token: {
            screenXS: 500,
            screenMD: 800,
            screenLG: 1100,
          },
        }}
      >
        <Demo />
      </ThemeProvider>
    </Container>
  );
};
