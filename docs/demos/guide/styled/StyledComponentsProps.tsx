/**
 * title: styled-components
 * description: 只有注入了 styled-components 的 ThemeContext ，才能响应自定义 token
 * iframe: 100
 */
import { ThemeProvider } from 'antd-style';
import { Flexbox } from 'react-layout-kit';
import { styled, ThemeContext } from 'styled-components';

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
        <StyledButton>注入 styled-components 的 Provider</StyledButton>
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

      <StyledButton>不包裹 Provider</StyledButton>
    </Flexbox>
  );
};
