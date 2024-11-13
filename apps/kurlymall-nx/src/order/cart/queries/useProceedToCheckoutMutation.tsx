import { useMutation } from '@tanstack/react-query';

import { isEmpty } from 'lodash';

import useCurrentAddress from '../../common/hooks/useCurrentAddress';
import useCheckAddressQuery from './useCheckAddressQuery';
import { CartItem } from '../interface/CartProduct';
import { postProceedToCheckout } from '../api/postProceedToCheckout';

export default function useProceedToCheckoutMutation(isDirectCheckout?: boolean) {
  const { data: currentAddress } = useCurrentAddress();
  const { data: checkAddress } = useCheckAddressQuery();

  return useMutation({
    mutationFn: async (dealProducts: CartItem[]) => {
      if (!currentAddress || !checkAddress || isEmpty(dealProducts)) {
        throw new Error('현재 주소, 또는 장바구니에 상품이 없습니다.');
      }

      const params = {
        dealProducts: dealProducts.map(({ quantity, dealProductNo }) => ({ quantity, dealProductNo })),
        address: currentAddress.roadAddress,
        addressDetail: currentAddress.addressDetail,
        deliveryPolicy: checkAddress.delivery_time,
        isDirectCheckout: isDirectCheckout ?? false,
        showKurlyMembersPopupMessage: true,
      };

      return postProceedToCheckout(params);
    },
  });
}
