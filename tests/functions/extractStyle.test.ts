import createCache from '@emotion/cache';
import { extractStyle } from 'antd-style';

describe('extractStyle', () => {
  const html = '<div>Hello World</div>';

  beforeAll(() => {
    // @ts-ignore
    global.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__ = {
      getCacheList: jest
        .fn()
        .mockReturnValue([createCache({ key: 'test' }), createCache({ key: 'cache' })]),
    };
  });

  it('should return an array of StyleItem', () => {
    const result = extractStyle(html);

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('key');
    expect(result[0]).toHaveProperty('style');
    expect(result[0]).toHaveProperty('css');
    expect(result[0]).toHaveProperty('ids');
    expect(result[0]).toHaveProperty('tag');
  });

  it('should create correct style tag for each cache', () => {
    const result = extractStyle(html);

    expect(result[0].tag).toMatch(/<style.*data-emotion="test.*>/);
    expect(result[1].tag).toMatch(/<style.*data-emotion="cache.*>/);
  });
});
