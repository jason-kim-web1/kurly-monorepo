import { useMemo } from 'react';

import useCurrentAddressQuery from '../../cart/queries/useCurrentAddressQuery';
import { BASE_ADDRESS_TYPE } from '../../cart/constants/Address';
import { CurrentAddress } from '../../cart/interface/CurrentAddressResponse';

const getCurrentAddress = (currentAddress?: CurrentAddress): string => {
  if (!currentAddress) {
    return '';
  }

  const { baseAddressType, roadAddress, jibunAddress } = currentAddress;
  const isRoadAddressType = baseAddressType === BASE_ADDRESS_TYPE.ROAD;

  return isRoadAddressType ? roadAddress : jibunAddress;
};

export default function useCurrentAddress() {
  const queryResult = useCurrentAddressQuery();
  const address = useMemo(() => getCurrentAddress(queryResult.data), [queryResult.data]);

  return { ...queryResult, data: queryResult.data && { address: address, ...queryResult.data } };
}
