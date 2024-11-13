export class SessionExpirationError extends Error {
  err;

  constructor(err: Error) {
    super(`유효하지 않은 접근입니다.\n다시 시도해주세요.`);
    this.err = err;
  }
}
