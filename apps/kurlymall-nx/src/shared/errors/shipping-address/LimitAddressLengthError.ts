export class LimitAddressLengthError extends Error {
  err;

  constructor(err: Error) {
    super('최대 주소록 갯수를 초과하였습니다.');
    this.err = err;
  }
}
