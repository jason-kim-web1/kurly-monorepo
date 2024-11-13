export class ProductNotForSale extends Error {
  err;

  constructor(err: Error) {
    super('선물 주문을 진행할 수 없습니다. 상품을 다시 확인해주세요.');
    this.err = err;
  }
}
