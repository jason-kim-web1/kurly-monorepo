import { UnknownError } from '../../errors';
import { BaseApiResponse, MemberDuplicationBody, MemberExistentBody } from '../../interfaces';
import httpClient from '../../configs/http-client';
import { PostSignupFormInterface } from '../../../member/signup/interfaces/NormalSignupForm.interface';

export interface VerificationForm {
  path: 'sign-up' | 'update-member';
  mobileNumber: string;
  authCode?: string;
}

const apiEndpoint = '/member/proxy/member-main';

export const sendMobileAuthCode = async ({ path, mobileNumber }: VerificationForm) => {
  const url = `${apiEndpoint}/v1/member/${path}/send/auth-code`;
  const { data } = await httpClient.post<BaseApiResponse<void>>(url, { mobileNumber });

  return data;
};

export const verifyMobileAuthCode = async ({ path, mobileNumber, authCode }: VerificationForm) => {
  const url = `${apiEndpoint}/v1/member/${path}/verify/auth-code`;
  const { data } = await httpClient.post<BaseApiResponse<void>>(url, { mobileNumber, authCode });

  return data;
};

// 회원정보 중복체크
export const readMemberDuplicationStatus = async (
  checkBody: MemberDuplicationBody,
): Promise<{ isDuplicated: boolean }> => {
  const url = `${apiEndpoint}/v1/member/duplication-check`;
  const { data } = await httpClient.post<BaseApiResponse<{ isDuplicated: boolean }>>(url, checkBody);
  return data.data;
};

// 회원가입
export const insertMember = async (formValues: PostSignupFormInterface): Promise<{ memberNo: number }> => {
  const url = `${apiEndpoint}/v1/member/join`;
  const { data } = await httpClient.post<BaseApiResponse<{ memberNo: number }>>(url, formValues);
  return data.data;
};

// 회원 존재 확인 (추천인 존재 확인용)
export const readMemberVerifyExistent = async (checkBody: MemberExistentBody): Promise<{ existent: boolean }> => {
  const url = `${apiEndpoint}/v1/members/verify-existent`;

  try {
    const { data } = await httpClient.post<BaseApiResponse<{ existent: boolean }>>(url, checkBody);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};
