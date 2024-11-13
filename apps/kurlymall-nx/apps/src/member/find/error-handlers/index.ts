import { AxiosError } from 'axios';

import {
  TokenExpiredError,
  ExceededVerificationCountError,
  VerificationNumberExpiredError,
  TooManyRequestError,
} from '../errors';

export const handleNotFoundUser = (err: AxiosError) => {
  if (err.response?.data.message === '입력된 정보로 조회된 회원정보가 없습니다.') {
    throw new Error('가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요.');
  }
};

export const handleTooManyRequest = (err: AxiosError) => {
  if (err.response?.data.message === '1분 이내에 인증번호를 재발송 할 수 없습니다.') {
    throw new TooManyRequestError();
  }
};

export const handleTooManyMailSend = (err: AxiosError) => {
  if (err.response?.data.message === '1분 이내에 전체 아이디 이메일 재발송을 할 수 없습니다.') {
    throw new TooManyRequestError();
  }
};

export const handleWrongFindIdVerificationNumber = (err: AxiosError) => {
  if (err.response?.data.message === '인증번호가 일치하지 않습니다.') {
    const { fail_count: failCount, fail_limit_count: failLimitCount } = err.response?.data.data.error;
    throw new Error(
      `(${failCount}/${failLimitCount}) 인증번호가 일치하지 않습니다.

      가입 후 번호가 변경되었다면 이메일로 아이디 찾기를 시도해 보세요.`,
    );
  }
};

export const handleWrongFindPasswordVerificationNumber = (err: AxiosError) => {
  if (err.response?.data.message === '인증번호가 일치하지 않습니다.') {
    const { fail_count: failCount, fail_limit_count: failLimitCount } = err.response?.data.data.error;
    throw new Error(
      `(${failCount}/${failLimitCount}) 인증번호가 일치하지 않습니다.

      가입 후 번호가 변경되었다면 이메일로 비밀번호 찾기를 시도해 보세요.`,
    );
  }
};

export const handleExceededVerificationCount = (err: AxiosError) => {
  if (err.response?.data.message === '인증횟수가 5회를 초과했습니다.') {
    throw new ExceededVerificationCountError();
  }
};

export const handleExceededVerificationTime = (err: AxiosError) => {
  if (err.response?.data.message === '발행된 인증번호가 없습니다.') {
    throw new VerificationNumberExpiredError();
  }
};

export const handleTokenExpired = (err: AxiosError) => {
  if (err.response?.data.message === '권한이 없습니다.') {
    throw new TokenExpiredError();
  }
};
