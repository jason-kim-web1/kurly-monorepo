import { isPC } from '../../../../../util/window/getDevice';
import { amplitudeService, ScreenName } from '../../../../shared/amplitude';
import { PageType } from '../../types';

const screenNameUpdate = (code: ScreenName) => {
  amplitudeService.setScreenName(code);
};

export const productListSetScreenName = (code?: string, pageType?: PageType) => {
  switch (code) {
    case 'market-sales-group':
      screenNameUpdate(ScreenName.BARGAIN);
      return;
    case 'market-best':
    case 'beauty-best':
      screenNameUpdate(ScreenName.POPULAR_PRODUCT);
      return;
    case 'market-newproduct':
    case 'beauty-new':
    case 'beauty-newproduct':
      screenNameUpdate(ScreenName.NEW_PRODUCT);
      return;
    default:
      break;
  }

  if (
    amplitudeService?.bucket?.browseScreenName === 'category' ||
    amplitudeService?.bucket?.browseEventName === 'select_category' ||
    (amplitudeService?.bucket?.eventName === 'select_primary_category' && isPC)
  ) {
    screenNameUpdate(ScreenName.CATEGORY_PRODUCT_LIST);
    return;
  }

  switch (pageType) {
    case 'categories':
    case 'collections':
      screenNameUpdate(ScreenName.PRODUCT_LIST);
      return;
    case 'search':
      screenNameUpdate(ScreenName.SEARCH_PRODUCT_LIST);
      return;
    default:
      break;
  }
};
