export class GiftCartNotExistsError extends Error {
  err;

  constructor(err: Error) {
    super('선물하려는 상품의 정보가 존재하지 않습니다. 상품을 다시 확인해주세요.');
    this.err = err;
  }
}
