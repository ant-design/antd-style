global.requestAnimationFrame =
  global.requestAnimationFrame ||
  function requestAnimationFrame(cb) {
    return setTimeout(cb, 0);
  };
global.cancelAnimationFrame =
  global.cancelAnimationFrame ||
  function cancelAnimationFrame() {
    return null;
  };
// browserMocks.js
const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key: string | number) {
      return store[key] || null;
    },
    setItem(key: string | number, value: { toString: () => any }) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  value: () => null,
});
