export class CartCheckoutError extends Error {
  err;

  constructor(err: Error) {
    super(err.message);
    this.err = err;
  }
}
