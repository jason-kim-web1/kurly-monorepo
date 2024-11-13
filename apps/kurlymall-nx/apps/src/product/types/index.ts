/* NOTE: 트리거된 이벤트의 타입
 - DETAIL = 상품 상세
 - REVIEW_DETAIL = 리뷰 상세
*/

import { DELIVERY_GUIDE_TYPE } from '../../shared/constant';

export type ReferrerEventType = 'DETAIL' | 'REVIEW_DETAIL';

export type CommonMessageType = 'GUEST_POINT_BENEFIT_GUIDE' | 'GUEST_POINT_BENEFIT_GUIDE_SENTENCE';

export type DeliveryInfoCode = keyof typeof DELIVERY_GUIDE_TYPE;

export type DeliveryInfoName = typeof DELIVERY_GUIDE_TYPE[keyof typeof DELIVERY_GUIDE_TYPE];

export type DeliveryInfoType = {
  type: DeliveryInfoCode;
  description: DeliveryInfoName;
  // 배송 유형 문구는 상품 상세 페이지만 사용되기 때문에 선택적으로 내려옴
  guide?: string;
};

export * from './sticker';
