import { UnauthenticatedError } from './UnauthenticatedError';

export class UnknownError extends Error {
  err;

  constructor(err: Error) {
    if (err instanceof UnauthenticatedError) {
      super();
    } else {
      super('일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.');
    }
    this.err = err;
  }
}
