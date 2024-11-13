export interface IBlockUserPassword {
  newPassword: string;
  newPasswordConfirm: string;
}

export interface IBlockUser extends IBlockUserPassword {
  memberId: string;
  mobileNo: string;
  verificationNumber: string;
  unblockToken?: string;
}

export interface IBlockUserPasswordError {
  newPassword: {
    min: string;
    pattern: string;
    consecutive: string;
  };
  newPasswordConfirm: string;
}

export const AUTH_STEP = {
  INITIAL: 'INITIAL',
  SENT: 'SENT',
  SUCCESS: 'SUCCESS',
  EXCEED: 'EXCEED',
} as const;

export type AuthStepType = keyof typeof AUTH_STEP;

export const BLOCK_USER_SUCCESS_MESSAGE = {
  SEND_VERIFICATION_NUMBER:
    '인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해 주세요.\n\n카카오톡이 설치된 경우 카카오 알림톡으로 발송됩니다.',
  PASS_CERTIFICATION: '인증이 완료되었습니다.\n비밀번호를 변경해 주세요.',
  PASSWORD_CHANGE: '비밀번호 변경이 완료 되었습니다.',
};
export const BLOCK_USER_ERROR_MESSAGE = {
  TOO_MANY_REQUEST: '재발송 요청이 너무 빠릅니다.\n잠시 후 다시 시도해 주세요.',
  EXCEED_COUNT: '최대 인증 시도 횟수를 초과했어요.\n내일 다시 시도해 주세요.',
  WRONG_NUMBER: '인증번호가 일치하지 않습니다.',
  EXPIRED_NUMBER: '유효시간이 만료되었습니다.\n재발송 후 다시 시도해 주세요.',
  NOT_FOUND_USER: '가입 시 입력하신 회원 정보가 맞는지\n다시 한번 확인해 주세요.',
  AUTHORIZATION_FAILED: '유효시간이 만료되었습니다.\n로그인을 다시 시도해주세요.',
  EXPIRED_TOKEN: '유효 시간이 만료되었습니다.\n인증을 다시 시도해 주세요',
};

/**
 * 인증서비스 오류 코드
 * [Document]{@link https://gateway.cloud.dev.kurly.services/member-auth/docs/index.html#_%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%B9%84%EC%8A%A4_%EC%98%A4%EB%A5%98_%EC%BD%94%EB%93%9C}
 */
export const BLOCK_USER_ERROR_CODE = {
  TOO_MANY_REQUEST: 'MEMBER_AUTH_0000', // 1분 이내 재발송 요청시
  EXCEED_COUNT: 'MEMBER_AUTH_0001', // 인증 횟수 초과
  WRONG_NUMBER: 'MEMBER_AUTH_0002', // 인증번호 불일치
  EXPIRED_NUMBER: 'MEMBER_AUTH_0003', // 유효시간 만료
  NOT_FOUND_USER: 'MEMBER_AUTH_0004', // 유저 정보 없음
  AUTHORIZATION_FAILED: 'MEMBER_COMMON_0005', // 인가 실패 토큰 없음
  EXPIRED_TOKEN: 'MEMBER_COMMON_0006', // 유효하지 않은 토큰 호출
};

export type BlockUserErrorCode = keyof typeof BLOCK_USER_ERROR_CODE;
