import { AxiosError } from 'axios';

import {
  TAMError,
  ReturnCartError,
  ReturnCancelError,
  ReturnMainError,
  JoinOrderError,
  OnlyMembersProductsError,
} from '../errors';

export const handleCheckoutError = (err: AxiosError): Error => {
  const code = err.response?.data.code;
  const message = err.response?.data.message;

  let errorMessage = '';

  switch (code) {
    // TAM에서 내려주는 권역 별 컷오프 안내 문구 노출
    case '4053':
      throw new TAMError(message);
    case '4002':
    case '4003':
    case '4009':
    case '4048':
    case '4054':
    case '4055':
    case '4059':
    case '4060':
    case '9001':
    case '4006':
    case '4045':
    case '4049':
    case '4052':
    case '4046':
      throw new ReturnCartError(message);
    case '4044':
      throw new ReturnCartError('이벤트 상품은 로그인 후 구매 가능합니다.');
    case '4070':
      throw new OnlyMembersProductsError(message);
    case '4050':
      errorMessage = '컬리 퍼플 박스는 샛별 배송 지역 주문 고객만 구매가 가능합니다. 제외 후 다시 주문을 시도해주세요.';
      break;
    case '4056':
      throw new ReturnCartError(
        '배송유형이 변경되어 주문서의 상품 정보가 업데이트됩니다. 장바구니를 다시 확인해주세요.',
      );
    case '4051':
    case '4058':
      errorMessage =
        '선택하신 포장 방법으로 주문할 수 없습니다. 종이 포장재로 포장 방법을 변경하거나 주문서를 새로 고침 후 다시 시도해 주세요.';
      break;
    case '4061':
      throw new ReturnCartError('성인인증 정보가 만료되었습니다. 성인인증 후 다시 시도해주세요.');
    case '4062':
    case '4063':
      throw new ReturnCartError('쿠폰, 적립금 관련 오류가 발생했습니다.');
    case '4064':
      throw new ReturnCartError('주문 시간이 초과되어 장바구니로 이동합니다. 주문을 다시 시도해주세요.');
    case '4100':
    case '4101':
    case '4102':
      throw new JoinOrderError(message);
    case '4065':
    case '9002':
      throw new ReturnMainError(err.response?.data.message);
    // 결제 중 실패 케이스
    case '4066':
    case '9998':
      throw new ReturnCancelError('결제를 실패했습니다. 주문을 다시 시도해주세요.');
    case '9999':
      throw new ReturnCartError('일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.');
    case '9000':
    case '9004':
    default:
      errorMessage = err.response?.data.message;
      break;
  }

  throw new Error(errorMessage);
};
