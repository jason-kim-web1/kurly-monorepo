import { CardVenderCode, PaymentVenderName } from '../../../../../shared/constant';
import { CARD_HOLDER_TYPE, EasyPaymentType } from '../../../../../shared/interfaces';
import { ValidationVendor } from './interface/validationVendor.interface';

interface Props {
  coupon: ValidationVendor;
  vendor: ValidationVendor;
}

function compareCardId({ coupon, vendor }: Props) {
  // 쿠폰이 BC 인데, 결제수단이 PLCC면 true
  if (coupon.cardId === CardVenderCode.BC_CARD && vendor.cardId === CardVenderCode.KURLYPAY_CARD) {
    return true;
  }
  // 쿠폰이 컬리페이-전체카드사 전용 쿠폰
  if (coupon.cardId === CardVenderCode.ALL_CARD && vendor.easyPaymentType === EasyPaymentType.CARD) {
    return true;
  }
  // 카드사 ID가 같으면 true 아니면 false
  return coupon.cardId === vendor.cardId;
}

export default function usableCouponWithPayment({ coupon, vendor }: Props) {
  switch (coupon.code) {
    // 일반신용카드 쿠폰 일 때
    case PaymentVenderName.TOSS_PAYMENTS:
    case PaymentVenderName.KURLYPAY_CREDIT:
      //일반 신용카드에는 cardHolderType값이 없으므로 컬리페이-신용카드(법인)인 경우에만 제외
      return compareCardId({ coupon, vendor }) && vendor.cardHolderType !== CARD_HOLDER_TYPE.CORPORATE;
    // 컬리페이-신용카드 전용 쿠폰 일 때
    case PaymentVenderName.KURLYPAY:
      return vendor.code === PaymentVenderName.KURLYPAY
        ? compareCardId({ coupon, vendor }) && vendor.cardHolderType === CARD_HOLDER_TYPE.PERSONAL
        : false;
    // 간편결제 전용 쿠폰 일 때
    default:
      return coupon.code === vendor.code;
  }
}
