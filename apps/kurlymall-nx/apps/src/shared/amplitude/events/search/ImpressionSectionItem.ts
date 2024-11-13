import { AmplitudeEvent } from '../../AmplitudeEvent';

type ImpressionSectionItemPayload = {
  /* 섹션 관련 */
  search_section_category?: string; // 섹션 위치
  search_section_name?: string | null; // 섹션 타이틀
  search_section_id?: string; // 섹션 코드명
  section_position?: number; // 섹션 간 노출 순서

  /* 섹션 아이템 관련 */
  item_position?: number; // 섹션 내 아이템(상품/배너) 노출 순서
  content_id?: string | number; // 컨텐츠 ID
  content_name?: string; // 컨텐츠명
  sales_price?: number; // 정상가
  price?: number; // 현재가
  position?: number | null; // 상품목록 내 컨텐츠 순서
  is_soldout?: boolean; // 품절 여부
  is_gift_purchase?: boolean; // 선물하기 여부
  sticker?: string; // 상품 썸네일에 표시되는 스티커
  delivery_type?: string; // 배송 유형
  review_count?: string | number; // 후기 수

  /* 상품 상세 */
  section_name?: string;
  section_item_count?: number;
  section_item_position?: number;
  shortcut_type?: string;
  section_screen?: string;
  referrer_content_id?: number;
  referrer_content_name?: string;

  /* 검색 관련 */
  is_sorting?: boolean; // 사용자에 의한 정렬 적용 여부
  search_test_group?: string; // 검색 AB테스트 그룹명
  default_sort_type?: string; // 기본 정렬값
  selection_sort_type?: string; // 사용자 정렬값
  server_sort_type?: string; // 서버 정렬값
  filter_id?: string; // 적용된 필터 ID
  keyword?: string; // 검색어 (검색 결과 상품 목록일 때)
  fusion_query_id?: string;
};

// NOTE: 섹션 아이템 관련 속성만
type PartialImpressionSectionItemPayload = Omit<
  ImpressionSectionItemPayload,
  | 'search_section_category'
  | 'search_section_name'
  | 'search_section_id'
  | 'section_position'
  | 'is_sorting'
  | 'search_test_group'
  | 'default_sort_type'
  | 'selection_sort_type'
  | 'server_sort_type'
  | 'filter_id'
  | 'keyword'
  | 'fusion_query_id'
>;

class ImpressionSectionItem extends AmplitudeEvent<ImpressionSectionItemPayload> {
  constructor(payload: ImpressionSectionItemPayload) {
    super('impression_section_item', payload);
  }

  getPayload() {
    return {
      ...this.payload,
      search_section_id: (this.payload.search_section_id || '').toLowerCase(),
    };
  }
}

export { ImpressionSectionItem };
export type { PartialImpressionSectionItemPayload };
