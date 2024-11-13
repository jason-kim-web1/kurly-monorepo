/**
 * 장바구니담기 & 재입고 알림 레이어 open하면 해당 이벤트가 발생
 * 과거 app에서 장바구니 담기 레이어가 페이지 였기 때문에 amplitude에서 page 단위로 해당 screen_name이 변경됩니다
 */
import type { DeliveryInfoName } from '../../../product/types';
import { ProductViewSelection } from '../events/product/ViewProductSelection';
import { amplitudeService, ScreenName } from '../index';

interface Props {
  productDetailState: {
    no: number;
    name: string;
    isGroupProduct: boolean;
    isGiftable?: boolean;
    deliveryTypeNames?: DeliveryInfoName[];
    sellerName?: string;
  };
  defaultContentId?: number;
  queryId?: string | null;
  isReferrerReviewDetail?: boolean;
}

export default function sendAmplitudeProductViewSelection({
  productDetailState: { no, name, isGiftable = false, isGroupProduct, deliveryTypeNames, sellerName },
  defaultContentId,
  queryId,
  isReferrerReviewDetail,
}: Props) {
  const nowScreenName = amplitudeService?.bucket?.screenName;

  amplitudeService.setScreenName(ScreenName.PRODUCT_SELECTION);
  amplitudeService.logEvent(
    new ProductViewSelection({
      productDetailState: {
        no,
        name,
        isGiftable,
        isGroupProduct,
        deliveryTypeNames,
        sellerName,
      },
      defaultContentId,
      queryId,
      isReferrerReviewDetail,
      referrerEventName: amplitudeService.bucket?.referrerEventName,
    }),
  );

  if (nowScreenName) {
    amplitudeService.setScreenName(nowScreenName);
  }
}
