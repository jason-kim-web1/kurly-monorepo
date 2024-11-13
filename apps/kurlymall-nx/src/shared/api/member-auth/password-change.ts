import { AxiosError } from 'axios';

import { UnknownError } from '../../errors';

import { BaseResponse } from '../../interfaces';

import { handleTokenExpired } from '../../../member/find/error-handlers';
import httpClient from '../../configs/http-client';

const baseUrl = '/member/proxy/member-auth/v1/password-change';

interface Verification {
  is_verify: boolean;
}

export const putResetPassword = async ({ token, password }: { token: string; password: string }) => {
  const url = `${baseUrl}/${token}`;
  try {
    await httpClient.put(url, { password });
  } catch (err) {
    handleTokenExpired(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};

export const fetchVerification = async (token: string) => {
  const url = `${baseUrl}/${token}/verify`;
  try {
    const { data } = await httpClient.get<BaseResponse<Verification>>(url);
    return data.data.is_verify;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};
