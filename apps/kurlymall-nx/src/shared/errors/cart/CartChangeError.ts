export class CartChangeError extends Error {
  err;

  constructor(err: Error) {
    super('일시적인 오류로 수량 변경과 삭제를 할 수 없어요. 장바구니에 다시 진입 후 시도해 주세요.');
    this.err = err;
  }
}
