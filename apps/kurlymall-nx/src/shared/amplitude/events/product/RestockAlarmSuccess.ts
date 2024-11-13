import { AmplitudeEvent } from '../../AmplitudeEvent';
import { PriceService } from '../../../../product/service/priceService';
import type { DealProduct } from '../../../../product/detail/types';
import type { ProductDetailState } from '../../../../product/detail/slice';

interface Payload {
  productDetailState: ProductDetailState;
  deal: DealProduct;
}

/**
 * 재입고 알림 성공 API 성공 후 전송
 * @extends AmplitudeEvent
 */
export class RestockAlarmSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('restock_alarm_success', payload);
  }

  getPayload() {
    const {
      productDetailState: {
        no,
        name,
        contentType,
        isDirectOrder,
        sellerName,
        defaultContentId,
        deliveryTypeNames,
        isGroupProduct,
      },
      deal: {
        no: dealId,
        name: dealName,
        masterProductCode,
        masterProductName,
        isGiftable,
        basePrice,
        retailPrice,
        discountedPrice,
        buyUnit,
      },
    } = this.payload;

    const deliveryTypeName = deliveryTypeNames?.join(',') || null;

    const { representativePrice } = new PriceService({
      retailPrice,
      basePrice,
      discountedPrice,
    });

    return {
      // 바로구매 상품 여부
      is_direct_purchase: isDirectOrder,
      // 선물하기 여부
      is_gift_purchase: isGiftable,
      // 컨텐츠ID
      content_id: no,
      // 컨텐츠명
      content_name: name,
      // 딜ID
      deal_id: dealId,
      // 딜명
      deal_name: dealName,
      // 마스터ID(딜ID, 딜명이 있는 경우)
      master_id: masterProductCode,
      // 배송유형
      delivery_type: deliveryTypeName,
      // 권장소비자가
      retail_price: retailPrice || 0,
      // 권장소비자가 기준의 상품 합계 금액(권장소비자가 x 수량)
      total_retail_price: retailPrice ? retailPrice * buyUnit : 0,
      /**
       * 현재가 기준의 상품 합계 금액(현재가x수량)
       * 현재가 정보 없는 경우 컬리판매가로 대체 적용
       *
       * 단계별 total_price 구분
       * [1]장바구니: 장바구니 담기 가격 총합(add_to_cart_product,add_to_cart_success)
       * [2]주문서: 주문가격 총합(purchase_product_
       * [3]주문완료: 최종 결제 금액.배송비 있는 경우 배송비 포함(purchase_success)
       */
      total_price: representativePrice * buyUnit,
      // 판매자 정보
      seller: sellerName,

      // optional
      // 마스터명(딜ID, 딜명이 있는 경우)
      master_name: masterProductName,
      // 컨텐츠유형
      content_type: contentType,
      // 유입된 컨텐츠ID(컨텐츠그룹에서만 발생)
      default_content_id: isGroupProduct ? defaultContentId : null,
      // 컬리판매가
      base_price: basePrice,
      /**
       * 현재가
       * 상품선택: 유저에게 보이는 현재가
       * 장바구니, 주문서: 유저가 구매하는 최종 현재가
       */
      price: representativePrice,
      // 컬리판매가 기준의 상품 합계 금액(컬리판매가 x 수량)
      total_base_price: basePrice * buyUnit,
    };
  }
}
