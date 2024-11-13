import { Grade } from '../../../../shared/enums';
import { VendorCodeWithDeleted, VendorCodes, VendorCode } from '../interfaces';
import { CheckoutType, OrderTypeInformation } from '../../../../shared/interfaces';

/**
 * 사용 불가능한 결제수단을 리턴하는 함수
 * @param {boolean} hasKurlypayError 컬리페이 장애 여부
 * @param {OrderTypeInformation} orderTypeInformation 주문서 정보
 *
 * @return { VendorCode[] } 불가능한 결제수단 배열 리턴
 */
export const disableVendor = (hasKurlypayError: boolean, orderTypeInformation: OrderTypeInformation): VendorCode[] => {
  const {
    checkoutType = CheckoutType.NORMAL,
    isGiftOrder = false,
    isJoinOrder = false,
    userGrade,
    isSubscribed,
  } = orderTypeInformation;

  const disableVendorArray: VendorCodeWithDeleted[] = ['smile-pay', 'mobilians'];
  const isLiquidityOrder = checkoutType === CheckoutType.LIQUIDITY;

  if (isGiftOrder || isJoinOrder || isLiquidityOrder || (userGrade === Grade.Welcome && !isSubscribed)) {
    disableVendorArray.push(VendorCodes.PHONEBILL);
  }

  if (isLiquidityOrder) {
    const simpleVendors = [VendorCodes.NAVER_PAY, VendorCodes.TOSS, VendorCodes.PAYCO];
    disableVendorArray.push(VendorCodes.KAKAOPAY, ...simpleVendors);
  }

  if (hasKurlypayError) {
    disableVendorArray.push(VendorCodes.KURLYPAY);
  }

  return disableVendorArray as VendorCode[];
};
