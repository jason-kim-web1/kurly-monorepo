import { CardVenderCode } from '../../../../shared/constant';
import { EasyPaymentCompanyId, EasyPaymentType, KurlypayType, KurlypayVendor } from '../../../../shared/interfaces';
import { AmplitudePaymentMethods, PaymentVendor } from '../../../shared/shared/interfaces';
import { isKurlypayPaymentType, isKurlypayVendor } from '../../../shared/shared/services';

/**
 * @param {selectedVendor} selectedVendor 선택 된 결제수단
 * @param {EasyPaymentType} kurlypayPaymentType 컬리페이 결제수단 타입
 * @param {EasyPaymentCompanyId} kurlypayCreditCard 컬리페이 신용카드 및 은행 코드
 * @param {selectedKurlypayVendor} selectedKurlypayVendor 선택 된 컬리페이 결제수단
 * @param {isUseAllPoint} isUseAllPoint 적립금*컬리캐시 전액사용 여부
 * @param {boolean} isUseOnlyFree 적립금만 전액사용 여부
 * @param {boolean} isUseOnlyCash 컬리캐시만 전액사용 여부
 * @returns 선택된 결제수단을 구분하여 리턴한다.
 */
export const getAmplitudePaymentMethod = (
  selectedVendor: PaymentVendor,
  isUseAllPoint: boolean,
  kurlypayPaymentType?: EasyPaymentType,
  kurlypayCreditCard?: EasyPaymentCompanyId | null,
  selectedKurlypayVendor?: KurlypayVendor | undefined,
  isUseOnlyFreePoint?: boolean,
  isUseOnlyPaidPoint?: boolean,
) => {
  if (isUseAllPoint) {
    if (isUseOnlyFreePoint) return AmplitudePaymentMethods.onlyFreePoint;
    if (isUseOnlyPaidPoint) return AmplitudePaymentMethods.onlyPaidPoint;
    return AmplitudePaymentMethods.kurly;
  }

  if (!isKurlypayVendor(selectedVendor)) {
    return AmplitudePaymentMethods[selectedVendor.code];
  }

  if (
    isKurlypayPaymentType(EasyPaymentType.ADD_PLCC, selectedKurlypayVendor) ||
    isKurlypayPaymentType(EasyPaymentType.ADD_KURLYPAY, selectedKurlypayVendor)
  ) {
    return 'null';
  }

  if (kurlypayPaymentType === EasyPaymentType.BANK) {
    return KurlypayType.ACCOUNT;
  }

  if (kurlypayCreditCard === CardVenderCode.KURLYPAY_CARD) {
    return KurlypayType.PLCC;
  }

  return KurlypayType.CARD;
};
