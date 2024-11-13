import httpClient from '../../../shared/configs/http-client';
import { BaseResponse } from '../../../shared/interfaces';
import { CartSyncError, UnknownError } from '../../../shared/errors';
import { CartItem } from '../interface/CartProduct';

const CART_REFRESH_URL = '/carts/v1/refresh';

interface CartRefreshResponse {
  cartItems: CartItem[];
}

/**
 * 장바구니 상품 조회(라이트 버전) - 회원만 사용 가능
 * 주로 PC 헤더의 장바구니 아이콘 상품 갯수 갱신에 사용됩니다.
 * detail api 의 가벼운 버전으로 딜 번호, 수량, 담은 시간을 반환합니다.
 */
export const loadCartRefresh = async () => {
  try {
    const { data } = await httpClient.get<BaseResponse<CartRefreshResponse>>(CART_REFRESH_URL);

    return data.data.cartItems;
  } catch (err) {
    if (err.response?.data.code === '1101') {
      throw new CartSyncError(err);
    }
    throw new UnknownError(err);
  }
};
