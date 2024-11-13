import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from '../../../shared/store';

import { CART_QUERY_KEYS } from '../../checkout/shared/constants/querykeys';
import { fetchCurrentAddress, fetchGuestCurrentAddress } from '../api/currentAddress';
import { convertCurrentAddress } from '../services/ConvertCurrentAddress';

export default function useCurrentAddressQuery() {
  const { hasSession, isGuest } = useAppSelector(({ auth }) => ({
    hasSession: auth.hasSession,
    isGuest: auth.isGuest,
  }));

  return useQuery({
    queryKey: CART_QUERY_KEYS.CURRENT_ADDRESS(isGuest),
    queryFn: async () => {
      return isGuest ? fetchGuestCurrentAddress() : fetchCurrentAddress();
    },
    enabled: hasSession,
    cacheTime: 0,
    select: (data) => convertCurrentAddress(data),
  });
}
