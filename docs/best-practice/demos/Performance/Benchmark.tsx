/**
 * title: 性能对比
 * description: 对比 createStyles 和 createStaticStyles 的渲染性能
 */
import { App, Button, InputNumber, Space, Table, Tag, Typography } from 'antd';
import { useCallback, useMemo, useState } from 'react';

import StaticStylesCard from './staticStylesCard';
import UseStylesCard from './useStylesCard';

const { Text } = Typography;

interface BenchmarkResult {
  type: string;
  count: number;
  renderTime: number;
  avgTime: number;
}

export default () => {
  const [count, setCount] = useState(100);
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [showCards, setShowCards] = useState<'none' | 'useStyles' | 'static'>('none');

  const runBenchmark = useCallback(
    (type: 'useStyles' | 'static') => {
      setShowCards(type);

      // 使用 requestAnimationFrame 来测量实际渲染时间
      const startTime = performance.now();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const endTime = performance.now();
          const renderTime = endTime - startTime;

          setResults((prev) => [
            ...prev,
            {
              type: type === 'useStyles' ? 'createStyles' : 'createStaticStyles',
              count,
              renderTime: Math.round(renderTime * 100) / 100,
              avgTime: Math.round((renderTime / count) * 1000) / 1000,
            },
          ]);
        });
      });
    },
    [count],
  );

  const cards = useMemo(() => {
    if (showCards === 'useStyles') {
      return Array.from({ length: count }, (_, i) => <UseStylesCard key={i} index={i} />);
    }
    if (showCards === 'static') {
      return Array.from({ length: count }, (_, i) => <StaticStylesCard key={i} index={i} />);
    }
    return null;
  }, [showCards, count]);

  const columns = [
    {
      title: '方法',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <Tag color={text === 'createStyles' ? 'blue' : 'green'}>{text}</Tag>
      ),
    },
    { title: '组件数量', dataIndex: 'count', key: 'count' },
    {
      title: '渲染时间 (ms)',
      dataIndex: 'renderTime',
      key: 'renderTime',
      render: (time: number) => <Text strong>{time}</Text>,
    },
    {
      title: '平均每组件 (ms)',
      dataIndex: 'avgTime',
      key: 'avgTime',
      render: (time: number) => <Text type="secondary">{time}</Text>,
    },
  ];

  return (
    <App>
      <Space style={{ marginBottom: 16 }}>
        <Text>组件数量:</Text>
        <InputNumber min={10} max={100000} value={count} onChange={(v) => setCount(v || 100)} />
        <Button onClick={() => runBenchmark('useStyles')}>测试 createStyles</Button>
        <Button type="primary" onClick={() => runBenchmark('static')}>
          测试 createStaticStyles
        </Button>
        <Button
          danger
          onClick={() => {
            setResults([]);
            setShowCards('none');
          }}
        >
          清除结果
        </Button>
      </Space>

      {results.length > 0 && (
        <Table
          dataSource={results.map((r, i) => ({ ...r, key: i }))}
          columns={columns}
          pagination={false}
          size="small"
          style={{ marginBottom: 16 }}
        />
      )}

      <div
        style={{
          maxHeight: 300,
          overflow: 'auto',
          border: cards ? '1px solid #d9d9d9' : undefined,
          borderRadius: 8,
          padding: 8,
        }}
      >
        {cards || <Text type="secondary">点击按钮开始测试</Text>}
      </div>
    </App>
  );
};
