import '@testing-library/jest-dom';

// 关闭 antd 的 hash
import { theme } from 'antd';
theme.defaultConfig.hashed = false;

const origError = console.error;

console.error = function (...msg) {
  const filterText = ['<TestComponent>', 'WrapperError'];
  if (filterText.some((keyword) => msg.join('').includes(keyword))) return;

  return origError.apply(this, msg);
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
