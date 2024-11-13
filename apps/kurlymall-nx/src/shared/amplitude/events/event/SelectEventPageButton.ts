import { AmplitudeEvent } from '../../AmplitudeEvent';

/*
 * 이벤트 페이지 버튼 클릭
 * Payload:
 *  url: 다음 랜딩될 URL,
 *  message: 버튼의 내 문구(상품명 혹은 버튼 내용),
 *  selectionType: 클릭 유형('product_detail', 'floating'),
 *  position: 상품 위치(1부터 시작),
 *  contentId: 콘텐츠 번호,
 *  contentName: 콘텐츠 이름,
 * */

interface Payload {
  url: string;
  message: string;
  selectionType: string;
  position: string;
  contentId: string;
  contentName: string;
}

export class SelectEventPageButton extends AmplitudeEvent<Payload> {
  url?: string;

  message?: string;

  selectionType?: string;

  position?: string;

  contentId?: string;

  contentName?: string;

  constructor(payload: Payload) {
    super('select_event_page_button', payload);
    this.url = payload.url;
    this.message = payload.message;
    this.selectionType = payload.selectionType;
    this.position = payload.position;
    this.contentId = payload.contentId;
    this.contentName = payload.contentName;
  }

  getPayload() {
    return {
      url: this.url,
      message: this.message,
      selection_type: this.selectionType,
      position: this.position,
      content_id: this.contentId,
      content_name: this.contentName,
    };
  }
}
