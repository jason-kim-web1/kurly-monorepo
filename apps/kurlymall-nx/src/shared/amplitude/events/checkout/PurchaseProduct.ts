import type { DeliveryPolicies } from '../../../../order/cart/constants/CartDeliveryType';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  // 콘텐츠의 번호 (CMS 기준의 콘텐츠 ID)
  contentId: number | null;
  // 콘텐츠의 이름 (CMS 기준의 콘텐츠 이름)
  contentName: string | null;
  // 딜의 번호 (CMS 기준의 딜 ID)
  dealId: number | null;
  // 딜의 이름 (CMS 기준의 딜 이름)
  dealName: string | null;
  // 마스터의 번호 (CMS 기준의 마스터 ID)
  masterId: string;
  // 장바구니/주문서 화면의 배송 유형 정보
  deliveryType: DeliveryPolicies;
  // 권장소비자가
  retailPrice: number | null;
  // 컬리판매가
  basePrice: number;
  // 현재가
  price: number;
  // 권장소비자가 기준의 상품 합계 금액 = retail_price * quantity 계산값
  totalRetailPrice: number | null;
  // 컬리판매가 기준의 상품 합계 금액 = base_price * quantity 계산값
  totalBasePrice: number;
  // 현재가 기준의 상품 합계 금액 = price * quantity 계산값
  totalPrice: number;
  // 대표 주문번호
  transactionId: string;
  // 선물하기 상품 여부
  isGiftPurchase: boolean;
  // 첫 구매 여부
  isFirstPurchase: boolean;
  // 수량
  quantity: number;
  referrerEvent?: string | null;
}

export class PurchaseProduct extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('purchase_product', payload);
  }

  getPayload() {
    return {
      transaction_id: this.payload.transactionId,
      is_gift_purchase: this.payload.isGiftPurchase,
      is_first_purchase: this.payload.isFirstPurchase,
      delivery_type: this.payload.deliveryType,
      content_id: this.payload.contentId,
      content_name: this.payload.contentName,
      deal_id: this.payload.dealId,
      deal_name: this.payload.dealName,
      master_id: this.payload.masterId,
      retail_price: this.payload.retailPrice,
      base_price: this.payload.basePrice,
      price: this.payload.price,
      quantity: this.payload.quantity,
      total_retail_price: this.payload.totalRetailPrice,
      total_base_price: this.payload.totalBasePrice,
      total_price: this.payload.totalPrice,
      referrer_event: this.payload.referrerEvent,
    };
  }
}
