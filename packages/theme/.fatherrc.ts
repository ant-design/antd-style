import { defineConfig } from 'father';
import path from 'path';

export default defineConfig({
  plugins: ['father-plugin-dumi-theme'],
  alias: {
    'antd-style': path.resolve(__dirname, '../../es'),
  },
});
