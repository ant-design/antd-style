import { Center } from 'react-layout-kit';
import useControlledState from 'use-merge-value';
import { useStyles } from './style';

const Burger = () => {
  const [opened, setOpened] = useControlledState(false);
  const { styles, cx } = useStyles();

  return (
    <Center
      className={styles.container}
      onClick={() => {
        setOpened(!opened);
      }}
    >
      <div className={cx(styles.icon, opened ? styles.active : '')}></div>
    </Center>
  );
};

export default Burger;
