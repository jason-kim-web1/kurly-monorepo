import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../shared/constant/colorset';
import { isPC } from '../../../../util/window/getDevice';
import KurlypayPayment from './KurlypayPayment';
import usePaymentMethod from '../hooks/usePaymentMethod';
import PaymentMethodButton from './PaymentMethodButton';
import { PAYMENT_TYPE } from '../interfaces';
import { KURLY_PAY_ERROR_MESSAGE } from '../constants';
import Info from '../../../shared/icons/Info';
import NaverPay from '../../../shared/icons/NaverPay';

const Wrapper = styled.div`
  padding: 18px 20px;
  border-bottom: 8px solid ${COLOR.bg};

  ${isPC &&
  css`
    padding: 18px 30px;
    border-bottom-width: 1px;
  `}
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${isPC ? 25 : 16}px;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};

  ${isPC &&
  css`
    font-weight: 600;
  `}
`;

const SelectedPaymentName = styled.div`
  font-size: 15px;
`;

const KurlypayErrorMessage = styled.p`
  display: flex;
  align-items: center;
  margin-top: 12px;
  color: ${COLOR.invalidRed};
  font-size: 12px;

  > svg {
    margin-right: 5px;
  }
`;

export default function Payment() {
  const { selectedPayment, isKurlypayError } = usePaymentMethod();

  return (
    <Wrapper>
      <Title>
        결제수단
        <SelectedPaymentName>{selectedPayment}</SelectedPaymentName>
      </Title>

      {/*컬리페이*/}
      <KurlypayPayment />

      {/*네이버페이*/}
      <PaymentMethodButton
        title={<NaverPay fill={isKurlypayError ? COLOR.lightGray : COLOR.kurlyBlack} />}
        paymentType={PAYMENT_TYPE.NAVER_PAY}
      />

      {/*신용카드*/}
      <PaymentMethodButton title="신용카드" paymentType={PAYMENT_TYPE.CREDIT} />

      {isKurlypayError && (
        <KurlypayErrorMessage>
          <Info width={11} height={11} fill={COLOR.invalidRed} />
          {KURLY_PAY_ERROR_MESSAGE}
        </KurlypayErrorMessage>
      )}
    </Wrapper>
  );
}
