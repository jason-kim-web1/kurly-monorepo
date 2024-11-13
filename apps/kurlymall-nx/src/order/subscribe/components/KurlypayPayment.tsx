import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import React from 'react';

import PaymentMethodButton from './PaymentMethodButton';
import { PAYMENT_TYPE } from '../interfaces';
import KurlypaySlide from './KurlypaySlide';
import usePaymentSlide from '../hooks/usePaymentSlide';
import useKurlypayPayment from '../hooks/useKurlypayPayment';

const Wrapper = styled.div`
  position: relative;

  > label {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export default function KurlypayPayment() {
  const { isKurlypayError, kurlypayList, kurlypayIcon } = useKurlypayPayment();
  const { handleClickPaymentSlide, setPaymentSlide, slideNavigationButton } = usePaymentSlide();

  if (isEmpty(kurlypayList) || isKurlypayError) {
    return <PaymentMethodButton title={kurlypayIcon} paymentType={PAYMENT_TYPE.KURLY_PAY} />;
  }

  return (
    <Wrapper>
      <PaymentMethodButton
        title={kurlypayIcon}
        paymentType={PAYMENT_TYPE.KURLY_PAY}
        handleClickPaymentSlide={handleClickPaymentSlide}
      />
      <KurlypaySlide
        setPaymentSlide={setPaymentSlide}
        handleClickPaymentSlide={handleClickPaymentSlide}
        slideNavigationButton={slideNavigationButton}
      />
    </Wrapper>
  );
}
