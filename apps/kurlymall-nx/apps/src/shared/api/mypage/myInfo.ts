import httpClient from '../../configs/http-client';
import { BaseApiResponse } from '../../interfaces';
import { MyInfoResponses, PostMypageInfoForm } from '../../../mypage/myinfo/interfaces/MyInfoForm.interface';

export const requestPasswordConfirm = async (password: string) => {
  const url = '/member/proxy/member-main/v1/member/password-check';

  const { data } = await httpClient.post(url, { password });
  return data;
};

export const updateMyinfoModify = async (form: PostMypageInfoForm): Promise<MyInfoResponses> => {
  const url = '/member/proxy/member-main/v1/member';

  const { data } = await httpClient.put<BaseApiResponse<MyInfoResponses>>(url, form);
  return data.data;
};

// 개인 정보 수정 - 정보 조회
export const readMyInfo = async (): Promise<MyInfoResponses> => {
  const url = '/member/proxy/member-main/v1/member';

  const { data } = await httpClient.get<BaseApiResponse<MyInfoResponses>>(url);
  return data.data;
};
