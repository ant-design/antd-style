/**
 * inherit: true
 * defaultShowCode: true
 */
import { createStyles, keyframes } from 'antd-style';
import { Flexbox } from 'react-layout-kit';

const useStyles = createStyles(({ token, css }) => {
  const bounce = keyframes`
    from, 20%, 53%, 80%, to {
      transform: translate3d(0,0,0);
    }

    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }

    70% {
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0,-4px,0);
    }
  `;

  return {
    one: css`
      animation: ${bounce} 1s ease infinite;
    `,

    another: css`
      @keyframes another {
        from,
        20%,
        53%,
        80%,
        to {
          transform: translate3d(0, 0, 0);
        }

        40%,
        43% {
          transform: translate3d(0, -30px, 0);
        }

        70% {
          transform: translate3d(0, -15px, 0);
        }

        90% {
          transform: translate3d(0, -4px, 0);
        }
      }

      animation: another 1s ease infinite;
    `,
  };
});

const App = () => {
  const { styles } = useStyles();

  return (
    <Flexbox horizontal gap={8}>
      <div className={styles.one}>keyframes 写法一</div>
      <div className={styles.another}>keyframes 写法二</div>
    </Flexbox>
  );
};

export default App;
