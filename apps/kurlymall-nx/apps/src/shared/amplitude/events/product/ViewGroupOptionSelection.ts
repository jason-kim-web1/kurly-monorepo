import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면에서 ‘일정•옵션' 클릭 후 팝업창 화면 조회 (캘린더형 컨텐츠 그룹에서만 발생)
 * @extends AmplitudeEvent
 */
export class ViewGroupOptionSelection extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('view_group_option_selection', payload);
  }

  getPayload() {
    const { fusionQueryId } = this.payload;

    return {
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
