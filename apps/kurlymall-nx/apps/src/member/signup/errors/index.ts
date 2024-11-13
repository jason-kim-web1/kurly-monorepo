import { AxiosError } from 'axios';

import { GoBackError } from '../../../shared/errors';

import {
  AlreadyExistAccountError,
  ForeginPhoneNumberError,
  NotAvailableAddressError,
  NotFoundKakaoAccountError,
  NotFoundPhoneNumberError,
  NotInvalidPhoneNumberError,
  WithdrawnMemberError,
  SocialTokenExpiredError,
} from '../error-handlers';

export const handleNotFoundKakaoAccount = (err: AxiosError) => {
  const code = err.response?.data.data?.error.code ?? '';
  const codes = [
    'MEMBER_COMMON_0009',
    'MEMBER_AUTH_SOCIAL_COMMON_0003',
    'MEMBER_AUTH_SOCIAL_KAKAO_0001',
    'MEMBER_AUTH_SOCIAL_KAKAO_0006',
    'MEMBER_AUTH_SOCIAL_KAKAO_0007',
    'MEMBER_AUTH_SOCIAL_KAKAO_0009',
    'MEMBER_AUTH_SOCIAL_KAKAO_9999',
  ];

  if (codes.includes(code)) {
    throw new NotFoundKakaoAccountError(code);
  }
};

export const handleSignupFailed = (err: AxiosError) => {
  const code = err.response?.data.data?.error.code ?? '';

  if (code === 'MEMBER_AUTH_SOCIAL_COMMON_0005') {
    throw new Error(`아이디, 비밀번호, 이름은 필수 입력 항목 입니다. (오류코드 : ${code})`);
  }

  if (code === 'MEMBER_AUTH_SOCIAL_COMMON_0006') {
    throw new Error(`아이디는 6자 이상의 영문 또는 숫자의 조합만 사용할 수 있어요. (오류코드 : ${code})`);
  }

  if (code === 'MEMBER_AUTH_SOCIAL_COMMON_0007') {
    throw new Error(`사용할 수 없는 아이디 입니다. (오류코드 : ${code})`);
  }

  if (code === 'MEMBER_AUTH_SOCIAL_COMMON_0008') {
    throw new Error(
      `이미 회원 정보가 존재합니다.
      입력하신 아이디를 확인해 주세요.(오류코드 : ${code})`,
    );
  }

  if (code === 'MEMBER_AUTH_SOCIAL_COMMON_0009') {
    throw new Error(
      `비밀번호는 10자 이상 영문/숫자/ 특수문자(공백 제외)의 조합만 사용할 수 있어요.(오류코드 : ${code})`,
    );
  }

  if (code === 'MEMBER_AUTH_SOCIAL_COMMON_0010') {
    throw new GoBackError(
      `잘못된 이메일 형식입니다.
      다시 시도해 주세요.(오류코드 : ${code})`,
    );
  }

  if (code === 'MEMBER_AUTH_SOCIAL_COMMON_0011' || code === 'MEMBER_AUTH_SOCIAL_COMMON_0012') {
    throw new GoBackError(
      `이미 회원 정보가 존재합니다.
      입력하신 휴대폰 번호와 이메일 주소를 확인해 주세요.
      (오류코드 : ${code})`,
    );
  }

  if (code === 'MEMBER_AUTH_SOCIAL_COMMON_0013') {
    throw new GoBackError(
      `회원 정보를 불러올 수 없습니다.
      다시 시도해 주세요.(오류코드 : ${code})`,
    );
  }

  if (code === 'MEMBER_AUTH_SOCIAL_COMMON_0014') {
    throw new GoBackError(
      `회원가입에 실패하였습니다.
      다시 시도해 주세요. (오류코드 : ${code})`,
    );
  }
};

export const handleSocialTokenExpired = (err: AxiosError) => {
  const code = err.response?.data.data?.error.code ?? '';
  if (code === 'MEMBER_AUTH_SOCIAL_COMMON_0001') {
    throw new SocialTokenExpiredError(code);
  }
};

export const handleForeginPhoneNumber = (err: AxiosError) => {
  const code = err.response?.data.data?.error.code ?? '';
  if (code === 'MEMBER_AUTH_SOCIAL_KAKAO_0002') {
    throw new ForeginPhoneNumberError(code);
  }
};

export const handleAlreadyExistAccount = (err: AxiosError) => {
  const code = err.response?.data.data?.error.code ?? '';
  if (code === 'MEMBER_AUTH_SOCIAL_KAKAO_0003') {
    throw new AlreadyExistAccountError(code);
  }
};

export const handleNotFoundPhoneNumber = (err: AxiosError) => {
  const code = err.response?.data.data?.error.code ?? '';
  if (code === 'MEMBER_AUTH_SOCIAL_KAKAO_0004') {
    throw new NotFoundPhoneNumberError(code);
  }
};

export const handleInvalidPhoneNumber = (err: AxiosError) => {
  const code = err.response?.data.data?.error.code ?? '';
  if (code === 'MEMBER_AUTH_SOCIAL_KAKAO_0005' || code === 'MEMBER_COMMON_0004') {
    throw new NotInvalidPhoneNumberError(code);
  }
};

export const handleNotAvailableAddress = (err: AxiosError) => {
  const code = err.response?.data.data?.error.code ?? '';
  if (code === 'MEMBER_AUTH_0010') {
    throw new NotAvailableAddressError(code);
  }
};

export const handleWithdrawnMember = (err: AxiosError) => {
  const code = err.response?.data.data?.error.code ?? '';
  if (code === 'MEMBER_AUTH_0009' || code === 'MEMBER_AUTH_SOCIAL_COMMON_0015') {
    throw new WithdrawnMemberError(code);
  }
};

export const handleInvalidPassword = (err: AxiosError) => {
  const code = (err as AxiosError).response?.data.data?.error.code ?? '';
  if (code === 'MEMBER_AUTH_0008') {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }
};
