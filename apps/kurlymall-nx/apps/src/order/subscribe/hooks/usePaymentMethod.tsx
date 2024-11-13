import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { PaymentType } from '../interfaces';
import { useAppSelector } from '../../../shared/store';
import useKurlyMembersCheckout from './useKurlyMembersCheckout';
import { setSelectedVendor } from '../../checkout/shared/reducers/checkout-payment.slice';
import { VendorCodes } from '../../shared/shared/interfaces';
import { PaymentVendorName } from '../../../shared/constant';

const PAYMENT_NAME: Record<PaymentType, string> = {
  'kurly-pay': '컬리페이',
  'naver-pay': '네이버페이',
  credit: '신용카드',
};

export default function usePaymentMethod() {
  const dispatch = useDispatch();
  const { isKurlypayError } = useKurlyMembersCheckout();
  const paymentMethodType = useAppSelector(({ subscribeCheckout }) => subscribeCheckout.paymentMethodType);

  useEffect(() => {
    dispatch(
      setSelectedVendor({
        code: VendorCodes.KURLYPAY,
        name: PaymentVendorName.kurlypay,
        hasEvent: false,
        isSimplePay: false,
      }),
    );
  }, [dispatch]);

  const selectedPayment = useMemo(
    () => (isKurlypayError ? '' : PAYMENT_NAME[paymentMethodType]),
    [isKurlypayError, paymentMethodType],
  );

  return {
    isKurlypayError,
    selectedPayment,
  };
}
