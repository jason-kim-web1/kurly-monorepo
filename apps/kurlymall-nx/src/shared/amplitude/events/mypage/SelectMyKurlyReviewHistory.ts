import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selectionType: 'dropdown' | 'mypage';
}

/**
 * 마이컬리탭에서 상품 후기 선택
 * PC만 트래킹
 * 1. dropdown (마이컬리 드롭다운)
 * 2. mypage(마이컬리 좌측 메뉴를 통한 선택)
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyReviewHistory extends AmplitudeEvent<Payload | undefined> {
  constructor(payload?: Payload) {
    super('select_my_kurly_review_history', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload?.selectionType,
    };
  }
}
