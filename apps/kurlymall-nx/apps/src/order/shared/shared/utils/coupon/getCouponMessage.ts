import { CardVenderCode, CartVendorName } from '../../../../../shared/constant';
import { CheckoutCoupon, KurlypayVendor } from '../../../../../shared/interfaces';
import { CreditCard, PaymentVendor } from '../../interfaces';
import { isCreditCardPayments } from '../../services';

export const getCouponMessage = ({
  vendors,
  creditCards,
  coupon,
  kurlypayVendors,
}: {
  vendors: PaymentVendor[];
  creditCards: CreditCard[];
  coupon?: CheckoutCoupon;
  kurlypayVendors: KurlypayVendor[];
}) => {
  if (!coupon) {
    return;
  }

  const [paymentGateway] = coupon.paymentGateways;

  if (paymentGateway === 'ALL') {
    return;
  }

  if (paymentGateway === 'kurlypay') {
    const kurlypayCard = kurlypayVendors?.find(({ companyId }) => companyId === coupon.creditCardId);

    if (coupon.creditCardId === CardVenderCode.ALL_CARD) {
      return `컬리페이 카드 전용 쿠폰 사용 시, 컬리페이 카드 결제만 가능합니다. (법인카드 제외)`;
    }

    if (kurlypayCard) {
      return `컬리페이 ${kurlypayCard.companyName} 전용 쿠폰 사용 시, 컬리페이 ${kurlypayCard.companyName} 결제만 가능합니다. (법인카드 제외)`;
    }

    const companyName = coupon.creditCardId ? `${CartVendorName[coupon.creditCardId]}` : '';

    return `컬리페이 ${companyName}카드 전용 쿠폰 사용 시, 컬리페이 ${companyName}카드 결제만 가능합니다. (법인카드 제외)`;
  }

  if (isCreditCardPayments(paymentGateway)) {
    const cardName = creditCards?.find(({ value }) => value === coupon.creditCardId)?.name;

    if (!cardName) {
      return;
    }

    return `${cardName}카드 전용 쿠폰 사용 시, ${cardName}카드 결제만 가능합니다. (법인카드 제외)`;
  }

  const vendorName = vendors?.find(({ code }) => code === paymentGateway)?.name;

  if (!vendorName) {
    return;
  }

  return `${vendorName} 전용 쿠폰 사용 시, ${vendorName} 결제만 가능합니다.`;
};
