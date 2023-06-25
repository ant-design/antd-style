import { Card } from 'antd';
import { createStyles } from 'antd-style';
import { FC, Profiler, useCallback, useState } from 'react';

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
}));

interface TestSuitProps {
  name: string;
  Component: FC;
}

export const TestSuit: FC<TestSuitProps> = (props) => {
  const { styles, cx } = useStyles();
  const { Component, name } = props;
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
      title={name}
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
