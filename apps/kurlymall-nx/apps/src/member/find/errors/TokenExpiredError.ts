export class TokenExpiredError extends Error {
  constructor() {
    super('유효 시간이 만료되었습니다. 비밀번호 찾기를 다시 시도해 주세요.');
  }
}
