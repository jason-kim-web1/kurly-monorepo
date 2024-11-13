import { isEmpty } from 'lodash';

import { amplitudeService, ScreenName } from '../../../../shared/amplitude';
import { SelectProductDetailDescriptionSubtab } from '../../../../shared/amplitude/events/product/SelectProductDetailDescriptionSubtab';
import { SelectProductDetailInfoSubtab } from '../../../../shared/amplitude/events/product/SelectProductDetailInfoSubtab';
import { SelectProductDetailReviewSubtab } from '../../../../shared/amplitude/events/product/SelectProductDetailReviewSubtab';
import { SelectProductDetailInquirySubtab } from '../../../../shared/amplitude/events/product/SelectProductDetailInquirySubtab';
import { ProductDetailMenuType } from '../../types';

export const getFusionQueryId = (queryId: string | null) => {
  const browseTabName = amplitudeService.bucket?.browseTabName;

  if (isEmpty(queryId) || browseTabName !== 'search') {
    return null;
  }

  return queryId;
};

export const productDetailSubtabEvent = (content: ProductDetailMenuType, queryId: string) => {
  const fusionQueryId = getFusionQueryId(queryId);

  switch (content) {
    case 'description':
      amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
      amplitudeService.logEvent(new SelectProductDetailDescriptionSubtab({ fusionQueryId }));
      break;
    case 'detail':
      amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_INFO);
      amplitudeService.logEvent(new SelectProductDetailInfoSubtab({ fusionQueryId }));
      break;
    case 'review':
      amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_REVIEW);
      amplitudeService.logEvent(new SelectProductDetailReviewSubtab({ fusionQueryId }));
      break;
    case 'inquiry':
      amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_INQUIRY);
      amplitudeService.logEvent(new SelectProductDetailInquirySubtab({ fusionQueryId }));
      break;
    default:
      break;
  }
};
