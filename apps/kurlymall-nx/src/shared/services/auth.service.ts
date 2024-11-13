import axios, { AxiosError } from 'axios';

import { fetchSession, generateSession } from '../api/auth/token';

import { LoginFormInterface, LoginSuccess } from '../../member/login/pc/interfaces/loginForm.interface';
import { BaseApiResponse } from '../interfaces';
import { amplitudeService } from '../amplitude';
import { LoginSuccess as AmplitudeLoginSuccess } from '../amplitude/events/login/LoginSuccess';
import { LoginFail as AmplitudeLoginFail } from '../amplitude/events/login/LoginFail';
import { API_URL } from '../configs/config';
import { UnknownError } from '../errors';
import { extractAuthentication } from '../utils/token';

export const getSession = () => fetchSession();

export const getGuestToken = async (): Promise<{ accessToken: string; isGuest: boolean }> => {
  const url = '/v3/auth/guest';
  try {
    const { data } = await axios.post(API_URL + url);
    return {
      accessToken: data.data.access_token,
      isGuest: true,
    };
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const postLogin = async ({ id, password, captcha, guestJwt }: LoginFormInterface): Promise<LoginSuccess> => {
  try {
    const {
      data: { data },
    } = await generateSession({ id, password, captcha, guestJwt });
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      token_type: tokenType,
      can_recommend_change_password: canRecommendChangePassword = false,
      login_status: loginStatus,
    } = data;
    const { uid } = extractAuthentication(accessToken);
    amplitudeService.setUserId(uid);
    amplitudeService.logEvent(new AmplitudeLoginSuccess({ joinPath: 'kurly' }));
    return {
      accessToken,
      expiresIn,
      tokenType,
      canRecommendChangePassword,
      loginStatus,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const castingError = err as AxiosError<
        BaseApiResponse<{ error: { message: string }; errors: { messages: string[] }[]; login_fail_count?: number }>
      >;
      let errorMessage = '로그인에 실패하였습니다.\n고객센터로 문의 주시기 바랍니다.\n\n이용에 불편을 드려 죄송합니다.';
      let loginFailCount = 0;

      if (castingError.response?.data?.data) {
        const { errors, error, login_fail_count: failCount } = castingError.response?.data?.data;

        loginFailCount = failCount ?? 0;

        if (errors) {
          errorMessage = errors[0]?.messages[0] ?? errorMessage;
        } else if (error) {
          errorMessage = error.message;
        }
      }

      amplitudeService.logEvent(new AmplitudeLoginFail({ message: errorMessage }));

      throw Error(JSON.stringify({ errorMessage, loginFailCount }));
    }
    throw new Error(err);
  }
};
