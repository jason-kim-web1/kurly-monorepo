import { isNull } from 'lodash';

import { JOIN_ORDER_TYPE, JoinOrderCompleteResponse } from '../../../interfaces';
import { isNotNull } from '../../../utils/lodash-extends';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  // 주문을 구별할 수 있는 식별자 (e.g.주문번호)
  orderNumber: string;
  // 최종결제금액 (최종 결제 해야 하는 금액 : 배송비가 있는경우 배송비 포함)"
  totalPrice: number;
  // 권장소비자가 기준의 상품 합계 금액
  totalRetailPrice: number | null;
  // 컬리판매가 기준의 상품 합계 금액
  totalBasePrice: number;
  // 선물하기 상품 여부
  isGiftPurchase: boolean;
  // 첫 구매 여부
  isFirstOrder: boolean;
  // 함께구매 정보
  joinOrderMeta: JoinOrderCompleteResponse | null;
  // 장바구니/주문서 화면의 배송 유형 정보
  deliveryType: string | null;
  // 결제수단
  paymentMethod: string;
  // 상품 종류 개수 / (e.g. A 상품*2개 + B 상품*1개 >>> 상품 종류는 A,B 두개이므로 products_count = 2)
  skuCount: number;
  // 배송비
  deliveryCharge: number;
  // 주문의 총 상품 할인 금액
  productDiscountAmount: number;
  // 쿠폰 할인액
  couponDiscountAmount: number;
  // 적립금 할인액
  pointDiscountAmount: number;
  // 쿠폰 번호
  couponId: number | null;
  // 쿠폰 이름
  couponName: string | null;
}

export class PurchaseSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('purchase_success', payload);
  }

  purchaseTogetherType() {
    if (isNull(this.payload.joinOrderMeta)) {
      return null;
    }

    return this.payload.joinOrderMeta.type === JOIN_ORDER_TYPE.CREATED ? '생성' : '참여';
  }

  getPayload() {
    return {
      transaction_id: this.payload.orderNumber,
      is_gift_purchase: this.payload.isGiftPurchase,
      is_first_purchase: this.payload.isFirstOrder,
      payment_method: this.payload.paymentMethod,
      total_retail_price: this.payload.totalRetailPrice,
      total_base_price: this.payload.totalBasePrice,
      total_price: this.payload.totalPrice,
      delivery_type: this.payload.deliveryType,
      sku_count: this.payload.skuCount,
      delivery_charge: this.payload.deliveryCharge,
      product_discount_amount: this.payload.productDiscountAmount,
      coupon_discount_amount: this.payload.couponDiscountAmount,
      point_discount_amount: this.payload.pointDiscountAmount,
      purchase_together: isNotNull(this.payload.joinOrderMeta),
      purchase_together_type: this.purchaseTogetherType(),
      coupon_id: this.payload.couponId,
      coupon_name: this.payload.couponName,
    };
  }
}
