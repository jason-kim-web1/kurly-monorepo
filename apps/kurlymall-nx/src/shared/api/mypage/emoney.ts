import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';

interface FetchEMoneyListResponse {
  data: {
    total_emoney: number;
    expire_date: number;
    expire_point: number;
    emoney_lists: {
      ordno: number;
      reg_date: number;
      point: number;
      detail: string;
      expire_date: number;
      order_type: string;
    }[];
  };
  paging: {
    total: number;
    next_page_no: number;
  };
}

interface EMoneyListParams {
  pageLimit?: number;
  pageNo: number;
}

export const fetchEMoneyList = async ({
  pageLimit = 10,
  pageNo,
}: EMoneyListParams): Promise<FetchEMoneyListResponse> => {
  const endpoint = '/v1/mypage/emoney';
  try {
    const { data } = await httpClient.get<FetchEMoneyListResponse>(endpoint, {
      params: { page_limit: pageLimit, page_no: pageNo },
    });
    return data;
  } catch (err) {
    throw new UnknownError(err);
  }
};
