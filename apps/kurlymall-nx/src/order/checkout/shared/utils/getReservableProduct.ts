import { CheckoutProduct, CheckoutProductItem } from '../../../../shared/interfaces';

export const isReservableProducts = (products: Array<CheckoutProduct>) => {
  return products.some(({ isReservable }) => isReservable);
};

export const getReservableProducts = (products?: Array<CheckoutProductItem>) => {
  if (!products) {
    return [];
  }

  return products.reduce(
    (acc: Array<CheckoutProductItem>, cur: CheckoutProductItem) => (cur.isReservable ? [...acc, cur] : acc),
    [],
  );
};
