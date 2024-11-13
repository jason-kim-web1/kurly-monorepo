import { debounce } from 'lodash';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../shared/store';

import { recalculatePrice, setPoints } from '../reducers/checkout.slice';
import { CheckoutType } from '../../../../shared/interfaces';

export default function useCheckoutPoint() {
  const dispatch = useDispatch();

  const debouncedRequest = useMemo(() => debounce(dispatch, 300), [dispatch]);

  const { usedPoint, price, availablePoint, isLiquidity } = useAppSelector(({ checkout }) => ({
    usedPoint: checkout.usedPoint,
    price: checkout.price,
    availablePoint: checkout.availablePoint,
    isLiquidity: checkout.checkoutType === CheckoutType.LIQUIDITY,
  }));

  const changePoints = (usingPoint: number) => {
    dispatch(setPoints(usingPoint));
    debouncedRequest(recalculatePrice());
  };

  const changeTotalPoints = () => {
    const total = price.totalPrice + price.deliveryPrice - price.couponDiscountPrice;
    const totalPoint = isLiquidity ? availablePoint.paid : availablePoint.free + availablePoint.paid;
    const usingPoint = totalPoint > usedPoint + price.paymentPrice ? usedPoint + price.paymentPrice : totalPoint;

    if (totalPoint < usingPoint || usingPoint > total) {
      return;
    }
    changePoints(usingPoint);
  };

  return {
    availablePoint,
    changePoints,
    changeTotalPoints,
  };
}
