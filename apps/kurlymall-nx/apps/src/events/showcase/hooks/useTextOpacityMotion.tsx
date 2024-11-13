import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const useTextOpacityMotion = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', '1 1'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.33, 1], [0, 0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0, 1], [0.6, 1, 1]);

  return { targetRef, opacity, scale };
};

export { useTextOpacityMotion };
