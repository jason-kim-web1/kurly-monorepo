import { useMemo } from 'react';

import { get, isEmpty } from 'lodash';

import { addComma } from '../../../shared/services';
import { DELIVERY_FREE_TYPE, DeliveryPricePolicyType } from '../interface/Cart';
import { calculateCartProductsTotalPrice } from '../utils/calculateCartProductsTotalPrice';
import useCartDetail from './useCartDetail';
import { useAppSelector } from '../../../shared/store';
import { CART_DELIVERY_GROUP } from '../constants/CartDeliveryGroup';

export default function useKurlyDeliveryProgress() {
  const { cartDetail, getAllProducts } = useCartDetail();

  const selectedKurlyDeliveryCartItems = useAppSelector(({ cart }) => {
    return getAllProducts(CART_DELIVERY_GROUP.KURLY).filter(({ dealProductNo }) =>
      cart.selectedCartItems.includes(dealProductNo),
    );
  });

  const kurlyDeliveryPricePolicy = useMemo(() => {
    return get(cartDetail, 'kurlyDelivery.deliveryPricePolicy', {}) as DeliveryPricePolicyType;
  }, [cartDetail]);

  const { remainingFreeShippingPrice, isFreeProducts } = useMemo(() => {
    return calculateCartProductsTotalPrice({
      cartProducts: selectedKurlyDeliveryCartItems,
      deliveryPricePolicy: kurlyDeliveryPricePolicy,
    });
  }, [selectedKurlyDeliveryCartItems, kurlyDeliveryPricePolicy]);

  const remainingCostText = useMemo(() => {
    if (remainingFreeShippingPrice > 0) {
      return `${addComma(remainingFreeShippingPrice)}원 더 담으면 무료배송`;
    }

    // 선택된 1P 상품중에 무료배송 상품이 포함되었다면, '무료배송'만 반환
    if (isFreeProducts || isEmpty(cartDetail?.kurlyDelivery?.deliveryPricePolicy.deliveryPriceFreeMessage)) {
      return '무료배송';
    }

    return cartDetail?.kurlyDelivery?.deliveryPricePolicy.deliveryPriceFreeMessage;
  }, [cartDetail, isFreeProducts, remainingFreeShippingPrice]);

  const progressState = useMemo(() => {
    const deliveryPrice = kurlyDeliveryPricePolicy.deliveryPriceFreeCriteria;

    return 1 - remainingFreeShippingPrice / deliveryPrice;
  }, [remainingFreeShippingPrice, kurlyDeliveryPricePolicy]);

  const isMembersBenefit = useMemo(
    () =>
      cartDetail?.kurlyDelivery?.deliveryPricePolicy.deliveryPriceFreeReasonType ===
      DELIVERY_FREE_TYPE.MEMBER_BENEFIT_POLICY,
    [cartDetail],
  );

  return {
    remainingCostText,
    progressState,
    isMembersBenefit,
  };
}
