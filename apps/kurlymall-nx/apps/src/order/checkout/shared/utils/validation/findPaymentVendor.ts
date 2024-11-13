import { KurlypayVendor } from '../../../../../shared/interfaces';
import { CreditCard, PaymentVendor } from '../../../../shared/shared/interfaces';
import { isCreditCardPayments, isKurlypayVendor } from '../../../../shared/shared/services';
import { findVendor } from '../findVendor';
import { ValidationVendor } from './interface/validationVendor.interface';

interface Props {
  selectedVendor?: PaymentVendor;
  selectedKurlypayVendor?: KurlypayVendor;
  selectedCreditCard?: CreditCard;
  vendors: PaymentVendor[];
  creditCards: CreditCard[];
}

/**
 * "선택한 결제수단" 에 대해서 실제로 결제수단이 있는지 찾아 validation 에 사용됩니다.
 * 주문서에서 결제하기 버튼 클릭 시 사용되며 useableCouponWithPayment.ts util 에 전달 할 데이터를 만듭니다.
 *
 * @param {Props} props
 * @param {PaymentVendor} props.selectedVendor - 선택 한 결제수단
 * @param {KurlypayVendor} props.selectedKurlypayVendor - 선택 한 컬리페이 결제수단
 * @param {CreditCard} props.selectedCreditCard - 선택 한 신용카드
 * @param {KurlypayVendor[]} props.vendors - 결제수단 목록
 * @param {CreditCard[]} props.creditCards - 신용카드 목록
 * @returns {ValidationVendor | undefined}
 */
export const findPaymentVendor = ({
  selectedVendor,
  selectedKurlypayVendor,
  selectedCreditCard,
  vendors,
  creditCards,
}: Props): ValidationVendor | undefined => {
  const paymentVendor = findVendor(vendors, selectedVendor?.code);

  if (!paymentVendor) {
    return undefined;
  }

  const { code, name } = paymentVendor;

  if (isCreditCardPayments(code)) {
    const card = creditCards.find(({ value }) => value === selectedCreditCard?.value);

    if (!card) {
      return undefined;
    }

    return {
      code,
      cardId: card.value,
      name: `${card.name}카드`,
    };
  }

  if (isKurlypayVendor(paymentVendor)) {
    if (!selectedKurlypayVendor) {
      return undefined;
    }

    return {
      code,
      cardId: selectedKurlypayVendor.companyId,
      name: selectedKurlypayVendor.companyName,
      easyPaymentType: selectedKurlypayVendor.paymentType,
      cardHolderType: selectedKurlypayVendor.cardHolderType,
    };
  }

  if (['kakao-pay', 'phonebill', 'naver-pay', 'toss', 'payco'].includes(code)) {
    return {
      code,
      cardId: null,
      name,
    };
  }
};
