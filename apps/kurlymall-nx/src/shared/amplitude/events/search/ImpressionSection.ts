import { AmplitudeEvent } from '../../AmplitudeEvent';

type ImpressionSectionPayload = {
  /* 섹션 관련*/
  search_section_category?: string; // 섹션 위치
  search_section_name?: string | null; // 섹션 타이틀
  search_section_id?: string; // 섹션 코드명
  section_position?: number; // 섹션 간 노출 순서
  url?: string; // 배너 클릭 시 랜딩되는 URL 값
  title?: string | null; // CMS에 등록된 배너의 타이틀 값

  /* 상품 상세 */
  section_name?: string;
  section_item_count?: number;
  section_screen?: string;
  referrer_content_id?: number;
  referrer_content_name?: string;

  /* 검색 관련 */
  search_test_group?: string; // 검색 AB테스트 그룹명
  keyword?: string; // 검색어 (검색 결과 상품 목록일 때)
};

class ImpressionSection extends AmplitudeEvent<ImpressionSectionPayload> {
  constructor(payload: ImpressionSectionPayload) {
    super('impression_section', payload);
  }

  getPayload() {
    return {
      ...this.payload,
      search_section_id: (this.payload.search_section_id || '').toLowerCase(),
    };
  }
}

export { ImpressionSection };
