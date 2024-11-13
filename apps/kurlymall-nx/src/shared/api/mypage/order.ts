import { AxiosError } from 'axios';

import httpClient from '../../configs/http-client';
import { handleMypageCancelError } from '../../error-handlers/MypageCancelHandlers';
import { CartItem } from '../../../order/cart/interface/CartProduct';
import { BaseApiResponse } from '../../interfaces';

export interface OrderCancelParams {
  groupOrderNo: number;
  reasonDetail: string;
  orderNos?: number[];
}

export interface OrderCancelResponse {
  address: string;
  addressDetail: string;
  isAddBackToCart: boolean;
  dealProducts: CartItem[];
}

export const cancelMypageOrders = async ({ groupOrderNo, reasonDetail, orderNos }: OrderCancelParams) => {
  const endpoint = `/order-front/v1/mypage/orders/${groupOrderNo}/cancel`;

  try {
    const { data } = await httpClient.put<BaseApiResponse<OrderCancelResponse>>(endpoint, { orderNos, reasonDetail });
    return data.data;
  } catch (err) {
    throw handleMypageCancelError(err as AxiosError);
  }
};
