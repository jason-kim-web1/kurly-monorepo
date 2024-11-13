import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { head } from 'lodash';

import {
  setPaymentKurlypayCompanyCode,
  setPaymentKurlypayType,
  setPaymentMethodId,
} from '../reducers/subscribeCheckout.slice';
import useKurlyMembersCheckout from './useKurlyMembersCheckout';
import { useAppSelector } from '../../../shared/store';
import { PAYMENT_TYPE } from '../interfaces';

export default function useKurlypaySlide() {
  const dispatch = useDispatch();
  const { kurlypayList } = useKurlyMembersCheckout();
  const paymentMethodType = useAppSelector(({ subscribeCheckout }) => subscribeCheckout.paymentMethodType);
  const isSelectedKurlypay = paymentMethodType === PAYMENT_TYPE.KURLY_PAY;

  useEffect(() => {
    const initPayment = head(kurlypayList);

    if (initPayment) {
      const { id, type, companyCode } = initPayment;
      dispatch(setPaymentMethodId(id));
      dispatch(setPaymentKurlypayType(type));
      dispatch(setPaymentKurlypayCompanyCode(companyCode));
    }
  }, [dispatch, kurlypayList]);

  return {
    isSelectedKurlypay,
    kurlypayList,
  };
}
