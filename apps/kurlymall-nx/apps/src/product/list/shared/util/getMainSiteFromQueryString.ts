import { MainSite } from '../../../../main/interfaces/MainSection.interface';

export const getMainSiteFromQueryString = (site?: string): MainSite => {
  switch (site) {
    case 'beauty': {
      return 'BEAUTY';
    }
    default:
      return 'MARKET';
  }
};
