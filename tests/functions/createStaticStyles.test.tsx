import { render } from '@testing-library/react';
import { createStaticStyles, createStaticStylesFactory, cssVar, cx, responsive } from 'antd-style';

describe('createStaticStyles', () => {
  describe('基础功能', () => {
    it('应该返回样式对象而非 hook', () => {
      const styles = createStaticStyles(({ css }) => ({
        container: css`
          display: flex;
        `,
      }));

      // 应该直接是对象，而非函数
      expect(typeof styles).toBe('object');
      expect(typeof styles.container).toBe('string');
    });

    it('应该生成有效的 className', () => {
      const styles = createStaticStyles(({ css }) => ({
        box: css`
          padding: 16px;
          margin: 8px;
        `,
      }));

      // className 应该是非空字符串
      expect(styles.box).toBeTruthy();
      expect(styles.box.length).toBeGreaterThan(0);
    });
  });

  describe('cssVar 功能', () => {
    it('应该能使用 cssVar 生成 CSS 变量', () => {
      const styles = createStaticStyles(({ css, cssVar }) => ({
        themed: css`
          background: ${cssVar.colorBgContainer};
          color: ${cssVar.colorText};
        `,
      }));

      expect(styles.themed).toBeTruthy();
    });

    it('cssVar 应该包含所有 antd token 对应的 CSS 变量', () => {
      expect(cssVar.colorPrimary).toBe('var(--ant-color-primary)');
      expect(cssVar.colorBgContainer).toBe('var(--ant-color-bg-container)');
      expect(cssVar.borderRadius).toBe('var(--ant-border-radius)');
    });

    it('cssVar 应该正确处理带数字的 token', () => {
      // JS key 保持 camelCase（yellow1），CSS 变量名用 kebab-case（--ant-yellow-1）
      expect(cssVar.yellow1).toBe('var(--ant-yellow-1)');
      expect(cssVar.blue10).toBe('var(--ant-blue-10)');
      expect(cssVar.red5).toBe('var(--ant-red-5)');
    });

    it('cssVar 的 key 应该保持 camelCase，不应该有 kebab-case 的 key', () => {
      const keys = Object.keys(cssVar);

      // 不应该有 kebab-case 的 key（包含 -）
      const kebabKeys = keys.filter((key) => key.includes('-'));
      expect(kebabKeys).toHaveLength(0);

      // 应该有 camelCase 的 key
      expect(keys).toContain('yellow1');
      expect(keys).toContain('colorPrimary');
      expect(keys).not.toContain('yellow-1');
      expect(keys).not.toContain('color-primary');
    });
  });

  describe('responsive 功能', () => {
    it('应该能使用 responsive 生成媒体查询', () => {
      const styles = createStaticStyles(({ css, responsive }) => ({
        layout: css`
          display: flex;
          ${responsive.md} {
            flex-direction: column;
          }
        `,
      }));

      expect(styles.layout).toBeTruthy();
    });

    it('responsive 应该包含所有断点', () => {
      expect(responsive.xs).toContain('@media');
      expect(responsive.sm).toContain('@media');
      expect(responsive.md).toContain('@media');
      expect(responsive.lg).toContain('@media');
      expect(responsive.xl).toContain('@media');
      expect(responsive.xxl).toContain('@media');
    });

    it('responsive 应该包含设备别名', () => {
      expect(responsive.mobile).toBe(responsive.xs);
      expect(responsive.tablet).toBe(responsive.md);
      expect(responsive.laptop).toBe(responsive.lg);
      expect(responsive.desktop).toBe(responsive.xxl);
    });
  });

  describe('cx 功能', () => {
    it('应该能使用内部 cx 合并多个 className', () => {
      const styles = createStaticStyles(({ css, cx }) => {
        const base = css`
          display: flex;
        `;
        const active = css`
          background: blue;
        `;
        return {
          combined: cx(base, active),
        };
      });

      expect(styles.combined).toBeTruthy();
      // cx 返回的应该是合并后的 className 字符串
      expect(typeof styles.combined).toBe('string');
    });

    it('内部 cx 应该将多个样式合并成单个 className', () => {
      const styles = createStaticStyles(({ css, cx }) => {
        const text = css`
          color: red;
        `;
        const secondary = css`
          font-size: 12px;
        `;
        return {
          text,
          secondary,
          // 合并后应该只有一个 className，而不是两个用空格分隔的
          combined: cx(text, secondary),
        };
      });

      // 验证原始样式是单个 className（不包含空格）
      expect(styles.text.split(' ')).toHaveLength(1);
      expect(styles.secondary.split(' ')).toHaveLength(1);

      // cx 返回的应该是单个合并后的 className
      const classNameParts = styles.combined.split(' ').filter(Boolean);
      expect(classNameParts).toHaveLength(1);
    });

    it('内部 cx 应该合并三个或更多样式为单个 className', () => {
      const styles = createStaticStyles(({ css, cx }) => {
        const base = css`
          display: flex;
        `;
        const text = css`
          color: blue;
        `;
        const size = css`
          font-size: 14px;
        `;
        return {
          combined: cx(base, text, size),
        };
      });

      const classNameParts = styles.combined.split(' ').filter(Boolean);
      expect(classNameParts).toHaveLength(1);
    });

    it('使用外部 cx 合并静态样式应该正确合并成单个 className', () => {
      // 先定义静态样式
      const styles = createStaticStyles(({ css }) => ({
        text: css`
          color: red;
        `,
        secondary: css`
          font-size: 12px;
        `,
      }));

      // 使用从 antd-style 导出的 cx（现在使用相同的 cache）
      const combined = cx(styles.text, styles.secondary);

      // 由于现在共享相同的 cache，外部 cx 可以正确合并样式
      const classNameParts = combined.split(' ').filter(Boolean);

      // 应该合并成单个 className
      expect(classNameParts).toHaveLength(1);
    });
  });

  describe('渲染测试', () => {
    it('应该能在组件中正常使用', () => {
      const styles = createStaticStyles(({ css, cssVar }) => ({
        container: css`
          padding: 16px;
          background: ${cssVar.colorBgContainer};
        `,
      }));

      const App = () => {
        return <div className={styles.container}>Hello Static Styles</div>;
      };

      const { container } = render(<App />);

      expect(container.firstChild).toHaveAttribute('class');
      expect(container.firstChild).toHaveTextContent('Hello Static Styles');
    });

    it('多个组件使用相同样式应该共享 className', () => {
      const styles = createStaticStyles(({ css }) => ({
        shared: css`
          color: red;
        `,
      }));

      const App = () => (
        <div>
          <span className={styles.shared}>A</span>
          <span className={styles.shared}>B</span>
        </div>
      );

      const { container } = render(<App />);

      const spans = container.querySelectorAll('span');
      expect(spans[0].className).toBe(spans[1].className);
    });

    it('应该能在组件中使用外部 cx 合并样式', () => {
      const styles = createStaticStyles(({ css }) => ({
        text: css`
          color: red;
        `,
        bold: css`
          font-weight: bold;
        `,
      }));

      const App = () => {
        // 使用从 antd-style 导出的 cx
        return <div className={cx(styles.text, styles.bold)}>Combined Styles</div>;
      };

      const { container } = render(<App />);

      expect(container.firstChild).toHaveAttribute('class');
      // 验证 cx 合并后只有一个 className
      const className = (container.firstChild as HTMLElement).className;
      expect(className.split(' ').filter(Boolean)).toHaveLength(1);
    });
  });

  describe('快照测试', () => {
    it('基础样式快照', () => {
      const styles = createStaticStyles(({ css, cssVar }) => ({
        card: css`
          padding: 16px;
          border-radius: 8px;
          background: ${cssVar.colorBgContainer};
          border: 1px solid ${cssVar.colorBorder};
        `,
        title: css`
          font-size: 18px;
          font-weight: bold;
          color: ${cssVar.colorText};
        `,
      }));

      expect(styles).toMatchSnapshot();
    });

    it('响应式样式快照', () => {
      const styles = createStaticStyles(({ css, responsive }) => ({
        layout: css`
          display: flex;
          flex-direction: row;
          ${responsive.md} {
            flex-direction: column;
          }
          ${responsive.sm} {
            padding: 8px;
          }
        `,
      }));

      expect(styles).toMatchSnapshot();
    });
  });

  describe('createStaticStylesFactory', () => {
    it('应该能创建自定义 prefix 的实例，并带有 ant fallback', () => {
      const { cssVar } = createStaticStylesFactory({ prefix: 'my-app' });

      // 自定义 prefix 会自动添加 ant fallback
      expect(cssVar.colorPrimary).toBe('var(--my-app-color-primary, var(--ant-color-primary))');
      expect(cssVar.colorBgContainer).toBe(
        'var(--my-app-color-bg-container, var(--ant-color-bg-container))',
      );
      expect(cssVar.paddingLG).toBe('var(--my-app-padding-lg, var(--ant-padding-lg))');
    });

    it('自定义实例应该能正常创建样式', () => {
      const { createStaticStyles } = createStaticStylesFactory({ prefix: 'custom' });

      const styles = createStaticStyles(({ css, cssVar }) => ({
        container: css`
          background: ${cssVar.colorBgContainer};
        `,
      }));

      expect(styles.container).toBeTruthy();
      expect(typeof styles.container).toBe('string');
    });

    it('默认 prefix 应该是 ant，无 fallback', () => {
      const { cssVar } = createStaticStylesFactory();

      // ant 前缀不需要 fallback
      expect(cssVar.colorPrimary).toBe('var(--ant-color-primary)');
    });
  });
});
