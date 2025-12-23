import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './tests/test-setup.ts',
    environment: 'happy-dom',
    globals: true,
    alias: {
      '@': resolve(__dirname, './src'),
      'antd-style': resolve(__dirname, './src'),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'json', 'lcov'],
    },
  },
});
