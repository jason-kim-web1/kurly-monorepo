import { AmplitudeEvent } from '../../AmplitudeEvent';
import { ContentType, GroupMemberSubOption } from '../../../../product/detail/types';

interface Payload {
  defaultContentId: number;
  option: GroupMemberSubOption;
  contentType: ContentType;
  optionsType: string;
  optionPosition: number;
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면에서 ‘옵션 항목' 클릭 (컨텐츠 그룹에서만 발생)
 * @extends AmplitudeEvent
 */
export class SelectContentsGroupOption extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_contents_group_option', payload);
  }

  getPayload() {
    const {
      defaultContentId,
      option: { isSoldOut, description },
      contentType,
      optionsType,
      optionPosition,
      fusionQueryId,
    } = this.payload;

    return {
      default_content_id: defaultContentId, // 옵션 변경이 발생하기 전의 유입 콘텐츠 번호
      is_soldout: isSoldOut, // 선택한 옵션 품절 여부
      option_value: description, // 선택된 옵션 값 표기(핑크)
      content_type: contentType, // 콘텐츠의 유형에 대한 정보
      option_type: optionsType, // 선택된 옵션 항목 이름 표기(컬러)
      position: optionPosition + 1, // 목록 내 클릭 대상 순서(2), index + 1
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
