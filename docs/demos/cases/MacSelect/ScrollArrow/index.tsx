import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { FC, MutableRefObject, useLayoutEffect, useRef, useState } from 'react';

import { Center } from 'react-layout-kit';
import { useStyles } from './style';

// Padding for .scrollTop for when to show the scroll arrow
const SCROLL_ARROW_PADDING = 10;

const shouldShowArrow = (
  scrollRef: MutableRefObject<HTMLDivElement | null>,
  dir: 'down' | 'up',
) => {
  if (scrollRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (dir === 'up') {
      return scrollTop >= SCROLL_ARROW_PADDING;
    }

    if (dir === 'down') {
      return scrollTop <= scrollHeight - clientHeight - SCROLL_ARROW_PADDING;
    }
  }

  return false;
};

interface ScrollArrowProps {
  isPositioned: boolean;
  dir: 'up' | 'down';
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  scrollTop: number;
  innerOffset: number;
  onScroll: (amount: number) => void;
  onHide: () => void;
  prefixCls?: string;
}

export const ScrollArrow: FC<ScrollArrowProps> = ({
  isPositioned,
  dir,
  scrollRef,
  scrollTop,
  onScroll,
  innerOffset,
  onHide,
  prefixCls,
}) => {
  const cls = `${prefixCls}-scroll-arrow`;
  const { styles } = useStyles(cls);

  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const statusRef = useRef<'idle' | 'active'>('idle');
  const frameRef = useRef(-1);

  // Updates the visibility state of the arrow when necessary.
  useLayoutEffect(() => {
    if (isPositioned && statusRef.current !== 'active') {
      setShow(shouldShowArrow(scrollRef, dir));
    }
  }, [isPositioned, innerOffset, scrollTop, scrollRef, dir]);

  // While pressing the scroll arrows on touch devices,
  // prevent selection once they disappear (lift finger)
  useLayoutEffect(() => {
    if (!show && statusRef.current === 'active') {
      onHide();
    }
    // Assuming `onHide` does not change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, scrollTop]);

  const handlePointerEnter = () => {
    statusRef.current = 'active';
    let prevNow = Date.now();

    function frame() {
      if (scrollRef.current) {
        const currentNow = Date.now();
        const msElapsed = currentNow - prevNow;
        prevNow = currentNow;

        const pixelsToScroll = msElapsed / 2;

        const remainingPixels =
          dir === 'up'
            ? scrollRef.current.scrollTop
            : scrollRef.current.scrollHeight -
              scrollRef.current.clientHeight -
              scrollRef.current.scrollTop;

        const scrollRemaining =
          dir === 'up'
            ? scrollRef.current.scrollTop - pixelsToScroll > 0
            : scrollRef.current.scrollTop + pixelsToScroll <
              scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

        onScroll(
          dir === 'up'
            ? Math.min(pixelsToScroll, remainingPixels)
            : Math.max(-pixelsToScroll, -remainingPixels),
        );

        if (scrollRemaining) {
          frameRef.current = requestAnimationFrame(frame);
        } else {
          setShow(shouldShowArrow(scrollRef, dir));
        }
      }
    }

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(frame);
  };

  const handlePointerLeave = () => {
    statusRef.current = 'idle';
    cancelAnimationFrame(frameRef.current);
  };

  return (
    <Center
      className={styles.container}
      data-dir={dir}
      ref={ref}
      aria-hidden
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        visibility: show ? 'visible' : 'hidden',
      }}
    >
      {dir === 'up' ? <CaretUpOutlined /> : <CaretDownOutlined />}
    </Center>
  );
};
