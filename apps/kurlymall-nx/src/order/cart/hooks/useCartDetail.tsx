import { useCallback, useMemo } from 'react';

import useCartDetailQuery from '../queries/useCartDetailQuery';
import { CART_DELIVERY_GROUP, CartDeliveryGroup } from '../constants/CartDeliveryGroup';
import { isDefined } from '../../../shared/utils/typeGuard';

export default function useCartDetail() {
  const { data: cartDetail, isLoading, isError: isCartDetailError, isFetching } = useCartDetailQuery();

  const isCartEmpty = useMemo(
    () => !isDefined(cartDetail?.totalCount) || cartDetail?.totalCount === 0 || isCartDetailError,
    [cartDetail?.totalCount, isCartDetailError],
  );

  const deliveryNoticeText = useMemo(() => cartDetail?.displayMessage?.deliveryNotice?.text, [cartDetail]);

  const getAllProducts = useCallback(
    (type: CartDeliveryGroup) => {
      if (!cartDetail) {
        return [];
      }

      if (type === CART_DELIVERY_GROUP.KURLY) {
        return cartDetail[type]?.storageTypes.flatMap((storageType) => storageType.products) ?? [];
      }

      if (type === CART_DELIVERY_GROUP.UNAVAILABLE_ORDERS) {
        return cartDetail[type]?.products ?? [];
      }

      return cartDetail[type]?.partners.flatMap((p) => p.products) ?? [];
    },
    [cartDetail],
  );

  const availableProducts = useMemo(() => {
    if (!cartDetail) {
      return [];
    }

    return [
      ...getAllProducts(CART_DELIVERY_GROUP.KURLY),
      ...getAllProducts(CART_DELIVERY_GROUP.PARTNER_DOMESTIC),
      ...getAllProducts(CART_DELIVERY_GROUP.PARTNER_INTERNATIONAL),
    ];
  }, [cartDetail, getAllProducts]);

  return {
    cartDetail,
    isLoading,
    isFetching,
    isCartEmpty,
    deliveryNoticeText,
    getAllProducts,
    availableProducts,
  };
}
