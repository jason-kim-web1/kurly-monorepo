import { Coupon } from '../../../../../shared/interfaces/Coupon';

export const Coupons: Coupon[] = [
  {
    benefitPrice: 3750,
    benefitSummary: '3,750원 할인',
    benefitType: 'PERCENT_DISCOUNT',
    couponCode: 100124241,
    description: '봄수산 20% 할인(최대1만원, ~5/16 오후 11시까지)',
    expiredAt: '유효기간 없음',
    name: '[대한민국수산대전]봄수산 20%(최대1만원, ~5/16)',
    paymentGateways: ['ALL'],
    pointAllowed: true,
    usable: true,
    creditCardId: null,
  },
  {
    benefitPrice: 3750,
    benefitSummary: '5,700원 할인',
    benefitType: 'PERCENT_DISCOUNT',
    couponCode: 1001242242,
    description: '[신규회원] 조선향미 1kg 100원 ',
    expiredAt: '유효기간 없음',
    name: '[신규회원] 조선향미 1kg 100원 ',
    paymentGateways: ['ALL'],
    pointAllowed: true,
    usable: true,
    creditCardId: null,
  },
  {
    benefitPrice: 3750,
    benefitSummary: '사용불가',
    benefitType: 'PERCENT_DISCOUNT',
    couponCode: 100124242,
    description: 'sdtdssdtsdt',
    expiredAt: '유효기간 없음',
    name: 'testtsedsestt',
    paymentGateways: ['ALL'],
    pointAllowed: true,
    usable: false,
    creditCardId: null,
  },
];
