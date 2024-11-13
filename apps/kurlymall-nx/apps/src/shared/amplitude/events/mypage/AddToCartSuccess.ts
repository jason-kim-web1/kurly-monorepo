import { AmplitudeEvent } from '../../AmplitudeEvent';
import { amplitudeService } from '../../index';

interface Payload {
  skuCount: number;
}
/**
 * 주문 내역 상세 - 전체 상품 다시 담기 성공 시
 * @extends AmplitudeEvent
 */
class AddToCartSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_success', payload);
  }

  getPayload() {
    return {
      selection_type: 'all', // 장바구니 담기 유형. 전체 상품 다시 담기 시 all, 일반 장바구니 담기 시 null
      sku_count: this.payload.skuCount,
      referrer_event: 'order_history',
    };
  }
}

export const logEventAddToCartSuccess = (availableLength: number) => {
  amplitudeService.logEvent(
    new AddToCartSuccess({
      skuCount: availableLength,
    }),
  );
};
