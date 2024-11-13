import { AxiosError } from 'axios';

import {
  handleTooManyRequest,
  handleNotFoundUser,
  handleExceededVerificationCount,
} from '../../../member/find/error-handlers';
import { UnknownError } from '../../errors';
import httpClient from '../../configs/http-client';

const baseUrl = '/member/proxy/member-auth/v1/certification';

export const postMobileVerificationNumber = async ({ name, phone }: { name: string; phone: string }) => {
  const url = `${baseUrl}/mobile/member-id/send`;
  try {
    await httpClient.post(url, {
      name,
      mobile_no: phone,
    });
  } catch (err) {
    handleNotFoundUser(err as AxiosError);
    handleTooManyRequest(err as AxiosError);
    handleExceededVerificationCount(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};

export const postMobileVerificationNumberWithId = async ({ id, phone }: { id: string; phone: string }) => {
  const url = `${baseUrl}/mobile/password/send`;
  try {
    await httpClient.post(url, {
      member_id: id,
      mobile_no: phone,
    });
  } catch (err) {
    handleNotFoundUser(err as AxiosError);
    handleTooManyRequest(err as AxiosError);
    handleExceededVerificationCount(err as AxiosError);

    throw new UnknownError(err as Error);
  }
};
