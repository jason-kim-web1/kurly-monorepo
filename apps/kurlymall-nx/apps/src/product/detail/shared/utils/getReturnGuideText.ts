import { addComma } from '../../../../shared/services';
import { DeliveryInfoCode } from '../../../types';
import { ProductReturnInfo } from '../../types';

const NO_DELIVERY_TYPE_LIST = [
  'ONLINE_TICKET',
  'AIRLINE_TICKET',
  'SELF_PICKUP_WINE',
  'GOURMET_DELIVERY',
  'QUICK_DELIVERY',
];

const DAWN_DELIVERY_LIST = ['DAWN'];

const BASE_TEXT = '※ 단순 변심, 주문 착오, 주소 오입력 등 고객의 책임 있는 사유로 인한 교환 및 반품의 경우 고객님께서 ';

const getReturnGuideText = (isThirdPart: boolean, deliveryType: DeliveryInfoCode, returnInfo: ProductReturnInfo) => {
  // 1P 상품 || FBK 상품
  if (!isThirdPart || (isThirdPart && DAWN_DELIVERY_LIST.includes(deliveryType))) {
    return `${BASE_TEXT}왕복배송비 6,000원(배송비를 낸 경우 3,000원)을 부담하셔야 합니다.`;
  }

  // 3P 상품 - 온라인티켓, 항공권, 와인셀프픽업, 퀵배송, 고메 배송
  const isNoDelivery = NO_DELIVERY_TYPE_LIST.includes(deliveryType);
  if (isNoDelivery) {
    return `${BASE_TEXT}왕복배송비를 부담하셔야 하며, 배송비는 상품설명 및 상품이미지에서 확인하실 수 있습니다.`;
  }

  // 3P 상품 - 판매자배송, 설치배송, 해외직배송
  const { roundTripCost, address } = returnInfo;
  const roundTripCostText = roundTripCost ? `(${addComma(roundTripCost)}원)` : '';
  const addressText = address ? ` (반품지 주소: ${address})` : '';
  return `${BASE_TEXT}왕복배송비${roundTripCostText}를 부담하셔야 합니다.${addressText}`;
};

export { getReturnGuideText };
