import { MainSite } from '../../main/interfaces/MainSection.interface';

export const keys = {
  ALL: ['category'],
  MARKET: ['category', 'market'],
  BEAUTY: ['category', 'beauty'],
  IMPRESSION: (site: Lowercase<MainSite>) => ['category', site, 'impression'],
} as const;
