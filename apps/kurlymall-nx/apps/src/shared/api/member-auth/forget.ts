import { AxiosError } from 'axios';

import {
  handleExceededVerificationCount,
  handleExceededVerificationTime,
  handleNotFoundUser,
  handleTooManyMailSend,
  handleWrongFindIdVerificationNumber,
  handleWrongFindPasswordVerificationNumber,
} from '../../../member/find/error-handlers';
import { UnknownError } from '../../errors';

import { BaseResponse } from '../../interfaces';
import httpClient from '../../configs/http-client';

const baseUrl = '/member/proxy/member-auth/v1/forget';

interface Member {
  name: string;
  email: string;
  members: {
    member_id: string;
    status: string;
    joined_at: string;
  }[];
}

interface Token {
  token: string;
}

export const postFindIdByEmail = async (params: { name: string; email: string }) => {
  const url = `${baseUrl}/member-id/email`;
  try {
    const { data } = await httpClient.post<BaseResponse<Member>>(url, params);
    return {
      name: data.data.name,
      email: data.data.email,
      members: data.data.members.map((it) => ({
        ...it,
        memberId: it.member_id,
        joinedAt: it.joined_at,
      })),
    };
  } catch (err) {
    handleNotFoundUser(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};

export const postMembersToEmail = async (form: { name: string; email: string }) => {
  const url = `${baseUrl}/member-id/email/send`;
  try {
    await httpClient.post<BaseResponse<Member>>(url, form);
  } catch (err) {
    handleTooManyMailSend(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};

export const postFindIdByPhone = async ({
  phone,
  verificationNumber,
}: {
  phone: string;
  verificationNumber: string;
}) => {
  const url = `${baseUrl}/member-id/mobile`;
  try {
    const { data } = await httpClient.post<BaseResponse<Member>>(url, {
      mobile_no: phone,
      mobile_auth_no: verificationNumber,
    });
    return {
      members: data.data.members.map((it) => ({
        ...it,
        memberId: it.member_id,
        joinedAt: it.joined_at,
      })),
    };
  } catch (err) {
    handleNotFoundUser(err as AxiosError);
    handleWrongFindIdVerificationNumber(err as AxiosError);
    handleExceededVerificationCount(err as AxiosError);
    handleExceededVerificationTime(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};

export const postFindPasswordByPhone = async ({
  phone,
  verificationNumber,
}: {
  phone: string;
  verificationNumber: string;
}) => {
  const url = `${baseUrl}/password/mobile`;
  try {
    const { data } = await httpClient.post<BaseResponse<Token>>(url, {
      mobile_no: phone,
      mobile_auth_no: verificationNumber,
    });
    return data.data.token;
  } catch (err) {
    handleNotFoundUser(err as AxiosError);
    handleWrongFindPasswordVerificationNumber(err as AxiosError);
    handleExceededVerificationCount(err as AxiosError);
    handleExceededVerificationTime(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};

export const postFindPasswordByEmail = async ({ id, email }: { id: string; email: string }) => {
  const url = `${baseUrl}/password/email`;
  try {
    await httpClient.post(url, {
      email,
      member_id: id,
    });
  } catch (err) {
    handleNotFoundUser(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};
