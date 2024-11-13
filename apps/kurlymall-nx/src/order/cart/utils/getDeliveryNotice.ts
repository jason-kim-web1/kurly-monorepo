import { isNotEmpty } from '../../../shared/utils/lodash-extends';
import { ProceedToCheckoutResponse } from '../api/postProceedToCheckout';

export const getDeliveryNotice = (proceedToCheckoutResult: ProceedToCheckoutResponse) => {
  const deliveryNotice = proceedToCheckoutResult.displayMessage.deliveryNotice;
  const hasDeliveryMessage = isNotEmpty(deliveryNotice.text);

  return { deliveryNotice, hasDeliveryMessage };
};
