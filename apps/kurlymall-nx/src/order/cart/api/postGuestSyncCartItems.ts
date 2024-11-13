import axios from 'axios';

import { CartItem } from '../interface/CartProduct';
import { API_URL } from '../../../shared/configs/config';
import { withCredentialsOption } from '../../../shared/configs/http-client';
import { handleAddCartError } from '../../../shared/error-handlers/AddCartErrorHandlers';

const SYNC_CART_ITEMS_URL = `${API_URL}/carts/v1/sync`;

/**
 * 비회원이 담은 장바구니 상품을 로그인 시 동기화 하는 api
 *
 * @param {string} accessToken 엑세스 토큰
 * @param {CartItem[]} cartItems 동기화 하려는 장바구니 상품
 */
export const syncCartItems = async (accessToken: string, cartItems: CartItem[]) => {
  try {
    const data = await axios.post(
      SYNC_CART_ITEMS_URL,
      {
        cartItems,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ...withCredentialsOption,
      },
    );

    return data.data;
  } catch (err) {
    throw handleAddCartError(err);
  }
};
