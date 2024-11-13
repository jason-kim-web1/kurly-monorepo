import { CheckoutErrorMessageFormat } from '../../order/checkout/shared/utils/validateInvalidField';

export class ValidationError extends Error {
  constructor(validationResult: CheckoutErrorMessageFormat) {
    const { errorMessage, documentId } = validationResult;

    super(errorMessage);
    this.name = documentId;
  }
}
