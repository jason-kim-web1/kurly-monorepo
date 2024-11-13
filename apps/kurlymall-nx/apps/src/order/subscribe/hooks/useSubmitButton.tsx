import useKurlyMembersCheckout from './useKurlyMembersCheckout';
import { useAppSelector } from '../../../shared/store';
import { getPaymentButtonTitle } from '../utils/paymentButtonTitle';

export default function useSubmitButton() {
  const { isChangePayment, isPaymentsLoading, paymentMethodType, paymentMethodId } = useAppSelector(
    ({ subscribeCheckout }) => ({
      isChangePayment: subscribeCheckout.isChangePayment,
      isPaymentsLoading: subscribeCheckout.isPaymentLoading,
      paymentMethodType: subscribeCheckout.paymentMethodType,
      paymentMethodId: subscribeCheckout.paymentMethodId,
    }),
  );
  const { isLoading, isError, isKurlypayError } = useKurlyMembersCheckout();

  const buttonTitle = getPaymentButtonTitle({ paymentMethodType, paymentMethodId, isChangePayment, isKurlypayError });

  return {
    isLoading: isLoading || isError,
    isPaymentsLoading,
    buttonTitle,
  };
}
