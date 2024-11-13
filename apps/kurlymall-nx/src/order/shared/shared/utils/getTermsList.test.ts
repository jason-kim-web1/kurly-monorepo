import {
  GIFT_CARD,
  GIFT_NOT_CARD,
  MEMBER_CARD_WITH_KURLYPAY,
  MEMBER_CARD_WITH_TOSS_PAYMENTS,
  MEMBER_NOT_CARD,
} from '../constants/terms';

import { getTermsList } from './getTermsList';

describe('getTermsList', () => {
  context('컬리페이 신용카드이면', () => {
    it('컬리페이 결제대행 서비스 약관 동의를 포함하여 return 한다.', () => {
      const result = getTermsList({
        isGiftOrder: false,
        code: 'kurlypay-credit',
      });

      expect(result).toEqual(MEMBER_CARD_WITH_KURLYPAY);
    });
  });

  context('토스페이먼츠 신용카드이면', () => {
    it('토스페이먼츠 결제대행 서비스 약관 동의를 포함하여 return 한다.', () => {
      const result = getTermsList({
        isGiftOrder: false,
        code: 'toss-payments',
      });

      expect(result).toEqual(MEMBER_CARD_WITH_TOSS_PAYMENTS);
    });
  });

  context('컬리페이 간편결제 수단이면', () => {
    it('개인정보 수집 이용 동의, 개인정보 제3자 제공 동의, 전자결제 동의 항목을 return 한다.', () => {
      const result = getTermsList({
        isGiftOrder: false,
        code: 'kurlypay',
      });

      expect(result).toEqual(MEMBER_NOT_CARD);
    });
  });

  context('선물하기 주문이고', () => {
    context('결제수단이 신용카드이면', () => {
      it('선물하기 신용카드 약관 동의를 return 한다.', () => {
        const result = getTermsList({
          isGiftOrder: true,
          code: 'kurlypay-credit',
        });

        expect(result).toEqual(GIFT_CARD);
      });
    });

    context('결제수단이 신용카드가 아니면', () => {
      it('선물하기 기본 약관 동의를 return 한다.', () => {
        const result = getTermsList({
          isGiftOrder: true,
          code: 'kakao-pay',
        });

        expect(result).toEqual(GIFT_NOT_CARD);
      });
    });
  });

  context('선물하기, 컬리패스 주문이 아니고 신용카드 결제수단도 아니면', () => {
    it('신용카드 결제 약관 동의가 없는 동의 목록을 return 한다.', () => {
      const result = getTermsList({
        isGiftOrder: false,
        code: 'kakao-pay',
      });

      expect(result).toEqual(MEMBER_NOT_CARD);
    });
  });
});
