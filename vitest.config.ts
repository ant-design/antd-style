import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsxInject: "import React from 'react'",
  },
  test: {
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    alias: {
      '@': './src',
      'antd-style': './src',
    },
  },
});
