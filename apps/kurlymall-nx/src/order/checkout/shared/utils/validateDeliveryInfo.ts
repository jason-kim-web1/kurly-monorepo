import { isEmpty } from 'lodash';

import { FrontDoorMethod, PickupDetailCategory, ReceivePlace } from '../../../../shared/enums';
import { isDefaultPhoneNumber, phoneValidate } from '../../../../shared/utils';
import { Notification, NotificationType, RecipientInfo } from '../../../gift/shared/interfaces/ReceiverForm.interface';

import { ReceiverForm } from '../interfaces';
import {
  checkInvalidField,
  CheckoutErrorMessageFormat,
  CheckoutErrorMessageRequest,
  findErrorField,
} from './validateInvalidField';
import {
  REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE,
  REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE,
  REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE,
} from '../constants/delivery-request-validate-message';
import { invalidName } from '../../../../shared/constant';

/*
 참고
 배송 상세 정보 입력 페이지에서 검증하는 알럿 문구와
 결제하기 버튼 클릭 시에 검증하는 알럿 문구가 조금씩 다릅니다.
*/

// (샛별) 배송 상세 정보 필드 검증
export const validateDirectDelivery = (receiverForm: ReceiverForm): CheckoutErrorMessageFormat => {
  const { receivePlace, pickupDetail, frontDoorMethod, frontDoorDetail, pickupDetailCategory } = receiverForm;

  // 출입방법이 문앞이면
  if (receivePlace == ReceivePlace.DOOR) {
    if (frontDoorMethod === FrontDoorMethod.PASSWORD) {
      return checkInvalidField({
        fieldName: 'frontDoorDetail',
        value: frontDoorDetail,
        emptyMessage: '공동현관 비밀번호를 입력해주세요.',
        documentId: 'front-door-password-field',
        correctMessage: '공동현관 비밀번호에 사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
      });
    }

    if (frontDoorMethod === FrontDoorMethod.CALL_SECURITY_OFFICE) {
      return checkInvalidField({
        fieldName: 'frontDoorDetail',
        value: frontDoorDetail,
        documentId: 'front-door-call-security-office-field',
        correctMessage: '경비실 호출 방법에 사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
      });
    }

    if (frontDoorMethod === FrontDoorMethod.ETC) {
      return checkInvalidField({
        fieldName: 'frontDoorDetail',
        value: frontDoorDetail,
        emptyMessage: '문 앞 기타 출입방법 내용을 입력해주세요.',
        documentId: 'front-door-etc-field',
        correctMessage: '문 앞 기타 출입방법에 사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
      });
    }

    return {
      errorMessage: '',
      documentId: '',
    };
  }

  if (receivePlace === ReceivePlace.ETC) {
    if (pickupDetailCategory === PickupDetailCategory.ETC) {
      return checkInvalidField({
        fieldName: 'pickupDetail',
        value: pickupDetail,
        emptyMessage: '기타 장소 세부 사항 내용을 입력해주세요.',
        documentId: 'etc-etc-field',
        correctMessage: '기타 장소 세부 사항에 사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
      });
    }

    if (pickupDetailCategory === PickupDetailCategory.PICKUP_BOX) {
      return checkInvalidField({
        fieldName: 'pickupDetail',
        value: pickupDetail,
        emptyMessage: '택배 수령실 위치를 자세히 입력해주세요.',
        documentId: 'etc-pickup-box-field',
        correctMessage: '택배 수령 장소 내용에 사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
      });
    }
  }

  return {
    errorMessage: '',
    documentId: '',
  };
};

// 배송 상세 정보 입력 - 받는 분 정보 검증
export const validateDeliveryReceiverInfo = (receiverForm: ReceiverForm): CheckoutErrorMessageFormat => {
  const { name, phone } = receiverForm;

  const receiver: CheckoutErrorMessageRequest[] = [
    {
      fieldName: 'name',
      value: name,
      emptyMessage: '받는 분 이름을 입력해주세요.',
      documentId: 'receiver-name',
      correctMessage: '사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
    },
    {
      fieldName: 'name',
      value: name,
      documentId: 'receiver-name',
      invalidRegex: invalidName(name),
      correctMessage: '받으실 분의 이름에 한글, 영어, 숫자 외 특수문자를 사용할 수 없습니다.',
    },
    {
      fieldName: 'phone',
      value: phone,
      emptyMessage: '휴대폰 번호를 입력해주세요.',
      documentId: 'receiver-phone',
      invalidRegex: !phoneValidate(phone),
      correctMessage: '휴대폰 번호를 정확히 입력해주세요.',
    },
    {
      fieldName: 'phone',
      value: phone,
      emptyMessage: '휴대폰 번호를 입력해주세요.',
      documentId: 'receiver-phone',
      invalidRegex: isDefaultPhoneNumber(phone),
      correctMessage: '휴대폰 번호를 정확히 입력해주세요.',
    },
  ];

  const invalidFieldIndex = receiver.findIndex((format) => findErrorField(format));

  if (invalidFieldIndex > -1) {
    return checkInvalidField(receiver[invalidFieldIndex]);
  }

  return {
    errorMessage: '',
    documentId: '',
  };
};

// 결제하기 클릭 시 - 배송 입력 내용 최종 검증
export const validateDeliveryField = (receiverForm: ReceiverForm): CheckoutErrorMessageFormat => {
  const {
    addressNo,
    phone,
    receivePlace = ReceivePlace.DOOR,
    deliveryType,
    frontDoorMethod = FrontDoorMethod.PASSWORD,
    frontDoorDetail,
    requiredFillReceiverDetail,
    requiredFillReceiverContact,
  } = receiverForm;

  if (requiredFillReceiverContact && requiredFillReceiverDetail) {
    return {
      errorMessage: `${REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE}.`,
      documentId: 'checkout-shipping-details',
    };
  }

  if (requiredFillReceiverDetail) {
    return {
      errorMessage: `${REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE}.`,
      documentId: 'checkout-shipping-details',
    };
  }

  if (requiredFillReceiverContact) {
    return {
      errorMessage: `${REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE}.`,
      documentId: 'checkout-shipping-details',
    };
  }

  if (isDefaultPhoneNumber(phone)) {
    return {
      errorMessage: '휴대폰 번호를 정확히 입력해주세요.',
      documentId: 'shipping-container',
    };
  }

  if (addressNo === -1) {
    return {
      errorMessage: '받으실 장소를 입력해주세요.',
      documentId: 'checkout-shipping-details',
    };
  }

  if (deliveryType === 'disable') {
    return {
      errorMessage: '안타깝지만 배송 불가 지역입니다. 배송지를 변경해주세요.',
      documentId: 'checkout-shipping-details',
    };
  }

  if (deliveryType === 'direct') {
    return checkInvalidField({
      fieldName: 'frontDoorMethod',
      value: frontDoorMethod,
      invalidRegex:
        receivePlace === ReceivePlace.DOOR && frontDoorMethod === FrontDoorMethod.PASSWORD && isEmpty(frontDoorDetail),
      correctMessage: '받으실 장소를 입력해주세요.',
      documentId: 'checkout-shipping-details',
    });
  }

  return {
    errorMessage: '',
    documentId: '',
  };
};

// [선물하기] 결제하기 클릭 시 - 선물 수신자 이름 검증
export const validateRecipientField = (
  recipientInfo: RecipientInfo,
  notificationType: NotificationType,
): CheckoutErrorMessageFormat => {
  const { name, phone } = recipientInfo;

  const recipient: CheckoutErrorMessageRequest[] = [
    {
      fieldName: 'name',
      value: name,
      emptyMessage: '받으실 분 이름을 입력해주세요.',
      documentId: 'recipient-name',
      correctMessage: '사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
    },
    {
      fieldName: 'phone',
      value: phone,
      emptyMessage: notificationType === Notification.SMS ? '받으실 분 휴대폰 번호를 입력해주세요.' : '',
      documentId: 'recipient-phone',
      invalidRegex: phone ? !phoneValidate(phone) : false,
      correctMessage: '받으실 분 휴대폰 번호를 정확히 입력해주세요.',
    },
  ];

  const invalidFieldIndex = recipient.findIndex((format) => findErrorField(format));

  if (invalidFieldIndex > -1) {
    return checkInvalidField(recipient[invalidFieldIndex]);
  }

  return {
    errorMessage: '',
    documentId: '',
  };
};
