import { validateReceiverInfo } from './validateReceiverInfo';

describe('주문자 정보 검증 테스트', () => {
  given('receiverInfo', () => ({
    name: '이름',
    phone: '01011111111',
    email: 'kurly@kurlycorp.com',
  }));

  context('보내는 분 이름에 허용 가능한 문자열만 있으면', () => {
    given('receiverInfo', () => ({
      name: '이름',
      phone: '01011111111',
      email: 'kurly@kurlycorp.com',
    }));

    it('에러 메세지 빈 값을 반환한다.', () => {
      const { errorMessage, documentId } = validateReceiverInfo(given.receiverInfo);

      expect(errorMessage).toBe('');
      expect(documentId).toBe('');
    });
  });

  context('보내는 분 이름에 허용 불가능 문자가 있으면', () => {
    given('receiverInfo', () => ({
      name: '뷁333',
      phone: '01011111111',
      email: 'kurly@kurlycorp.com',
    }));

    it('에러메세지를 반환한다.', () => {
      const { errorMessage, documentId } = validateReceiverInfo(given.receiverInfo);

      expect(errorMessage).toBe(
        '보내는 분 이름에 한글, 영어, 숫자 외 특수문자를 사용할 수 없습니다. \n 마이컬리 > 개인정보수정 화면에서 회원 이름을 변경해주세요.',
      );
      expect(documentId).toBe('kurly-orderer-info');
    });
  });
});
