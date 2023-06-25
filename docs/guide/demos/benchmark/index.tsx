/**
 * iframe: 600
 */
import { PlayCircleOutlined } from '@ant-design/icons';
import { App, Button, Card, Descriptions, Divider } from 'antd';
import { createStyles } from 'antd-style';
import { useCallback, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { TestResult } from './components/TestResult';
import { NUM_CARDS } from './const';

const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      padding: 24px;
      min-height: 100vh;
      background: ${token.colorBgLayout};
    `,
  };
});

export default () => {
  const { styles } = useStyles();
  const [runCount, setRunCount] = useState(0);

  const onClickRun = useCallback(() => {
    let nextRunCount = runCount + 1;
    setRunCount(-1);
    setTimeout(() => {
      setRunCount(nextRunCount);
    }, 100);
  }, [runCount]);

  return (
    <App className={styles.container}>
      <Card
        title={'单次渲染性能对比'}
        extra={
          <Button
            type={'primary'}
            icon={<PlayCircleOutlined />}
            onClick={onClickRun}
            loading={runCount === -1}
          >
            {runCount > 0 ? '重新运行' : '运行测试'}
          </Button>
        }
      >
        <Descriptions layout={'vertical'}>
          <Descriptions.Item label={'测试基准'}>渲染 {NUM_CARDS} 张卡片</Descriptions.Item>
          <Descriptions.Item label={'统计指标'}>
            使用 React 的 &lt;Profiler /&gt; 组件统计渲染时间
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {runCount > 0 && (
        <Flexbox style={{ marginTop: 12 }}>
          <Divider>测试结果</Divider>
          <TestResult key={runCount} />
        </Flexbox>
      )}
    </App>
  );
};
