import axios, { AxiosError } from 'axios';

import {
  handleAlreadyExistAccount,
  handleForeginPhoneNumber,
  handleInvalidPhoneNumber,
  handleNotAvailableAddress,
  handleNotFoundKakaoAccount,
  handleNotFoundPhoneNumber,
  handleSignupFailed,
  handleSocialTokenExpired,
  handleWithdrawnMember,
} from '../../../member/signup/errors';

import { SignupForm } from '../../../member/signup/interfaces';

import { UnknownError } from '../../errors';
import { BaseResponse } from '../../interfaces';
import httpClient from '../../configs/http-client';
import { sentryCaptureError } from '../../services/sentry.service';

const baseUrl = '/member/proxy/member-auth/v1';

interface Account {
  member_id: string;
  name: string;
  address_info: {
    road_address: string;
    address: string;
    zip_code: string;
    zone_code: string;
    address_sub: string;
  };
}

export const postKakaoAccountInfomation = async (params: { provider: string; socialLoginToken: string }) => {
  const url = `${baseUrl}/social/sign-up/${params.provider}`;
  try {
    const { data } = await httpClient.get<BaseResponse<Account>>(url, {
      params: {
        social_login_token: params.socialLoginToken,
      },
    });

    return {
      memberId: data.data.member_id,
      name: data.data.name,
      addressInfo: {
        roadAddress: data.data.address_info.road_address,
        address: data.data.address_info.address,
        zipCode: data.data.address_info.zip_code,
        zoneCode: data.data.address_info.zone_code,
        addressDetail: data.data.address_info.address_sub,
      },
    };
  } catch (err) {
    handleWithdrawnMember(err as AxiosError);
    handleNotAvailableAddress(err as AxiosError);
    handleNotFoundKakaoAccount(err as AxiosError);
    handleSocialTokenExpired(err as AxiosError);
    handleForeginPhoneNumber(err as AxiosError);
    handleAlreadyExistAccount(err as AxiosError);
    handleNotFoundPhoneNumber(err as AxiosError);
    handleInvalidPhoneNumber(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};

export const postSimpleSignup = async (params: {
  provider: string;
  socialLoginToken: string;
  form: SignupForm;
  device: string;
}) => {
  const url = `${baseUrl}/social/sign-up/${params.provider}`;
  try {
    await httpClient.post(url, {
      social_login_token: params.socialLoginToken,
      member_id: params.form.id,
      password: params.form.password,
      name: params.form.name,
      recommender_id: params.form.recommender,
      event_name: params.form.eventName,
      road_address: params.form.addressInfomation.roadAddress,
      address: params.form.addressInfomation.lotNumberAddress,
      zip_code: params.form.addressInfomation.zipCode,
      zone_code: params.form.addressInfomation.zoneCode,
      address_sub: params.form.addressInfomation.addressDetail,
      inflow_device: params.device,
    });
  } catch (err) {
    handleNotFoundKakaoAccount(err as AxiosError);
    handleSocialTokenExpired(err as AxiosError);
    handleWithdrawnMember(err as AxiosError);
    handleNotAvailableAddress(err as AxiosError);
    handleSignupFailed(err as AxiosError);
    handleForeginPhoneNumber(err as AxiosError);
    handleAlreadyExistAccount(err as AxiosError);
    handleNotFoundPhoneNumber(err as AxiosError);
    handleInvalidPhoneNumber(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};

export const getSignupCouponKey = async () => {
  try {
    const response = await axios.get('/nx/api/signup-coupon-key');

    return response;
  } catch (err) {
    console.error(err);
    sentryCaptureError('/nx/api/signup-coupon-key 에서 에러가 발생했습니다.');

    throw err;
  }
};
