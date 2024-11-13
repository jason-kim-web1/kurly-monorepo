import { CheckoutVendorTextMap, OrderVendorCode } from '../../../shared/shared/interfaces/OrderVendorCode.interface';
import { getPointMessage } from './getPointMessage';

describe('getPointMessage 테스트', () => {
  const mock = {
    disabled: false,
    selectedCoupon: undefined,
    isEventProducts: false,
    isAllowedPoint: true,
    selectedPlccPoint: false,
    isGiftCardOrder: false,
  };

  context('특이점이 없다면', () => {
    given('info', () => mock);

    it('아무 내용도 볼 수 없다', () => {
      const result = getPointMessage(given.info);

      expect(result).toBe('');
    });
  });

  context('disabled 상태이면', () => {
    given('info', () => ({
      ...mock,
      disabled: true,
      selectedCoupon: {
        benefitPrice: 3750,
        benefitSummary: '3,750원 할인',
        benefitType: 'PERCENT_DISCOUNT',
        couponCode: 2,
        description: '봄수산 20% 할인(최대1만원, ~5/16 오후 11시까지)',
        expiredAt: '유효기간 없음',
        name: '[대한민국수산대전]봄수산 20%(최대1만원, ~5/16)',
        paymentGateways: ['kakao-pay'],
        pointAllowed: false,
        usable: true,
        creditCardId: null,
      },
    }));

    it('전용 쿠폰 사용 시 적립금*컬리캐시 사용 불가를 볼 수 있다', () => {
      const result = getPointMessage(given.info);

      const { selectedCoupon } = given.info;
      const paymentGateways = selectedCoupon.paymentGateways[0] as OrderVendorCode;
      const cardName = CheckoutVendorTextMap[paymentGateways];

      expect(result).toBe(`[${cardName} 전용쿠폰] 사용 시 적립금*컬리캐시 사용 불가`);
    });
  });

  context('이벤트 상품이면', () => {
    given('info', () => ({
      ...mock,
      isEventProducts: true,
    }));

    it('[이벤트] 상품 구매시 적립금*컬리캐시 사용 불가를 볼 수 있다', () => {
      const result = getPointMessage(given.info);

      expect(result).toBe('[이벤트] 상품 구매시 적립금*컬리캐시 사용 불가');
    });
  });

  context('적립금*컬리캐시 사용 불가 상태이면', () => {
    given('info', () => ({
      ...mock,
      isAllowedPoint: false,
    }));

    it('적립금*컬리캐시 사용 불가 쿠폰 입니다.를 볼 수 있다', () => {
      const result = getPointMessage(given.info);

      expect(result).toBe('적립금*컬리캐시 사용 불가 쿠폰 입니다.');
    });
  });

  context('즉시할인 포인트를 사용 한다면', () => {
    given('info', () => ({
      ...mock,
      selectedPlccPoint: true,
    }));

    it('컬리카드 혜택 적용시 불가능 메시지를 볼수 있다.', () => {
      const result = getPointMessage(given.info);

      expect(result).toBe('[컬리카드 혜택] 적용 시 적립금*컬리캐시 사용 불가');
    });
  });

  context('상품권 구매시', () => {
    given('info', () => ({
      ...mock,
      isGiftCardOrder: true,
    }));

    it('적립금*컬리캐시 사용 불가능 문구를 볼 수 있다.', () => {
      const result = getPointMessage(given.info);

      expect(result).toBe('해당 상품은 적립금*컬리캐시 사용이 불가능합니다.');
    });
  });
});
