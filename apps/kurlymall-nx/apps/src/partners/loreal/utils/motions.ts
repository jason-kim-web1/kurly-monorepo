import { Variants } from 'framer-motion';

const defaultSetting = {
  defaultFadeIn: {
    duration: 2,
    x: 100,
  },
  defaultFadeOut: {
    duration: 2,
    x: 100,
  },
  ease: [0.6, -0.1, 0.01, 0.99],
  staggerChildren: 0.05,
};
const { defaultFadeIn, defaultFadeOut, ease, staggerChildren } = defaultSetting;

const fadeOut = {
  opacity: 0,
  transition: { duration: defaultFadeOut.duration, ease },
};

const fadeIn = {
  opacity: 1,
  transition: { duration: defaultFadeIn.duration, ease, staggerChildren },
};

export const brandListVariant: Variants = {
  initial: fadeOut,
  animate: fadeIn,
  exit: fadeOut,
};
