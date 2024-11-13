import { AmplitudeEvent } from '../../AmplitudeEvent';
import { productDeliveryInfo } from '../../../../product/detail/shared/utils/productDeliveryInfo';
import { FILTER_GROUP, FILTER_TYPE, SORT_TYPE } from './constants';
import type { ContentType } from '../../../../product/detail/types';
import type { ReviewFilterType, ProductReviewSortType } from '../../../../product/board/review/types';
import type { DeliveryInfoType } from '../../../../product/types';

interface Payload {
  // 선택된 필터 버튼의 그룹 타입
  filterGroup: ReviewFilterType;
  // 선택되어 있는 정렬 타입
  selectionSortType: ProductReviewSortType;
  retailPrice: number | null;
  basePrice: number;
  discountedPrice: number | null;
  contentsProductNo: number;
  name: string;
  contentType: ContentType;
  deliveryTypeInfos: DeliveryInfoType[];
  sellerName: string;
}

/**
 * 후기 목록의 필터/퀵필터 버튼 클릭
 * @extends AmplitudeEvent
 */
export class SelectReviewFilterButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_review_filter_button', payload);
  }

  getPayload() {
    const {
      filterGroup,
      selectionSortType,
      retailPrice,
      basePrice,
      discountedPrice,
      contentsProductNo,
      name,
      contentType,
      deliveryTypeInfos,
      sellerName,
    } = this.payload;

    const { deliveryName } = productDeliveryInfo(deliveryTypeInfos);

    return {
      filter_type: FILTER_TYPE.QUICK,
      filter_group: FILTER_GROUP[filterGroup],
      selection_sort_type: SORT_TYPE[selectionSortType],
      retail_price: retailPrice,
      base_price: basePrice,
      price: discountedPrice,
      content_id: contentsProductNo,
      content_name: name,
      content_type: contentType,
      delivery_type: deliveryName,
      seller: sellerName,
    };
  }
}
