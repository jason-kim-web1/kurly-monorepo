import { CartItem } from '../interface/CartProduct';
import httpClient, { withCredentialsOption } from '../../../shared/configs/http-client';
import { BaseResponse } from '../../../shared/interfaces';
import { handleAddCartError } from '../../../shared/error-handlers/AddCartErrorHandlers';

/**
 * 장바구니 상품 재 추가
 *
 * @param { CartItem[] } cartItems 장바구니에 추가할 상품 리스트
 */
export const postReAddCartItems = async (cartItems: CartItem[]) => {
  try {
    const { data } = await httpClient.post<
      BaseResponse<{
        meta: {
          count: number;
          isInCart: boolean;
        };
        cartItems: CartItem[];
      }>
    >(
      '/external-cart/v1/re-add',
      {
        cartItems,
      },
      withCredentialsOption,
    );

    return data.data;
  } catch (err) {
    throw handleAddCartError(err);
  }
};
