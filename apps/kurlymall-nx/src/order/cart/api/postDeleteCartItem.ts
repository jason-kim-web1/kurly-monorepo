import httpClient, { withCredentialsOption } from '../../../shared/configs/http-client';
import { BaseResponse } from '../../../shared/interfaces';
import { CartChangeError } from '../../../shared/errors';

const DELETE_CART_ITEM = 'carts/v1/remove';

/**
 * 장바구니의 품목 삭제
 *
 * @param { numbers[] } dealProductNos
 */
export const postDeleteCartItem = async (dealProductNos: number[]) => {
  try {
    await httpClient.post<BaseResponse<null>>(DELETE_CART_ITEM, { dealProductNos }, withCredentialsOption);
  } catch (err) {
    throw new CartChangeError(err);
  }
};
