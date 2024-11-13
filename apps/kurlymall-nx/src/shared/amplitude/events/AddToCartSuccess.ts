import { AmplitudeEvent } from '../AmplitudeEvent';

interface Payload {
  // 선물하기 상품 여부 (true | false)
  isGiftPurchase: boolean;

  // "패키지 번호 (*optional : 패키지 번호 정보가 없을 경우 Null)"
  packageId: number;

  // "패키지 이름 (*optional : 패키지 이름 정보가 없을 경우 Null)"
  packageName: string;

  // "상품 종류 개수 / (e.g. A 상품*2개 + B 상품*1개 >>> 상품 종류는 A,B 두개이므로 products_count = 2)"
  skuCount: number;

  // 상품 합계 금액(상품 정상가 기준)
  totalOriginPrice: number;

  // 상품 합계 금액(상품 현재가 기준)
  totalPrice: number;
}

export class AddToCartSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_success', payload);
  }

  getPayload() {
    return {
      is_gift_purchase: this.payload.isGiftPurchase,
      package_id: this.payload.packageId,
      package_name: this.payload.packageName,
      sku_count: this.payload.skuCount,
      // 선물 주문 목록에서는 상품의 가격을 알 수 없어서 제외.
      // total_origin_price: this.payload.totalOriginPrice,
      // total_price: this.payload.totalPrice,
    };
  }
}
