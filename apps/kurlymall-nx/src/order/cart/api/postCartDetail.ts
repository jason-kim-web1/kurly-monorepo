import { Alert } from '@thefarmersfront/kpds-react';

import httpClient from '../../../shared/configs/http-client';
import { BaseResponse } from '../../../shared/interfaces';
import CartDetailResponse from '../interface/Cart';
import { CartItem } from '../interface/CartProduct';

const CART_DETAIL_URL = 'external-cart/v2/detail';

interface CartDetailRequestParams {
  roadAddress?: string;
  addressDetail?: string;
  cartItems?: CartItem[];
}

const ERROR_MESSAGE = '일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.';

/**
 * 장바구니 상품조회 API
 * API docs: https://gateway.cloud.dev.kurly.services/order-receipt/docs/index.html#장바구니-상세조회-v2-API
 *
 * @param { string } roadAddress 도로명 주소
 * @param { string } addressDetail 상세 주소
 * @param { CartItem } cartItems 장바구니 상품목록(비회원)
 */
export const postCartDetail = async ({ roadAddress, addressDetail, cartItems }: CartDetailRequestParams) => {
  const params = {
    address: roadAddress,
    addressDetail,
    cartItems,
  };

  try {
    const { data } = await httpClient.post<BaseResponse<CartDetailResponse>>(CART_DETAIL_URL, params);

    return data.data;
  } catch (err) {
    await Alert({ contents: ERROR_MESSAGE });
  }
};
