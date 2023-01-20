import { Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { CheckOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { useStyles } from './style';

SyntaxHighlighter.registerLanguage('javascript', js);

const CodeSnippet = ({ children }) => {
  const { styles, theme } = useStyles();
  const [copied, setCopy] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopy(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);
  return (
    <Tooltip
      placement={'right'}
      title={
        copied ? (
          <>
            <CheckOutlined style={{ color: theme.colorSuccess }} /> 复制成功
          </>
        ) : (
          '复制'
        )
      }
    >
      <div
        className={styles}
        onClick={() => {
          copy(children);
          setCopy(true);
        }}
      >
        {}
        <SyntaxHighlighter language={'javaScript'} style={githubGist}>
          {children}
        </SyntaxHighlighter>
      </div>
    </Tooltip>
  );
};

export default CodeSnippet;
