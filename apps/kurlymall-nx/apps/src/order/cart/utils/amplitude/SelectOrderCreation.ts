import { AmplitudeEvent } from '../../../../shared/amplitude/AmplitudeEvent';
import { amplitudeService } from '../../../../shared/amplitude';
import { BottomType, FirstProductType, RecommendProductList } from '../../constants/RecommendProductList';

interface Payload {
  // 주문하기 버튼 클릭시, 무료배송 여부
  isDeliveryFree: boolean;
  // 바텀시트에서 더 담은 상품의 수량
  addedQuantity?: number;
  // 바텀시트에서 더 담은 상품의 Deal Id
  addedCart?: string;
  // 바텀시트 내 1번 상품 타입
  firstProductType?: FirstProductType;
  // 바텀시트 타입
  bottomType?: BottomType;
}

/**
 * 장바구니 내 바텀시트에서 N원 주문하기 버튼을 클릭했을 때
 * @extends AmplitudeEvent
 */
class SelectOrderCreation extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_order_creation', payload);
  }

  getPayload() {
    return {
      is_delivery_free: this.payload.isDeliveryFree,
      added_quantity: this.payload.addedQuantity,
      added_deal_id: this.payload.addedCart,
      first_product_type: this.payload.firstProductType,
      bottom_type: this.payload.bottomType,
    };
  }
}

/**
 *
 * @param deliveryPrice 배송비
 * @param addedRecommendDealNumberList 바텀시트에서 더 담은 상품의 딜정보
 * @param recommendProductList 추천상품 리스트
 */
export const logEventSelectOrderCreation = (
  deliveryPrice: number,
  addedRecommendDealNumberList?: number[],
  recommendProductList?: RecommendProductList,
) => {
  amplitudeService.logEvent(
    new SelectOrderCreation({
      isDeliveryFree: deliveryPrice === 0,
      addedQuantity: addedRecommendDealNumberList?.length,
      addedCart: addedRecommendDealNumberList?.toString(),
      firstProductType: recommendProductList?.firstProductType,
      bottomType: recommendProductList?.bottomType,
    }),
  );
};
