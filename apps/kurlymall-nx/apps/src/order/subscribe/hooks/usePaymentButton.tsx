import { useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../shared/store';
import { PAYMENT_TYPE, PaymentType } from '../interfaces';
import useKurlyMembersCheckout from './useKurlyMembersCheckout';
import { setPaymentMethodId, setPaymentMethodType } from '../reducers/subscribeCheckout.slice';

interface PaymentButtonProps {
  handleClickPaymentSlide?: () => void;
  paymentType: PaymentType;
}
export const usePaymentButton = ({ handleClickPaymentSlide, paymentType }: PaymentButtonProps) => {
  const dispatch = useDispatch();
  const { isKurlypayError } = useKurlyMembersCheckout();
  const paymentMethodType = useAppSelector(({ subscribeCheckout }) => subscribeCheckout.paymentMethodType);

  const checked = useMemo(
    () => (isKurlypayError ? false : paymentMethodType === paymentType),
    [isKurlypayError, paymentMethodType, paymentType],
  );

  const handleClickPaymentButton = () => {
    if (handleClickPaymentSlide) {
      handleClickPaymentSlide();
      return;
    }

    dispatch(setPaymentMethodType(paymentType));

    if (paymentType !== PAYMENT_TYPE.KURLY_PAY) {
      dispatch(setPaymentMethodId(null));
    }
  };

  return {
    checked,
    isKurlypayError,
    handleClickPaymentButton,
  };
};
