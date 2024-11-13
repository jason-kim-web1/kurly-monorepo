import moment from 'moment';

import {
  postFindIdByEmail,
  postFindIdByPhone,
  postFindPasswordByEmail,
  postFindPasswordByPhone,
  postMembersToEmail,
  postMobileVerificationNumber,
  postMobileVerificationNumberWithId,
  fetchVerification,
  putResetPassword,
} from '../../../shared/api';

import { IdByPhoneForm } from '../id/interfaces';

export const findIdByEmail = async (params: { name: string; email: string }) => {
  const member = await postFindIdByEmail(params);
  return {
    ...member,
    members: member.members.map((it) => ({
      ...it,
      joinedAt: moment(it.joinedAt).format('YYYY.MM.DD'),
    })),
  };
};

export const findIdByPhone = async (params: IdByPhoneForm) => {
  const member = await postFindIdByPhone({
    phone: params.phone,
    verificationNumber: params.verificationNumber,
  });
  return {
    ...member,
    members: member.members.map((it) => ({
      ...it,
      joinedAt: moment(it.joinedAt).format('YYYY.MM.DD'),
    })),
  };
};

export const findPasswordByPhone = (params: { phone: string; verificationNumber: string }) =>
  postFindPasswordByPhone(params);

export const findPasswordByEmail = async (params: { id: string; email: string }) => {
  await postFindPasswordByEmail(params);
};

export const sendVerificationNumber = async (params: IdByPhoneForm) => {
  await postMobileVerificationNumber({
    name: params.name,
    phone: params.phone,
  });
};

export const sendVerificationNumberWithId = async (params: { id: string; phone: string }) => {
  await postMobileVerificationNumberWithId(params);
};

export const sendMembersToEmail = async (params: { name: string; email: string }) => {
  await postMembersToEmail(params);
};

export const resetPassword = async (params: { token: string; password: string }) => {
  await putResetPassword(params);
};

export const verifyToken = (token: string) => fetchVerification(token);
