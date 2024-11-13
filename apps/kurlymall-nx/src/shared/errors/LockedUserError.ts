export const LockedUserErrorMessage = '계정이 일시정지되어 로그아웃되었습니다.';

export const LockedUserErrorCode = 1003;

export class LockedUserError extends Error {
  err;

  constructor(err: Error) {
    super(LockedUserErrorMessage);

    this.err = err;
  }
}
