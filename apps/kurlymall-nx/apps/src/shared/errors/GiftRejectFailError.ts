export class GiftRejectFailError extends Error {
  err;

  constructor(err: Error) {
    super('선물 주문의 상태가 변경되어 거절할 수 없습니다.');
    this.err = err;
  }
}
