import { AmplitudeEvent } from '../AmplitudeEvent';
import { SearchRefreshParams } from '../../../search/shared/utils/sendSearchRefreshAmplitude';

/*
  See also ...
  https://docs.google.com/spreadsheets/d/1ychgITlk4lMaJ1sx4iIa0PlZtvWAv4isBB6cvs-5btI/edit#gid=1082816678
*/

/**
 * 검색 Amplitude Event tracking
 * @extends AmplitudeEvent
 */
export class SearchRefresh extends AmplitudeEvent<SearchRefreshParams> {
  /**
   * 인기/최근 검색어, 바로가기 상품, 직접 검색 등으로 검색 이벤트 발생
   *
   * @return { payload } 해당 값들을 amplitude 이벤트로 반환
   * @param payload
   * @param { 'user_refresh' | 'dev_refresh' | 'address_change' } refreshType 새로고침 발생 원인
   * @param { string } queryId 모든 검색 탭에서 발생하는 event에 공통으로 사용되는 Event Property
   * @param { string } keyword 검색어 (인기, 최근, 직접 검색, 상품 바로가기, 추천, 급상승) / 상품 바로가기의 경우, 클릭 당시 작성된 검색어 입력
   */
  constructor(payload: SearchRefreshParams) {
    super('search_refresh', payload);
  }

  getPayload() {
    const { refreshType, queryId, keyword } = this.payload;

    return {
      refresh_type: refreshType,
      fusion_query_id: queryId,
      keyword,
    };
  }
}
