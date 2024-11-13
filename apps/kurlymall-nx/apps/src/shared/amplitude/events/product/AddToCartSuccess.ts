import { eq } from 'lodash';

import { AmplitudeEvent } from '../../AmplitudeEvent';
import { ProductDetailState } from '../../../../product/detail/slice';
import type { ShortCutType } from '../../../types';
import { getPackageInfo } from './getPackageInfo';
import { createReferrerEvent } from '../../../../product/utils';

interface Payload {
  productDetailState: ProductDetailState;
  defaultContentId: number;
  totalPrice: number;
  totalBasePrice: number;
  totalRetailPrice: number;
  selectedDealTotalCount: number;
  fusionQueryId: string | null;
  isReferrerReviewDetail?: boolean;
  selectionType?: ShortCutType;
  referrerEventName?: string | null;
  referrerProductNo?: number;
  referrerProductName?: string;
}

// mobile
/**
 * 장바구니 담기 성공 API 성공 후 전송,
 * @extends AmplitudeEvent
 */
export class AddToCartSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_success', payload);
  }

  getPayload() {
    const {
      productDetailState: { no, name, contentType, isGroupProduct, deliveryTypeNames, sellerName, isDirectOrder },
      defaultContentId,
      totalPrice,
      totalBasePrice,
      totalRetailPrice,
      selectedDealTotalCount,
      fusionQueryId,
      isReferrerReviewDetail,
      selectionType,
      referrerEventName,
      referrerProductNo,
      referrerProductName,
    } = this.payload;
    const deliveryTypeName = deliveryTypeNames.join(',');
    const shouldDropReferer = !referrerProductNo || eq(no, referrerProductNo);
    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no,
      name,
    });
    return {
      content_id: no, // 컨텐츠의 번호(CMS 기준의 컨텐츠 ID)
      content_name: name, // 컨텐츠의 이름(CMS 기준의 컨텐츠 이름)
      content_type: contentType, // 컨텐츠의 유형에 대한 정보
      default_content_id: isGroupProduct ? defaultContentId : null, // 대표 컨텐츠의 번호값, optional: 컨텐츠 그룹에서만 발생
      delivery_type: deliveryTypeName, // 배송유형 정보
      total_retail_price: totalRetailPrice || null, // 권장소비자가 기준의 상품 합계 금액 = retail_price * quantity 계산값 (*optional : 권장소비자가 정보 없는 경우 계산에서 제외)
      total_base_price: totalBasePrice, // 컬리판매가 기준의 상품 합계 금액 = base_price * quantity 계산값
      total_price: totalPrice, // 콘텐츠 기준의 판매자 정보
      seller: sellerName, // 콘텐츠 기준의 판매자 정보
      is_direct_purchase: isDirectOrder, // 바로구매 상품 여부
      is_gift_purchase: false, // 현재 웹은 선물하기 기능 서비스 운영 안하므로, default: false
      package_id: packageId, // 상품개편 배포 이전에 등록된 상품(contentsNo - 5000000), 상품개편 이전 상품은 null
      package_name: packageName, // 상품개편 배포 이전에 등록된 상품의 이름, optional: 패키지 이름 정보가 없는 경우 null
      sku_count: selectedDealTotalCount, // 선택된 상품의 총 개수
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
      referrer_event: createReferrerEvent(referrerEventName, selectionType, isReferrerReviewDetail),
      referrer_content_id: shouldDropReferer ? null : referrerProductNo,
      referrer_content_name: shouldDropReferer ? null : referrerProductName,
    };
  }
}
