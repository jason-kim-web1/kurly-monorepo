import { AutoplayOptions } from 'swiper/types/modules/autoplay';

import { MainSite } from './interfaces/MainSection.interface';

export const MAIN_BANNER_SWIPER_AUTOPLAY: AutoplayOptions = {
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  delay: 3000,
};

export const MainPopupNoticeAvailableSites: MainSite[] = ['MARKET'];
