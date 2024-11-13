import httpClient from '../../../shared/configs/http-client';
import { UnknownError } from '../../../shared/errors';
import { OrderListResponse } from '../interface/OrderList';

interface OrderListRequestParams {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
}

const URL = '/order-external/v2/mypage/orders';

/**
 * 주문 목록 조회 API
 * API docs: https://gateway.cloud.dev.kurly.services/order-receipt/docs/index.html#_v2
 *
 * @param { startDate } startDate 시작 일자(yyyy-mm-ddT00:00:00)
 * @param { endDate } endDate 종료 일자(yyyy-mm-ddT00:00:00)
 * @param { page } page 페이지 번호
 * @param { limit } limit 페이지 내 표기수
 */
export const fetchOrderList = async (params: OrderListRequestParams) => {
  try {
    const {
      data: { data },
    } = await httpClient.get<OrderListResponse>(URL, { params });

    return data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};
