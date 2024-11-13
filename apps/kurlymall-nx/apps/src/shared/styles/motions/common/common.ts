import { Variants } from 'framer-motion';

import { css, keyframes } from '@emotion/react';

import COLOR from '../../../constant/colorset';

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
  staggerChildren: 0.1,
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

const fadeScaleDownInitialAndAnimate = {
  initial: {
    scale: 1.1,
    ...fadeOut,
  },
  animate: {
    scale: 1,
    ...fadeIn,
  },
};

const fadeScaleDownExit = {
  exit: {
    scale: 0.9,
    ...fadeOut,
  },
};

const fadeScaleUpInitialAndAnimate = {
  initial: {
    scale: 0.9,
    ...fadeOut,
  },
  animate: {
    scale: 1,
    ...fadeIn,
  },
};

const fadeScaleUpExit = {
  exit: {
    scale: 1.1,
    ...fadeOut,
  },
};

const fadeLeftExit = {
  exit: {
    x: -defaultFadeOut.x,
    ...fadeOut,
  },
};

const leftExit = {
  exit: {
    x: -defaultFadeOut.x,
  },
};

const rightInitialAndAnimate = {
  initial: {
    x: defaultFadeIn.x,
    color: COLOR.kurlyPurple,
  },
  animate: {
    x: 0,
    color: COLOR.kurlyWhite,
  },
};

export const fadeVariant: Variants = {
  initial: fadeOut,
  animate: fadeIn,
  exit: fadeOut,
};

export const fadeScaleDownVariant: Variants = {
  ...fadeScaleDownInitialAndAnimate,
  ...fadeScaleDownExit,
};

export const fadeScaleDownToLeftVariant: Variants = {
  ...fadeScaleDownInitialAndAnimate,
  ...fadeLeftExit,
};

export const fadeScaleUpVariant: Variants = {
  ...fadeScaleUpInitialAndAnimate,
  ...fadeScaleUpExit,
};

export const fadeScaleUpToLeftVariant: Variants = {
  ...fadeScaleUpInitialAndAnimate,
  ...fadeLeftExit,
};

export const rightToLeftVariant: Variants = {
  ...rightInitialAndAnimate,
  ...leftExit,
};

export const rightTofadeScaleVariant: Variants = {
  ...rightInitialAndAnimate,
  ...fadeScaleDownExit,
};

//animation
export const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// arrow Icon 공통 트랜지션
export const ArrowTransition = 'transform 150ms ease-out';

export const slideToggleVariant: Variants = {
  hide: {
    opacity: 0,
    height: 0,
    transition: {
      when: 'afterChildren',
      duration: 0.3,
    },
  },
  view: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
};

export const fadeToggleVariant: Variants = {
  hide: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 0.2,
    },
  },
  view: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

// 눈내라는 효과 애니메이션
export const fallSnow = keyframes`
  0% {
    transform: translate3d(var(--left-ini), 0, 0);
  }
  100% {
    transform: translate3d(var(--left-end), 110vh, 0);
  }
`;

export const slideArrowIconStyle = (isSlideToggle: boolean) => css`
  transition: transform 0.3s ease-out;
  transform: rotate(${isSlideToggle ? '-180deg' : 0});
`;
