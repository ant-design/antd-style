import { createStyles } from 'antd-style';

import { FC } from 'react';
import { NUM_CARDS } from '../../const';

const sharedItemStyles = {
  width: '5px',
  height: '5px',
  marginLeft: '5px',
};

const useStyles = createStyles(({ token }) => ({
  container: {
    border: `1px dashed ${token.colorBorder}`,
    padding: '4px',
    height: '150px',
    overflow: 'auto',
    width: '120px',
  },
  cardContainer: {
    border: '1px solid #ccc',
    display: 'flex',
    marginBottom: '4px',
    padding: '4px',
    fontSize: '12px',
  },
  itemOne: {
    ...sharedItemStyles,
    background: token.red,
  },
  itemTwo: {
    ...sharedItemStyles,
    background: token.orange,
  },
  itemThree: {
    ...sharedItemStyles,
    background: token.yellow,
  },
  itemFour: {
    ...sharedItemStyles,
    background: token.green,
  },
  itemFive: {
    ...sharedItemStyles,
    background: token.blue,
  },
  itemSix: {
    ...sharedItemStyles,
    background: token.volcano,
  },
  itemSeven: {
    ...sharedItemStyles,
    background: token.pink,
  },
}));

const AntdStyleTokens: FC = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      {new Array(NUM_CARDS).fill(0).map((_, i) => (
        <div className={styles.cardContainer} key={i}>
          Card {i}
          <div className={styles.itemOne} />
          <div className={styles.itemTwo} />
          <div className={styles.itemThree} />
          <div className={styles.itemFour} />
          <div className={styles.itemFive} />
          <div className={styles.itemSix} />
          <div className={styles.itemSeven} />
        </div>
      ))}
    </div>
  );
};

export default AntdStyleTokens;
