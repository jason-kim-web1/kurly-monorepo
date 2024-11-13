import { PaymentMethod, PaymentVendorCode } from '../../../../shared/constant';

interface PaymentPair {
  paymentGatewayId: PaymentVendorCode;
  paymentMethod: PaymentMethod;
  paymentText: string;
}

export const paymentPairFixture: PaymentPair[] = [
  {
    paymentGatewayId: 'toss-payments',
    paymentMethod: 'credit_card',
    paymentText: '신용카드',
  },
  {
    paymentGatewayId: 'phonebill',
    paymentMethod: 'mobile_pay',
    paymentText: '휴대폰',
  },
  {
    paymentGatewayId: 'kakao-pay',
    paymentMethod: 'pay_credit_card',
    paymentText: '카카오페이(신용카드)',
  },
  {
    paymentGatewayId: 'kakao-pay',
    paymentMethod: 'pay_money',
    paymentText: '카카오페이(카카오페이머니)',
  },
  {
    paymentGatewayId: 'naver-pay',
    paymentMethod: 'pay_credit_card',
    paymentText: '네이버페이(신용카드)',
  },
  {
    paymentGatewayId: 'naver-pay',
    paymentMethod: 'pay_bank_transfer',
    paymentText: '네이버페이(계좌이체)',
  },
  {
    paymentGatewayId: 'naver-pay',
    paymentMethod: 'pay_point',
    paymentText: '네이버페이(포인트)',
  },
  {
    paymentGatewayId: 'toss',
    paymentMethod: 'pay_credit_card',
    paymentText: '토스(신용카드)',
  },
  {
    paymentGatewayId: 'toss',
    paymentMethod: 'pay_money',
    paymentText: '토스(토스머니)',
  },
  {
    paymentGatewayId: 'payco',
    paymentMethod: 'pay_credit_card',
    paymentText: '페이코(신용카드)',
  },
  {
    paymentGatewayId: 'payco',
    paymentMethod: 'pay_bank_transfer',
    paymentText: '페이코(계좌이체)',
  },
  {
    paymentGatewayId: 'payco',
    paymentMethod: 'pay_point',
    paymentText: '페이코(포인트)',
  },
  {
    paymentGatewayId: 'kurly',
    paymentMethod: 'point_only',
    paymentText: '전액 적립금',
  },
  {
    paymentGatewayId: 'toss-payments-subscription',
    paymentMethod: '',
    paymentText: '정기결제',
  },
  {
    paymentGatewayId: 'others',
    paymentMethod: '',
    paymentText: '기타',
  },
  {
    paymentGatewayId: 'paynow',
    paymentMethod: '',
    paymentText: '페이나우',
  },
];
