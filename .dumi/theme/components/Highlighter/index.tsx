import { useThemeMode } from 'antd-style';
import { memo } from 'react';
import { default as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export interface HighlighterProps {
  children: string;
  language: string;
}
const Highlighter = memo<HighlighterProps>(({ children, language }) => {
  const { isDarkMode } = useThemeMode();

  return (
    <SyntaxHighlighter language={language} style={isDarkMode ? atomOneDark : githubGist}>
      {children}
    </SyntaxHighlighter>
  );
});

export default Highlighter;
