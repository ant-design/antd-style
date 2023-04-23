import '@testing-library/jest-dom';
import { vi } from 'vitest';

// 补充 toHaveStyleRule 的 matcher
import { createSerializer, matchers } from '@emotion/jest';
expect.extend(matchers);

expect.addSnapshotSerializer(createSerializer());

// 关闭 antd 的 hash
import { theme } from 'antd';
theme.defaultConfig.hashed = false;

const origError = console.error;

console.error = function (...msg) {
  const filterText = ['<TestComponent>', 'WrapperError'];
  if (filterText.some((keyword) => msg.join('').includes(keyword))) return;

  return origError.apply(this, msg);
};

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}
