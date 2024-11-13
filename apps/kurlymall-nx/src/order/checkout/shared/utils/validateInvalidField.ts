import { isEmpty } from 'lodash';

import { notAllowedCharacters, reformattedString } from '../../../../shared/utils';

export interface CheckoutErrorMessageFormat {
  // 에러 메세지
  errorMessage: string;
  // 에러 메세지 이후 포커스 처리 될 id
  documentId: string;
  // 허용 불가 문자열 제거한 결과
  reformattedField?: {
    value: string;
    text: string;
  };
}

export interface CheckoutErrorMessageRequest {
  fieldName: string;
  value: string;
  emptyMessage?: string;
  documentId: string;
  invalidRegex?: boolean;
  correctMessage?: string;
  showNotAllowedText?: boolean;
}

// (공통) 조건에 따라 에러 메세지를 반환합니다.
export const checkInvalidField = ({
  fieldName,
  value,
  documentId,
  invalidRegex,
  emptyMessage,
  correctMessage,
  showNotAllowedText = true,
}: CheckoutErrorMessageRequest) => {
  const isAddressField = fieldName === 'addressDetail';

  // 빈 값 검증
  if (emptyMessage && isEmpty(value)) {
    return {
      errorMessage: emptyMessage,
      documentId,
    };
  }

  // 정규식 통과 여부 검증
  if (invalidRegex && correctMessage) {
    return {
      errorMessage: correctMessage,
      documentId,
    };
  }

  // 허용 불가 문자열 검증
  const notAllowedText = notAllowedCharacters(value, isAddressField);

  if (!isEmpty(notAllowedText) && correctMessage) {
    return {
      errorMessage: `${correctMessage}${showNotAllowedText ? `\n${notAllowedText?.join(' ')}` : ''}`,
      documentId,
      reformattedField: {
        value: fieldName,
        text: reformattedString(value, notAllowedText),
      },
    };
  }

  // 모든 검증 통과
  return {
    errorMessage: '',
    documentId: '',
  };
};

export const findErrorField = (format: CheckoutErrorMessageRequest) => {
  const { errorMessage } = checkInvalidField(format);

  return !isEmpty(errorMessage);
};
