import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const useImageSlideMotion = ({ distanceOffset }: { distanceOffset: number[] }) => {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['0 1', '1 1'],
  });
  const transformY = useTransform(scrollYProgress, [0, 1], distanceOffset);

  return { itemRef, transformY };
};

export { useImageSlideMotion };
