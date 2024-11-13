import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from '../../../shared/store';

import { CART_QUERY_KEYS } from '../../checkout/shared/constants/querykeys';
import { postCartDetail } from '../api/postCartDetail';
import { loadCartItems } from '../../../cart/shared/services/cart-items.storage.service';
import useCurrentAddress from '../../common/hooks/useCurrentAddress';
import { isDefined } from '../../../shared/utils/typeGuard';

export default function useCartDetailQuery() {
  const { isGuest, hasSession } = useAppSelector(({ auth }) => ({
    isGuest: auth.isGuest,
    hasSession: auth.hasSession,
  }));
  const { data: currentAddress } = useCurrentAddress();

  return useQuery({
    queryKey: CART_QUERY_KEYS.DETAIL(currentAddress?.address),
    queryFn: () =>
      postCartDetail({
        roadAddress: currentAddress?.address,
        addressDetail: currentAddress?.addressDetail,
        ...(isGuest && { cartItems: loadCartItems() }),
      }),
    enabled: hasSession && isDefined(currentAddress),
    retry: false,
    cacheTime: 0,
  });
}
