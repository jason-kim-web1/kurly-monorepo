import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const useWaveTextMotion = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['0 1', '1.5 1'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [-150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return { targetRef, x, y, opacity, rotate };
};

export { useWaveTextMotion };
