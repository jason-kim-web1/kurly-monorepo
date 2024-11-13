import { CheckoutCoupon } from '../../../../shared/interfaces';
import { CheckoutVendorTextMap, OrderVendorCode } from '../../../shared/shared/interfaces/OrderVendorCode.interface';

interface Props {
  disabled?: boolean;
  selectedCoupon?: CheckoutCoupon;
  isEventProducts?: boolean;
  isAllowedPoint?: boolean;
  selectedPlccPoint?: boolean;
  isGiftCardOrder?: boolean;
}

export const getPointMessage = ({
  disabled = false,
  selectedCoupon,
  isEventProducts,
  isAllowedPoint = true,
  selectedPlccPoint,
  isGiftCardOrder = false,
}: Props) => {
  if (selectedPlccPoint) {
    return '[컬리카드 혜택] 적용 시 적립금*컬리캐시 사용 불가';
  }

  if (disabled) {
    const cardName = selectedCoupon && CheckoutVendorTextMap[selectedCoupon.paymentGateways[0] as OrderVendorCode];

    return `[${cardName} 전용쿠폰] 사용 시 적립금*컬리캐시 사용 불가`;
  }

  if (isEventProducts) {
    return '[이벤트] 상품 구매시 적립금*컬리캐시 사용 불가';
  }

  if (!isAllowedPoint) {
    return '적립금*컬리캐시 사용 불가 쿠폰 입니다.';
  }

  if (isGiftCardOrder) {
    return '해당 상품은 적립금*컬리캐시 사용이 불가능합니다.';
  }
  return '';
};
