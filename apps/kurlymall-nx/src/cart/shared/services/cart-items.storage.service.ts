import { loadLocalStorage, removeLocalStorage, storeLocalStorage } from '../../../shared/services/storage.service';
import { CartItem } from '../../../order/cart/interface/CartProduct';

export const storeCartItems = (cartItems: CartItem[]) => {
  document.cookie = `cart_count=${cartItems.length};path=/;domain=kurly.com;`;
  return storeLocalStorage('cartItems', cartItems);
};

export const removeCartItemsInLocalStorage = () => {
  document.cookie = `cart_count=0;path=/;domain=kurly.com;`;
  return removeLocalStorage('cartItems');
};

export const loadCartItems = (): CartItem[] => {
  const cartItems = loadLocalStorage<CartItem[]>('cartItems') ?? [];
  document.cookie = `cart_count=${cartItems.length};path=/;domain=kurly.com;`;
  return cartItems;
};

export const changeCartItemInLocalStorage = (cartItem: CartItem) => {
  const cartItems = loadCartItems();

  const newCartItems = (cartItems ?? []).filter((it) => it.dealProductNo !== cartItem.dealProductNo);

  document.cookie = `cart_count=${newCartItems.length};path=/;domain=kurly.com;`;

  return storeCartItems([...newCartItems, cartItem]);
};
