import { AmplitudeEvent } from '../../AmplitudeEvent';

/*
 * 이벤트 페이지 내 각 상품 보기
 * Payload:
 *   url: 이벤트 페이지 URL,
 *   previousUrl: 이전 이벤트가 'view_event_detail'일 경우에만 트래킹,
 *   contentId: 콘텐츠 번호,
 *   contentName: 콘테츠 명,
 *   position: 각 컨텐츠의 위치,
 *   eventItemCategory: 보고있는 콘텐츠의 위치
 *    - scroll: 페이지 스크롤
 *    - slide: 스와이퍼 슬라이드
 * */

interface Payload {
  url: string;
  previousUrl: string;
  contentId: string;
  contentName: string;
  position: string;
  eventItemCategory: string;
}

export class ViewEventItem extends AmplitudeEvent<Payload> {
  url?: string;

  previousUrl?: string;

  contentId?: string;

  contentName?: string;

  position?: string;

  eventItemCategory?: string;

  constructor(payload: Payload) {
    super('view_event_item', payload);
    this.url = payload.url;
    this.previousUrl = payload.previousUrl;
    this.contentId = payload.contentId;
    this.contentName = payload.contentName;
    this.position = payload.position;
    this.eventItemCategory = payload.eventItemCategory;
  }

  getPayload() {
    return {
      url: this.url,
      previous_url: this.previousUrl,
      content_id: this.contentId,
      content_name: this.contentName,
      position: this.position,
      event_item_category: this.eventItemCategory,
    };
  }
}
