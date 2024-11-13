import { AmplitudeEvent } from '../AmplitudeEvent';

interface Payload {
  // 선물하기 상품 여부 (true | false)
  isGiftPurchase: boolean;

  // "패키지 번호 / (*optional : 패키지 번호 정보가 없을 경우 Null)"
  packageId: number;

  // "상품 번호 / *일반 (단일) 상품의 경우 package_id와 동일하게 적용"
  productId: number;

  // "패키지 이름 / *일반 (단일) 상품의 경우 package_name과 동일하게 적용"
  packageName: string;

  // "상품 이름 (*optional : 패키지 이름 정보가 없을 경우 Null)"
  productName: string;

  // "정상가 / (*optional : 패키지 정상가 정보 없는 경우 Null)"
  originPrice: number;

  // "현재가 / (*optional : 패키지 할인가 정보 없는 경우 Null)"
  price: number;

  // 수량
  quantity: number;

  // 상품 합계 금액(상품 정상가 기준)
  totalOriginPrice: number;

  // 상품 합계 금액(상품 현재가 기준)
  totalPrice: number;
}

export class AddToCartProduct extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_product', payload);
  }

  getPayload() {
    return {
      is_gift_purchase: this.payload.isGiftPurchase,
      package_id: this.payload.packageId,
      product_id: this.payload.productId,
      package_name: this.payload.packageName,
      product_name: this.payload.productName,
      quantity: this.payload.quantity,
      // 선물 주문 목록에서는 상품의 가격을 알 수 없어서 제외.
      // origin_price: this.payload.originPrice,
      // price: this.payload.price,
      // total_origin_price: this.payload.totalOriginPrice,
      // total_price: this.payload.totalPrice,
    };
  }
}
