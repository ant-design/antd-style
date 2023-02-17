/**
 * title: styled-components
 * description: 只有注入了 styled-components 的 ThemeProvider ，才能响应自定义 token
 * iframe: 100
 */
import { ThemeProvider } from 'antd-style';
import { Flexbox } from 'react-layout-kit';
import { styled, ThemeProvider as StyledThemeProvider, useTheme } from 'styled-components';

const StyledButton = styled.button`
  color: ${(p) => p.theme.text};
  background: ${(p) => p.theme.colorPrimary};
  padding: 8px;
`;

export default () => {
  return (
    <Flexbox horizontal gap={24}>
      <ThemeProvider
        customToken={{
          text: 'white',
          border: 'green',
        }}
        styled={{
          ThemeProvider: StyledThemeProvider,
          useTheme,
        }}
      >
        <StyledButton>注入 styled-components 的 Provider</StyledButton>
      </ThemeProvider>

      <ThemeProvider
        customToken={{
          text: 'white',
          border: 'green',
        }}
      >
        <StyledButton>只包裹 ThemeProvider</StyledButton>
      </ThemeProvider>

      <StyledButton>不包裹 Provider</StyledButton>
    </Flexbox>
  );
};
