import axios, { AxiosError, AxiosResponse } from 'axios';

import { UnauthenticatedError, UnknownError } from '../../errors';

import { BaseApiResponse, UserInfo } from '../../interfaces';

import { LoginFormInterface } from '../../../member/login/pc/interfaces/loginForm.interface';
import encodeRemoteImage from '../../utils/image/imageEncoder';

export interface Token {
  accessToken: string;
  isGuest: boolean;
  cartId?: string;
  uid: string;
}

interface Session {
  accessToken: string;
  isGuest: boolean;
  uid: string;
  userInfo?: UserInfo;
}

interface Response {
  message: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  isGuest: boolean;
  uid: string;
}

export enum LoginStatus {
  NORMAL = 'NORMAL',
  LOCKED = 'LOCKED',
}

interface LoginResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  can_recommend_change_password?: boolean;
  login_status: LoginStatus;
}

export const fetchSession = async (): Promise<Session> => {
  try {
    const { data } = await axios.get<Session>('/nx/api/session');
    return data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};

export const putSession = async (accessToken: string): Promise<Token> => {
  try {
    const { data } = await axios.put<Token>('/nx/api/session', undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};

export const refreshToken = async (accessToken: string): Promise<RefreshTokenResponse> => {
  try {
    const configs = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await axios.post<RefreshTokenResponse>('/nx/api/refresh', {}, configs);
    return data;
  } catch (err) {
    const status = (err as AxiosError<Response>).response?.status ?? 500;
    if (status === 400 || status === 404) {
      throw new UnauthenticatedError(err);
    }

    throw new UnknownError(err);
  }
};

export const generateSession = async ({
  id: user_id,
  password,
  captcha,
  guestJwt,
}: LoginFormInterface): Promise<AxiosResponse<BaseApiResponse<LoginResponse>>> => {
  const endpoint = '/shop/member/kurly_login.php';
  return axios.post(
    endpoint,
    {
      user_id,
      password,
      captcha,
      ...(guestJwt && { guest_token: guestJwt }),
    },
    {
      withCredentials: true,
    },
  );
};

export const getCaptchaImageBase64 = async (): Promise<{ image: string }> => {
  const endpoint = '/shop/proc/captcha2.php';

  const encodeImage = await encodeRemoteImage(endpoint, {
    withCredentials: true,
  });

  return { image: encodeImage };
};
