import { isNull } from 'lodash';

import { PAYMENT_TYPE, PaymentType } from '../interfaces';

export const getPaymentButtonTitle = ({
  paymentMethodType,
  paymentMethodId,
  isChangePayment,
  isKurlypayError,
}: {
  paymentMethodType: PaymentType;
  paymentMethodId: string | null;
  isChangePayment?: boolean;
  isKurlypayError?: boolean;
}): string => {
  const isSelectedGhostCard = paymentMethodType === PAYMENT_TYPE.KURLY_PAY && isNull(paymentMethodId);
  const title = isChangePayment ? '변경하기' : '결제하기';

  if (!isKurlypayError && isSelectedGhostCard) {
    return `카드·계좌 등록 후 ${title}`;
  }

  return title;
};
