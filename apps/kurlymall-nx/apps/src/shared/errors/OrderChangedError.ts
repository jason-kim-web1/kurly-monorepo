export class OrderChangedError extends Error {
  err;

  constructor(err: Error) {
    super('주문/결제 정보가 변경되었습니다. 다시 시도해주세요.');
    this.err = err;
  }
}
