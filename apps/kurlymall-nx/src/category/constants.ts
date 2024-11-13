import { MainSite } from '../main/interfaces/MainSection.interface';

export const CATEGORY_SITE_LOCALE: Record<MainSite, string> = {
  MARKET: '마켓컬리',
  BEAUTY: '뷰티컬리',
};

export const CATEGORY_SITES: MainSite[] = ['MARKET', 'BEAUTY'];

export const motionTabOptions = CATEGORY_SITES.map((site, index) => ({
  id: index,
  label: CATEGORY_SITE_LOCALE[site],
}));
