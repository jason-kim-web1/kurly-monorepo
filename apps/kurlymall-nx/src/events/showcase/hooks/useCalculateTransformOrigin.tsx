import { useEffect, useRef, useState } from 'react';

const MAX_WINDOW_WIDTH_PERCENTAGE = 100;
const DEFAULT_TARGET_ELEMENT_X_RATIO = 0.484;
const DEFAULT_TARGET_ELEMENT_Y_RATIO = 0.2;

const calculateTransformOrigin = (elementWidth: number, elementHeight: number, targetX: number, targetY: number) => {
  const originX = (targetX / elementWidth) * MAX_WINDOW_WIDTH_PERCENTAGE;
  const originY = (targetY / elementHeight) * MAX_WINDOW_WIDTH_PERCENTAGE;
  return `${originX}% ${originY}%`;
};

interface Props {
  targetElementXRatio?: number;
  targetElementYRatio?: number;
}

const useCalculateTransformOrigin = ({
  targetElementXRatio = DEFAULT_TARGET_ELEMENT_X_RATIO,
  targetElementYRatio = DEFAULT_TARGET_ELEMENT_Y_RATIO,
}: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [transformOrigin, setTransformOrigin] = useState('');

  useEffect(() => {
    if (elementRef && elementRef.current) {
      const elementWidth = elementRef.current.clientWidth;
      const elementHeight = elementRef.current.clientHeight;
      const targetX = elementWidth * targetElementXRatio;
      const targetY = elementHeight * targetElementYRatio;
      setTransformOrigin(calculateTransformOrigin(elementWidth, elementHeight, targetX, targetY));
    }
  }, [targetElementXRatio, targetElementYRatio]);

  return { elementRef, transformOrigin };
};

export { useCalculateTransformOrigin };
