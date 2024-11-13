import { CheckoutProduct } from '../../../../shared/interfaces';

export const isPickupProducts = (products: Array<CheckoutProduct>) => {
  return products.some(({ isPickupDealProduct }) => isPickupDealProduct);
};

export const isGiftCardProducts = (products: Array<CheckoutProduct>) => {
  return products.some(({ isGiftCard }) => isGiftCard);
};
