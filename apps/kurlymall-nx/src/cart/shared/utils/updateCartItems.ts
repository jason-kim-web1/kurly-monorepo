import { cloneDeep } from 'lodash';

import { CartItem } from '../../../order/cart/interface/CartProduct';

interface Parameter {
  currentCartItems: CartItem[];
  newCartItems: CartItem[];
}

export const updateCartItems = ({ currentCartItems, newCartItems }: Parameter) => {
  const copiedCart = cloneDeep(currentCartItems);

  const { isInCart, updatedCart } = newCartItems.reduce(
    (acc, newItem: CartItem) => {
      const targetItem = acc.updatedCart.find((current) => current.dealProductNo === newItem.dealProductNo);

      if (targetItem) {
        targetItem.quantity += newItem.quantity;
        acc.isInCart = true;
        return acc;
      }

      acc.updatedCart.push(newItem);

      return acc;
    },
    { isInCart: false, updatedCart: copiedCart },
  );

  return { isInCart, updatedCart };
};
