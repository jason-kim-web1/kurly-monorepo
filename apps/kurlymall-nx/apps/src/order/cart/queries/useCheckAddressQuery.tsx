import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from '../../../shared/store';

import { CART_QUERY_KEYS } from '../../checkout/shared/constants/querykeys';
import { fetchCourierOperation } from '../../../shared/api';
import { isNotEmpty } from '../../../shared/utils/lodash-extends';
import useCurrentAddress from '../../common/hooks/useCurrentAddress';

export default function useCheckAddressQuery() {
  const { hasSession, isGuest } = useAppSelector(({ auth }) => ({
    hasSession: auth.hasSession,
    isGuest: auth.isGuest,
  }));
  const { data: currentAddress } = useCurrentAddress();

  const checkAddress = () => {
    if (!currentAddress) {
      return;
    }

    const { address, addressDetail, baseAddressType } = currentAddress;

    return fetchCourierOperation({
      address,
      address_detail: addressDetail,
      base_address_type: baseAddressType,
    });
  };

  return useQuery({
    queryKey: CART_QUERY_KEYS.CHECK_ADDRESS(),
    queryFn: checkAddress,
    enabled: hasSession && !isGuest && isNotEmpty(currentAddress?.address),
    refetchOnMount: 'always',
  });
}
