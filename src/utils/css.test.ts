import { isReactCssResult } from './index';

describe('isReactCssResult', () => {
  it('测试构建产物', () => {
    const result = isReactCssResult({
      name: '1mf3e6p',
      styles:
        '\n    grid-area: footer;\n    border-top: 1px solid rgba(5, 5, 5, 0.06);\n    color: rgba(61, 62, 64, 0.45);\n    font-size: 14px;\n    line-height: 26px;\n    text-align: center;\n    padding: 24px 0;\n    align-self: stretch;\n    @media (max-width: 575px) {\n      flex-direction: column;\n    }\n  ',
    });
    expect(result).toBeTruthy();
  });

  it('测试dev产物', () => {
    const result = isReactCssResult({
      name: '1mf3e6p',
      map: undefined,
      next: undefined,
      styles:
        '\n    grid-area: footer;\n    border-top: 1px solid rgba(5, 5, 5, 0.06);\n    color: rgba(61, 62, 64, 0.45);\n    font-size: 14px;\n    line-height: 26px;\n    text-align: center;\n    padding: 24px 0;\n    align-self: stretch;\n    @media (max-width: 575px) {\n      flex-direction: column;\n    }\n  ',
      toString: () => {},
    });
    expect(result).toBeTruthy();
  });
});
