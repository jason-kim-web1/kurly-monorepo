export class NonExistOrderDetailsError extends Error {
  err;

  constructor(err: Error) {
    super('존재하지 않는 주문번호입니다.');
    this.err = err;
  }
}
