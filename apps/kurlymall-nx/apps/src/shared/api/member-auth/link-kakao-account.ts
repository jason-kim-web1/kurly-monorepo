import axios, { AxiosError } from 'axios';

import {
  handleAlreadyExistAccount,
  handleForeginPhoneNumber,
  handleInvalidPassword,
  handleInvalidPhoneNumber,
  handleNotFoundKakaoAccount,
  handleNotFoundPhoneNumber,
  handleSocialTokenExpired,
  handleWithdrawnMember,
} from '../../../member/signup/errors';

import { LinkForm } from '../../../member/signup/interfaces';

import { UnknownError } from '../../errors';
import { BaseResponse } from '../../interfaces';
import httpClient from '../../configs/http-client';
import { setLockedToken } from '../../../member/block/shared/service';
import { LoginStatus } from '../auth/token';
import { COMMON_PATH, getPageUrl } from '../../constant';

const baseUrl = '/member/proxy/member-auth/v1';

interface Account {
  matching_data: string;
  members: {
    member_no: string;
    member_id: number;
  }[];
}

interface Login {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
    login_status?: string;
  };
}

export const postInterlinkableAccount = async (values: { provider: string; socialLoginToken: string }) => {
  const url = `${baseUrl}/social/link/${values.provider}`;
  try {
    const { data } = await httpClient.get<BaseResponse<Account>>(url, {
      params: {
        social_login_token: values.socialLoginToken,
      },
    });
    return {
      matchingData: data.data.matching_data,
      members: data.data.members.map((it) => ({
        ...it,
        memberNo: it.member_no,
        memberId: it.member_id,
      })),
    };
  } catch (err) {
    handleWithdrawnMember(err as AxiosError);
    handleNotFoundKakaoAccount(err as AxiosError);
    handleSocialTokenExpired(err as AxiosError);
    handleForeginPhoneNumber(err as AxiosError);
    handleAlreadyExistAccount(err as AxiosError);
    handleNotFoundPhoneNumber(err as AxiosError);
    handleInvalidPhoneNumber(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};

export const postLinkKakaoAccount = async ({
  provider,
  socialLoginToken,
  form,
}: {
  provider: string;
  socialLoginToken: string;
  form: LinkForm;
}) => {
  const url = `${baseUrl}/social/link/${provider}`;
  try {
    await httpClient.post(url, {
      social_login_token: socialLoginToken,
      member_no: form.memberNo,
      password: form.password,
    });
  } catch (err) {
    handleInvalidPassword(err as AxiosError);
    handleNotFoundKakaoAccount(err as AxiosError);
    handleSocialTokenExpired(err as AxiosError);
    handleForeginPhoneNumber(err as AxiosError);
    handleAlreadyExistAccount(err as AxiosError);
    handleNotFoundPhoneNumber(err as AxiosError);
    handleInvalidPhoneNumber(err as AxiosError);

    throw new UnknownError(err as AxiosError);
  }
};

export const postKakaoLogin = async ({
  provider,
  socialLoginToken,
}: {
  provider: string;
  socialLoginToken: string;
}) => {
  const url = '/shop/proc/login/sns-login.php';
  try {
    const { data } = await axios.get<Login>(url, {
      withCredentials: true,
      params: {
        provider,
        social_login_token: socialLoginToken,
      },
    });

    const {
      access_token: accessToken,
      login_status: loginStatus,
      token_type: tokenType,
      expires_in: expiresIn,
    } = data.data;

    if (loginStatus && loginStatus === LoginStatus.LOCKED && accessToken) {
      setLockedToken(accessToken);
      window.location.assign(getPageUrl(COMMON_PATH.blockInfo));
      throw new Error('잠긴 계정으로 로그인하여 차단 해지 페이지로 이동합니다.');
    }

    return {
      success: data.success,
      message: data.message,
      data: {
        accessToken,
        tokenType,
        expiresIn,
      },
    };
  } catch (err) {
    handleWithdrawnMember(err as AxiosError);
    handleNotFoundKakaoAccount(err as AxiosError);
    handleSocialTokenExpired(err as AxiosError);
    handleForeginPhoneNumber(err as AxiosError);
    handleAlreadyExistAccount(err as AxiosError);
    handleNotFoundPhoneNumber(err as AxiosError);
    handleInvalidPhoneNumber(err as AxiosError);

    // TODO: 현재 v2 에서는 로그인 시 서버에서 내려주는 에러 메세지와 코드를 그대로 보여줍니다.
    throw new UnknownError(err as Error);
  }
};
