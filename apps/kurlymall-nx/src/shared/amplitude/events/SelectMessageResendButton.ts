import { AmplitudeEvent } from '../AmplitudeEvent';

import { GiftDetails, GiftListItem } from '../../interfaces';

interface Payload {
  gift?: GiftListItem;
  orderDetails?: GiftDetails;
}

export class SelectMessageResendButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_message_resend_button', payload);
  }

  getPayload() {
    if (this.payload.gift) {
      return {
        // 개발에서 사용하는 값과 동일한 선물하기 유형 값(카카오톡, SMS) , varchar
        gift_type: this.payload.gift.notificationType,
        // CMS 주문번호, varchar/integer
        transaction_id: this.payload.gift.groupOrderNo,
        // 상품 패키지 번호, varchar/integer
        // TODO: 선물하기 reopen 이후 선물 내역 조회 데이터에 dealProductNo 가 없음.
        package_id: 0,
        // 상품 패키지명, varchar
        package_name: this.payload.gift.contentsProductName,
      };
    }

    if (this.payload.orderDetails) {
      return {
        // 개발에서 사용하는 값과 동일한 선물하기 유형 값(카카오톡, SMS) , varchar
        gift_type: this.payload.orderDetails.notificationType,
        // CMS 주문번호, varchar/integer
        transaction_id: this.payload.orderDetails.groupOrderNo,
        // 상품 패키지 번호, varchar/integer
        package_id: this.payload.orderDetails.products[0].dealProductNo,
        // 상품 패키지명, varchar
        package_name: this.payload.orderDetails.products[0].contentsProductName,
      };
    }

    return {};
  }
}
