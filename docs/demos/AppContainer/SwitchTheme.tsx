/**
 * compact: true
 */
import { AppContainer } from 'antd-style';
import { Flexbox } from 'react-layout-kit';
import App from '../common/demo';

export default () => {
  return (
    <Flexbox horizontal>
      <Flexbox flex={1}>
        <AppContainer appearance={'light'}>
          <App />
        </AppContainer>
      </Flexbox>
      <Flexbox flex={1}>
        <AppContainer appearance={'dark'}>
          <App />
        </AppContainer>
      </Flexbox>
    </Flexbox>
  );
};
