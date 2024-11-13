export class CartSyncError extends Error {
  err;

  constructor(err: Error) {
    super('장바구니 동기화 기능은 회원만 사용 가능합니다.');
    this.err = err;
  }
}
