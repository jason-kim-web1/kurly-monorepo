import { CARD_HOLDER_TYPE, CalculatedPrice, CheckoutCoupon } from '../../../../../shared/interfaces';

import { CheckoutErrorMessageFormat } from '../validateInvalidField';
import { ValidationVendor } from './interface/validationVendor.interface';
import usableCouponWithPayment from './usableCouponWithPayment';

interface Params {
  selectedCoupon?: CheckoutCoupon;
  usedPoint: number;
  couponVendor?: ValidationVendor;
  paymentVendor?: ValidationVendor;
  price: CalculatedPrice;
}

// (회원) 쿠폰 사용 검증
export const validateCouponField = ({
  selectedCoupon,
  usedPoint,
  couponVendor,
  paymentVendor,
  price,
}: Params): CheckoutErrorMessageFormat => {
  if (!selectedCoupon || selectedCoupon?.paymentGateways[0] === 'ALL') {
    return {
      errorMessage: '',
      documentId: '',
    };
  }

  if (!selectedCoupon.pointAllowed && usedPoint > 0) {
    return {
      errorMessage: '적립금을 사용할 수 없습니다.',
      documentId: '',
    };
  }

  if (!couponVendor || !paymentVendor) {
    return {
      errorMessage: '선택하신 결제수단으로 결제할 수 없습니다.',
      documentId: '',
    };
  }

  const couponNameText = `${couponVendor.name} 전용 쿠폰 사용시,`;

  if (price.paymentPrice === 0) {
    return {
      errorMessage: `${couponNameText}\n0원 결제가 불가능합니다.`,
      documentId: '',
    };
  }

  if (usableCouponWithPayment({ coupon: couponVendor, vendor: paymentVendor })) {
    return {
      errorMessage: '',
      documentId: '',
    };
  }

  const { name, code, cardHolderType } = paymentVendor;

  const cardHolderTypeText = cardHolderType === CARD_HOLDER_TYPE.CORPORATE ? '(법인)' : '';

  const vendorNameText = `${cardHolderTypeText}${name}${
    ['kurlypay', 'phonebill'].includes(code) ? '(으)' : ''
  }로 결제가 불가능합니다.`;

  return {
    errorMessage: `${couponNameText}\n${vendorNameText}`,
    documentId: '',
  };
};
