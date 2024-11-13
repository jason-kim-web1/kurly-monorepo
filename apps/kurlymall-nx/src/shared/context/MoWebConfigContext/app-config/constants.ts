import { MainSite } from '../../../../main/interfaces/MainSection.interface';
import { VipLevels } from '../../../../member/shared/constants';

const ALLOWED_TAB_IDS: Record<MainSite, string[]> = {
  MARKET: ['recommendation', 'popular_product', 'new_product', 'bargain', 'event_list', VipLevels.VIP, VipLevels.VVIP],
  BEAUTY: ['recommendation', 'popular_product', 'new_product', 'benefit_list', 'brand_list'],
};

export { ALLOWED_TAB_IDS };
