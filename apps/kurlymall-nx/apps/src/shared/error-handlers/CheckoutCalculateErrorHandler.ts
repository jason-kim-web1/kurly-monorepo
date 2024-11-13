import { AxiosError } from 'axios';

import { ReturnCartError } from '../errors';

export const handleCheckoutCalculateError = (err: AxiosError): Error => {
  const code = err.response?.data.code;
  const message = err.response?.data.message;

  let errorMessage = '';

  switch (code) {
    case '4062':
    case '4063':
      throw new ReturnCartError('쿠폰, 적립금 관련 오류가 발생했습니다.');
    case '4064':
      throw new ReturnCartError('주문 시간이 초과되어 장바구니로 이동합니다. 주문을 다시 시도해주세요.');
    case '9999':
      throw new ReturnCartError('일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.');
    default:
      errorMessage = message;
      break;
  }

  throw new Error(errorMessage);
};
