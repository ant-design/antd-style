/**
 * compact: true
 */
import { App } from 'antd';
import { styled, ThemeProvider } from 'antd-style';
import { Flexbox } from 'react-layout-kit';
import Statistic from './CSSinJSComponent';

const Container = styled(Flexbox)`
  background: ${(p) => p.theme.colorBgLayout};
`;
export default () => {
  return (
    <ThemeProvider prefixCls={'css-in-js'}>
      <App>
        <Container horizontal padding={24} gap={40}>
          <Statistic description={'inline'} layout={'inline'} value={12312} />
          <Statistic description={'vertical'} layout={'vertical'} value={12312} />
          <Statistic description={'horizontal'} trend={'up'} layout={'horizontal'} value={12312} />
        </Container>
      </App>
    </ThemeProvider>
  );
};
