/**
 * iframe: 180
 */
import { css } from '@emotion/css';
import { Divider } from 'antd';
import { AppContainer } from 'antd-style';
import { Flexbox } from 'react-layout-kit';

const appScopeStyle = css`
  @font-face {
    font-family: 'Rocher';
    // refs: https://www.matuzo.at/blog/2023/100daysof-day75/
    src: url('/fonts/RocherColorGX.woff2');
  }

  .custom-button {
    font-family: 'Rocher';
    padding: 24px;
    font-size: 24px;
  }
`;

export default () => {
  return (
    <Flexbox>
      <div className={'custom-button'}>Out App Container Custom Button</div>
      <Divider />
      <AppContainer className={appScopeStyle}>
        <div className={'custom-button'}>in App Container Custom Button</div>
      </AppContainer>
    </Flexbox>
  );
};
