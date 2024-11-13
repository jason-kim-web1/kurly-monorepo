import { MainSite } from './interfaces/MainSection.interface';
import COLOR from '../shared/constant/colorset';

export interface SiteTheme {
  primaryColor: string;
  logoColor: string;
  mainSwitch: {
    switchColor: string;
    switchBackgroundColor: string;
    activeFontColor: string;
    inactiveFontColor: string;
  };
}

const { kurlyPurple, kurlyWhite, btnGray, kurlyGray700 } = COLOR;

export const mainSiteThemeMap: Record<MainSite, SiteTheme> = {
  MARKET: {
    primaryColor: kurlyPurple,
    logoColor: kurlyWhite,
    mainSwitch: {
      switchColor: kurlyWhite,
      switchBackgroundColor: '#6F1A8C',
      activeFontColor: kurlyPurple,
      inactiveFontColor: kurlyWhite,
    },
  },
  BEAUTY: {
    primaryColor: kurlyWhite,
    logoColor: kurlyPurple,
    mainSwitch: {
      switchColor: kurlyPurple,
      switchBackgroundColor: btnGray,
      activeFontColor: kurlyWhite,
      inactiveFontColor: kurlyGray700,
    },
  },
} as const;
