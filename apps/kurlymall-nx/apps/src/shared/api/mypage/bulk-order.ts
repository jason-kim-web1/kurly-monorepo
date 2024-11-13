import httpClient from '../../configs/http-client';
import {
  BulkOrderFormRequest,
  BulkOrderFormResponse,
} from '../../../mypage/bulk-order/interfaces/BulkOrderForm.interface';
import { BaseApiResponse } from '../../interfaces';
import { UnknownError } from '../../errors';

export const requestBulkOrder = async (params: BulkOrderFormRequest): Promise<BulkOrderFormResponse> => {
  const url = '/member/proxy/member-board/v1/large-orders';

  const requestParams = (({ agreePrivacyUse, ...param }) => param)(params);
  try {
    const { data } = await httpClient.post<BaseApiResponse<BulkOrderFormResponse>>(url, requestParams);
    return data.data;
  } catch (error) {
    throw new UnknownError(error);
  }
};
