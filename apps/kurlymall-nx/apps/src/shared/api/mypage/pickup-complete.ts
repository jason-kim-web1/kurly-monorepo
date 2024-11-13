import httpClient from '../../configs/http-client';
import { BaseResponse } from '../../interfaces';

export const postPickupComplete = async ({ groupOrderNo }: { groupOrderNo: number }) => {
  const url = '/order/v1/pickup/complete';
  try {
    await httpClient.post<BaseResponse<null>>(url, { groupOrderNo });
  } catch (err) {
    throw err;
  }
};
