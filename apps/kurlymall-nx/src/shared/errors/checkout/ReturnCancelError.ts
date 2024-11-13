export class ReturnCancelError extends Error {
  err;

  constructor(err: string) {
    super(err);
    this.err = new Error(err);
  }
}
