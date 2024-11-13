import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selectionType: 'kakaotalk' | 'kurly_one_by_one';
}

/**
 * MW 마이컬리탭 - 1:1문의 메뉴 내 페이지에서 ‘카카오톡 문의’ 또는 ‘1:1 문의’ 버튼 클릭
 * selection_type - 문의 경로 (카카오톡 문의 = 'kakaotalk', 1:1 문의 = 'kurly_one_by_one')
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyPersonalInquiryChannel extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_my_kurly_personal_inquiry_channel', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload.selectionType,
    };
  }
}
