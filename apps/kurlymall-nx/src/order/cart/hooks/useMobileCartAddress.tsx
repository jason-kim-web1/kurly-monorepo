import { useCallback, useEffect } from 'react';

import { isEmpty } from 'lodash';

import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { Alert } from '@thefarmersfront/kpds-react';

import { ADDRESS_PATH, CHANGE_ADDRESS_TEXT } from '../../../shared/constant';
import useCartDetail from './useCartDetail';
import useCurrentAddress from '../../common/hooks/useCurrentAddress';
import { useAppSelector } from '../../../shared/store';
import { resetAddressChanged, setNewAddress } from '../../../shared/reducers/shipping-address.slice';

export default function useMobileCartAddress() {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { isCartEmpty, deliveryNoticeText } = useCartDetail();
  const { data: currentAddress, refetch: refetchCurrentAddress } = useCurrentAddress();
  const addressChanged = useAppSelector(({ shippingAddress }) => shippingAddress.addressChanged);

  /**
   * 장바구니 주소 클릭 핸들러
   * - 현재 주소가 비어 있거나 사용 중지된 주소인 경우, 주소 추가 페이지로 이동합니다.
   * - 그 외의 경우, 주소 목록 페이지로 이동합니다.
   */
  const handleClickCartAddress = useCallback(async () => {
    const isEmptyAddress = isEmpty(currentAddress?.address) || currentAddress?.isRetiredAddress;
    const targetUrl = isEmptyAddress ? ADDRESS_PATH.add.uri : ADDRESS_PATH.list.uri;

    await push(targetUrl);
  }, [currentAddress, push]);

  /**
   * 주소가 변경되고 장바구니에 상품이 있으면,
   * - CHANGE_ADDRESS_TEXT 메세지를 띄웁니다
   * - 주소변경 상태를 나타내는 'addressChanged' 를 초기화합니다.
   */
  useEffect(() => {
    if (!addressChanged || isCartEmpty) {
      return;
    }

    (async () => {
      await Alert({ contents: CHANGE_ADDRESS_TEXT });
      dispatch(resetAddressChanged());
    })();
  }, [addressChanged, dispatch, isCartEmpty, refetchCurrentAddress]);

  /**
   * 장바구니가 언마운트 될 때, redux shippingAddress의 'isAddressAssigned' 를 초기화합니다.
   * 초기화 해주는 값은 장바구니에서 사용되는 상태값은 아닙니다.
   * 현 주소조회를 장바구니에서만 react query로 사용하고 있기 때문에, 다른페이지에서 사용하는 redux 상태를 초기화 해주는 역할입니다.
   */
  useEffect(() => {
    return () => {
      dispatch(setNewAddress(false));
    };
  }, [dispatch]);

  return {
    deliveryNoticeText,
    handleClickCartAddress,
  };
}
