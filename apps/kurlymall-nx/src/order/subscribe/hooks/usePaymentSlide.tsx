import { useEffect, useState } from 'react';

import { Swiper } from 'swiper/types';

import { get } from 'lodash';

import { useDispatch } from 'react-redux';

import useKurlyMembersCheckout from './useKurlyMembersCheckout';
import { NavigationButton, PAYMENT_TYPE } from '../interfaces';
import { PaymentMethod } from '../interfaces/KurlyMembersProduct.interface';
import {
  setPaymentKurlypayCompanyCode,
  setPaymentKurlypayType,
  setPaymentMethodId,
  setPaymentMethodType,
} from '../reducers/subscribeCheckout.slice';

export default function usePaymentSlide() {
  const [swiper, setSwiper] = useState<Swiper>();
  const [navigationButton, setNavigationButton] = useState<NavigationButton>();
  const dispatch = useDispatch();
  const { kurlypayList } = useKurlyMembersCheckout();

  const setPaymentSlide = (paymentSwiper: Swiper) => {
    setSwiper(paymentSwiper);

    const { isEnd } = paymentSwiper;
    setNavigationButton({ showNextButton: !isEnd });
  };

  const changeKurlypayPayment = (paymentMethod?: PaymentMethod) => {
    dispatch(setPaymentMethodType(PAYMENT_TYPE.KURLY_PAY));

    if (!paymentMethod) {
      dispatch(setPaymentMethodId(null));
      return;
    }

    const { id, type, companyCode } = paymentMethod;

    dispatch(setPaymentMethodId(id));
    dispatch(setPaymentKurlypayType(type));
    dispatch(setPaymentKurlypayCompanyCode(companyCode));
  };

  const handleClickPaymentSlide = () => {
    if (!swiper?.slides) {
      return;
    }

    const selectKurlypayPayment = get(kurlypayList, swiper.activeIndex);
    changeKurlypayPayment(selectKurlypayPayment);
  };

  const handleClickPrevButton = () => {
    swiper?.slidePrev();
  };

  const handleClickNextButton = () => {
    swiper?.slideNext();
  };

  useEffect(() => {
    if (!swiper?.slides) {
      return;
    }

    swiper.on('realIndexChange', ({ isBeginning, isEnd }) => {
      setNavigationButton({ showPrevButton: !isBeginning, showNextButton: !isEnd });
    });
  }, [swiper]);

  return {
    setPaymentSlide,
    handleClickPaymentSlide,
    slideNavigationButton: {
      navigationButton,
      handleClickPrevButton,
      handleClickNextButton,
    },
  };
}
