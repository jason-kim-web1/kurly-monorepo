import { useCallback, useMemo } from 'react';

import { has, isUndefined } from 'lodash';

import { useAppSelector } from '../../../shared/store';
import { CART_DELIVERY_GROUP, CartDeliveryGroup } from '../constants/CartDeliveryGroup';

import useCartItem from './useCartItem';
import useCartDetail from './useCartDetail';

export default function useDeliveryTitle(type: CartDeliveryGroup) {
  const { onToggle } = useCartItem();
  const selectedCartItems = useAppSelector(({ cart }) => cart.selectedCartItems);
  const { cartDetail, getAllProducts } = useCartDetail();

  /**
   * 해당 배송 그룹의 상품이 모두 선택되었는지 여부를 반환합니다.
   *
   * @returns {boolean} 모두 선택되었는지 여부
   */
  const isAllChecked = useCallback(() => {
    if (isUndefined(cartDetail) || !has(cartDetail, type)) {
      return false;
    }

    const selectedCount = getAllProducts(type).filter((product) =>
      selectedCartItems.includes(product.dealProductNo),
    ).length;

    return (cartDetail[type]?.productCount ?? 0) === selectedCount;
  }, [cartDetail, type, getAllProducts, selectedCartItems]);

  /**
   * 해당 배송 그룹의 상품을 전체 선택 또는 해제합니다.
   *
   * @param {boolean} checked 전체 선택 여부
   */
  const handleToggleAll = useCallback(
    (checked: boolean) => {
      if (!type) return;

      const items = getAllProducts(type);

      onToggle({ checked, items });
    },
    [type, getAllProducts, onToggle],
  );

  const isShowProgress = useMemo(
    () => type === CART_DELIVERY_GROUP.KURLY && cartDetail?.kurlyDelivery?.deliveryPricePolicy.isShowProgressBar,
    [cartDetail?.kurlyDelivery?.deliveryPricePolicy.isShowProgressBar, type],
  );

  return {
    isAllChecked,
    handleToggleAll,
    isShowProgress,
  };
}
