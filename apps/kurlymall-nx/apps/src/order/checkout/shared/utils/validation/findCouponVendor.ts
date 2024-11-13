import { head } from 'lodash';

import { CheckoutCoupon, EasyPaymentType, KurlypayVendor } from '../../../../../shared/interfaces';
import { CreditCard, PaymentVendor } from '../../../../shared/shared/interfaces';
import { isCreditCardPayments, isKurlypayVendor } from '../../../../shared/shared/services';
import { findVendor } from '../findVendor';
import { ValidationVendor } from './interface/validationVendor.interface';
import { CardVenderCode } from '../../../../../shared/constant';

interface Props {
  selectedCoupon?: CheckoutCoupon;
  vendors: PaymentVendor[];
  creditCards: CreditCard[];
  kurlypayVendors: KurlypayVendor[];
}

/**
 * "결제수단 전용 쿠폰" 에 대해서 어떤 결제수단인지 찾아 validation 에 사용됩니다.
 * 주문서에서 결제하기 버튼 클릭 시 사용되며 useableCouponWithPayment.ts util 에 전달 할 데이터를 만듭니다.
 *
 * @param {Props} props
 * @param {CheckoutCoupon | undefined} props.selectedCoupon - 선택 한 쿠폰의 정보
 * @param {PaymentVendor[]} props.vendors - 결제수단 목록
 * @param {CreditCard[]} props.creditCards - 신용카드 목록
 * @param {KurlypayVendor[]} props.kurlypayVendors - 사용자가 갖고있는 컬리페이 간편 결제수단 목록
 * @returns {ValidationVendor | undefined}
 */
export const findCouponVendor = ({
  selectedCoupon,
  vendors,
  creditCards,
  kurlypayVendors,
}: Props): ValidationVendor | undefined => {
  if (!selectedCoupon) {
    return undefined;
  }

  const { paymentGateways, creditCardId } = selectedCoupon;

  const couponPaymentCode = head(paymentGateways);
  const couponVendor = findVendor(vendors, couponPaymentCode);

  if (!couponVendor) {
    return undefined;
  }

  if (isCreditCardPayments(couponVendor.code)) {
    const creditCard = creditCards.find(({ value }) => value === creditCardId);
    if (!creditCard) {
      return undefined;
    }

    return {
      code: couponVendor.code,
      cardId: creditCard.value,
      name: `${creditCard.name}카드`,
    };
  }

  if (isKurlypayVendor(couponVendor)) {
    if (creditCardId === CardVenderCode.ALL_CARD) {
      return {
        code: couponVendor.code,
        cardId: CardVenderCode.ALL_CARD,
        name: '컬리페이 카드',
        easyPaymentType: EasyPaymentType.CARD,
      };
    }

    const kurlypayCreditCard = kurlypayVendors.find(({ companyId }) => {
      if (creditCardId === CardVenderCode.BC_CARD && companyId === CardVenderCode.KURLYPAY_CARD) {
        return true;
      }
      return companyId === creditCardId;
    });

    if (!kurlypayCreditCard) {
      return undefined;
    }

    return {
      code: couponVendor.code,
      cardId: kurlypayCreditCard.companyId,
      name: kurlypayCreditCard.companyName,
      easyPaymentType: kurlypayCreditCard.paymentType,
    };
  }

  if (['kakao-pay', 'naver-pay', 'toss', 'payco'].includes(couponVendor.code)) {
    return {
      code: couponVendor.code,
      cardId: null,
      name: couponVendor.name,
    };
  }
};
