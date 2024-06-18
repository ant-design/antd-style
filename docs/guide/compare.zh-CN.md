---
title: CSS in JS 写法对比
order: 2
group: 基础知识
---

# CSS in JS 写法对比

由于 CSS in JS 的写法过多，所以我们需要给出一种最佳实践的写法，能兼容 V5 的 Token System、自定义主题、较低的研发心智和良好的扩展性。而本文会从各个角度来聊聊不同写法之间的差异。并给出 `antd-style` 最推荐的方式。

## 对比基础：原有的 V4 CSS Modules

我们先来回顾一下在之前（antd v4）的写法，这是我们与 CSS in JS 写法的对比基础。

大部分应用一旦使用 antd，一般都会搭配 less 和 css modules 来书写样式。页面书写的样式方案如下：

```less | pure
// style.less
@import '~antd/es/style/themes/default';

.list {
  border: 1px solid @primary-color;
  border-radius: 2px;
  box-shadow: 0 8px 20px @shadow-color;
}
```

```tsx | pure
// index.tsx
import styles from './style.less';

const App = ({ list }) => {
  return <List dataSource={list} className={styles.list} />;
};
```

## 1. styled 写法

styled 的写法从体感上看完全是另一套代码。 由于我们在业务中已经持续使用了两年，所以相对来说经验也算丰富。先来讲讲使用 styled 的一些痛点。

首先，开发者需要重新学习 styled 的基础语法和相关的使用方式。并且如果使用 antd v4 less 的项目，要迁移到这种写法，基本上和重写没有区别。

在实际项目研发上，我们经历最痛的地方主要在于组件样式的覆写。 譬如需要对 antd 的 Button 进行样式覆盖，需要这么写:

```tsx | pure
import { Button } from 'antd';
import { styled } from 'styled-components';

// 引入 antd 的 Button 后做重命名
const ButtonBox = styled(Button)`
  display: flex;
  align-items: center;
  height: 80px;
`;

export default () => {
  // 再使用
  return <ButtonBox>Button</ButtonBox>;
};
```

这种覆盖方式对于设计完备的组件库来说，会极大地破坏代码的语义化。一旦以这种方式进行铺开，那么以后大家再也分不清代码中到底哪个 Button 组件才是 antd 的 Button。接手不同项目的研发心智成本会极大提升。

此外， Modal、Drawer 这样的组件存在多个 className 的情况，styled 由于写法的局限性是无法覆盖到的。因为 styled 包裹的组件默认只会把样式插入到 `className` 上，而像 Drawer 这种存在 `rootClassName` 的组件，要给 rootClassName 挂载样式会很困难。

最后，我们在实践中还会偶尔出现用 styled 包裹的 antd 组件，类型定义无法正常被提示出来，这也降低了研发效率。

讲完 styled 的缺点，再来说说 styled 的优势。

由于 styled 的写法可以保证每一个样式都能形成标准的 React 组件，且样式与样式之间的组合比较方便。因此，它非常适合制作一个从 0 开始建设的业务风格化组件库，或者制作一些具有统一风格的样式组件。

通过 styled 来声明一系列标准的样式组件，可以极大程度地减少重复的样式代码，并且帮助开发者形成明确的样式语义认知。详见案例：[Typography 风格化组件](/zh-CN/case/styled)

如果是在已有一个设计系统的基础上，styled 是不合适的。尤其是 antd v5 本身已经具有很强的动态主题能力基础之上。

## 2. css props 写法

这种写法似乎是 emotion 推荐的方案，而且 emotion 的核心维护者在自己的业务中也大量使用这种写法（详见：[Why We're Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b)）。这种写法存在两个很大的问题：1）样式代码耦合 ，2）性能缺陷。

css props 的写法会让样式代码直接与逻辑代码直接耦合在了一起，这样会导致样式代码的可维护性降低，而且在代码中难以区分出哪些是样式代码，哪些是逻辑代码（如下所示）。

```tsx | pure
/** @jsx jsx */

const Command = () => {
  const { styles, cx } = useStyles();
  const [hover, setHover] = useState('');

  return (
    <div
      css={{
        background: '#0e0f11',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        color: 'white',
      }}
    >
      <div
        css={css`
          padding: 1px;
          width: 600px;
          border-radius: 1rem;
          background-color: #262626;
          background-image: linear-gradient(135deg, #ff4593, #ffe713 32%, #17d7ff 66%, #077bff);
          position: relative;
          box-shadow: rgba(255, 69, 146, 0.2) -40px -40px 200px, rgba(255, 231, 18, 0.2) -4px 0px
              200px, rgba(23, 216, 255, 0.2) 0px 20px 200px, rgba(8, 123, 255, 0.2) 0px 20px 200px;
        `}
      >
        <div
          css={css`
            display: flex;
            padding: 1rem;
            align-items: center;
            border-bottom: 1px solid #444;
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            background-color: #262626;
          `}
        >
          ...
          <div
            css={css`
              padding-left: 8px;
              flex: 1;
              color: hsla(0, 0%, 100%, 0.4);
            `}
          >
            Trigger Macro by Name
          </div>
          <SearchOutlined />
        </div>
        <div
          css={{
            padding: '8px 0',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            backgroundColor: '#262626',
          }}
        >
          {items.map(({ label, shortcut }) => {
            return (
              <div
                key={label}
                onMouseEnter={() => {
                  setHover(label);
                }}
              >
                <div>{label}</div>
                <div>{shortcut}</div>
              </div>
            );
          })}
        </div>

        <div css={{ backgroundColor: '#363636' }} />
      </div>
    </div>
  );
};
```

这对于代码的可维护性来说是个灾难。 但如果是样式和逻辑代码分离，则清晰易懂（如下所示）：

```tsx | pure
import styles from './style.less';

const Command = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <div className={styles.placeholder}>Trigger Macro by Name</div>

          <SearchOutlined />
        </div>
        <div className={styles.menuContainer}>
          {items.map(({ label, shortcut }) => {
            return (
              <div
                key={label}
                onMouseEnter={() => {
                  setHover(label);
                }}
              >
                <div>{label}</div>
                <div>{shortcut}</div>
              </div>
            );
          })}
        </div>

        <div className="gradient-bg"></div>
        <div className={styles.mask} />
      </div>
    </div>
  );
};
```

emotion 的前维护者在自己的业务中大量使用这种写法，但是他也在[自己的博客](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b) 中提到了这种写法的问题：性能缺陷。

由于 react 的渲染机制， 将样式对象直接传入 `css` 属性时，由于每次渲染都会将 object 作为一个新对象处理，因此会造成 react 的 re-render，这样就会造成不必要的性能开销。而作者推荐的用法是，将 css props 中的对象放到组件外部静态化。但同时这样也就失去了 css-in-js 的动态化能力。

```tsx | pure
const myCss = css({
  backgroundColor: 'blue',
  width: 100,
  height: 100,
});

function MyComponent() {
  return <div css={myCss} />;
}
```

在迁移成本上，这种写法比 styled 稍微好一些，至少不需要额外定义组件，但是还是需要动组件中的 DOM 代码，并且需要引入 `@emotion/react` 的 `jsx` 对象，迁移成本还是高了一些。

## 3. css 配合 className 写法

css 配合 className 写法，是体感上非常简单的写法，同时也是这几种方案里面最容易迁移的写法。但 css 直接配合 className 的方案，还是存在一些问题：

纯 `css` 创建静态样式的方案，无法搭配使用 antd 的 token，也就不能享受到 css-in-js 的动态化能力。

而使用动态化能力，必须要使用 hooks 的方式，如下所示。

```tsx | pure
import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyles = () => {
  const { token } = theme.useToken();
  return {
    container: css`
      background: ${token.colorBgLayout};
    `,
    list: css`
      border: 1px solid ${token.colorPrimary};
      border-radius: 2px;
      box-shadow: 0 8px 20px ${token.colorShadow};
    `,
  };
};

const App: FC = ({ list }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <List dataSource={list} className={styles.list} />
    </div>
  );
};
```

这样的写法，一方面每个函数都需要手动使用 `theme.useToken` 获取 token，量级一大非常麻烦，另一方面 hooks 返回的对象每次都会重新创建，因此一定会造成不必要的 re-render，如果每个 return 都包一下 useMemo，那么代码量还会更大。最后，再如果叠加自定义主题、动态主题等，这种写法就会变得非常复杂和啰嗦，包含一堆不要的代码。

## 各写法方案的对比小节

结合上述写到的几种方式最终整理，而 antd-style 希望再各项指标上做到最优，成为基于 antd 进行应用样式研发的最佳实践。

|                 | 学习成本 | 动态化能力 | 自定义主题难度 | 样式开发心智 | 组件覆写心智 | 性能        | 迁移成本 |
| --------------- | -------- | ---------- | -------------- | ------------ | ------------ | ----------- | -------- |
| `CSS Modules`   | ✅ 无    | ❌ 无      | ❌ 难          | ✅ 低        | ✅ 低        | ✅ 最优     | ✅ -     |
| `styled`        | ⭕️️ 高  | ✅ 高      | ⚠️ 一般        | ✅ 低        | ⭕️️ 高      | ✅ 优       | ⭕️️ 高  |
| `css` props     | ⚠️ 中    | ✅ 高      | ⚠️ 一般        | ⚠️ 高        | ✅ 低        | ⭕️️ 差     | ⚠️ 中    |
| css + className | ✅ 低    | ✅ 高      | ⚠️ 一般        | ⚠️ 高        | ✅ 低        | ⭕️️ 中到差 | ✅ 低    |
| antd-style      | ✅ 低    | ✅ 高      | ✅ 低          | ✅ 低        | ✅ 低        | ✅ 优       | ✅ 低    |
