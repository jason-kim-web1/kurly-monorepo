import { useMemo } from 'react';

import { isEmpty } from 'lodash';

import { DELIVERY_TYPE } from '../constants/Address';

import useCartDetail from './useCartDetail';
import useCurrentAddress from '../../common/hooks/useCurrentAddress';

import { useAppSelector } from '../../../shared/store';

export default function useDisableButtonText() {
  const selectedCartItems = useAppSelector(({ cart }) => cart.selectedCartItems);

  const { data: currentAddress } = useCurrentAddress();
  const { availableProducts } = useCartDetail();

  /**
   * 장바구니의 주문하기 버튼의 disable text 를 결정합니다.
   */
  const disableText = useMemo(() => {
    if (isEmpty(currentAddress?.address)) {
      return '배송지를 입력해주세요';
    }

    if (currentAddress?.deliveryType === DELIVERY_TYPE.DISABLE) {
      return '배송불가 지역입니다';
    }

    if (currentAddress?.isRetiredAddress) {
      return '주소지를 재등록 해주세요';
    }

    if (isEmpty(availableProducts)) {
      return '상품을 담아주세요';
    }

    if (isEmpty(selectedCartItems)) {
      return '상품을 선택해주세요';
    }

    return undefined;
  }, [availableProducts, currentAddress, selectedCartItems]);

  return { disableText };
}
