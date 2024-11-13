import { AmplitudeEvent } from '../../AmplitudeEvent';
import { PAYMENT_TYPE, PaymentType } from '../../../../order/subscribe/interfaces';
import {
  KurlyMembersCouponPackCode,
  KurlyMembersCouponPackCodeType,
  KurlypayType,
} from '../../../../order/subscribe/interfaces/KurlyMembersProduct.interface';
import { EasyPaymentCompanyId } from '../../../interfaces';
import { isKurlycard } from '../../../../order/shared/shared/services';

interface Payload {
  paymentMethodType: PaymentType;
  paymentKurlypayType: KurlypayType | null;
  paymentKurlypayCompanyCode: EasyPaymentCompanyId | null;
  couponPackCode?: KurlyMembersCouponPackCodeType;
  isAddKurlpayMethod: boolean;
}

export class SelectMembershipSubscribeOrder extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_membership_subscribe_order', payload);
  }

  getPayload() {
    const payload = {
      option_name: this.payload.couponPackCode?.toLowerCase() ?? KurlyMembersCouponPackCode.CORE.toLowerCase(),
      payment_method: this.payload.paymentMethodType.replace('-', ''),
    };

    if (this.payload.paymentMethodType === PAYMENT_TYPE.KURLY_PAY) {
      if (this.payload.isAddKurlpayMethod) {
        payload.payment_method += '-add';
      } else if (this.payload.paymentKurlypayCompanyCode && this.payload.paymentKurlypayType) {
        if (isKurlycard({ companyId: this.payload.paymentKurlypayCompanyCode })) {
          payload.payment_method += '-plcc';
        } else {
          payload.payment_method += `-${this.payload.paymentKurlypayType === 'card' ? 'card' : 'account'}`;
        }
      }
    }

    return payload;
  }
}
