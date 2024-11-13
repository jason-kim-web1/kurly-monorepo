import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';

import useCheckboxStatus from './useCheckboxStatus';
import { addCartItem, removeCartItem } from '../store/cart';
import useCartDetail from './useCartDetail';
import { CART_DELIVERY_GROUP } from '../constants/CartDeliveryGroup';

export default function useCheckboxStatusSync() {
  const dispatch = useDispatch();
  const { getAllProducts, availableProducts, isFetching: cartDetailIsFetching } = useCartDetail();
  const { checkboxStatus, onDeleteCheckboxStatus } = useCheckboxStatus();
  /**
   * 'notReady' - 체크박스 상태가 서버와 동기화 준비 중
   * 'notSynced' - 체크박스 상태가 서버와 동기화 되지 않음
   * 'fetching' - 체크박스 상태를 서버와 동기화 중
   * 'synced' - 체크박스 상태가 서버와 동기화 완료
   */
  const [isSynced, setIsSynced] = useState<'notReady' | 'notSynced' | 'fetching' | 'synced'>('notReady');

  useEffect(() => {
    if (isSynced === 'notReady' && checkboxStatus && !isEmpty(availableProducts)) {
      setIsSynced('notSynced');
    }
  }, [availableProducts, checkboxStatus, isSynced]);

  useEffect(() => {
    if (isSynced === 'notSynced' && !cartDetailIsFetching) {
      setIsSynced('fetching');
    }
  }, [cartDetailIsFetching, isSynced]);

  useEffect(() => {
    if (isSynced === 'fetching') {
      const unavailableProducts = getAllProducts(CART_DELIVERY_GROUP.UNAVAILABLE_ORDERS);
      const checkboxStatusEntries = Object.entries(checkboxStatus);

      dispatch(
        addCartItem({
          // 구매 가능 상품 중에
          dealProductNos: availableProducts.reduce((dealNosToAddCartItem: number[], { dealProductNo }) => {
            const checkboxStatusIndex = checkboxStatusEntries.findIndex(
              ([checkboxStatusNo]) => Number(checkboxStatusNo) === dealProductNo,
            );

            if (checkboxStatusIndex !== -1) {
              // 체크박스 상태가 있는 경우
              const [, checked] = checkboxStatusEntries[checkboxStatusIndex];
              // checkboxStatusEntries에서 제외합니다.
              checkboxStatusEntries.splice(checkboxStatusIndex, 1);

              if (!checked) {
                // 체크박스 상태가 false인 경우 상품을 선택하지 않고 다음 차례로 넘깁니다.
                return dealNosToAddCartItem;
              }
            }

            // 체크 박스 상태가 없거나 체크박스 상태가 true인 경우 상품을 선택합니다.
            dealNosToAddCartItem.push(dealProductNo);

            // 다음 차례로 넘깁니다.
            return dealNosToAddCartItem;
          }, []),
        }),
      );
      dispatch(
        removeCartItem({
          // 구매 불가능한 상품 중에
          dealProductNos: unavailableProducts.reduce((dealNosToRemoveCartItem: number[], { dealProductNo }) => {
            const checkboxStatusIndex = checkboxStatusEntries.findIndex(
              ([checkboxStatusNo]) => Number(checkboxStatusNo) === dealProductNo,
            );

            if (checkboxStatusIndex !== -1) {
              // 체크박스 상태가 있는 경우
              // 상품 선택을 해제합니다.
              dealNosToRemoveCartItem.push(dealProductNo);
              // checkboxStatusEntries에서 제외합니다.
              checkboxStatusEntries.splice(checkboxStatusIndex, 1);
            }

            return dealNosToRemoveCartItem;
          }, []),
        }),
      );

      // 아직 checkboxStatusEntries에 남은 체크박스 상태는 현재 장바구니에 없는 상품으로 체크박스 상태를 삭제합니다.
      onDeleteCheckboxStatus({ dealProductNos: checkboxStatusEntries.map(([dealProductNo]) => Number(dealProductNo)) });
      setIsSynced('synced');
    }
  }, [availableProducts, checkboxStatus, dispatch, getAllProducts, isSynced, onDeleteCheckboxStatus]);

  useEffect(() => {
    if (isSynced === 'synced' && cartDetailIsFetching) {
      setIsSynced('notSynced');
    }
  }, [cartDetailIsFetching, isSynced]);
}
