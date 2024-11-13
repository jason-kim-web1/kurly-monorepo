import { isEmpty } from 'lodash';

import { phoneValidate } from '.';
import {
  checkInvalidField,
  CheckoutErrorMessageFormat,
  CheckoutErrorMessageRequest,
  findErrorField,
} from '../../order/checkout/shared/utils/validateInvalidField';
import { MemberAddressResponse } from '../interfaces/ShippingAddress';

// 배송지 검색 결과 - 배송지 상세 정보 입력값 검증
export const validateAddressDetail = (addressDetail: string): CheckoutErrorMessageFormat => {
  return checkInvalidField({
    fieldName: 'addressDetail',
    value: addressDetail,
    documentId: 'addressDetail',
    correctMessage: '주소에 사용할 수 없는 문자가 있습니다. 다시 확인해주세요.',
  });
};

// 배송지 수정 - 배송지 입력값 검증
export const validateAddressInfo = ({
  name,
  mobile,
  addressDetail,
}: Pick<MemberAddressResponse, 'name' | 'mobile' | 'addressDetail'>): CheckoutErrorMessageFormat => {
  const addressField: CheckoutErrorMessageRequest[] = [
    {
      fieldName: 'addressDetail',
      value: addressDetail,
      documentId: 'addressDetail',
      correctMessage: '주소에 사용할 수 없는 문자가 있습니다. 다시 확인해주세요.',
    },
    {
      fieldName: 'name',
      value: name,
      documentId: 'name',
      correctMessage: '이름에 사용할 수 없는 문자가 있습니다. 다시 확인해주세요.',
    },
    {
      fieldName: 'mobile',
      value: mobile,
      documentId: 'mobile',
      invalidRegex: !isEmpty(mobile) && !phoneValidate(mobile),
      correctMessage: '휴대폰 번호를 정확히 입력해주세요.',
    },
  ];

  const invalidFieldIndex = addressField.findIndex((format) => findErrorField(format));

  if (invalidFieldIndex > -1) {
    return checkInvalidField(addressField[invalidFieldIndex]);
  }

  return {
    errorMessage: '',
    documentId: '',
  };
};
