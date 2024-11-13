import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const useSectionContentMotion = () => {
  const targetRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['0 1', '1 1'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.4, 1], [0.3, 1]);
  const transformX = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const transformY = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const rotate = useTransform(scrollY, [0, 800], [0, 360], { clamp: false });
  const transformElementY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return { targetRef, scale, rotate, opacity, transformX, transformY, transformElementY };
};

export { useSectionContentMotion };
