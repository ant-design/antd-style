import { render } from '@testing-library/react';
import { createStaticStyles, cssVar, responsive } from 'antd-style';

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
  });

  describe('cx 功能', () => {
    it('应该能使用 cx 合并多个 className', () => {
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
});
