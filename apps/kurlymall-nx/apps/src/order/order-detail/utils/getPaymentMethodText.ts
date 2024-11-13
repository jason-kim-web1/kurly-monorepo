import { isEmpty } from 'lodash';

import { PaymentMethod, PaymentVendorCode } from '../../../shared/constant';

interface Props {
  paymentGatewayId: PaymentVendorCode;
  paymentMethod: PaymentMethod;
  paymentGatewayIdDisplayName: string;
}

const PaymentVendorTextMap: Record<PaymentVendorCode, string> = {
  'smile-pay': '스마일페이',
  paynow: '페이나우',
  payco: '페이코',
  'naver-pay': '네이버페이',
  toss: '토스',
  chai: '차이',
  'kakao-pay': '카카오페이',
  mobilians: '휴대폰',
  phonebill: '휴대폰',
  'toss-payments': '신용카드',
  'kurlypay-credit': '신용카드',
  'toss-payments-subscription': '정기결제',
  kurly: '적립금 · 컬리캐시 전액사용',
  others: '기타',
  kurlypay: '컬리페이',
};

const legacyPaymentMethods = [
  'bank_deposit',
  'virtual_account',
  'promotion',
  'pay_coupon',
  'pay_discount',
  'pay_gift_card',
  'others',
];

export const getPaymentMethodText = ({ paymentGatewayId, paymentMethod, paymentGatewayIdDisplayName }: Props) => {
  if (isEmpty(paymentMethod) || legacyPaymentMethods.includes(paymentMethod)) {
    return PaymentVendorTextMap[paymentGatewayId];
  }

  return paymentGatewayIdDisplayName ?? PaymentVendorTextMap[paymentGatewayId];
};
