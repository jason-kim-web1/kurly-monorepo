import { MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { useMotionValue, useScroll, useTransform } from 'framer-motion';

const variants = {
  input: { opacity: 0, y: 30 },
  output: { opacity: 1, y: 0 },
};

interface Props {
  targetRef: MutableRefObject<HTMLDivElement | null>;
  triggerScrollYProgress: number;
}

const useBrandMaskScaleMotion = ({ targetRef, triggerScrollYProgress }: Props) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'center center', 'end end'],
  });

  const [trigger, setTrigger] = useState(false);
  const teaserTextPosition = useMotionValue('fixed');

  scrollYProgress.onChange((latest) => {
    if (latest > triggerScrollYProgress) {
      teaserTextPosition.set('absolute');
    } else {
      teaserTextPosition.set('fixed');
    }
  });

  const yInput = [0, 40];
  const scaleOutput = [1, 3000];

  const scale = useTransform(scrollYProgress, yInput, scaleOutput, { clamp: false });
  const maskOpacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0]);
  const teaserTextOpacity = useTransform(scrollYProgress, [0.001, 0.01], [1, 0]);

  const animate = useMemo(() => (trigger ? 'output' : 'input'), [trigger]);

  const getTransition = useCallback(
    ({ duration, delay }: { duration: number; delay: number }) => ({
      duration: trigger ? duration : 0,
      delay: trigger ? delay : 0,
    }),
    [trigger],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (scrollYProgress.get() >= triggerScrollYProgress && !trigger) {
        setTrigger(true);
        return;
      }

      if (scrollYProgress.get() < triggerScrollYProgress && trigger) {
        setTrigger(false);
      }
    };

    const unsubscribe = scrollYProgress.onChange(handleScroll);

    return () => unsubscribe();
  }, [scrollYProgress, trigger, triggerScrollYProgress]);

  return {
    scale,
    maskOpacity,
    teaserTextOpacity,
    teaserTextPosition,
    variants,
    animate,
    getTransition,
  };
};

export { useBrandMaskScaleMotion };
