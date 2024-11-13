import { Variants } from 'framer-motion';

import { mainSiteThemeMap } from '../../../../main/theme';

const defaultSetting = {
  transition: {
    duration: 0.8,
    ease: [0.6, -0.1, 0.01, 0.99],
    delay: 0.1,
  },
};
const { transition } = defaultSetting;

const marketToBeautyBackgroundColorVariant: Variants = {
  initial: {
    backgroundColor: mainSiteThemeMap.MARKET.primaryColor,
  },
  animate: {
    backgroundColor: mainSiteThemeMap.BEAUTY.primaryColor,
    transition,
  },
};

const beautyToMarketBackgroundColorVariant: Variants = {
  initial: {
    backgroundColor: mainSiteThemeMap.BEAUTY.primaryColor,
  },
  animate: {
    backgroundColor: mainSiteThemeMap.MARKET.primaryColor,
    transition,
  },
};

export const mainHeaderVariants = {
  MARKET: {
    backgroundColorVariant: beautyToMarketBackgroundColorVariant,
  },
  BEAUTY: {
    backgroundColorVariant: marketToBeautyBackgroundColorVariant,
  },
  NOTCHANGED: {
    backgroundColorVariant: undefined,
  },
};
