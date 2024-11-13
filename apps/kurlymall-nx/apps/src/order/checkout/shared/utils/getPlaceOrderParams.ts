import { isMobile } from 'react-device-detect';

import { getAppVersion, isAos, isPC, isWebview } from '../../../../../util/window/getDevice';
import { FrontDoorMethod, PickupDetailCategory, ReceivePlace } from '../../../../shared/enums';
import {
  PlaceOrderReceiverFormRequest,
  UserAgentParameter,
  TermsAgreements,
  TermsPolicyList,
  ApplicationType,
  Platform,
  EasyPaymentType,
  EasyPaymentCompanyId,
  CallbackUrl,
} from '../../../../shared/interfaces';
import { removeHyphen } from '../../../../shared/services';
import { CreditCard, Installment, OrderVendorCode } from '../../../shared/shared/interfaces';
import { isCreditCardPayments, isKurlypayPayments } from '../../../shared/shared/services';
import { ReceiverForm } from '../interfaces';
import { ORDER_PATH, PickupDetailCategoryTextMap } from '../../../../shared/constant';

/**
 * 주문 생성 API 에서는 pickupDetailCategory 값을 넣을 프로퍼티가 없어
 * 아래와 같이 pickupDetailCategory 값에 따라 pickupDetail 프로퍼티에 다르게 값을 넣어주고 있습니다.
 *
 * ETC : pickupDetail 값 입력
 *
 * PICKUP_BOX : pickupDetail 값과 pickupDetailCategory 값을 합쳐서 “택배 수령실 - 아파트 입구 오른쪽에있습니다“ 형식으로 입력
 *
 * FRONT_OF_ENTRANCE : pickupDetailCategory 값 입력
 *
 * @param pickupDetail - (기존) 받을 장소 세부사항
 * @param pickupDetailCategory - (새로 추가 된) 받을 장소 옵션
 * @returns string
 */
const setPickupDetail = (pickupDetail: string, pickupDetailCategory: PickupDetailCategory) => {
  switch (pickupDetailCategory) {
    case PickupDetailCategory.ETC:
      return pickupDetail;
    case PickupDetailCategory.PICKUP_BOX:
      return `${PickupDetailCategoryTextMap.PICKUP_BOX} - ${pickupDetail}`;
    case PickupDetailCategory.FRONT_OF_ENTRANCE:
      return PickupDetailCategoryTextMap.FRONT_OF_ENTRANCE;
  }
};

export const getReceiverDetailParams = (receiverForm: ReceiverForm): PlaceOrderReceiverFormRequest => {
  const {
    name,
    phone,
    roadAddress,
    addressDetail,
    receivePlace,
    pickupDetail,
    pickupDetailCategory,
    frontDoorMethod,
    frontDoorDetail,
    deliveryCompleteMessage,
  } = receiverForm;
  const isPickupDetail = receivePlace !== ReceivePlace.DOOR;
  const isAccessMethod = receivePlace !== ReceivePlace.ETC;
  const isAccessDetail = frontDoorMethod !== FrontDoorMethod.FREE && frontDoorMethod !== null;

  return {
    receiverName: name,
    receiverPhoneNumber: removeHyphen(phone),
    address: roadAddress,
    addressDetail,
    pickupType: receivePlace,
    pickupDetail: isPickupDetail ? setPickupDetail(pickupDetail, pickupDetailCategory) : '',
    accessMethod: isAccessMethod ? frontDoorMethod : null,
    accessDetail: isAccessDetail ? frontDoorDetail : '',
    deliveryMessageTimeType: deliveryCompleteMessage ? deliveryCompleteMessage : null,
  };
};

// 유저 에이전트 정보
export const getUserAgentDetailParams = (): UserAgentParameter => {
  let applicationType = isPC ? ApplicationType.DESKTOP_WEB : ApplicationType.MOBILE_WEB;
  let platform = Platform.DESKTOP;
  let appVersion = null;

  if (isMobile) {
    platform = isAos ? Platform.ANDROID : Platform.IOS;

    if (isWebview()) {
      const currentAppVersion = getAppVersion();
      applicationType = ApplicationType.MOBILE_APP;
      appVersion = currentAppVersion !== '' ? currentAppVersion : null;
    }
  }

  return {
    applicationType,
    platform,
    appVersion,
  };
};

// 약관 동의 정보
export const getTermsAgreements = (termsList: TermsPolicyList[]): TermsAgreements[] => {
  return termsList.map(({ code, agreed }) => ({
    termsCode: code,
    agreed,
  }));
};

// 결제 이후 리다이렉션 URL
export const getCallbackUrl = ({ isJoinOrder, selectedVendorCode }: CallbackUrl) => {
  if (isJoinOrder) {
    return {
      paymentSuccessRedirectUrl: `${origin}${ORDER_PATH.joinProcess.uri}/${selectedVendorCode}`,
      paymentFailRedirectUrl: `${origin}${ORDER_PATH.joinPayFail.uri}`,
      paymentCancelRedirectUrl: `${origin}${ORDER_PATH.joinCancel.uri}/${selectedVendorCode}`,
    };
  }

  return {
    paymentSuccessRedirectUrl: `${origin}${ORDER_PATH.process.uri}/${selectedVendorCode}`,
    paymentFailRedirectUrl: `${origin}${ORDER_PATH.payFail.uri}`,
    paymentCancelRedirectUrl: `${origin}${ORDER_PATH.cancel.uri}/${selectedVendorCode}`,
  };
};

// 신용카드 정보
export const getCreditCardParameter = ({
  selectedVendorCode,
  selectedCreditCard,
  selectedInstallment,
  kurlypayPaymentType,
  kurlypayInstallment,
  kurlypayCreditCard,
}: {
  selectedVendorCode: OrderVendorCode;
  selectedCreditCard?: CreditCard;
  selectedInstallment?: Installment;
  kurlypayPaymentType?: EasyPaymentType;
  kurlypayInstallment?: Installment;
  kurlypayCreditCard?: EasyPaymentCompanyId | null;
}) => {
  if (
    isKurlypayPayments(selectedVendorCode) &&
    kurlypayPaymentType === EasyPaymentType.CARD &&
    kurlypayInstallment &&
    kurlypayCreditCard
  ) {
    return {
      creditCardId: kurlypayCreditCard,
      installmentPlan: Number(kurlypayInstallment.value),
    };
  }
  if (isCreditCardPayments(selectedVendorCode) && selectedCreditCard && selectedInstallment) {
    return {
      creditCardId: selectedCreditCard.value,
      installmentPlan: Number(selectedInstallment.value),
    };
  }
  return null;
};

// 컬리페이 간편결제 정보
export const getKurlypayEasyPaymentParameter = ({
  kurlypayPaymentType,
  kurlypayPaymentMethodId,
  deviceId,
  useCardPoint,
}: {
  kurlypayPaymentType?: EasyPaymentType;
  kurlypayPaymentMethodId?: string;
  useCardPoint: boolean;
  deviceId: string;
}) =>
  kurlypayPaymentType && kurlypayPaymentMethodId
    ? {
        paymentType: kurlypayPaymentType,
        paymentMethodId: kurlypayPaymentMethodId,
        useCardPoint,
        deviceId,
      }
    : undefined;
