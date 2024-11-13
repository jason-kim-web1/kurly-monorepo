import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면에서 ‘일정•옵션' 클릭 후 팝업창 화면에서
 * '옵션 선택 완료' 버튼 클릭 (캘린더형 컨텐츠 그룹에서만 발생)
 * @extends AmplitudeEvent
 */
export class SubmitGroupOptionSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('submit_group_option_success', payload);
  }

  getPayload() {
    const { fusionQueryId } = this.payload;

    return {
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
