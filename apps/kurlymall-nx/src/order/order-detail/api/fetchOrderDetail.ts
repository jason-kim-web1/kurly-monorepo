import { AxiosError } from 'axios';

import httpClient from '../../../shared/configs/http-client';
import { NonExistOrderDetailsError, UnknownError } from '../../../shared/errors';
import { OrderDetailResponse } from '../interface/Response';

const fetchOrderDetail = async (groupOrderNo: number) => {
  const url = `/order-external/v2/mypage/orders/${groupOrderNo}`;

  try {
    const { data } = await httpClient.get<OrderDetailResponse>(url);

    return data.data;
  } catch (err) {
    const error = err as AxiosError;

    // 존재하지 않는 주문일 경우 404 error
    if (error?.response?.status === 404) {
      throw new NonExistOrderDetailsError(error);
    }

    throw new UnknownError(error);
  }
};

export default fetchOrderDetail;
