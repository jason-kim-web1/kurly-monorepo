import { AxiosError } from 'axios';

import { UnknownError } from '../../errors';
import { IMemberBlockReason } from '../../interfaces/block';
import httpClient from '../../configs/http-client';
import {
  BLOCK_USER_ERROR_CODE,
  BLOCK_USER_ERROR_MESSAGE,
  BlockUserErrorCode,
} from '../../../member/block/interface/BlockUser.interface';
import { ExpiredTokenError } from '../../errors/ExpiredTokenError';

const baseUrl = '/member/proxy/member-auth/v1';

const matchErrorMessageByCode = (code: string) => {
  if (!code) return;
  const codeName =
    Object.keys(BLOCK_USER_ERROR_CODE).find((key) => BLOCK_USER_ERROR_CODE[key as BlockUserErrorCode] === code) ?? '';
  return BLOCK_USER_ERROR_MESSAGE[codeName as BlockUserErrorCode];
};

const createRequestConfig = (lockedToken: string) => ({
  headers: { Authorization: `Bearer ${lockedToken}` },
  kurlyApiRefresh: false,
});

/**
 * 회원 상태 변경 사유 조회
 * [API document]{@link https://gateway.cloud.dev.kurly.services/member-main/docs/index.html#_%ED%9A%8C%EC%9B%90_%EC%83%81%ED%83%9C_%EB%B3%80%EA%B2%BD_%EC%82%AC%EC%9C%A0_%EC%A1%B0%ED%9A%8C}
 */
export const fetchMemberBlockReason = async (lockedToken: string): Promise<IMemberBlockReason> => {
  const url = 'member/proxy/member-main/v1/member/status/change-reason/LOCK';

  try {
    const { data } = await httpClient.get(url, createRequestConfig(lockedToken));
    return data.data;
  } catch (err) {
    if (err instanceof ExpiredTokenError) {
      throw new Error(BLOCK_USER_ERROR_MESSAGE.AUTHORIZATION_FAILED);
    }
    throw new UnknownError(err as Error);
  }
};

/**
 * 로그인 차단 해지 휴대폰 인증
 * [API document]{@link https://gateway.cloud.dev.kurly.services/member-auth/docs/index.html#_%EB%A1%9C%EA%B7%B8%EC%9D%B8_%EC%B0%A8%EB%8B%A8_%ED%95%B4%EC%A7%80_%ED%9C%B4%EB%8C%80%ED%8F%B0_%EC%9D%B8%EC%A6%9D}
 */
export const postVerificationNumberVerification = async ({
  verificationNumber,
  mobileNo,
  lockedToken,
}: {
  verificationNumber: string;
  mobileNo: string;
  lockedToken: string;
}) => {
  const url = `${baseUrl}/release-lock/mobile`;

  try {
    const data = await httpClient.post(
      url,
      {
        mobile_auth_no: +verificationNumber,
        mobile_no: mobileNo,
      },
      createRequestConfig(lockedToken),
    );
    return data.data;
  } catch (err) {
    if (err instanceof ExpiredTokenError) {
      throw new Error(BLOCK_USER_ERROR_MESSAGE.AUTHORIZATION_FAILED);
    }

    const { data, message } = (err as AxiosError).response?.data || {};
    const errorMessage = matchErrorMessageByCode(data.error.code) || message;
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    throw new UnknownError(err as Error);
  }
};

/**
 * 로그인 차단 해지
 * [API document]{@link https://gateway.cloud.dev.kurly.services/member-auth/docs/index.html#_%EB%A1%9C%EA%B7%B8%EC%9D%B8_%EC%B0%A8%EB%8B%A8_%ED%95%B4%EC%A0%9C}
 */
export const postUnblockMember = async ({
  newPassword,
  unblockToken,
  lockedToken,
}: {
  newPassword: string;
  unblockToken: string;
  lockedToken: string;
}) => {
  const url = `${baseUrl}/release-lock/${unblockToken}`;

  try {
    const data = await httpClient.post(
      url,
      {
        password: newPassword,
      },
      createRequestConfig(lockedToken),
    );
    return data.data;
  } catch (err) {
    if (err instanceof ExpiredTokenError) {
      throw new Error(BLOCK_USER_ERROR_MESSAGE.AUTHORIZATION_FAILED);
    }

    const { data, message } = (err as AxiosError).response?.data || {};
    const errorMessage = matchErrorMessageByCode(data.error.code) || message;
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    throw new UnknownError(err as Error);
  }
};

export const postSendVerificationNumber = async ({
  memberId,
  mobileNo,
  lockedToken,
}: {
  memberId: string;
  mobileNo: string;
  lockedToken: string;
}) => {
  const url = `/member/proxy/member-auth/v1/certification/mobile/release-lock/send`;

  try {
    await httpClient.post(
      url,
      {
        member_id: memberId,
        mobile_no: mobileNo,
      },
      createRequestConfig(lockedToken),
    );
  } catch (err) {
    if (err instanceof ExpiredTokenError) {
      throw new Error(BLOCK_USER_ERROR_MESSAGE.AUTHORIZATION_FAILED);
    }

    const { data, message } = (err as AxiosError).response?.data || {};
    const errorMessage = matchErrorMessageByCode(data?.error.code) || message;
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    throw new UnknownError(err as Error);
  }
};
