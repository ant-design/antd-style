import { ThemeProvider } from 'antd-style';
import { Flexbox } from 'react-layout-kit';
import { styled } from 'styled-components';

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
