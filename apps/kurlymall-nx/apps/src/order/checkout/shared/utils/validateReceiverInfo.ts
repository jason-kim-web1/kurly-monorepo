import { ReceiverInfo } from '../interfaces';
import { checkInvalidField, CheckoutErrorMessageFormat } from './validateInvalidField';

// 주문자 정보 검증
export const validateReceiverInfo = (receiverInfo: ReceiverInfo): CheckoutErrorMessageFormat => {
  const { name } = receiverInfo;

  return checkInvalidField({
    fieldName: 'name',
    value: name,
    correctMessage:
      '보내는 분 이름에 한글, 영어, 숫자 외 특수문자를 사용할 수 없습니다. \n 마이컬리 > 개인정보수정 화면에서 회원 이름을 변경해주세요.',
    documentId: 'kurly-orderer-info',
    showNotAllowedText: false,
  });
};
