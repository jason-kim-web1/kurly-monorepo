import { useCallback } from 'react';

import { CART_DELIVERY_GROUP } from '../constants/CartDeliveryGroup';

import useCartItem from './useCartItem';
import useCartDetail from './useCartDetail';
import { DELETE_TYPE } from '../constants/SelectionType';

export default function useUnavailableTitle() {
  const { onDelete } = useCartItem();
  const { getAllProducts } = useCartDetail();

  /**
   * 구매 불가 상품을 모두 삭제합니다.
   */
  const onDeleteAllUnavailableOrders = useCallback(async () => {
    await onDelete({
      message: '구매 불가 상품을\n삭제하시겠습니까?',
      products: getAllProducts(CART_DELIVERY_GROUP.UNAVAILABLE_ORDERS),
      selectionType: DELETE_TYPE.SOLDOUT,
    });
  }, [onDelete, getAllProducts]);

  return {
    onDeleteAllUnavailableOrders,
  };
}
