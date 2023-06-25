import { createStyles } from 'antd-style';

import { NUM_CARDS } from '../../const';

const sharedItemStyles = {
  width: '5px',
  height: '5px',
  marginLeft: '5px',
};

const useStaticStyles = createStyles({
  container: {
    border: '1px dashed #ccc',
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
    background: 'red',
  },
  itemTwo: {
    ...sharedItemStyles,
    background: 'orange',
  },
  itemThree: {
    ...sharedItemStyles,
    background: 'yellow',
  },
  itemFour: {
    ...sharedItemStyles,
    background: 'green',
  },
  itemFive: {
    ...sharedItemStyles,
    background: 'blue',
  },
  itemSix: {
    ...sharedItemStyles,
    background: 'violet',
  },
  itemSeven: {
    ...sharedItemStyles,
    background: 'pink',
  },
});

const AntdStyleStatic = () => {
  const { styles } = useStaticStyles();
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
export default AntdStyleStatic;
