````markdown
---
title: Comparison of CSS in JS Writing Methods
order: 2
group: Basic Knowledge
---

# Comparison of CSS in JS Writing Methods

Due to the variety of CSS in JS writing methods, we need to provide a best practice that is compatible with V5 Token System, custom themes, low development complexity, and good scalability. This article will discuss the differences between different writing methods from various perspectives and provide the most recommended approach for `antd-style`.

## Comparison Basis: Original V4 CSS Modules

First, let's review the writing method used previously (antd v4), which serves as the basis for comparing with CSS in JS writing methods.

Most applications using antd are generally paired with less and css modules for styling. The styling scheme for page writing is as follows:

```less | pure
// style.less
@import '~antd/es/style/themes/default';

.list {
  border: 1px solid @primary-color;
  border-radius: 2px;
  box-shadow: 0 8px 20px @shadow-color;
}
```
````

```tsx | pure
// index.tsx
import styles from './style.less';

const App = ({ list }) => {
  return <List dataSource={list} className={styles.list} />;
};
```

## 1. styled Writing Method

The styled writing method feels like a completely different set of code. Since we have been using it in our business for two years, we have relatively rich experience. Let's talk about some pain points of using styled.

First, developers need to relearn the basic syntax and related usage of styled. If migrating from antd v4 less projects to this writing method, it is basically no different from rewriting.

In practical project development, the most painful part we experienced was mainly in the override of component styles. For example, if you need to override the style of antd's Button, you need to write it like this:

```tsx | pure
import { Button } from 'antd';
import { styled } from 'styled-components';

// Rename after importing antd's Button
const ButtonBox = styled(Button)`
  display: flex;
  align-items: center;
  height: 80px;
`;

export default () => {
  // Then use
  return <ButtonBox>Button</ButtonBox>;
};
```

This override method will greatly destroy the semantic of the code for a well-designed component library. Once this method is used, it will be difficult for everyone to distinguish which Button component in the code is the antd Button. The development complexity of taking over different projects will be greatly increased.

In addition, components like Modal and Drawer have multiple class names, which cannot be covered by styled due to the limitations of its writing method. Because the components wrapped by styled will only insert styles into the `className` by default, and for components like Drawer that have a `rootClassName`, it will be very difficult to apply styles to the rootClassName.

Finally, in practice, we occasionally encounter styled-wrapped antd components, and the type definitions cannot be prompted normally, which also reduces development efficiency.

After discussing the disadvantages of styled, let's talk about its advantages.

Since the styled writing method can ensure that each style can form a standard React component, and the combination of styles is relatively convenient, it is very suitable for building a business-styled component library from scratch, or creating some styles with a unified style.

By declaring a series of standard style components through styled, it can greatly reduce repetitive style code and help developers form a clear understanding of style semantics. See the case: [Typography Styled Components](/case/styled)

If there is already an existing design system, styled is not suitable, especially since antd v5 itself already has a strong foundation for dynamic theming capabilities.

## 2. css props Writing Method

This method seems to be recommended by emotion, and the core maintainer of emotion also uses this method extensively in their own business (see: [Why We're Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b)). This writing method has two major problems: 1) coupling of style code, 2) performance deficiencies.

The css props writing method directly couples style code with logic code, which reduces the maintainability of style code and makes it difficult to distinguish between style code and logic code in the code (as shown below).

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
        ...
      </div>
    </div>
  );
};
```

This is a disaster for the maintainability of the code. But if the style and logic code are separated, it is clear and easy to understand (as shown below):

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

The former maintainer of emotion extensively uses this writing method in their own business, but they also mentioned the problem of this writing method in [their blog](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b): performance deficiencies.

Due to the rendering mechanism of React, when passing the style object directly to the `css` attribute, since the object is treated as a new object for each rendering, it will cause re-rendering in React, resulting in unnecessary performance overhead. The recommended approach is to move the objects in the css props outside the component and make them static. But at the same time, this will lose the dynamic capability of css-in-js.

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

In terms of migration cost, this writing method is slightly better than styled, at least it does not require additional definition of components, but it still requires modifying the DOM code in the components, and requires importing the `jsx` object from `@emotion/react`, which still increases the migration cost.

## 3. css Combined with className Writing Method

The css combined with className writing method is very simple in terms of perception and is also the easiest to migrate among these methods. However, the direct combination of css with className still has some issues:

The pure `css` method for creating static styles cannot be used with antd's tokens, so it cannot enjoy the dynamic capability of css-in-js.

To use dynamic capabilities, you must use the hooks approach, as shown below.

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

In this writing method, on the one hand, each function needs to manually use `theme.useToken` to obtain tokens, which is very troublesome when the scale is large. On the other hand, the object returned by hooks will be recreated every time, so it will definitely cause unnecessary re-rendering. If each return is wrapped with useMemo, the code volume will be even larger. Finally, if custom themes, dynamic themes, etc., are added, this writing method will become very complex and verbose, containing a lot of unnecessary code.

## Summary of Comparison of Various Writing Methods

Combining the various methods mentioned above, antd-style hopes to achieve the best in all aspects and become the best practice for application style development based on antd.

|                 | Learning Cost | Dynamic Capability | Custom Theme Difficulty | Style Development Complexity | Component Override Complexity | Performance         | Migration Cost |
| --------------- | ------------- | ------------------ | ----------------------- | ---------------------------- | ----------------------------- | ------------------- | -------------- |
| `CSS Modules`   | ✅ Low        | ❌ None            | ❌ Difficult            | ✅ Low                       | ✅ Low                        | ✅ Optimal          | ✅ -           |
| `styled`        | ⭕️️ High     | ✅ High            | ⚠️ Moderate             | ✅ Low                       | ⭕️️ High                     | ✅ Excellent        | ⭕️️ High      |
| `css` props     | ⚠️ Moderate   | ✅ High            | ⚠️ Moderate             | ⚠️ High                      | ✅ Low                        | ⭕️️ Poor           | ⚠️ Moderate    |
| css + className | ✅ Low        | ✅ High            | ⚠️ Moderate             | ⚠️ High                      | ✅ Low                        | ⭕️️ Medium to Poor | ✅ Low         |
| antd-style      | ✅ Low        | ✅ High            | ✅ Low                  | ✅ Low                       | ✅ Low                        | ✅ Excellent        | ✅ Low         |
