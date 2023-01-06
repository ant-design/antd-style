/**
 * iframe: 80
 */
import { AppContainer } from 'antd-style';
import App from './WithoutProvider';

export default () => {
  return (
    <>
      <AppContainer>
        <App />
      </AppContainer>
    </>
  );
};
