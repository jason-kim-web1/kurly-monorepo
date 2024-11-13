import { useQuery } from '@tanstack/react-query';

import { useContext } from 'react';

import { MAX_ADDRESS_LIST_LENGTH } from '../../../shared/constant';
import { AddressContext } from '../context/addressContext';
import { DefaultAddressType } from '../../../shared/interfaces/ShippingAddress';
import { AddressResponseInterface, getAddressList } from '../../../shared/services/shippingAddress.service';

export const MYPAGE_ADDRESS_QUERY_KEY = ['mypage', 'address'];

const getAddressCount = (data: AddressResponseInterface[] | undefined): number => {
  if (!data) {
    return 0;
  }
  return data.length;
};

export default function useAddressListQuery() {
  const {
    actions: { setIsFullyData },
  } = useContext(AddressContext);

  const queryResult = useQuery(MYPAGE_ADDRESS_QUERY_KEY, getAddressList, {
    refetchOnMount: 'always',
    keepPreviousData: true,
    onSuccess: (data) => {
      if (data && data.length === MAX_ADDRESS_LIST_LENGTH) {
        setIsFullyData(true);
        return;
      }

      setIsFullyData(false);
    },
  });

  const { data } = queryResult;

  const isDefaultRetiredAddress = data?.some((address) => {
    const isDefualtAddress = address.type === DefaultAddressType.default;

    return isDefualtAddress && address.isRetiredAddress;
  });

  return { ...queryResult, addressCount: getAddressCount(data), isDefaultRetiredAddress };
}
