import usableCouponWithPayment from './usableCouponWithPayment';
import { CardVenderCode, PaymentVenderName } from '../../../../../shared/constant';
import { ValidationVendor } from './interface/validationVendor.interface';
import { EasyPaymentType } from '../../../../../shared/interfaces';

describe('Coupon validation', () => {
  context('일반 신용카드 전용 쿠폰이고', () => {
    const coupon: ValidationVendor = {
      code: PaymentVenderName.TOSS_PAYMENTS,
      cardId: CardVenderCode.HYUNDAI_CARD,
      name: '현대',
    };

    context('일반 신용카드 결제수단이면', () => {
      it('cardId 값이 같을 때 true 를 return 한다.', () => {
        const vendor: ValidationVendor = {
          code: PaymentVenderName.TOSS_PAYMENTS,
          cardId: CardVenderCode.HYUNDAI_CARD,
          name: '현대',
        };

        expect(usableCouponWithPayment({ coupon, vendor })).toBeTruthy();
      });

      it('cardId 값이 다를 때 false 를 return 한다.', () => {
        const vendor: ValidationVendor = {
          code: PaymentVenderName.TOSS_PAYMENTS,
          cardId: CardVenderCode.KB_CARD,
          name: 'KB국민',
        };

        expect(usableCouponWithPayment({ coupon, vendor })).toBeFalsy();
      });
    });

    context('컬리페이 결제수단이면', () => {
      it('cardId 값이 같을 때 true 를 return 한다.', () => {
        const vendor: ValidationVendor = {
          code: PaymentVenderName.KURLYPAY,
          cardId: CardVenderCode.HYUNDAI_CARD,
          name: '현대',
          easyPaymentType: EasyPaymentType.CARD,
        };

        expect(usableCouponWithPayment({ coupon, vendor })).toBeTruthy();
      });

      it('cardId 값이 다를 때 false 를 return 한다.', () => {
        const vendor: ValidationVendor = {
          code: PaymentVenderName.KURLYPAY,
          cardId: CardVenderCode.KB_CARD,
          name: 'KB국민',
          easyPaymentType: EasyPaymentType.CARD,
        };

        expect(usableCouponWithPayment({ coupon, vendor })).toBeFalsy();
      });
    });
  });

  context('쿠폰이 일반-비씨(페이북) 전용 쿠폰이라면', () => {
    const bcCoupon: ValidationVendor = {
      code: PaymentVenderName.TOSS_PAYMENTS,
      cardId: CardVenderCode.BC_CARD,
      name: '비씨(페이북)',
      easyPaymentType: EasyPaymentType.CARD,
    };

    it('일반-비씨카드 일 때 true 를 return 한다.', () => {
      const vendor: ValidationVendor = {
        code: PaymentVenderName.TOSS_PAYMENTS,
        cardId: CardVenderCode.BC_CARD,
        name: '비씨카드',
        easyPaymentType: EasyPaymentType.CARD,
      };

      expect(usableCouponWithPayment({ coupon: bcCoupon, vendor })).toBeTruthy();
    });

    it('컬리페이-비씨카드 일 때 true 를 return 한다.', () => {
      const vendor: ValidationVendor = {
        code: PaymentVenderName.KURLYPAY,
        cardId: CardVenderCode.BC_CARD,
        name: '비씨카드',
        easyPaymentType: EasyPaymentType.CARD,
      };

      expect(usableCouponWithPayment({ coupon: bcCoupon, vendor })).toBeTruthy();
    });

    it('컬리페이-컬리카드 일 때 true 를 return 한다.', () => {
      const vendor: ValidationVendor = {
        code: PaymentVenderName.KURLYPAY,
        cardId: CardVenderCode.KURLYPAY_CARD,
        name: '컬리카드',
        easyPaymentType: EasyPaymentType.CARD,
      };

      expect(usableCouponWithPayment({ coupon: bcCoupon, vendor })).toBeTruthy();
    });
  });

  context('컬리페이 신용카드 전용 쿠폰이고', () => {
    const coupon: ValidationVendor = {
      code: PaymentVenderName.KURLYPAY,
      cardId: CardVenderCode.HYUNDAI_CARD,
      name: '컬리페이-현대카드',
      easyPaymentType: EasyPaymentType.CARD,
    };

    context('일반 신용카드 결제수단이면', () => {
      const vendor: ValidationVendor = {
        code: PaymentVenderName.TOSS_PAYMENTS,
        cardId: CardVenderCode.HYUNDAI_CARD,
        name: '현대카드',
      };

      it('false 를 return 한다.', () => {
        expect(usableCouponWithPayment({ coupon, vendor })).toBeFalsy();
      });
    });

    context('컬리페이 개인 신용카드 결제수단이면', () => {
      const vendor: ValidationVendor = {
        code: PaymentVenderName.KURLYPAY,
        cardId: CardVenderCode.HYUNDAI_CARD,
        name: '현대카드',
        easyPaymentType: EasyPaymentType.CARD,
        cardHolderType: 'personal',
      };

      it('true 를 return 한다.', () => {
        expect(usableCouponWithPayment({ coupon, vendor })).toBeTruthy();
      });
    });
  });

  context('쿠폰이 컬리페이-비씨(페이북) 전용 쿠폰이라면', () => {
    const bcCoupon: ValidationVendor = {
      code: PaymentVenderName.KURLYPAY,
      cardId: CardVenderCode.BC_CARD,
      name: '비씨(페이북)',
      easyPaymentType: EasyPaymentType.CARD,
    };

    it('일반-비씨카드 일 때 false 를 return 한다.', () => {
      const vendor: ValidationVendor = {
        code: PaymentVenderName.TOSS_PAYMENTS,
        cardId: CardVenderCode.BC_CARD,
        name: '비씨카드',
      };

      expect(usableCouponWithPayment({ coupon: bcCoupon, vendor })).toBeFalsy();
    });

    it('컬리페이-비씨카드(개인) 일 때 true 를 return 한다.', () => {
      const vendor: ValidationVendor = {
        code: PaymentVenderName.KURLYPAY,
        cardId: CardVenderCode.BC_CARD,
        name: '비씨카드',
        easyPaymentType: EasyPaymentType.CARD,
        cardHolderType: 'personal',
      };

      expect(usableCouponWithPayment({ coupon: bcCoupon, vendor })).toBeTruthy();
    });

    it('컬리페이-컬리카드(개인) 일 때 true 를 return 한다.', () => {
      const vendor: ValidationVendor = {
        code: PaymentVenderName.KURLYPAY,
        cardId: CardVenderCode.KURLYPAY_CARD,
        name: '컬리카드',
        easyPaymentType: EasyPaymentType.CARD,
        cardHolderType: 'personal',
      };

      expect(usableCouponWithPayment({ coupon: bcCoupon, vendor })).toBeTruthy();
    });
  });

  context('쿠폰이 컬리페이 전체카드사 전용 쿠폰이라면', () => {
    const allKurlypayCoupon: ValidationVendor = {
      code: PaymentVenderName.KURLYPAY,
      cardId: CardVenderCode.ALL_CARD,
      name: '컬리페이 카드',
      easyPaymentType: EasyPaymentType.CARD,
    };

    it('일반-비씨카드 일 때 false 를 return 한다.', () => {
      const vendor: ValidationVendor = {
        code: PaymentVenderName.TOSS_PAYMENTS,
        cardId: CardVenderCode.BC_CARD,
        name: '비씨카드',
      };

      expect(usableCouponWithPayment({ coupon: allKurlypayCoupon, vendor })).toBeFalsy();
    });

    context('컬리페이-신용카드(개인) 또는 체크카드 일 때', () => {
      it('true 를 return 한다.', () => {
        const vendor: ValidationVendor = {
          code: PaymentVenderName.KURLYPAY,
          cardId: CardVenderCode.BC_CARD,
          name: '비씨카드',
          easyPaymentType: EasyPaymentType.CARD,
          cardHolderType: 'personal',
        };

        expect(usableCouponWithPayment({ coupon: allKurlypayCoupon, vendor })).toBeTruthy();
      });
    });

    context('컬리페이-신용카드 가 아니면', () => {
      it('false 를 return 한다.', () => {
        const vendor: ValidationVendor = {
          code: PaymentVenderName.KURLYPAY,
          cardId: '004',
          name: '국민은행',
          easyPaymentType: EasyPaymentType.BANK,
        };

        expect(usableCouponWithPayment({ coupon: allKurlypayCoupon, vendor })).toBeFalsy();
      });
    });
  });

  context('컬리카드 전용 쿠폰이고', () => {
    const plccCoupon: ValidationVendor = {
      code: PaymentVenderName.KURLYPAY,
      cardId: CardVenderCode.KURLYPAY_CARD,
      name: '컬리카드',
      easyPaymentType: EasyPaymentType.CARD,
    };

    context('컬리카드(개인) 결제수단이면', () => {
      it('true 를 return 한다.', () => {
        const vendor: ValidationVendor = {
          code: PaymentVenderName.KURLYPAY,
          cardId: CardVenderCode.KURLYPAY_CARD,
          name: '컬리카드',
          easyPaymentType: EasyPaymentType.CARD,
          cardHolderType: 'personal',
        };

        expect(usableCouponWithPayment({ coupon: plccCoupon, vendor })).toBeTruthy();
      });
    });

    context.each`
      vendor
      ${{ code: PaymentVenderName.TOSS_PAYMENTS, cardId: CardVenderCode.BC_CARD, name: '비씨(페이북)' }}
      ${{ code: PaymentVenderName.KURLYPAY, cardId: CardVenderCode.BC_CARD, name: '비씨(페이북)' }}
      ${{ code: PaymentVenderName.KURLYPAY_CREDIT, cardId: CardVenderCode.KB_CARD, name: 'KB국민' }}
      ${{ code: PaymentVenderName.NAVER_PAY, cardId: null, name: '네이버페이' }}
    `('$vendor.code($vendor.name) 결제수단이면', (vendor) => {
      it('false 를 return 한다.', () => {
        expect(usableCouponWithPayment({ coupon: plccCoupon, vendor })).toBeFalsy();
      });
    });
  });

  context('간편결제 전용 쿠폰이고', () => {
    const simpleCoupon: ValidationVendor = {
      code: PaymentVenderName.NAVER_PAY,
      cardId: null,
      name: '네이버페이',
    };

    context('같은 간편결제 수단이면', () => {
      const naverpayVendor: ValidationVendor = {
        code: PaymentVenderName.NAVER_PAY,
        cardId: null,
        name: '네이버페이',
      };

      it('true를 return 한다.', () => {
        expect(usableCouponWithPayment({ coupon: simpleCoupon, vendor: naverpayVendor })).toBeTruthy();
      });
    });

    context.each`
      vendor
      ${{ code: PaymentVenderName.TOSS, cardId: null, name: '토스' }}
      ${{ code: PaymentVenderName.PAYCO, cardId: null, name: '페이코' }}
    `('다른 간편결제($vendor.code) 수단이면', (vendor) => {
      it('false를 return 한다.', () => {
        expect(usableCouponWithPayment({ coupon: simpleCoupon, vendor })).toBeFalsy();
      });
    });

    context.each`
      vendor
      ${{ code: PaymentVenderName.TOSS_PAYMENTS, cardId: CardVenderCode.BC_CARD, name: '비씨(페이북)' }}
      ${{ code: PaymentVenderName.TOSS_PAYMENTS, cardId: CardVenderCode.HYUNDAI_CARD, name: '현대' }}
      ${{ code: PaymentVenderName.KURLYPAY_CREDIT, cardId: CardVenderCode.KB_CARD, name: 'KB국민' }}
      ${{ code: PaymentVenderName.KURLYPAY_CREDIT, cardId: CardVenderCode.SHINHAN_CARD, name: '신한' }}
    `('일반 신용카드 결제수단($vendor.name) 이면', (vendor) => {
      it('false 를 return 한다.', () => {
        expect(usableCouponWithPayment({ coupon: simpleCoupon, vendor })).toBeFalsy();
      });
    });

    context.each`
      vendor
      ${{ code: PaymentVenderName.KURLYPAY, cardId: CardVenderCode.BC_CARD, name: '비씨(페이북)' }}
      ${{ code: PaymentVenderName.KURLYPAY, cardId: CardVenderCode.HYUNDAI_CARD, name: '현대' }}
      ${{ code: PaymentVenderName.KURLYPAY, cardId: CardVenderCode.KURLYPAY_CARD, name: '컬리카드' }}
    `('컬리페이 결제수단($vendor.name) 이면', (vendor) => {
      it('false 를 return 한다.', () => {
        expect(usableCouponWithPayment({ coupon: simpleCoupon, vendor })).toBeFalsy();
      });
    });
  });
});
