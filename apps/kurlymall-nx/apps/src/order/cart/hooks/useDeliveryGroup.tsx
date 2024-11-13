import { useCallback } from 'react';

import { has, isUndefined } from 'lodash';

import { CartDeliveryGroup } from '../constants/CartDeliveryGroup';

import useCartDetail from './useCartDetail';

export default function useDeliveryGroup() {
  const { cartDetail } = useCartDetail();

  /**
   * 배송 그룹명을 반환합니다.
   *
   * @param {CartDeliveryGroup} type 배송 그룹 타입
   * @returns {string | undefined} 배송 그룹명
   */
  const getDisplayName = useCallback(
    (type: CartDeliveryGroup) => {
      if (isUndefined(cartDetail) || !has(cartDetail, type)) {
        return;
      }

      return cartDetail[type]?.displayName;
    },
    [cartDetail],
  );

  return {
    getDisplayName,
  };
}
