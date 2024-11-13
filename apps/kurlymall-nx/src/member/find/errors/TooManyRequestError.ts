export class TooManyRequestError extends Error {
  constructor() {
    super('유효 시간이 만료되었습니다. 재발송 후 다시 시도해 주세요.');
  }
}
