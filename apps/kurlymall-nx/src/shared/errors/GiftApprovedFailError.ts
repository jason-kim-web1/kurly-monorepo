export class GiftApprovedFailError extends Error {
  err;

  constructor(err: Error) {
    super('선물 주문의 상태가 변경되어 수락할 수 없습니다.');
    this.err = err;
  }
}
