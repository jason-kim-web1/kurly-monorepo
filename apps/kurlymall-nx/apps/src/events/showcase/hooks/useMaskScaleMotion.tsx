import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const useMaskScaleMotion = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const yInput = [0, 7];
  const scaleOutput = [1, 400];
  const scale = useTransform(scrollYProgress, yInput, scaleOutput, { clamp: false });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return { targetRef, scale, opacity };
};

export { useMaskScaleMotion };
