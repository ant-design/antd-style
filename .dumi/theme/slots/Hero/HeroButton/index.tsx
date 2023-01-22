import { Button } from 'antd';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { useStyles } from './style';

const MButton = motion(Button);

interface HeroButtonProps {
  children: ReactNode;
}
const HeroButton: FC<HeroButtonProps> = ({ children }) => {
  const { styles } = useStyles();
  return (
    <MButton size={'large'} shape={'round'} type={'primary'} className={styles.button}>
      {children}
    </MButton>
  );
};

export default HeroButton;
