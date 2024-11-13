import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { initCartStore } from '../store/cart';
import { useScreenName } from '../../../shared/hooks';
import { ScreenName } from '../../../shared/amplitude';
import useCheckboxStatusSync from './useCheckboxStatusSync';

export default function useCartSetup() {
  const dispatch = useDispatch();

  useScreenName(ScreenName.CART);
  useCheckboxStatusSync();

  useEffect(() => {
    return () => {
      dispatch(initCartStore());
    };
  }, [dispatch]);
}
