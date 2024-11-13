import { AmplitudeEvent } from '../../AmplitudeEvent';

export interface Payload {
  selectionType: 'kakaotalk' | 'kurly_one_by_one' | 'call' | 'bulk_call';
}

/**
 * MW 마이컬리탭 - 고객센터 메뉴에서 '상담콜' 번호, '대량주문문의' 번호, ‘카카오톡 문의’, ‘1:1 문의 작성’ 채널 선택시 발생
 * selection_type - 문의 경로 (카카오톡 문의 = 'kakaotalk', 1:1 문의 작성 선택시 = 'kurly_one_by_one', 전화 문의 = 'call', 대량주문 문의 = 'bulk_call')
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyServiceCenterChannel extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_my_kurly_service_center_channel', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload.selectionType,
    };
  }
}
