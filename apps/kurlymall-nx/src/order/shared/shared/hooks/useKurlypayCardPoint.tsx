import { useDispatch } from 'react-redux';

import { useMemo } from 'react';

import { useAppSelector } from '../../../../shared/store';
import { selectKurlyPay, toggleUsedCardPoint } from '../../../checkout/shared/reducers/checkout-payment.slice';
import { isPC } from '../../../../../util/window/getDevice';
import { notifyCouponMessage } from '../../../checkout/shared/reducers/checkout-coupon.slice';

const HYUNDAI_CARD_POINT_MINIMUM_PRICE = 70000;

interface Response {
  checked?: boolean;
  disableHyundaiPoint: boolean;
  handleCardPointCheckbox: () => void;
}

export default function useKurlypayCardPoint(): Response {
  const dispatch = useDispatch();
  const { selectedCardPoint, selectedKurlypayVendor } = useAppSelector(({ checkoutPayment }) => ({
    selectedCardPoint: checkoutPayment.selectedCardPoint,
    selectedKurlypayVendor: checkoutPayment.selectedKurlypayVendor,
  }));
  const paymentPrice = useAppSelector(({ checkout }) => checkout.price.paymentPrice);

  const disableHyundaiPoint = useMemo(() => paymentPrice < HYUNDAI_CARD_POINT_MINIMUM_PRICE, [paymentPrice]);

  const handleCardPointCheckbox = () => {
    if (isPC) {
      dispatch(selectKurlyPay(selectedKurlypayVendor));
      dispatch(notifyCouponMessage());
    }

    dispatch(toggleUsedCardPoint());
  };

  return {
    handleCardPointCheckbox,
    disableHyundaiPoint,
    checked: selectedCardPoint,
  };
}
