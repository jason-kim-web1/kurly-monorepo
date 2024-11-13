import { AmplitudeEvent } from '../AmplitudeEvent';
import { SearchResultParams } from '../../../search/shared/utils/sendSearchResultAmplitude';

/*
  See also ...
  https://docs.google.com/spreadsheets/d/1ychgITlk4lMaJ1sx4iIa0PlZtvWAv4isBB6cvs-5btI/edit#gid=1082816678
*/

/**
 * 검색 Amplitude Event tracking
 * @extends AmplitudeEvent
 */
export class SearchResult extends AmplitudeEvent<SearchResultParams> {
  /**
   * 인기/최근 검색어, 바로가기 상품, 직접 검색 등으로 검색 이벤트 발생
   *
   * @return { payload } 해당 값들을 amplitude 이벤트로 반환
   * @param payload
   * @param { string } queryId 모든 검색 탭에서 발생하는 event에 공통으로 사용되는 Event Property
   * @param { string } keyword 검색어 (인기, 최근, 직접 검색, 상품 바로가기, 추천, 급상승) / 상품 바로가기의 경우, 클릭 당시 작성된 검색어 입력
   * @param { string } totalCount 검색결과 총  상품개수
   * @param { string } selectionType 검색유형 (최근, 직접, 추천, 급상승, URL) 중 선택된 type 값
   * @param { boolean } fallback 마켓 폴백 여부
   * @param { boolean } filter 필터에 의한 이벤트 발생 여부 확인
   * @param { string }  sort 정렬에 의한 이벤트 발생 여부 확인
   * @param { ?SPELLING_CORRECTION | ALTERNATIVE_SUGGESTION } keywordConvertType 오타 보정 또는 대체 상품인 경우
   * @param { ?string } convertedKeyword 보정된 키워드
   */
  constructor(payload: SearchResultParams) {
    super('search_result', payload);
  }

  getPayload() {
    const {
      queryId,
      keyword,
      totalCount,
      selectionType,
      fallback,
      filter,
      sort,
      keywordConvertType,
      convertedKeyword,
      google_search,
    } = this.payload;

    return {
      fusion_query_id: queryId ? queryId : null,
      keyword: keyword,
      total_count: totalCount,
      selection_type: selectionType,
      fallback: fallback,
      filter: filter,
      sort,
      keyword_convert_type: keywordConvertType?.toLowerCase(),
      converted_keyword: convertedKeyword?.toLowerCase(),
      google_search: google_search || 'false',
    };
  }
}
