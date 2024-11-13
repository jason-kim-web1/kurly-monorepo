import { isEmpty } from 'lodash';

import { PaymentMethod, PaymentVendorCode } from '../../../../shared/constant';
import { PaymentVendorTextMap } from '../../../order/shared/constants/payment-summary';

interface Props {
  paymentGatewayId: PaymentVendorCode;
  paymentMethod: PaymentMethod;
  paymentGatewayIdDisplayName: string;
}

export const getPayment = ({ paymentGatewayId, paymentMethod, paymentGatewayIdDisplayName }: Props) => {
  const legacyPaymentMethod = [
    'bank_deposit',
    'virtual_account',
    'promotion',
    'pay_coupon',
    'pay_discount',
    'pay_gift_card',
    'others',
  ];

  const payment =
    isEmpty(paymentMethod) || legacyPaymentMethod.includes(paymentMethod)
      ? PaymentVendorTextMap[paymentGatewayId]
      : paymentGatewayIdDisplayName ?? PaymentVendorTextMap[paymentGatewayId];

  return { payment };
};
