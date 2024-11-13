import { isEmpty } from 'lodash';

import { CheckoutErrorMessageFormat } from '../../order/checkout/shared/utils/validateInvalidField';
import { ReformattedError } from '../errors/ReformattedError';
import { ValidationError } from '../errors/ValidationError';

// 공통 밸리데이션 검증
export const validateAlert = (result: CheckoutErrorMessageFormat) => {
  const { errorMessage, reformattedField } = result;

  // 문자열 수정이 일어나야 하는 에러
  if (!isEmpty(reformattedField)) {
    throw new ReformattedError(result);
  }

  // 스크롤 포커스가 되어야 하는 에러
  if (!isEmpty(errorMessage)) {
    throw new ValidationError(result);
  }
};
