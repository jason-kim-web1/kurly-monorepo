import { useCallback, useMemo } from 'react';

import { chain, isEmpty } from 'lodash';

import { useAppSelector } from '../../../shared/store';
import useCartItem from './useCartItem';
import useCartDetail from './useCartDetail';
import { DELETE_TYPE } from '../constants/SelectionType';

export default function useFloatingMenu() {
  const { cartDetail, availableProducts, isCartEmpty } = useCartDetail();

  const { onToggle, onDelete } = useCartItem();
  const selectedCartItems = useAppSelector(({ cart }) => cart.selectedCartItems);

  // cartDetail?.totalCount 값은 구매불가 상품이 포함된 갯수이다.
  // 따라서 구매 가능한 상품 갯수를 구하기 위해 totalCount - unavailableCount 를 처리한다.
  const totalCount = useMemo(() => {
    return (cartDetail?.totalCount ?? 0) - (cartDetail?.unavailableOrders?.productCount ?? 0);
  }, [cartDetail]);

  const selectedItemCount = useMemo(() => selectedCartItems.length, [selectedCartItems]);

  const selectedStatusText = useMemo(() => `${selectedItemCount}/${totalCount}`, [selectedItemCount, totalCount]);

  const isUnselectedItem = useMemo(() => selectedItemCount === 0, [selectedItemCount]);

  const allCheckDisabled = useMemo(() => isCartEmpty || totalCount === 0, [isCartEmpty, totalCount]);

  const isAllChecked = useMemo(() => {
    if (allCheckDisabled) {
      return true;
    }

    return selectedItemCount === totalCount;
  }, [allCheckDisabled, selectedItemCount, totalCount]);

  const isShowDeliveryTypeTab = useMemo(() => {
    if (!cartDetail) {
      return false;
    }

    return (
      chain(cartDetail)
        .pick(['kurlyDelivery', 'partnerDomesticDelivery', 'partnerInternationalDelivery', 'unavailableOrders'])
        .filter(Boolean)
        .value().length >= 2
    );
  }, [cartDetail]);

  const onDeleteAll = useCallback(async () => {
    if (isEmpty(selectedCartItems)) {
      return;
    }

    await onDelete({
      message: '선택한 상품을 삭제하시겠습니까?',
      products: availableProducts.filter((it) => selectedCartItems.includes(it.dealProductNo)),
      selectionType: DELETE_TYPE.SELECTION,
    });
  }, [selectedCartItems, onDelete]);

  const onToggleAll = useCallback(
    (checked: boolean) => {
      if (allCheckDisabled) {
        return;
      }
      onToggle({ checked, items: availableProducts });
    },
    [availableProducts, onToggle, allCheckDisabled],
  );

  return {
    selectedStatusText,
    isAllChecked,
    allCheckDisabled,
    isUnselectedItem,
    onToggleAll,
    onDeleteAll,
    isShowDeliveryTypeTab,
  };
}
