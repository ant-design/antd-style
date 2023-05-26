import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    alias: {
      '@': './src',
      'antd-style': './src',
    },
    coverage: {
      provider: 'c8',
      reporter: ['text', 'text-summary', 'json', 'lcov'],
    },
  },
});
