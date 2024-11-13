import httpClient from '../../configs/http-client';

import { LeaveRequest } from '../../../mypage/leave/interface/Leave.interface';
import { UseServiceStatusResponses } from '../../../mypage/myinfo/interfaces/MyInfoForm.interface';

export const postLeave = async (params: LeaveRequest): Promise<UseServiceStatusResponses> => {
  const url = '/member/proxy/member-main/v1/member/withdraw';

  const { data } = await httpClient.post(url, params);
  return data.data;
};
