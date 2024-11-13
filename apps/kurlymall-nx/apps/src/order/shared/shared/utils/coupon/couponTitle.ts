import { isEmpty } from 'lodash';

import { CartVendorName } from '../../../../../shared/constant';
import { Benefit, CheckoutCoupon } from '../../../../../shared/interfaces';
import { addComma } from '../../../../../shared/services';
import { vendorStyles } from '../../constants/vendor-styles';

type RequiredField = 'type' | 'totalCouponDiscount';

export const BenefitTitle = ({
  disabled,
  type,
  totalCouponDiscount,
}: Pick<CheckoutCoupon, RequiredField> & { disabled: boolean }) => {
  if (disabled) {
    return '사용 불가';
  }

  if (type === Benefit.FREE_SHIPPING) {
    return '무료 배송';
  }

  return `${addComma(totalCouponDiscount)}원 할인`;
};

export const CardTitle = ({
  paymentGateways,
  creditCardId,
}: Pick<CheckoutCoupon, 'paymentGateways' | 'creditCardId'>) => {
  const paymentGateway = paymentGateways[0];
  if (paymentGateway === 'ALL') {
    return '';
  }

  const { name } = vendorStyles[paymentGateway];

  if (name === '신용카드' && creditCardId && !isEmpty(creditCardId)) {
    return ` (${CartVendorName[creditCardId]}카드 전용)`;
  }

  return ` (${name} 전용)`;
};
