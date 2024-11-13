import { AmplitudeEvent } from '../AmplitudeEvent';
import { getPackageInfo } from './product/getPackageInfo';
import { DirectSearchType } from '../../../search/shared/types';

interface Payload {
  selectionType: string;
  keyword: string;
  queryId: string | null;
  contentId?: number;
  contentName?: string;
  directSearchType?: DirectSearchType;
  position?: number;
  autocompleteKeyword?: string;
  // 추후 백엔드에서 작업 후 진행될 예정
  // contentType?: 'SINGLE' | 'MULTI' | 'OPTION' | 'CALENDAR' | undefined;
}

/*
  See also ...
  https://docs.google.com/spreadsheets/d/1mT5pe5g0XDix4jOP4lpL8tFSHGUrnC9a5Ly-X9zl3MU/edit?usp=sharing
 */

/**
 * 검색 Amplitude Event tracking
 * @extends AmplitudeEvent
 */
export class SelectSearch extends AmplitudeEvent<Payload> {
  /**
   * 인기/최근 검색어, 바로가기 상품, 직접 검색 등으로 검색 이벤트 발생
   *
   * @return { payload } 해당 값들을 amplitude 이벤트로 반환
   * @param payload
   * @param { string } selectionType 검색유형 (인기, 최근, 직접 검색, 상품 바로가기) 중 선택된 type 값
   * @param { string } keyword 검색어 (인기, 최근, 직접 검색, 상품 바로가기, 추천, 급상승) / 상품 바로가기의 경우, 클릭 당시 작성된 검색어 입력
   * @param { string } queryId 모든 검색 탭에서 발생하는 event에 공통으로 사용되는 Event Property
   * @param { ?number } contentId 콘텐츠의 번호 (CMS 기준의 콘텐츠 ID, 상품 바로가기 외 null)
   * @param { ?string } contentName 콘텐츠의 이름 (CMS 기준의 콘텐츠 이름, 상품 바로가기 외 null)
   * @param { string }  directsearch_type 상품 바로가기 유형 정보 (신상품/일반상품)
   * @param { ?number } position 상품 바로가기에서 일반 상품일 경우, 선택한 콘텐츠의 위치
   * @param { ?string } autocompleteKeyword 자동완성 검색어 (optional: 검색 유형 중 '상품 바로가기'인 경우)
   * // * @param { 'SINGLE' | 'MULTI' | 'OPTION' | 'CALENDAR' | null } contentType 콘텐츠의 유형에 대한 정보 (optional: 검색 유형 중 '상품 바로가기'인 경우)
   */
  constructor(payload: Payload) {
    super('select_search', payload);
  }

  getPayload() {
    const { selectionType, keyword, queryId, contentId, contentName, directSearchType, position, autocompleteKeyword } =
      this.payload;

    if (!contentId || !contentName) {
      return {
        selection_type: selectionType,
        keyword: keyword,
        fusion_query_id: queryId ? queryId : null,
        content_id: contentId,
        content_name: contentName,
        autocomplete_keyword: autocompleteKeyword,
      };
    }

    const { packageId, packageName } = getPackageInfo({
      isGroupProduct: false,
      no: contentId,
      name: contentName,
    });

    return {
      selection_type: selectionType,
      keyword: keyword,
      fusion_query_id: queryId ? queryId : null,
      content_id: contentId,
      content_name: contentName,
      package_id: packageId,
      package_name: packageName,
      directsearch_type: directSearchType,
      position: position,
      autocomplete_keyword: autocompleteKeyword,
    };
  }
}
