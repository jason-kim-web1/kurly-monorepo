export class AuthError extends Error {
  err;

  constructor(err: Error) {
    super(`로그인 오류가 발생했습니다.\n다시 시도해주세요.`);
    this.err = err;
  }
}
