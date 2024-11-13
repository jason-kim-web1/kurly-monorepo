import { useCallback } from 'react';

import styled from '@emotion/styled';

import PaymentMethodCategoryButton from '../../shared/components/PaymentMethodCategoryButton';

import { PaymentEvents, PaymentVendor, VendorCode, VendorCodeWithDeleted, VendorCodes } from '../../shared/interfaces';

import { isCreditCardPayments } from '../../shared/services';
import KurlypayButton from '../../../checkout/m/components/Kurlypay/KurlypayButton';
import { NaverPayButton } from '../../shared/components/paymentMethod/NaverPayButton';

const Wrapper = styled.div`
  > * + * {
    margin-top: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  > button + button {
    margin-left: 8px;
  }
`;

interface Props {
  selectedVendor?: PaymentVendor;
  hasSimplePayEvent: boolean;
  event: PaymentEvents;
  disableVendor?: VendorCodeWithDeleted[];
  onClickPaymentVendor: (vendor: VendorCode) => void;
  onClickSimplePay: () => void;
}

export default function PaymentMethodButtons({
  selectedVendor,
  event,
  hasSimplePayEvent,
  onClickPaymentVendor,
  onClickSimplePay,
  disableVendor,
}: Props) {
  const handleClick = useCallback(
    (code: VendorCode) => {
      onClickPaymentVendor(code);
    },
    [onClickPaymentVendor],
  );

  return (
    <Wrapper>
      <KurlypayButton selectedVendor={selectedVendor} event={event} onClickPaymentVendor={handleClick} />
      <NaverPayButton
        selectedVendor={selectedVendor}
        event={event}
        disableVendor={disableVendor}
        onClickPaymentVendor={onClickPaymentVendor}
      />
      <ButtonGroup>
        <PaymentMethodCategoryButton
          testId="creditcard-button"
          active={isCreditCardPayments(selectedVendor?.code)}
          hasEvent={!!event['toss-payments'] || !!event['kurlypay-credit']}
          onClick={() => handleClick('kurlypay-credit')}
        >
          신용카드
        </PaymentMethodCategoryButton>
        <PaymentMethodCategoryButton
          testId="simplepay-button"
          active={!!selectedVendor?.isSimplePay}
          hasEvent={hasSimplePayEvent}
          onClick={onClickSimplePay}
          disabled={[VendorCodes.NAVER_PAY, VendorCodes.TOSS, VendorCodes.PAYCO].every((code) =>
            disableVendor?.includes(code),
          )}
        >
          간편 결제
        </PaymentMethodCategoryButton>
        <PaymentMethodCategoryButton
          testId="phonebill"
          active={selectedVendor?.code === 'phonebill'}
          hasEvent={!!event.phonebill}
          onClick={() => handleClick('phonebill')}
          disabled={disableVendor?.includes(VendorCodes.PHONEBILL)}
        >
          휴대폰
        </PaymentMethodCategoryButton>
      </ButtonGroup>
    </Wrapper>
  );
}
