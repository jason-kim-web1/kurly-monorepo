export class ExceededVerificationCountError extends Error {
  constructor() {
    super('최대 인증 시도 횟수를 초과했어요. 내일 다시 시도해 주세요.');
  }
}
