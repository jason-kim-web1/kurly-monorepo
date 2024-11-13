import { AxiosError } from 'axios';

import httpClient from '../../../shared/configs/http-client';
import { NonExistOrderDetailsError, UnknownError } from '../../../shared/errors';
import { OrderToCancelDetailResponse } from '../interface/Reponse';

interface Args {
  groupOrderNo: number;
  orderNos?: number[];
}

const fetchOrderToCancelDetail = async ({ groupOrderNo, orderNos }: Args) => {
  const url = `/order-external/v1/refund-price/calculate`;

  try {
    const { data } = await httpClient.post<OrderToCancelDetailResponse>(url, {
      groupOrderNo,
      orderNos,
    });

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

export default fetchOrderToCancelDetail;
