import '@testing-library/jest-dom';
import { theme } from 'antd';

const origError = console.error;

console.error = function (...msg) {
  const filterText = ['<TestComponent>', 'WrapperError'];
  if (filterText.some((keyword) => msg.join('').includes(keyword))) return;

  return origError.apply(this, msg);
};

theme.defaultConfig.hashed = false;
