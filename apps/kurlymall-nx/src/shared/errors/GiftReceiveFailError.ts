export class GiftReceiveFailError extends Error {
  err;

  constructor(err: Error) {
    super('메시지를 보낼 수 없습니다. 잠시 후 다시 시도해주세요.');
    this.err = err;
  }
}
