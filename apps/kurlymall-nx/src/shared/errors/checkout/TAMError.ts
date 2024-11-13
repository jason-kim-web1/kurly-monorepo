export class TAMError extends Error {
  err;

  constructor(message: string) {
    super(message);
    this.err = new Error(message);
  }
}
