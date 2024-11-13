import {
  CalculateServiceRequest,
  CheckoutCoupon,
  EasyPaymentCompanyId,
  KurlypayVendor,
  MemberPointBenefit,
} from '../../../../shared/interfaces';
import { CreditCard, PaymentVendor, OrderVendorCode } from '../../../shared/shared/interfaces';
import { isCreditCardPayments, isKurlypayVendor } from '../../../shared/shared/services';
import { CardVenderCode, CardVendorCode } from '../../../../shared/constant';
interface Props {
  selectedCoupon?: CheckoutCoupon;
  usedPoint?: number;
  deliveryPrice?: number;
  selectedVendor?: PaymentVendor;
  selectedCreditCard?: CreditCard;
  selectedKurlypayVendor?: KurlypayVendor;
  pointBenefit?: MemberPointBenefit;
  usedPlccPoint?: number;
  isUseAllPoint?: boolean;
}

export const getCalculateParams = ({
  selectedCoupon,
  usedPoint,
  deliveryPrice = 0,
  selectedVendor,
  selectedCreditCard,
  selectedKurlypayVendor,
  pointBenefit,
  usedPlccPoint = 0,
  isUseAllPoint,
}: Props): CalculateServiceRequest => {
  const isSelectedCardCoupon = selectedCoupon && isCreditCardPayments(selectedVendor?.code);

  let creditCardId = null;
  let kurlypayPaymentMethodId = null;

  if (isKurlypayVendor(selectedVendor) && selectedKurlypayVendor) {
    if (selectedKurlypayVendor?.paymentMethodId === 'add-kurlypay-card') {
      kurlypayPaymentMethodId = null;
      creditCardId = selectedCoupon?.creditCardId ?? null;
    } else if (selectedKurlypayVendor?.paymentMethodId === 'plcc-lottie') {
      kurlypayPaymentMethodId = null;
      creditCardId = CardVenderCode.KURLYPAY_CARD;
    } else {
      kurlypayPaymentMethodId = selectedKurlypayVendor?.paymentMethodId;
      creditCardId = selectedKurlypayVendor?.companyId as EasyPaymentCompanyId;
    }
  } else if (selectedCreditCard && isSelectedCardCoupon) {
    creditCardId = selectedCreditCard.value as CardVendorCode;
  }

  return {
    memberReserveRatio: pointBenefit?.percent,
    couponCode: selectedCoupon ? String(selectedCoupon.couponCode) : null,
    usedPoint,
    paymentGateways: isUseAllPoint ? 'kurly' : (selectedVendor?.code as OrderVendorCode),
    creditCardId,
    deliveryPrice,
    usedPlccPoint,
    kurlypayPaymentMethodId,
  };
};
