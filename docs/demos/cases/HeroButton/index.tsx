import { Button } from 'antd';
import { motion, MotionConfig, useMotionValue } from 'framer-motion';
import { FC, ReactNode, Suspense, useState } from 'react';
import useMeasure from 'react-use-measure';

import { transition } from './settings';
import { Shapes } from './Shape';
import { useStyles } from './style';

const MButton = motion(Button);

interface HeroButtonProps {
  children: ReactNode;
}
const HeroButton: FC<HeroButtonProps> = ({ children }) => {
  const [ref, bounds] = useMeasure({ scroll: false });
  const { styles } = useStyles();
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={styles.container}>
      <MotionConfig transition={transition}>
        <MButton
          ref={ref}
          size={'large'}
          shape={'round'}
          initial={false}
          animate={isHover ? 'hover' : 'rest'}
          whileTap="press"
          type={'primary'}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.3 },
            press: { scale: 1.2 },
          }}
          onHoverStart={() => {
            resetMousePosition();
            setIsHover(true);
          }}
          onHoverEnd={() => {
            resetMousePosition();
            setIsHover(false);
          }}
          onTapStart={() => setIsPress(true)}
          onTap={() => setIsPress(false)}
          onTapCancel={() => setIsPress(false)}
          onPointerMove={(e) => {
            mouseX.set(e.clientX - bounds.x - bounds.width / 2);
            mouseY.set(e.clientY - bounds.y - bounds.height / 2);
          }}
          className={styles.button}
          style={{ transition: 'none', zIndex: 20 }}
        >
          {children}
          <motion.div
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
          >
            <div className={styles.pink} />
            <div className={styles.blue} />
            <div className={styles.canvas}>
              <Suspense fallback={null}>
                <Shapes isHover={isHover} isPress={isPress} mouseX={mouseX} mouseY={mouseY} />
              </Suspense>
            </div>
          </motion.div>
        </MButton>
      </MotionConfig>
    </div>
  );
};

export default HeroButton;
