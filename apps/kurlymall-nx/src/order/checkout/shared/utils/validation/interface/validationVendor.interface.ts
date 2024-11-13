import { CardVendorCode, PaymentVendorCode } from '../../../../../../shared/constant';
import { CardHolderType, EasyPaymentCompanyId, EasyPaymentType } from '../../../../../../shared/interfaces';

export interface ValidationVendor {
  code: PaymentVendorCode;
  cardId: CardVendorCode | EasyPaymentCompanyId | null;
  name: string;
  easyPaymentType?: EasyPaymentType;
  cardHolderType?: CardHolderType;
}
