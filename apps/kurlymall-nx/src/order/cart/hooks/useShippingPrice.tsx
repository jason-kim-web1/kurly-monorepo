import { isEmpty } from 'lodash';

import useCartDetailQuery from '../queries/useCartDetailQuery';
import { isNotEmpty } from '../../../shared/utils/lodash-extends';
import { useAppSelector } from '../../../shared/store';
import { addComma } from '../../../shared/services';
import { isDefined } from '../../../shared/utils/typeGuard';
import { totalPriceSelector } from '../store/cart';

export const useShippingPrice = () => {
  const { data: cartDetail } = useCartDetailQuery();
  const { kurlyDelivery, partnerDomestic, partnerInternational } = useAppSelector(({ cart }) => ({
    kurlyDelivery: cart.totalPrice.kurlyDelivery,
    partnerDomestic: cart.totalPrice.partnerDomesticDelivery,
    partnerInternational: cart.totalPrice.partnerInternationalDelivery,
  }));
  const { deliveryPrice } = useAppSelector(totalPriceSelector);

  const freeShippingReason = cartDetail?.kurlyDelivery?.deliveryPricePolicy.deliveryPriceFreeReasonName;

  // 무료배송 사유를 노출 기준 : 1P 상품만 선택 된 상태에서 + 배송비가 0원이면서 + 무료배송 상품이 선택되지 않았을 때
  const showFreeShippingReason =
    deliveryPrice === 0 &&
    isNotEmpty(freeShippingReason) &&
    isDefined(kurlyDelivery.kurlyDelivery) &&
    isEmpty({ ...partnerDomestic, ...partnerInternational }) &&
    !kurlyDelivery.kurlyDelivery.isFreeProducts;

  const shippingPriceText = showFreeShippingReason ? `무료 (${freeShippingReason})` : `${addComma(deliveryPrice)}원`;

  return { showFreeShippingReason, shippingPriceText };
};
