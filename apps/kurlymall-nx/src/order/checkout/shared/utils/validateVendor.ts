import { isCreditCardPayments, isKurlypayPaymentType, isKurlypayVendor } from '../../../shared/shared/services';
import { CheckoutPaymentState } from '../reducers/checkout-payment.slice';
import { CheckoutErrorMessageFormat } from './validateInvalidField';
import { EasyPaymentType } from '../../../../shared/interfaces';

type RequireField = 'selectedVendor' | 'selectedCreditCard' | 'selectedInstallment' | 'selectedKurlypayVendor';

// (공통) 주문서 - 결제수단 검증
export const validateVendor = ({
  selectedVendor,
  selectedCreditCard,
  selectedInstallment,
  selectedKurlypayVendor,
}: Pick<CheckoutPaymentState, RequireField>): CheckoutErrorMessageFormat => {
  if (!selectedVendor) {
    return {
      errorMessage: '결제수단을 선택해주세요.',
      documentId: 'payment-methods',
    };
  }

  if (isCreditCardPayments(selectedVendor.code)) {
    if (!selectedCreditCard) {
      return {
        errorMessage: '신용카드를 선택해주세요.',
        documentId: 'payment-methods',
      };
    }

    if (!selectedInstallment) {
      return {
        errorMessage: '할부 기간을 선택해주세요.',
        documentId: 'payment-methods',
      };
    }
  }

  // 컬리페이 결제 수단 검증 (로띠 및 추가 슬라이더는 제외)
  if (isKurlypayVendor(selectedVendor)) {
    if (
      isKurlypayPaymentType(EasyPaymentType.ADD_PLCC, selectedKurlypayVendor) ||
      isKurlypayPaymentType(EasyPaymentType.ADD_KURLYPAY, selectedKurlypayVendor)
    ) {
      return {
        errorMessage: '결제수단을 선택해주세요.',
        documentId: 'payment-methods',
      };
    }

    // disabled 된 컬리페이 결제수단 검증
    if (selectedKurlypayVendor?.isDisabled) {
      return {
        errorMessage: '해당 상품 구매시 선택하신 카드는 사용이 제한됩니다.',
        documentId: 'payment-methods',
      };
    }
  }

  return {
    errorMessage: '',
    documentId: '',
  };
};
