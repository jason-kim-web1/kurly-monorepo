import { Variants } from 'framer-motion';

const defaultSetting = {
  defaultFadeIn: {
    duration: 0.6,
    x: 70,
  },
  defaultFadeOut: {
    duration: 0.6,
    x: 70,
  },
  ease: [0.6, -0.1, 0.01, 0.99],
  staggerChildren: 0.015,
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

export const mainMenuVariant: Variants = {
  initial: fadeOut,
  animate: fadeIn,
  exit: fadeOut,
};

export const subMenuVariant: Variants = {
  initial: {
    height: 0,
  },
  animate: {
    height: 'auto',
    transition: { easings: false },
  },
};
