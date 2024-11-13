import { AxiosError } from 'axios';

import { OnlyMembersProductsError, ProceedToCheckoutError, UnknownError } from '../errors';

export const handleCartToCheckoutError = (err: AxiosError): Error => {
  const code = err.response?.data.code;

  let errorMessage = '';

  switch (code) {
    case '4044':
      errorMessage = '이벤트 상품은 로그인 후 구매 가능합니다.';
      break;
    case '4047':
      errorMessage = '신규회원 이벤트 상품 외 다른 상품을 1만원 이상 담아주시면 구매 가능합니다.';
      break;
    case '4054':
    case '4055':
    case '4065':
      throw new ProceedToCheckoutError('상품 정보가 변경되었습니다. 다시 시도해주세요.');
    case '4056':
      throw new ProceedToCheckoutError('배송유형이 변경되어 장바구니의 상품 정보가 업데이트됩니다.');
    case '4002':
    case '4003':
    case '4045':
    case '4046':
    case '4049':
    case '4050':
    case '4053':
    case '4059':
    case '4060':
    case '9000':
    case '9003':
    case '9998':
      errorMessage = err.response?.data.message;
      break;
    case '4001':
    case '4006':
    case '4009':
    case '4015':
    case '4048':
    case '9001':
      throw new ProceedToCheckoutError(err.response?.data.message);
    case '4070':
      throw new OnlyMembersProductsError(err.response?.data.message);
    case '9999':
      throw new ProceedToCheckoutError('일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.');
    default:
      throw new UnknownError(err);
  }

  throw new Error(errorMessage);
};
