import { loadLocalStorage, removeLocalStorage, storeLocalStorage } from '../../../shared/services/storage.service';
import { DeliveryTimeType } from '../../../shared/interfaces/ShippingAddress';
import { ProceedToCheckoutRequest } from '../../../order/cart/api/postProceedToCheckout';

export const storeCartCounter = (params: ProceedToCheckoutRequest) => {
  return storeLocalStorage('cartCounter', params);
};

export const removeCartCounter = () => {
  return removeLocalStorage('cartCounter');
};

export const loadCartCounter = (): ProceedToCheckoutRequest => {
  const result: ProceedToCheckoutRequest | null = loadLocalStorage('cartCounter');

  if (result === null) {
    return {
      dealProducts: [],
      address: '',
      deliveryPolicy: DeliveryTimeType.DAWN,
      isDirectCheckout: false,
      showKurlyMembersPopupMessage: true,
    };
  }

  return result;
};
