import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';
import { addComma } from '../../../../shared/services';

import useCheckoutSubmit from '../../shared/hooks/useCheckoutSubmit';

import Button from '../../../../shared/components/Button/Button';

const Wrapper = styled.div`
  padding: 18px 12px 8px;

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }
`;

const styles = {
  button: {
    '> span': {
      fontWeight: 600,
    },
  },
};

export default function CheckoutContainer() {
  const { submitCheckout } = useCheckoutSubmit();

  const { paymentPrice, isPaymentButtonLoading, isGiftCardOrder } = useAppSelector(({ checkout }) => ({
    paymentPrice: checkout.price.paymentPrice,
    isPaymentButtonLoading: checkout.isPaymentButtonLoading,
    isGiftCardOrder: checkout.isGiftCardOrder,
  }));
  const hasKurlypayError = useAppSelector(({ checkoutPayment }) => checkoutPayment.hasKurlypayError);

  return (
    <Wrapper>
      <Button
        text={`${addComma(paymentPrice)}원 결제하기`}
        onClick={submitCheckout}
        css={styles.button}
        radius={6}
        isSubmitLoading={isPaymentButtonLoading}
        disabled={isGiftCardOrder && hasKurlypayError}
      />
    </Wrapper>
  );
}
