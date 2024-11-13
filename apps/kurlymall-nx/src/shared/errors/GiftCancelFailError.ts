export class GiftCancelFailError extends Error {
  err;

  constructor(err: Error) {
    super('선물 주문의 상태가 변경되어 주문을 취소할 수 없습니다.');
    this.err = err;
  }
}
