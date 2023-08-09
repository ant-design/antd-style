/**
 * iframe: 240
 */
import { Button, Space } from 'antd';
import Layout from './layout';
import { showMessage, showModal, showNotification } from './request';

const App = () => (
  <Layout>
    <Space>
      <Button type={'primary'} onClick={showMessage}>
        Open message
      </Button>
      <Button onClick={showModal}>Open modal</Button>
      <Button onClick={showNotification}>Open notification</Button>
    </Space>
  </Layout>
);

export default App;
