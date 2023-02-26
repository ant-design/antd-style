/**
 * title: '@emotion/styled'
 * description: 'antd-style 内置了 @emotion/react 的 ThemeContext，所以默认可以响应自定义 Token'
 * iframe: 100
 */
import { ThemeContext } from '@emotion/react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'antd-style';
import { Flexbox } from 'react-layout-kit';

const StyledButton = styled.button`
  color: ${(p) => p.theme.text};
  background: ${(p) => p.theme.colorPrimary};
  border: 4px solid ${(p) => p.theme.border};
  padding: 8px;
  border-radius: ${(p) => p.theme.borderRadius}px;
`;

export default () => {
  return (
    <Flexbox horizontal gap={24}>
      <ThemeProvider
        customToken={{
          text: 'white',
          border: 'cyan',
          borderRadius: 8,
        }}
        styled={{ ThemeContext }}
      >
        <StyledButton>注入 @emotion/react Provider</StyledButton>
      </ThemeProvider>

      <ThemeProvider
        customToken={{
          text: 'white',
          border: 'green',
          borderRadius: 8,
        }}
      >
        <StyledButton>只包裹 ThemeProvider</StyledButton>
      </ThemeProvider>

      <StyledButton>不包裹 ThemeProvider</StyledButton>
    </Flexbox>
  );
};
