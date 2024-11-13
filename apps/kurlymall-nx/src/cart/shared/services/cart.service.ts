import { isEmpty } from 'lodash';

import { syncCartItems } from '../../../order/cart/api/postGuestSyncCartItems';
import { postAddCartItems } from '../../../order/cart/api/postAddCartItems';

import { loadCartItems, removeCartItemsInLocalStorage } from './cart-items.storage.service';
import { ignoreError } from '../../../shared/utils/general';
import { updateCartItems } from '../utils/updateCartItems';
import { CartItem } from '../../../order/cart/interface/CartProduct';

export const addCartItems = async ({
  isGuest,
  currentCartItems,
  newCartItems,
}: {
  isGuest: boolean;
  currentCartItems: CartItem[];
  newCartItems: CartItem[];
}) => {
  if (isGuest) {
    const { isInCart, updatedCart } = updateCartItems({ currentCartItems, newCartItems });
    ignoreError(async () => {
      await postAddCartItems(newCartItems);
    });
    return {
      count: updatedCart.length,
      isInCart,
      cartItems: updatedCart,
    };
  }

  const { meta, cartItems: serverCartItems } = await postAddCartItems(newCartItems);
  return {
    count: meta.count,
    isInCart: meta.isInCart,
    cartItems: serverCartItems,
  };
};

export const syncUserCartItems = async (accessToken: string) => {
  const guestCartItems = loadCartItems();

  if (isEmpty(guestCartItems)) {
    return;
  }

  await syncCartItems(accessToken, guestCartItems);
  removeCartItemsInLocalStorage();
};
