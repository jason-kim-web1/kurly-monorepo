import httpClient from '../../configs/http-client';
import type { CartPopup } from '../../interfaces/CartPopup';
import type { BaseResponse } from '../../interfaces';

export const fetchCartProduct = async (productCode: number): Promise<BaseResponse<CartPopup>> => {
  try {
    const path = `/showroom/v2/cart-popup/${Number(productCode)}`;

    const { data } = await httpClient.get<BaseResponse<CartPopup>>(path);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message);
  }
};
