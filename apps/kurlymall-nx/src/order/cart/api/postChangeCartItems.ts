import httpClient from '../../../shared/configs/http-client';
import { BaseResponse } from '../../../shared/interfaces';
import { CartChangeError } from '../../../shared/errors';
import { CartItem } from '../interface/CartProduct';

const CHANGE_CART_ITEM = '/carts/v1/change';

/**
 * 장바구니 상품 수량 변경 API
 *
 * @param { CartItem } cartItem 수량 변경 할 장바구니 상품 정보
 */
export const postChangeCartItems = async (cartItem: CartItem) => {
  try {
    const { data } = await httpClient.put<BaseResponse<{ cartItems: CartItem[] }>>(CHANGE_CART_ITEM, {
      cartItems: [cartItem],
    });

    return data.data;
  } catch (err) {
    throw new CartChangeError(err);
  }
};
