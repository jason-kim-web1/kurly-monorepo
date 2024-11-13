import { AmplitudeEvent } from '../../AmplitudeEvent';
import { productDeliveryInfo } from '../../../../product/detail/shared/utils/productDeliveryInfo';
import { isNotEmpty } from '../../../utils/lodash-extends';
import { FILTER_GROUP, FILTER_TYPE, SORT_TYPE } from './constants';
import type { ContentType } from '../../../../product/detail/types';
import type { ReviewFilterType, ProductReviewSortType } from '../../../../product/board/review/types';
import type { DeliveryInfoType } from '../../../../product/types';

interface Payload {
  // 선택된 필터 버튼의 그룹 타입
  filterGroup: ReviewFilterType;
  // 필터 적용 전, 후기 목록의 후기 수
  contentCount: number;
  // 필터 내 '회원 등급' 항목 중 클릭한 값, nullable
  filterFacetLovers: string[];
  // 필터 내 '상품 옵션' 항목 중 클릭한 값, nullable
  filterFacetDeal: string[];
  // 필터 적용 시, 후기 목록에 노출되는 후기 수('N개 후기보기'의 N개 값)
  filterReviewCount: number;
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
 * 후기 필터 적용 버튼 클릭시 발생
 * @extends AmplitudeEvent
 */
export class SubmitReviewFilter extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('submit_review_filter', payload);
  }

  getPayload() {
    const {
      filterGroup,
      contentCount,
      filterFacetLovers,
      filterFacetDeal,
      filterReviewCount,
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
      content_count: contentCount,
      filter_facet_member_group: isNotEmpty(filterFacetLovers) ? filterFacetLovers : null,
      filter_facet_deal_product: isNotEmpty(filterFacetDeal) ? filterFacetDeal : null,
      filter_review_count: !!filterReviewCount ? filterReviewCount : null,
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
