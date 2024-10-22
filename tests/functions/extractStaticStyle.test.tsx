import { Button } from 'antd';
import { createStyles, extractStaticStyle, StyleProvider } from 'antd-style';
import { renderToString } from 'react-dom/server';
import { Flexbox } from 'react-layout-kit';

describe('extractStaticStyle', () => {
  it('should return an array of StyleItem objects with correct properties', () => {
    const html = '<html><head></head><body></body></html>';
    const result = extractStaticStyle(html);
    expect(Array.isArray(result)).toBe(true);
    result.forEach((item) => {
      expect(typeof item).toBe('object');
      expect(item).toHaveProperty('style');
      expect(item).toHaveProperty('ids');
      expect(item).toHaveProperty('key');
      expect(item).toHaveProperty('css');
      expect(item).toHaveProperty('tag');
      expect(typeof item.style).toBe('object');
      expect(typeof item.ids).toBe('object');
      expect(typeof item.key).toBe('string');
      expect(typeof item.css).toBe('string');
      expect(typeof item.tag).toBe('string');
    });
  });
  it('should return undefined when there is no item with the given key', () => {
    const html = '<html><head></head><body></body></html>';
    const result = extractStaticStyle(html);
    const item = result.find((i) => i.key === 'nonexistent');
    expect(item).toBeUndefined();
  });
  describe('SSR 测试', () => {
    const useStyles = createStyles(
      ({ css }) =>
        css`
          color: red;
        `,
    );

    const App = () => {
      const { styles } = useStyles();
      return (
        <StyleProvider cache={extractStaticStyle.cache}>
          <Flexbox className={styles}>
            <Button>Click</Button>
          </Flexbox>
        </StyleProvider>
      );
    };

    it('should return a StyleItem object with correct data for antd', () => {
      const html = renderToString(<App />);
      const result = extractStaticStyle(html);
      const item = result.find((i) => i.key === 'antd')!;
      expect(item).toBeDefined();
      expect(item.css).toMatch(/\.ant-/);
      expect(item.tag).toMatch(/<style data-rc-order="prepend" data-rc-priority="-9999" data-antd-version="[0-9]+\.[0-9]+\.[0-9]+">\s*/);
    });

    // FIXME: 迁移到 vitest 后，不知道为什么 无法提取 extractStaticStyle 了
    it.skip('should return a StyleItem object with correct data for emotion', () => {
      const html = renderToString(<App />);
      const result = extractStaticStyle(html);

      const emotionCSS = result.find((i) => i.key === 'css')!;

      expect(emotionCSS).toBeDefined();
      expect(emotionCSS.css).toMatch(/css-/);
      expect(emotionCSS.tag).toMatch(/<style data-emotion="css.*">.css-/);

      const styleCSS = result.find((i) => i.key === 'acss')!;
      expect(styleCSS).toBeDefined();
      expect(styleCSS.css).toMatch(/acss-/);
      expect(styleCSS.tag).toMatch(/<style data-emotion="acss.*">.acss-/);
    });
  });
});
