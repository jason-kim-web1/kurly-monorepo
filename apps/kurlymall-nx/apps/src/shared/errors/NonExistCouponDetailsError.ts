export class NonExistCouponDetailsError extends Error {
  err;

  constructor(err: Error) {
    super('존재하지 않는 쿠폰번호입니다.');
    this.err = err;
  }
}
