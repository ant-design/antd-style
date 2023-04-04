import { ThemeProvider } from 'antd-style';
import { Flexbox } from 'react-layout-kit';
import { styled } from 'styled-components';

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
        }}
      >
        <StyledButton>ThemeProvider2</StyledButton>
      </ThemeProvider>

      <ThemeProvider
        customToken={{
          text: 'white',
          border: 'cyan',
          borderRadius: 8,
        }}
      >
        <StyledButton>ThemeProvider1</StyledButton>
      </ThemeProvider>

      <StyledButton>不包裹 Provider</StyledButton>
    </Flexbox>
  );
};
