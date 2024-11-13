import { AxiosError } from 'axios';

import { UnknownError } from '../errors';

export const handleProductDetailLikeError = (err: AxiosError): Error => {
  const code = err.response?.data.code;

  let errorMessage = '';

  switch (code) {
    case '9998':
      errorMessage = err.response?.data.message;
      break;
    default:
      throw new UnknownError(err);
  }

  throw new Error(errorMessage);
};
