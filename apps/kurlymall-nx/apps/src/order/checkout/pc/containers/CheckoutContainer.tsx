import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';
import useCheckoutSubmit from '../../shared/hooks/useCheckoutSubmit';
import { addComma } from '../../../../shared/services';

import Button from '../../../../shared/components/Button/Button';

const Wrapper = styled.div`
  text-align: center;
`;

const styles = {
  button: {
    margin: '40px auto 30px',
    fontWeight: 500,
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
        width={240}
        height={56}
        radius={3}
        css={styles.button}
        isSubmitLoading={isPaymentButtonLoading}
        disabled={isGiftCardOrder && hasKurlypayError}
      />
    </Wrapper>
  );
}
