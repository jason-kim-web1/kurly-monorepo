export class UnauthenticatedError extends Error {
  err;

  constructor(err: Error) {
    super('로그인하셔야 본 서비스를 이용하실 수 있습니다.');
    this.err = err;
  }
}
