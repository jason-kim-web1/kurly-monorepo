import { AxiosError } from 'axios';

import { UnknownError } from '../errors';

export const handleAddCartError = (err: AxiosError): Error => {
  const code = err.response?.data.code;

  let errorMessage = '';

  switch (code) {
    case '4008':
      errorMessage = '장바구니 최대 보관갯수를 초과하였습니다.';
      break;
    case '9998':
      errorMessage = err.response?.data.message;
      break;
    default:
      throw new UnknownError(err);
  }

  throw new Error(errorMessage);
};
