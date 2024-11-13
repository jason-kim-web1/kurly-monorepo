import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useAnimation, useScroll } from 'framer-motion';

interface Props {
  targetRef: MutableRefObject<HTMLDivElement | null>;
  triggerScrollYProgress: number;
}

const SCALE_ANIMATION_DURATION = 2.5;
const OPACITY_ANIMATION_DURATION = 1.5;

const useBackgroundImageTransitionMotion = ({ targetRef, triggerScrollYProgress }: Props) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'center center', 'end end'],
  });

  const [trigger, setTrigger] = useState(false);

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();

  const controlsArray = [controls1, controls2, controls3, controls4];

  const initAnimations = useCallback(() => {
    controls1.start({
      scale: 1,
      opacity: 1,
      transition: { duration: 0 },
    });
    controls2.start({
      scale: 1,
      opacity: 0,
      transition: { duration: 0 },
    });
    controls3.start({
      scale: 1,
      opacity: 0,
      transition: { duration: 0 },
    });
    controls4.start({
      scale: 1,
      opacity: 0,
      transition: { duration: 0 },
    });
  }, [controls1, controls2, controls3, controls4]);

  const loopingAnimations = useCallback(async () => {
    while (true) {
      await controls1.start({
        scale: 1.1,
        transition: { duration: SCALE_ANIMATION_DURATION },
      });

      await Promise.all([
        controls1.start({
          opacity: 0,
          transition: { duration: OPACITY_ANIMATION_DURATION },
        }),
        controls2.start({
          opacity: 1,
          transition: { duration: OPACITY_ANIMATION_DURATION },
        }),
      ]);

      await Promise.all([
        controls1.start({
          scale: 1,
          transition: { duration: 0 },
        }),
        controls2.start({
          scale: 1.1,
          transition: { duration: SCALE_ANIMATION_DURATION },
        }),
      ]);

      await Promise.all([
        controls2.start({
          opacity: 0,
          transition: { duration: OPACITY_ANIMATION_DURATION },
        }),
        controls3.start({
          opacity: 1,
          transition: { duration: OPACITY_ANIMATION_DURATION },
        }),
      ]);

      await Promise.all([
        controls2.start({
          scale: 1,
          transition: { duration: 0 },
        }),
        controls3.start({
          scale: 1.1,
          transition: { duration: SCALE_ANIMATION_DURATION },
        }),
      ]);

      await Promise.all([
        controls3.start({
          opacity: 0,
          transition: { duration: OPACITY_ANIMATION_DURATION },
        }),
        controls4.start({
          opacity: 1,
          transition: { duration: OPACITY_ANIMATION_DURATION },
        }),
      ]);

      await Promise.all([
        controls3.start({
          scale: 1,
          transition: { duration: 0 },
        }),
        controls4.start({
          scale: 1.1,
          transition: { duration: SCALE_ANIMATION_DURATION },
        }),
      ]);

      await Promise.all([
        controls4.start({
          opacity: 0,
          transition: { duration: OPACITY_ANIMATION_DURATION },
        }),
        controls1.start({
          opacity: 1,
          transition: { duration: OPACITY_ANIMATION_DURATION },
        }),
      ]);

      await controls4.start({
        scale: 1,
        transition: { duration: 0 },
      });
    }
  }, [controls1, controls2, controls3, controls4]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollYProgress.get() >= triggerScrollYProgress && !trigger) {
        setTrigger(true);
        void loopingAnimations();
        return;
      }

      if (scrollYProgress.get() < triggerScrollYProgress && trigger) {
        setTrigger(false);
        initAnimations();
      }
    };

    const unsubscribe = scrollYProgress.onChange(handleScroll);

    return () => unsubscribe();
  }, [initAnimations, loopingAnimations, scrollYProgress, trigger, triggerScrollYProgress]);

  return {
    controlsArray,
  };
};

export { useBackgroundImageTransitionMotion };
