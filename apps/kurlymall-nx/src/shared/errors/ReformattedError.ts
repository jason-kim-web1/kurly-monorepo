import { CheckoutErrorMessageFormat } from '../../order/checkout/shared/utils/validateInvalidField';

export class ReformattedError extends Error {
  constructor(validationResult: CheckoutErrorMessageFormat) {
    super(JSON.stringify(validationResult));
    this.name = validationResult.documentId;
  }
}
