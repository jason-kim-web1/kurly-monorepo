import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { isEmpty, isEqual } from 'lodash';

import { useAppSelector } from '../../../shared/store';
import { AvailableCartDeliveryGroup } from '../constants/CartDeliveryGroup';
import { calculateCartProductsTotalPrice } from '../utils/calculateCartProductsTotalPrice';
import { updateTotalPrice } from '../store/cart';
import { CartProduct } from '../interface/CartProduct';
import { DeliveryPricePolicyType } from '../interface/Cart';

interface Props {
  type: AvailableCartDeliveryGroup;
  partnerId: string;
  products: CartProduct[];
  deliveryPricePolicy: DeliveryPricePolicyType;
}

export default function useSelectedCartItemsTotalPrice({ type, partnerId, products, deliveryPricePolicy }: Props) {
  const dispatch = useDispatch();

  const selectedCartItems = useAppSelector(({ cart }) => {
    return products.filter(({ dealProductNo }) => cart.selectedCartItems.includes(dealProductNo));
  });

  const result = useMemo(
    () => calculateCartProductsTotalPrice({ cartProducts: selectedCartItems, deliveryPricePolicy }),
    [selectedCartItems, deliveryPricePolicy],
  );

  const prevResultRef = useRef<ReturnType<typeof calculateCartProductsTotalPrice>>();

  useEffect(() => {
    if (!isEqual(prevResultRef.current, result)) {
      dispatch(updateTotalPrice({ type, partnerId, totalPrice: isEmpty(selectedCartItems) ? null : result }));
    }
    prevResultRef.current = result;
  }, [dispatch, type, partnerId, result, selectedCartItems]);

  return result;
}
