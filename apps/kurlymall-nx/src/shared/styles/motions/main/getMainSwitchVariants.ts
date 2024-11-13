import { Variants } from 'framer-motion';

import { ChangedMainSite } from '../../../../main/interfaces/MainSection.interface';

import { SeasonalEventConfigTheme } from '../../../hooks/useSeasonalThemeWithEventConfig';

export const getMainSwitchVariants = (
  changedSite: ChangedMainSite,
  isSmallWidth: boolean,
  theme: SeasonalEventConfigTheme,
) => {
  const defaultSetting = {
    x: isSmallWidth ? 45 : 65,
    transition: {
      duration: 0.6,
      ease: [0.6, 0, 0.01, 0.99],
    },
  };
  const { x, transition } = defaultSetting;

  const marketSwitchTheme = theme.MARKET.switch;
  const beautySwitchTheme = theme.BEAUTY.switch;

  const offMarketLabel = {
    color: beautySwitchTheme.inactiveFontColor,
    fontWeight: 400,
    transition,
  };

  const onMarketLabel = {
    color: marketSwitchTheme.fontColor,
    fontWeight: 600,
    transition,
  };

  const offBeautyLabel = {
    color: marketSwitchTheme.inactiveFontColor,
    fontWeight: 400,
    transition,
  };

  const onBeautyLabel = {
    color: beautySwitchTheme.fontColor,
    fontWeight: 600,
    transition,
  };

  const offToOnMarketLabelVariant: Variants = {
    initial: offMarketLabel,
    animate: onMarketLabel,
  };

  const onToOffMarketLabelVariant: Variants = {
    initial: onMarketLabel,
    animate: offMarketLabel,
  };

  const offToOnBeautyLabelVariant: Variants = {
    initial: offBeautyLabel,
    animate: onBeautyLabel,
  };

  const onToOffBeautyLabelVariant: Variants = {
    initial: onBeautyLabel,
    animate: offBeautyLabel,
  };

  const beautyToMarketSliderVariant: Variants = {
    initial: {
      x,
      backgroundColor: beautySwitchTheme.backgroundColor,
    },
    animate: {
      x: 0,
      backgroundColor: marketSwitchTheme.backgroundColor,
      transition,
    },
  };

  const marketToBeautySliderVariant: Variants = {
    initial: {
      x: -x,
      backgroundColor: marketSwitchTheme.backgroundColor,
    },
    animate: {
      x: 0,
      backgroundColor: beautySwitchTheme.backgroundColor,
      transition,
    },
  };

  const marketToBeautyBackgroundColorVariant: Variants = {
    initial: {
      backgroundColor: marketSwitchTheme.inactiveBackgroundColor,
    },
    animate: {
      backgroundColor: beautySwitchTheme.inactiveBackgroundColor,
      transition,
    },
  };

  const beautyToMarketBackgroundColorVariant: Variants = {
    initial: {
      backgroundColor: beautySwitchTheme.inactiveBackgroundColor,
    },
    animate: {
      backgroundColor: marketSwitchTheme.inactiveBackgroundColor,
      transition,
    },
  };

  const mainSwitchVariants = {
    MARKET: {
      marketLabelVariant: offToOnMarketLabelVariant,
      beautyLabelVariant: onToOffBeautyLabelVariant,
      sliderVariant: beautyToMarketSliderVariant,
      backgroundColorVariant: beautyToMarketBackgroundColorVariant,
    },
    BEAUTY: {
      marketLabelVariant: onToOffMarketLabelVariant,
      beautyLabelVariant: offToOnBeautyLabelVariant,
      sliderVariant: marketToBeautySliderVariant,
      backgroundColorVariant: marketToBeautyBackgroundColorVariant,
    },
    NOTCHANGED: {
      marketLabelVariant: undefined,
      beautyLabelVariant: undefined,
      sliderVariant: undefined,
      backgroundColorVariant: undefined,
    },
  };

  return mainSwitchVariants[changedSite];
};
