import { Card } from 'antd';
import { createStyles } from 'antd-style';
import { FC, Profiler, useCallback, useState } from 'react';

// import { CodeOutlined } from '@ant-design/icons';
import { demoPathPrefix } from '../TestCase';

let max = 0;

const useStyles = createStyles(({ css, token }) => ({
  time: css`
    color: ${token.colorTextTertiary};
  `,
  error: css`
    color: ${token.colorError};
  `,
  warning: css`
    color: ${token.colorWarning};
  `,
  title: css`
    color: ${token.colorText};
    display: flex;
    gap: 8px;
  `,
}));

const CodeOutlined = () => (
  <svg viewBox="0 0 1024 1024" width={12} fill={'currentColor'}>
    <path d="M853.333 469.333A42.667 42.667 0 0 0 810.667 512v256A42.667 42.667 0 0 1 768 810.667H256A42.667 42.667 0 0 1 213.333 768V256A42.667 42.667 0 0 1 256 213.333h256A42.667 42.667 0 0 0 512 128H256a128 128 0 0 0-128 128v512a128 128 0 0 0 128 128h512a128 128 0 0 0 128-128V512a42.667 42.667 0 0 0-42.667-42.667z"></path>
    <path d="M682.667 213.333h67.413L481.707 481.28a42.667 42.667 0 0 0 0 60.587 42.667 42.667 0 0 0 60.586 0L810.667 273.92v67.413A42.667 42.667 0 0 0 853.333 384 42.667 42.667 0 0 0 896 341.333V170.667A42.667 42.667 0 0 0 853.333 128H682.667a42.667 42.667 0 0 0 0 85.333z"></path>
  </svg>
);

interface TestSuitProps {
  name: string;
  Component: FC;
  path?: string;
}

export const TestSuit: FC<TestSuitProps> = ({ Component, name, path }) => {
  const { styles, cx } = useStyles();

  const [perf, setPerf] = useState<number | null>(null);

  const onRender = useCallback(
    (
      id: string, // the "id" prop of the Profiler tree that has just committed
      phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
      actualDuration: number, // time spent rendering the committed update
      baseDuration: number, // estimated time to render the entire subtree without memoization
      startTime: number, // when React began rendering this update
      commitTime: number, // when React committed this update
      interactions: any, // the Set of interactions belonging to this update
    ) => {
      if (phase === 'mount') {
        if (baseDuration > max) {
          max = baseDuration;
        }
        setPerf(baseDuration);
      }
    },
    [],
  );

  const time = perf ? Math.round(perf * 100) / 100 : 0;
  return (
    <Card
      title={
        <a href={demoPathPrefix + path} target="_blank" className={styles.title}>
          {name} <CodeOutlined />
        </a>
      }
      style={{ width: 300 }}
      extra={
        <div className={cx(time >= 300 ? styles.error : time >= 50 ? styles.warning : styles.time)}>
          {time}ms
        </div>
      }
      size={'small'}
    >
      <Profiler id={name} onRender={onRender}>
        <Component />
      </Profiler>
    </Card>
  );
};
