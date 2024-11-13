export const ExpiredTokenErrorMessage = '유효시간이 만료되었습니다. 로그인을 다시 시도해주세요.';

export const ExpiredTokenErrorCode = 1002;

export class ExpiredTokenError extends Error {
  err;

  constructor(err: Error) {
    super(ExpiredTokenErrorMessage);

    this.err = err;
  }
}
