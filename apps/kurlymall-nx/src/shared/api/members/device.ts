import httpClient from '../../configs/http-client';

import { BaseApiResponse, MemberDeviceAgreementResponse } from '../../interfaces';
import { UnknownError } from '../../errors';

// 기기(앱) 알림설정상태 조회
export const fetchDeviceAgreement = async (deviceId: string): Promise<MemberDeviceAgreementResponse> => {
  const url = `/member/proxy/member-mykurly/v1/devices/${deviceId}/agreement`;

  try {
    const { data } = await httpClient.get<BaseApiResponse<MemberDeviceAgreementResponse>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};
