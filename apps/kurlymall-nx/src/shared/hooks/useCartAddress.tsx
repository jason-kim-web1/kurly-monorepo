import { useDispatch } from 'react-redux';

import { useCallback } from 'react';

import { setCurrentAddress } from '../reducers/shipping-address.slice';
import { fetchCartAddress } from '../services/shippingAddress.service';

export const useCurrentAddress = () => {
  const dispatch = useDispatch();

  const loadCartAddress = useCallback(async () => {
    const currentAddress = await fetchCartAddress();

    dispatch(setCurrentAddress(currentAddress));
  }, [dispatch]);

  return { loadCartAddress };
};
